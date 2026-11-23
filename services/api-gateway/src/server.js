import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";

const port = Number(process.env.PORT || 8080);
const app = Fastify({ logger: true });

await app.register(cors, { origin: process.env.CORS_ORIGIN || "http://localhost:3000" });
await app.register(helmet);

app.get("/health", async () => ({ status: "ok", service: "api-gateway" }));
app.get("/ready", async () => ({ status: "ready", dependencies: ["not-implemented"] }));
app.get("/v1/catalog", async () => ({
  modules: [
    "citizen-portal", "workflow", "consent-exchange", "document-trust",
    "appointments-payments", "audit-analytics"
  ]
}));

await app.listen({ port, host: "0.0.0.0" });
