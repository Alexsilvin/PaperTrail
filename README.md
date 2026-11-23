# PaperTrail

PaperTrail is a federated digital public-services platform template derived from the supplied Software Requirements Specification. It is intentionally a modular starting point, not a complete implementation.

## Technology choices

- **React + Vite**: the website UI is component-based, typed as needed, fast to build, and suitable for a public portal.
- **Node.js + Fastify**: JavaScript across the stack; Fastify is lightweight, performs well in containers, and supports OpenAPI and JSON Schema.
- **PostgreSQL**: each bounded context has an isolated database, matching the SRS and avoiding accidental cross-service coupling.
- **RabbitMQ**: asynchronous workflows and event delivery with durable queues and clear routing.
- **Docker Compose**: one-command local dependency and service orchestration.
- **Kubernetes**: portable deployments, probes, scaling, ingress, and secrets/configuration separation.
- **MinIO**: S3-compatible object storage for local document and evidence files.
- **OpenTelemetry-ready endpoints**: health, logs, metrics, and tracing can be added consistently to every service.

## Main structure

- `apps/citizen-web`: citizen-facing React website
- `apps/office-console`: office employee interface
- `apps/verifier-web`: public verification interface
- `apps/mobile`: future React Native shell
- `services/`: gateway and business/platform services
- `adapters/simulated-offices/`: independent demonstration office systems
- `packages/`: shared contracts and utilities
- `infra/docker/`: container image and Compose assets
- `infra/kubernetes/`: base and environment manifests
- `docs/`: architecture, API, ADRs, setup, runbooks, and requirements
- `tests/`: end-to-end, load, and security test placeholders

## Quick start

Prerequisites: Node.js 20+, Docker Desktop or Docker Engine, and optionally kubectl.

```powershell
npm install
copy .env.example .env
docker compose -f infra/docker/compose.yaml up --build
```

The gateway is available at `http://localhost:8080/health`; the citizen web app is available at `http://localhost:3000`.

## First implementation priorities

1. Replace placeholder routes with module domain models and OpenAPI contracts.
2. Add migrations for each service database.
3. Implement service authentication and signed internal-service credentials.
4. Connect RabbitMQ publishers and consumers.
5. Implement consent checks and audit event emission before cross-office exchange.
6. Add document signing and key rotation using a production KMS/Vault integration.
