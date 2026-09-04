// Prueba E2E contra el entorno de despliegue real (Vercel).
// No se ejecuta en `npm test` por defecto: requiere RUN_E2E=true para evitar
// consumir cuota real de la API de Gemini en cada corrida de la suite local/CI.
//
// Uso:
//   RUN_E2E=true npx vitest run tests/e2e/deployment.e2e.test.js
//   (opcional) E2E_BASE_URL=https://otra-url.vercel.app para apuntar a otro deploy
import { describe, it, expect } from "vitest";

const BASE_URL = process.env.E2E_BASE_URL || "https://project-root-weld.vercel.app";
const runE2E = process.env.RUN_E2E === "true";

describe.skipIf(!runE2E)("E2E - despliegue real en Vercel", () => {
  it("el frontend responde con la SPA en la raíz", async () => {
    const res = await fetch(BASE_URL);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain("<div id=\"app\">");
  });

  it("POST /api/chat responde con una respuesta generada por la IA", async () => {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hola, ¿quién sos?" }],
        character: "homero",
      }),
    });

    expect([200, 429]).toContain(res.status);
    const body = await res.json();

    if (res.status === 200) {
      expect(typeof body.reply).toBe("string");
      expect(body.reply.length).toBeGreaterThan(0);
    } else {
      // Si la API real está rate-limiteada, validamos que el contrato del error se mantenga
      expect(body).toHaveProperty("retryAfterSeconds");
    }
  });

  it("POST /api/chat rechaza payloads inválidos con 400", async () => {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [] }),
    });

    expect(res.status).toBe(400);
  });
});
