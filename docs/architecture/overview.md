# PaperTrail Architecture

## Context

PaperTrail is a federated public-services platform. Citizens interact through the portal, staff interact through an office console, and verifiers validate credentials or documents. Office records remain authoritative inside simulated office systems.

## Architectural style

Use independent deployable bounded contexts behind an API gateway. Each service owns:

- one database
- REST/OpenAPI contracts
- domain validation
- an event contract
- audit metadata
- health/readiness endpoints

The gateway is an ingress and policy point, not a monolithic business layer. The exchange service is the only standard path for cross-office data access and must verify consent before adapter dispatch.

## Module mapping

| SRS area | Component |
|---|---|
| M1 Citizen Portal and Wallet | `services/citizen-portal`, `apps/citizen-web` |
| M2 Workflow Engine | `services/workflow` |
| M3 Consent and Exchange | `services/exchange`, `adapters/simulated-offices/*` |
| M4 Documents and Trust | `services/document-trust`, `apps/verifier-web` |
| M5 Appointments and Payments | `services/appointments-payments` |
| M6 Audit and Analytics | `services/audit-analytics` |

## Cross-cutting requirements

- Every mutating request carries a request ID and authenticated subject.
- Audit events are append-only and include actor, subject, action, outcome, timestamp, request ID, and office scope.
- Exchange requests require purpose, consent grant, expiry, and scoped fields.
- PostgreSQL databases are isolated by service.
- RabbitMQ handles asynchronous events; no service directly calls another service database.
- Object storage holds document bytes; metadata and signatures remain with document-trust.
- JWT validation and authorization are initially centralized at the gateway/identity boundary, but service-level authorization should be enforced as well.
