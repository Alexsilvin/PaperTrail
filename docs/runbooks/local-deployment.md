# Local Deployment Runbook

## Start

```powershell
docker compose -f infra/docker/compose.yaml up --build
```

## Verify

```powershell
curl.exe http://localhost:8080/health
curl.exe http://localhost:8080/v1/catalog
curl.exe -I http://localhost:3000
```

## Stop

```powershell
docker compose -f infra/docker/compose.yaml down
```

## Remove local data

```powershell
docker compose -f infra/docker/compose.yaml down -v
```

Use the volume removal command only in disposable development environments.
