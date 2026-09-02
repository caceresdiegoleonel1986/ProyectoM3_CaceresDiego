// Responsable de traer datos de la red (fetch a la serverless function)

import { fetchJson } from "./fetchJson.js";

export async function fetchGemini(messages, character, config = {}) {
  try {
    return await fetchJson("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        character,
        systemPrompt: config.systemPrompt,
        generationConfig: config.generationConfig,
      }),
    });
  } catch (error) {
    throw error;
  }
}