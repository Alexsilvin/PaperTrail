# Development Setup

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer
- Docker Desktop or Docker Engine
- Optional: kubectl and a local Kubernetes cluster

## Install

```powershell
copy .env.example .env
npm install
docker compose -f infra/docker/compose.yaml up --build
```

## Local endpoints

- Citizen web: `http://localhost:3000`
- API gateway health: `http://localhost:8080/health`
- RabbitMQ management: `http://localhost:15672`
- MinIO console: `http://localhost:9001`
- PostgreSQL: `localhost:5432`

RabbitMQ and MinIO credentials come from `.env`.

## Kubernetes preview

```powershell
kubectl apply -k infra/kubernetes/overlays/dev
kubectl get all -n papertrail
```

Do not apply `secrets.example.yaml` as production configuration. Create secrets through the target environment's secret-management process.
