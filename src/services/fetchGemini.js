// Responsable de traer datos de la red (fetch a la serverless function)

import { fetchJson } from "./fetchJson.js";

const MAX_RETRIES = 2;
const DEFAULT_RETRY_AFTER_SECONDS = 5;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Espera countdown segundos, notificando cada tick vía onRetry (para un contador visual en la UI)
async function waitWithCountdown(seconds, attempt, onRetry) {
  for (let remaining = seconds; remaining > 0; remaining--) {
    if (typeof onRetry === "function") onRetry({ attempt, remaining });
    await sleep(1000);
  }
}

export async function fetchGemini(messages, character, config = {}) {
  const { onRetry, ...restConfig } = config;

  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
    try {
      return await fetchJson("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          character,
          systemPrompt: restConfig.systemPrompt,
          generationConfig: restConfig.generationConfig,
        }),
      });
    } catch (error) {
      const isRateLimited = error.status === 429;
      const canRetry = isRateLimited && attempt <= MAX_RETRIES;

      if (!canRetry) throw error;

      const waitSeconds = error.body?.retryAfterSeconds ?? DEFAULT_RETRY_AFTER_SECONDS;
      await waitWithCountdown(waitSeconds, attempt, onRetry);
    }
  }
}