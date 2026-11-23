# ADR-001: Technology Stack

## Status

Accepted template decision.

## React for the web

React was selected because the requirements describe browser-based citizen, office, and verification interfaces. It provides mature component patterns, reusable design systems, strong ecosystem support, and a clear future extension point for React Native.

## Fastify on Node.js

Fastify was selected over a broader framework for most small services because it starts quickly, has low container overhead, first-class JSON Schema/OpenAPI support, and a practical JavaScript ecosystem. NestJS could replace Fastify if a team requires dependency injection and standardized module conventions at a larger scale.

## PostgreSQL

PostgreSQL is suitable for transactional records, state machines, consent grants, and reporting. A separate database for every business service prevents hidden shared-schema coupling.

## RabbitMQ

RabbitMQ is selected for the template because durable queues, acknowledgments, dead-letter handling, and management tooling are easy to demonstrate locally. Redis Streams or Kafka can be evaluated later for throughput and replay requirements.

## Docker and Kubernetes

Docker provides repeatable local builds and dependency isolation. Kubernetes manifests provide orchestration-independent deployment concepts: probes, ingress, configuration, secrets placeholders, storage, and autoscaling. Helm or an external secret manager should be introduced for real environments.
