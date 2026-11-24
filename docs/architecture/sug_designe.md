# PaperTrail Architecture and Design

This document contains the detailed logical, process, data, security, and deployment designs derived from the PaperTrail Software Requirements Specification (SRS).

The repository remains a template. Component, database, and deployment names describe intended boundaries and are not evidence that every feature is implemented.

## 1. Architectural Principles

| SRS principle | Architectural consequence |
|---|---|
| Federation, not a central office database | PaperTrail services store platform state; participating offices retain authoritative records |
| Event-driven exchange | Office changes and workflow transitions use durable asynchronous events |
| One workflow per application | A workflow instance is a state machine with tasks, branches, timers, and escalation |
| Consent before exchange | Every inter-office read requires a valid scoped consent or legal-basis token |
| Signed documents as trust anchors | Issued documents carry Ed25519 signatures and public verification information |
| Database per service and office | No service shares a database or directly queries another office's database |
| Container portability | Services run in Docker containers and target Docker or Kubernetes environments |

## 2. Logical Component Diagram

```mermaid
flowchart LR
    CIT["Citizen web / mobile"]
    OFF["Office console"]
    VER["Public verification"]

    DNS["DNS"]
    CDN["CDN / static assets"]
    WAF["WAF"]
    ING["Ingress"]
    GW["API gateway"]

    CIT --> DNS --> CDN --> WAF --> ING
    OFF --> WAF
    VER --> WAF
    WAF --> ING --> GW

    subgraph CORE["PaperTrail Platform"]
        direction TB
        ID["Identity, OTP, and consent"]
        M1["M1 Citizen Portal and Wallet"]
        M2["M2 Workflow Engine"]
        M3["M3 Consent and Exchange"]
        M4["M4 Documents and Trust"]
        M5["M5 Appointments and Payments"]
        M6["M6 Audit and Analytics"]
        NOTIFY["Notification Service"]
    end

    GW --> ID
    GW --> M1
    GW --> M2
    GW --> M3
    GW --> M4
    GW --> M5
    GW --> M6

    MQ[("AMQP event broker")]
    DB[("Service PostgreSQL databases")]
    OBJECT[("S3-compatible object storage")]
    VAULT[("Vault / HSM signing boundary")]

    M1 & M2 & M3 & M4 & M5 & M6 & NOTIFY --> MQ
    M1 & M2 & M3 & M4 & M5 & M6 & ID --> DB
    M1 & M4 --> OBJECT
    M4 --> VAULT
```

The gateway authenticates and routes external traffic. Authentication, authorization, and request-rate rules are reinforced inside each protected service where domain operations are exposed.

## 3. Module Interaction Map

```mermaid
flowchart TD
    subgraph M1["M1 - Citizen and Wallet"]
        A["Service catalogue"]
        B["Application and drafts"]
        C["Status timeline"]
        D["Document wallet"]
    end

    subgraph M2["M2 - Workflow"]
        E["Workflow definitions"]
        F["Workflow instances"]
        G["Tasks and queues"]
        H["SLA timers"]
    end

    subgraph M3["M3 - Consent and Exchange"]
        I["Consent tokens"]
        J["Legal-basis tokens"]
        K["Adapter registry"]
        L["Scoped data requests"]
    end

    subgraph M4["M4 - Trust"]
        M["Document bundles"]
        N["Office signing"]
        O["QR verification"]
        P["Revocation"]
    end

    subgraph M5["M5 - Physical Service"]
        Q["Appointments"]
        R["Queue tickets"]
        S["Payments"]
        T["Settlement"]
    end

    subgraph M6["M6 - Audit"]
        U["Hash-chained audit"]
        V["Citizen access history"]
        W["Bottleneck analytics"]
    end

    A --> B --> F
    B --> I
    I --> L
    F --> G
    F --> H
    G --> L
    F --> Q
    S --> F
    F --> M
    N --> O
    N --> P
    B & F & I & L & N & S --> U
    U --> V
    U & H --> W
```

## 4. Consent and Exchange State Design

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Requested: Citizen requested data exchange
    Requested --> Approved: Citizen approves
    Requested --> Refused: Citizen refuses
    Requested --> Expired: Token lifetime ends
    Approved --> Active: Signed token issued
    Active --> Consumed: Exchange request accepted
    Active --> Revoked: Citizen revokes
    Active --> Expired: Token lifetime ends
    Refused --> [*]
    Consumed --> [*]
    Revoked --> [*]
    Expired --> [*]
```

A consent token is purpose-bound and scoped to:

- Citizen identity.
- Requesting office.
- Source office.
- Requested data fields.
- Purpose.
- Issue and expiry timestamps.
- Signature and optional revocation timestamp.

The exchange service validates the signature, audience, expiry, requesting office, purpose, scope, and current revocation state on every request. Revocation must reject newly admitted requests within 60 seconds.

## 5. Consent Validation Sequence

```mermaid
sequenceDiagram
    actor Citizen
    participant App as Citizen Portal
    participant Consent as Identity and Consent
    participant Exchange as Exchange Service
    participant Registry as Adapter Registry
    participant Adapter as Office Adapter
    participant Office as Authoritative Office
    participant Audit as Audit Service

    Citizen->>App: Select office-fetched field
    App->>Consent: Create consent request
    Consent-->>Citizen: Show source, fields, purpose, expiry
    Citizen->>Consent: Approve or refuse
    alt Approved
        Consent-->>Exchange: Signed consent token
    else Refused
        Consent-->>App: Consent refused
        App->>Audit: Record refusal
    end

    App->>Exchange: Fetch requested data
    Exchange->>Exchange: Validate token and policy
    alt Valid
        Exchange->>Registry: Resolve source adapter
        Registry-->>Exchange: Adapter contract and endpoint
        Exchange->>Adapter: Request minimal field set
        Adapter->>Office: Query authorised record
        Office-->>Adapter: Requested values and source timestamp
        Adapter-->>Exchange: Minimal response
        Exchange-->>App: Values and provenance
        Exchange->>Audit: Record read and authorisation
    else Invalid or revoked
        Exchange-->>App: Reject and explain
        Exchange->>Audit: Record rejection
    end
```

## 6. Birth Certificate Sequence

```mermaid
sequenceDiagram
    actor Parent
    participant Portal as Citizen Portal
    participant Workflow as Workflow Engine
    participant Exchange as Exchange Service
    participant Civil as Civil Registry
    participant Hospital as Hospital System
    participant Document as Document and Trust
    participant Wallet as Citizen Wallet
    participant Audit as Audit Service

    Parent->>Portal: Submit birth-certificate application
    Portal->>Exchange: Request birth-record consent
    Parent->>Exchange: Approve scoped consent
    Exchange-->>Workflow: Authorised data exchange
    Workflow->>Exchange: Fetch birth fields
    Exchange->>Civil: Retrieve civil birth record
    Civil->>Hospital: Validate birth notification
    Hospital-->>Civil: Verified birth information
    Civil-->>Exchange: Source fields and timestamp
    Exchange-->>Workflow: Prefilled fields
    Workflow->>Workflow: Create civil-registry validation task
    Workflow-->>Parent: Timeline and responsible office
    Workflow->>Document: Request issuance after approval
    Document->>Document: Render template and sign with Ed25519
    Document-->>Wallet: Add signed certificate and QR
    Document-->>Parent: Issuance notification
    Document->>Audit: Record issuance
    Exchange->>Audit: Record source-office access
```

Hospital, civil-registry, citizen-wallet, and audit records remain separate. The hospital notification creates or updates a draft source record; it is not itself final citizen authorization or document issuance.

## 7. Business Registration Parallel Workflow

```mermaid
flowchart TD
    SUBMIT["Application submitted"] --> PAYMENT["Payment confirmation gate"]
    PAYMENT -->|Confirmed| FORK{"Fork independent checks"}

    FORK --> COM["Commerce Registry"]
    FORK --> TAX["Tax Office"]
    FORK --> INS["Social Insurance"]
    FORK --> COU["Council"]

    COM --> JOIN{"Join checks"}
    TAX --> JOIN
    INS --> JOIN
    COU --> JOIN

    JOIN -->|All approved| ISSUE["Issue signed document bundle"]
    JOIN -->|Rejected| DECIDE["Reject or request information"]
    JOIN -->|SLA exceeded| ESC["Escalate overdue tasks"]

    ISSUE --> WALLET["Citizen wallet"]
    DECIDE --> NOTIFY["Citizen notification"]
    ESC --> ASSIGN["Reassign or escalate"]
    ASSIGN --> JOIN
```

M5 calculates fees when the application is submitted and splits them by office according to the fee schedule in force. A payment gateway confirmation is a prerequisite for the workflow to pass the payment task.

## 8. Document Verification Design

```mermaid
sequenceDiagram
    actor Verifier
    participant Portal as Verification Portal
    participant Trust as Document and Trust
    participant Keys as Published Public Keys
    participant Status as Revocation Status
    participant Audit as Audit Service

    Verifier->>Portal: Scan QR, enter ID, or upload PDF
    Portal->>Trust: Resolve document
    Trust->>Keys: Retrieve issuer public key
    Trust->>Status: Check revoked or superseded status
    Trust->>Trust: Verify Ed25519 signature and content hash
    alt Valid
        Trust-->>Portal: Valid
    else Revoked or superseded
        Trust-->>Portal: Status and status date
    else Invalid
        Trust-->>Portal: Invalid
    end
    Portal-->>Verifier: Minimum public verification view
    Portal->>Audit: Record verification without document content
```

Public verification should reveal only document type, issuer, issue date, and status unless the holder provides a full-view share link. A revoked or superseded document is not deleted; it remains verifiable with its status history.

## 9. Data and Persistence Design

```mermaid
flowchart TB
    subgraph SVC["Platform services"]
        ID["Identity / Consent"]
        CP["Citizen Portal"]
        WF["Workflow"]
        EX["Exchange"]
        DOC["Document Trust"]
        PAY["Appointments / Payments"]
        AUD["Audit / Analytics"]
    end

    subgraph DB["Database-per-service"]
        DB1[("identity_consent_db")]
        DB2[("citizen_portal_db")]
        DB3[("workflow_db")]
        DB4[("exchange_db")]
        DB5[("document_trust_db")]
        DB6[("appointments_payments_db")]
        DB7[("audit_analytics_db")]
    end

    ID --> DB1
    CP --> DB2
    WF --> DB3
    EX --> DB4
    DOC --> DB5
    PAY --> DB6
    AUD --> DB7

    OBJECT[("Document and attachment object store")]
    KV[("Signing key vault")]
    MQ[("Event broker")]

    CP --> OBJECT
    DOC --> OBJECT
    DOC --> KV
    SVC --> MQ

    subgraph OFFICE["Office-owned data"]
        OH[("Hospital")]
        OC[("Civil Registry")]
        OM[("Commerce Registry")]
        OT[("Tax Office")]
        OL[("Land Registry")]
        ON[("Notary")]
        OU[("Council")]
    end

    EX -. mTLS adapter calls .-> OH
    EX -. mTLS adapter calls .-> OC
    EX -. mTLS adapter calls .-> OM
    EX -. mTLS adapter calls .-> OT
    EX -. mTLS adapter calls .-> OL
    EX -. mTLS adapter calls .-> ON
    EX -. mTLS adapter calls .-> OU
```

Cross-service foreign keys and shared database schemas are not used. Identifiers are UUIDs and timestamps are stored in UTC.

The SRS identifies these major data boundaries:

| Data area | Owning component |
|---|---|
| Identity, consent, and legal basis | Identity and Consent service |
| Application, wallet, and status | Citizen Portal |
| Workflow instances and tasks | Workflow Engine |
| Adapter contracts and exchange receipts | Exchange service |
| Document metadata and public-key metadata | Document Trust |
| Appointments, payments, settlements | Appointments and Payments |
| Audit entries and analytics | Audit and Analytics |

## 10. Event Delivery Design

```mermaid
flowchart LR
    PUBLISHER["Publisher service"] --> OUTBOX["Transactional outbox"]
    OUTBOX --> MQ[("RabbitMQ")]
    MQ --> QUEUE["Durable service queue"]
    QUEUE --> CONSUMER["Idempotent consumer"]
    CONSUMER -->|Success| ACK["Acknowledgement"]
    CONSUMER -->|Transient failure| RETRY["Retry queue"]
    RETRY --> QUEUE
    CONSUMER -->|Rejected or exhausted| DLQ["Dead-letter queue"]
    DLQ --> ALERT["Operations alert"]
```

Event delivery is at least once. Consumers must deduplicate by event ID and enforce idempotency. JSON bodies use ISO 8601 timestamps in UTC.

## 11. Deployment Topology

```mermaid
flowchart TB
    INTERNET["Citizen, office, verifier devices"]
    INGRESS["Ingress or reverse proxy"]

    subgraph CLUSTER["Kubernetes or Docker cluster"]
        GW["API gateway replicas"]
        WEB["Citizen, office, and verifier web apps"]
        SERVICES["Independent backend deployments"]
        WORKERS["Timers and event consumers"]
        DATA[("Databases and persistent volumes")]
        MQ[("RabbitMQ")]
        OBJ[("MinIO / S3")]
        OBS["Metrics, logs, and tracing"]
    end

    subgraph OFFICEA["Hosted office"]
        ADA["Adapter"]
        DBA[("Office database")]
    end

    subgraph OFFICEB["Office on-premises"]
        ADB["Adapter"]
        DBB[("Office database")]
        CON["Office console"]
    end

    VAULT["Key vault / HSM"]
    IDP["OIDC identity provider"]
    PAY["Payment gateway"]
    SMS["SMS gateway"]

    INTERNET --> INGRESS
    INGRESS --> WEB
    INGRESS --> GW --> SERVICES
    SERVICES --> DATA
    SERVICES --> MQ
    SERVICES --> OBJ
    WORKERS --> MQ
    SERVICES --> VAULT
    SERVICES --> IDP
    SERVICES --> PAY
    SERVICES --> SMS
    SERVICES -->|"mTLS"| ADA
    SERVICES -->|"mTLS"| ADB
    ADA --> DBA
    ADB --> DBB
    CON --> ADB
    SERVICES --> OBS
```

## 12. Container and Kubernetes Mapping

| Component | Local asset | Deployment direction |
|---|---|---|
| API gateway | `services/api-gateway/Dockerfile` | Deployment, Service, readiness and liveness probes |
| Citizen web | `apps/citizen-web/Dockerfile` | Deployment and Service behind ingress |
| Module services | Future service Dockerfiles | Separate Deployments, Services, HPAs, and databases |
| Office adapters | Future adapter containers | Hosted centrally or deployed on an office site |
| PostgreSQL | Docker Compose | StatefulSets or managed PostgreSQL; one database per boundary |
| RabbitMQ | Docker Compose | Managed broker or StatefulSet |
| MinIO | Docker Compose | Managed S3 or persistent local deployment |
| Key vault | External placeholder | Vault API or HSM; private signing keys never leave it |

Kubernetes assets currently provide the namespace, ingress, gateway deployment, secret example, and autoscaling template. Real secret values must be supplied through an external secret process.

## 13. Security Boundary Design

```mermaid
flowchart LR
    USER["User or officer"] -->|TLS| EDGE["WAF / ingress"]
    EDGE -->|Authenticated request| GW["API gateway"]
    GW -->|RBAC and policy| M["Protected service"]
    M -->|Database credentials| DB[("Database")]
    M -->|Signed or authorized request| EX["Exchange"]
    EX -->|mTLS| OA["Office adapter"]
    OA -->|Local credentials| OD[("Office database")]
    M -->|Sign operation| KV["Vault / HSM"]
    M -->|Append event| AUD["Audit service"]
```

Required controls:

- HTTPS with TLS 1.2 or later.
- Mutual TLS between services and offices where sensitive exchange is required.
- OIDC for citizens and staff.
- MFA for officers, auditors, and administrators.
- Office- and role-scoped least-privilege authorization.
- AES-256 at-rest encryption.
- Signed, idempotent payment webhooks.
- HMAC-signed OTP and notification integration requests where required.
- Hash-chained append-only audit entries.
- Signing-key rotation at least annually.
- Account lockout after five failed OTP attempts for 15 minutes.

## 14. Implementation Slices

1. Establish the API gateway, identity boundary, and traceable request context.
2. Implement the application, workflow, and task models.
3. Implement consent tokens and exchange authorization.
4. Add office adapter contracts and one end-to-end simulated office.
5. Implement document templates, signing, QR verification, and revocation.
6. Implement appointments, payments, settlement, and reconciliation.
7. Implement hash-chained audit and access-history views.
8. Add retries, dead-letter handling, observability, backups, and security tests.
