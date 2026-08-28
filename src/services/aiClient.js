import { HOMERO_PROMPT, GOKU_PROMPT, WOODY_PROMPT } from "./prompts.js";
import { buildPayload, normalizeAIResponse, getTrimmedHistory } from "../transform/chatPayload.js";
import { fetchJson } from "./fetchJson.js";

const CHAT_ENDPOINT = "/api/chat";

// Función principal: obtiene la respuesta de un personaje según los mensajes de UI
export async function getCharacterReply(uiMessages, character = "homero") {
  // 1. Recortar historial para controlar tokens y no enviar demasiado contexto
  const trimmed = getTrimmedHistory(uiMessages);

  // 2. Obtener el prompt dinámico según el personaje elegido en la UI
  let systemPrompt;
  switch (character.toLowerCase()) {
    case "homero": systemPrompt = HOMERO_PROMPT; break;
    case "goku": systemPrompt = GOKU_PROMPT; break;
    case "woody": systemPrompt = WOODY_PROMPT; break;
    default: systemPrompt = HOMERO_PROMPT; // fallback
  }

  // 3. Construir el payload con el formato que espera Gemini
  const payload = buildPayload({
    systemPrompt,
    uiMessages: trimmed,
  });

  // 4. Llamar al endpoint /api/chat con el payload
  let rawResponse;
  try {
    rawResponse = await fetchJson(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // Manejo de error específico: si es 429 (rate limit), propagar retryAfterSeconds
    if (err.status === 429 && err.body?.retryAfterSeconds) {
      err.retryAfterSeconds = err.body.retryAfterSeconds;
    }
    throw err;
  }

  // 5. Normalizar la respuesta cruda a un string limpio para la UI
  const text = normalizeAIResponse(rawResponse);

  // 6. Loguear tokens en consola (solo debug, útil para ver consumo de contexto)
  const usage = rawResponse?.usageMetadata;
  if (usage) {
    console.log(`[Tokens] input: ${usage.promptTokenCount}, output: ${usage.candidatesTokenCount}`);
  }

  // Devolver el texto final para mostrar en la UI
  return text;
}