import { describe, it, expect } from "vitest";
import { buildPayload } from "../src/transform/chatPayload.js";

describe("chat payload token budget", () => {
  it("limita la salida del modelo para respuestas breves", () => {
    const payload = buildPayload({
      systemPrompt: "Sos un personaje breve.",
      uiMessages: [{ role: "user", text: "Hola" }],
    });

    expect(payload.generationConfig.maxOutputTokens).toBeLessThanOrEqual(90);
  });
});
