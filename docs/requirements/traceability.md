# Initial SRS Traceability

| Requirement theme | Template location | Initial implementation state |
|---|---|---|
| Citizen registration, wallet, profile | `services/citizen-portal`, `apps/citizen-web` | Placeholder |
| Workflow and service requests | `services/workflow` | Placeholder |
| Consent and exchange | `services/exchange` | Placeholder |
| Office adapters | `adapters/simulated-offices/*` | README scaffolds |
| Verifiable documents | `services/document-trust`, `apps/verifier-web` | Placeholder |
| Appointments, queues, payments | `services/appointments-payments` | Placeholder |
| Audit and analytics | `services/audit-analytics` | Placeholder |
| Notifications | `services/notification` | Placeholder |
| API gateway and identity | `services/api-gateway`, `services/identity-consent` | Gateway health and catalog |
| Container deployment | `infra/docker`, Dockerfiles | Gateway and web Compose targets |
| Kubernetes deployment | `infra/kubernetes` | Base namespace, gateway, ingress, HPA |
| Object storage | Compose MinIO | Local dependency |
| Event delivery | Compose RabbitMQ | Local dependency |
| Database isolation | Architecture and future migration layout | Convention documented |
