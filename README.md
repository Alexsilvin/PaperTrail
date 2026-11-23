::: {align="center"}
# PaperTrail

### Public services, connected. Paperwork, simplified.

```{=html}
<p>
```
`<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=600&size=20&duration=2800&pause=900&color=2563EB&center=true&vCenter=true&width=680&lines=Apply+once.+Let+offices+work+together.;Consent-first+data+exchange.;Digitally+signed.+Instantly+verifiable.;A+more+transparent+public-service+experience." alt="PaperTrail animated tagline" />`{=html}
```{=html}
</p>
```
```{=html}
<p>
```
`<strong>`{=html}A federated digital public-services platform
template`</strong>`{=html}`<br/>`{=html} Connecting citizens, public
offices and document verifiers through consent-driven workflows.
```{=html}
</p>
```
```{=html}
<p>
```
`<img alt="Project status" src="https://img.shields.io/badge/status-prototype%20foundation-informational?style=for-the-badge" />`{=html}
`<img alt="Architecture" src="https://img.shields.io/badge/architecture-federated-2563EB?style=for-the-badge" />`{=html}
`<img alt="License" src="https://img.shields.io/badge/license-to%20be%20defined-lightgrey?style=for-the-badge" />`{=html}
```{=html}
</p>
```
```{=html}
<p>
```
`<a href="#-the-problem">`{=html}The problem`</a>`{=html} ·
`<a href="#-how-papertrail-works">`{=html}How it works`</a>`{=html} ·
`<a href="#-platform-modules">`{=html}Modules`</a>`{=html} ·
`<a href="#-architecture">`{=html}Architecture`</a>`{=html} ·
`<a href="#-getting-started">`{=html}Getting started`</a>`{=html}
```{=html}
</p>
```
:::

------------------------------------------------------------------------

> **The idea:** A citizen should not have to carry the same documents
> from office to office, repeatedly explain the same request, or remain
> uncertain about where an application is stuck. PaperTrail gives the
> process one digital entry point while each public office keeps control
> of its own records.

## 🌍 The problem

Administrative procedures can involve several offices, repeated document
submissions, physical visits, disconnected records and unclear
processing times. Even when one office already holds information another
office needs, citizens may still be asked to obtain and transport that
information themselves.

PaperTrail explores a different model:

**Apply once. Share information with permission. Coordinate the process.
Verify the result.**

The platform is designed to connect existing institutions---not replace
their legal authority or take ownership of their master records.

## ✨ What PaperTrail is

PaperTrail is a web-and-mobile public-services platform with a dedicated
office console and a public document-verification interface.

A citizen submits an application through one portal. PaperTrail
coordinates the required steps across participating offices, requests
information only under a valid consent or legal-basis authorization,
tracks progress, and supports the issuance of digitally signed
documents.

The result is a connected administrative journey with clearer status,
accountable access to information and documents that can be
independently verified.

### Core principles

  -----------------------------------------------------------------------
  Principle                           What it means
  ----------------------------------- -----------------------------------
  **Federated by design**             Each office remains the
                                      authoritative owner of its records.
                                      PaperTrail does not create a
                                      central master database of office
                                      records.

  **Consent before exchange**         Inter-office data requests must
                                      carry valid, purpose-bound
                                      authorization or an applicable
                                      legal-basis token.

  **Workflow, not paperwork**         Administrative procedures are
                                      modelled as trackable workflows,
                                      including parallel checks,
                                      deadlines and escalation.

  **Verifiable by default**           Issued documents carry a digital
                                      signature and QR-based verification
                                      route.

  **Accountability built in**         Accesses and decisions are recorded
                                      so citizens and authorized auditors
                                      can inspect activity.

  **Inclusive access**                Citizen journeys are designed for
                                      mobile devices, low bandwidth and
                                      assisted service counters.
  -----------------------------------------------------------------------

## 🔄 How PaperTrail works

The following illustrates the intended journey. Exact steps depend on
the service being requested.

``` mermaid
flowchart TD
    A["👤 Citizen selects a service"] --> B["📝 Completes one application"]
    B --> C["🔐 Reviews and grants consent"]
    C --> D["⚙️ Workflow instance is created"]
    D --> E["🏢 Relevant offices receive tasks"]
    E --> F["🔄 Authorized data is exchanged"]
    F --> G["✅ Offices review and approve"]
    G --> H["✍️ Issuing office signs the document"]
    H --> I["📲 Document appears in citizen wallet"]
    I --> J["🔎 Third party verifies using QR or reference"]
```

1.  **Start an application** --- The citizen chooses a service and sees
    its requirements, fees and expected duration.
2.  **Review information and consent** --- Available information can be
    requested from its owning office. The citizen reviews each requested
    data exchange and grants or refuses consent.
3.  **Coordinate offices** --- PaperTrail creates a workflow and assigns
    tasks to the responsible office roles. Independent checks can run in
    parallel.
4.  **Track progress** --- The citizen sees the application timeline,
    responsible office and status changes. Officers work from an office
    task inbox.
5.  **Issue a trusted document** --- Once approved, the issuing office
    generates and digitally signs the document.
6.  **Verify independently** --- A verifier scans the QR code or enters
    a reference to check authenticity and revocation status without
    needing a PaperTrail account.

## 🧩 Platform modules

PaperTrail is organized around six modules defined in its Software
Requirements Specification (SRS).

```{=html}
<details open>
```
```{=html}
<summary>
```
`<strong>`{=html}M1 · Citizen Portal and Document
Wallet`</strong>`{=html}
```{=html}
</summary>
```
The citizen's entry point for service discovery, applications and
verified documents.

-   Search and browse services by life event.
-   Complete applications, upload supporting files and save drafts.
-   Track each application through a status timeline.
-   Receive status notifications.
-   Keep issued documents in a personal wallet and share them through
    controlled links, QR codes or PDFs.
-   Support assisted-counter applications for citizens who need help.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}M2 · Workflow Engine`</strong>`{=html}
```{=html}
</summary>
```
Turns administrative procedures into configurable, executable workflows.

-   Model tasks, decisions, parallel branches, joins and automatic
    steps.
-   Assign work to office roles and manage task queues.
-   Enforce service-level deadlines, warnings and escalation.
-   Support approve, reject and request-information decisions.
-   Record workflow and task state changes.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}M3 · Consent and Inter-Office Data
Exchange`</strong>`{=html}
```{=html}
</summary>
```
The controlled exchange layer between participating offices.

-   Register office adapters and their available data capabilities.
-   Validate consent or legal-basis authorization before a request.
-   Route data requests through defined interfaces.
-   Publish events when relevant records or application states change.
-   Keep each office's master records under that office's control.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}M4 · Verifiable Documents and Trust`</strong>`{=html}
```{=html}
</summary>
```
Makes issued documents independently checkable.

-   Generate documents from office-approved templates.
-   Sign documents using the issuing office's Ed25519 key.
-   Attach a unique identifier, content hash, issuer and issue date.
-   Generate QR codes and provide a public verification page/API.
-   Support revocation while retaining the document's verification
    history.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}M5 · Appointments, Queues and
Payments`</strong>`{=html}
```{=html}
</summary>
```
Coordinates the physical visits and fees that a service genuinely
requires.

-   Offer appointments when a service requires physical presence.
-   Manage office queues and waiting status.
-   Collect one payment for an application.
-   Split settlement between participating offices according to the
    applicable fee schedule.
-   Support payment status and refund rules.

```{=html}
</details>
```
```{=html}
<details>
```
```{=html}
<summary>
```
`<strong>`{=html}M6 · Audit and Analytics`</strong>`{=html}
```{=html}
</summary>
```
Provides accountability and visibility into service performance.

-   Maintain an append-only, tamper-evident audit trail.
-   Let citizens see who accessed their data.
-   Let authorized auditors review activity and check audit integrity.
-   Report workflow durations, overdue tasks and process bottlenecks.
-   Provide operational visibility into service and adapter health.

```{=html}
</details>
```
## 🏛️ Reference services

The initial prototype is organized around three administrative journeys:

  -----------------------------------------------------------------------
  Service                             Example participating institutions
  ----------------------------------- -----------------------------------
  **Birth certificate**               Hospital, civil registry

  **Business registration**           Commerce registry, tax office,
                                      social insurance, council

  **Land title transfer**             Land registry, notary and other
                                      relevant authorities
  -----------------------------------------------------------------------

The prototype also includes simulated-office adapters as a planned
demonstration approach---for example, a hospital, civil registry,
commerce registry, tax office, land registry, notary and council. Each
simulated office is intended to keep its own database, allowing the
federated workflow to be demonstrated without requiring immediate
integration with production government systems.

## 🏗️ Architecture

PaperTrail follows a **federated, modular and event-driven
architecture**.

The platform coordinates services, permissions, workflows and trust. It
does not become the master database for every participating institution.
Office adapters expose approved capabilities through documented
contracts, while an office console provides a route for offices that do
not yet have a digital system.

``` mermaid
flowchart TB
    subgraph Clients["USER-FACING APPLICATIONS"]
      CIT["Citizen web app"]
      OFF["Office console"]
      VER["Public verification portal"]
      MOB["Future mobile app"]
    end

    GW["API Gateway"]

    subgraph Platform["PAPERTRAIL PLATFORM SERVICES"]
      ID["Identity & Consent"]
      WF["Workflow Engine"]
      EX["Inter-Office Exchange"]
      DOC["Document & Signing"]
      PAY["Appointments & Payments"]
      AUD["Audit & Analytics"]
      NOT["Notifications"]
      MQ[("Event Broker")]
    end

    subgraph Offices["FEDERATED OFFICE SYSTEMS"]
      H["Hospital"]
      CR["Civil Registry"]
      TR["Tax / Commerce Registry"]
      LR["Land Registry"]
      NT["Notary / Council"]
    end

    EXT["External providers<br/>Identity · SMS · Payments · Key Vault"]
    STORE[("Service databases<br/>and object storage")]

    CIT --> GW
    OFF --> GW
    VER --> GW
    MOB -. future .-> GW
    GW --> ID
    GW --> WF
    GW --> EX
    GW --> DOC
    GW --> PAY
    GW --> AUD
    ID <--> MQ
    WF <--> MQ
    EX <--> MQ
    DOC <--> MQ
    PAY <--> MQ
    AUD <--> MQ
    NOT <--> MQ
    EX <-->|Authorized requests / events| H
    EX <-->|Authorized requests / events| CR
    EX <-->|Authorized requests / events| TR
    EX <-->|Authorized requests / events| LR
    EX <-->|Authorized requests / events| NT
    Platform --> STORE
    ID <--> EXT
    DOC <--> EXT
    PAY <--> EXT
    NOT <--> EXT
```

### Architectural boundaries

-   **One database per service** --- Services own their operational data
    and communicate through APIs and events rather than sharing database
    tables.
-   **One database per simulated office** --- The prototype demonstrates
    that institutional records remain decentralized.
-   **Gateway-mediated access** --- User-facing clients reach platform
    services through the API gateway.
-   **Event-driven coordination** --- The broker supports asynchronous
    communication between services.
-   **Office integration boundary** --- The exchange service
    communicates with office adapters through documented interfaces.
-   **External trust and delivery providers** --- Identity, payment, SMS
    and key-management capabilities are integrated through explicit
    interfaces.

### Technology stack

The following is the repository's chosen implementation direction. Some
integrations and infrastructure are planned foundations, not claims that
every capability is already implemented.

  -------------------------------------------------------------------------
  Layer                   Technology                Intended role
  ----------------------- ------------------------- -----------------------
  Citizen and office      **React + Vite**          Component-based web
  interfaces                                        applications

  Backend services        **Node.js + Fastify**     Lightweight service
                                                    APIs and OpenAPI
                                                    contracts

  Service data            **PostgreSQL**            Isolated database per
                                                    service and simulated
                                                    office

  Event messaging         **RabbitMQ**              Durable asynchronous
                                                    workflows and event
                                                    delivery

  Local object storage    **MinIO**                 S3-compatible storage
                                                    for attachments and
                                                    generated documents

  Local orchestration     **Docker Compose**        Run the development
                                                    environment

  Deployment              **Kubernetes**            Portable deployment,
  orchestration                                     scaling, probes and
                                                    configuration

  API contracts           **REST + JSON / OpenAPI** Documented service and
                                                    adapter interfaces

  Observability direction **OpenTelemetry-ready**   Consistent health,
                                                    logs, metrics and
                                                    distributed tracing
  -------------------------------------------------------------------------

> **Architecture note:** The SRS specifies an event broker using AMQP or
> Redis Streams. This repository selects RabbitMQ as its implementation
> choice. The SRS also specifies S3-compatible object storage and a key
> vault/HSM boundary for signing keys.

## 🗂️ Repository structure

``` text
papertrail/
├── apps/
│   ├── citizen-web/          # Citizen portal and document wallet
│   ├── office-console/       # Office staff and administrator workspace
│   ├── verifier-web/         # Public document verification
│   └── mobile/               # Future React Native application
│
├── services/
│   ├── api-gateway/
│   ├── identity-consent/
│   ├── workflow/
│   ├── exchange/
│   ├── documents/
│   ├── appointments-payments/
│   ├── audit-analytics/
│   └── notifications/
│
├── adapters/
│   └── simulated-offices/   # Independent demo office systems
│
├── packages/                 # Shared contracts and utilities
├── infra/
│   ├── docker/               # Dockerfiles and Compose
│   └── kubernetes/           # Kubernetes manifests
├── docs/                     # Architecture, API, ADRs and runbooks
└── tests/                    # Integration, end-to-end, load and security tests
```

*The tree describes the intended repository organization. Directories
and services may be introduced incrementally as implementation
progresses.*

## 🚀 Getting started

### Prerequisites

-   Node.js 20 or later
-   npm
-   Docker Desktop or Docker Engine with Docker Compose
-   Git
-   `kubectl` (optional; for Kubernetes work)

### 1. Clone the repository

``` bash
git clone <YOUR_REPOSITORY_URL>
cd papertrail
```

### 2. Configure environment variables

``` bash
cp .env.example .env
```

Review `.env` and provide local development values where required. Do
not commit real credentials, private keys, tokens or production secrets.

### 3. Install dependencies

``` bash
npm install
```

### 4. Start the local environment

``` bash
docker compose -f infra/docker/compose.yaml up --build
```

To run services in the background:

``` bash
docker compose -f infra/docker/compose.yaml up --build -d
```

### 5. Check the services

  Component            Local address
  -------------------- --------------------------------
  API gateway health   `http://localhost:8080/health`
  Citizen web app      `http://localhost:3000`

The endpoints above reflect the current project setup described by the
repository. Other interfaces and services should be considered available
only when their implementations are present and running.

### Stop the environment

``` bash
docker compose -f infra/docker/compose.yaml down
```

To remove local Compose volumes as well (this deletes persisted
development data):

``` bash
docker compose -f infra/docker/compose.yaml down -v
```

## 🔐 Security, privacy and trust

PaperTrail handles identity information, administrative evidence and
official documents. Security is therefore a core architectural
requirement, not an optional enhancement.

The design calls for:

-   **Explicit authorization:** inter-office requests carry a valid,
    scoped consent token or applicable legal-basis token.
-   **Transport security:** HTTPS with TLS 1.2 or later; mutual TLS for
    office-to-office connections.
-   **Signed documents:** Ed25519 signatures, with signing keys held in
    a key vault or HSM boundary.
-   **Role-based access:** access is restricted according to user roles
    and responsibilities.
-   **Auditable actions:** access and decisions are recorded in an
    append-only audit trail.
-   **Safe integrations:** signed webhooks, idempotency keys and
    documented API contracts.
-   **Data minimization:** offices remain the authoritative owners of
    their records; verification checks should not require storing
    submitted document content.

**Important:** This repository is a development template/prototype
foundation. Do not use it to process real citizens' personal data or
issue legally relied-upon documents until security controls, legal
requirements, key management, operational procedures and integrations
have been independently reviewed and hardened.

## 🧪 Development priorities

The initial implementation roadmap is:

1.  Define domain models and OpenAPI contracts for each module.
2.  Add database migrations and persistence boundaries for every
    service.
3.  Implement authentication, role-based authorization and signed
    internal-service credentials.
4.  Connect RabbitMQ publishers, consumers, retries and failure
    handling.
5.  Enforce consent/legal-basis validation before every cross-office
    data exchange.
6.  Emit audit events for access, consent, workflow decisions and
    document lifecycle actions.
7.  Implement document generation, Ed25519 signing, QR verification and
    revocation.
8.  Integrate simulated offices and demonstrate the three reference
    services end to end.
9.  Add automated integration, end-to-end, load and security tests.
10. Prepare deployment, observability, key rotation and operational
    runbooks.

## 🧭 Project scope and boundaries

### Included in the prototype direction

-   Six platform modules.
-   Citizen portal, office console and public verification interface.
-   Birth certificate, business registration and land title transfer
    reference workflows.
-   Simulated participating offices with independent databases.
-   Office adapter approach for future institutional integrations.

### Explicitly outside the platform's role

-   Replacing the legal authority or internal systems of public offices.
-   Changing the laws governing administrative services.
-   Operating a national identity system.
-   Becoming the central master repository for institutional records.

Real-world deployment depends on participating institutions, applicable
data-protection law, legal recognition of digital signatures, identity
services and payment/SMS provider availability.

## 🤝 Contributing

Contributions, architectural discussions and constructive feedback are
welcome.

1.  Open an issue describing the problem or proposed improvement.
2.  For significant architectural changes, document the decision and
    trade-offs.
3.  Keep service boundaries and API contracts explicit.
4.  Add or update tests when behavior changes.
5.  Never commit secrets, real citizen records or private signing keys.

A contribution guide and issue templates can be added as the project
matures.

## 📚 Documentation

-   **Software Requirements Specification:** the source of the
    platform's functional, non-functional, interface and data
    requirements.
-   `docs/architecture/` --- system architecture and design decisions.
-   `docs/api/` --- API contracts and integration references.
-   `docs/runbooks/` --- local development and operational procedures.
-   `docs/adr/` --- Architecture Decision Records.

Documentation paths are intended locations and may be populated as the
corresponding material is added.

## 📌 Project status

PaperTrail is being developed incrementally from its SRS and the initial
repository foundation. The architecture and technology direction are
defined, but the presence of a folder, planned module or documented
capability does not mean that feature is production-ready or fully
implemented.

Track implementation progress through the repository's issues and
project board.

------------------------------------------------------------------------

::: {align="center"}
### Less paperwork between people and the services they need.

**PaperTrail --- Apply once. Stay informed. Verify with confidence.**

`<sub>`{=html}Built as a modular foundation for connected, accountable
public services.`</sub>`{=html}
:::
