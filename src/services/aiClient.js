import { HOMERO_PROMPT, GOKU_PROMPT, WOODY_PROMPT } from "./prompts.js";
import { buildPayload, normalizeAIResponse, getTrimmedHistory } from "../transform/chatPayload.js";
import { fetchJson } from "./fetchJson.js";

const CHAT_ENDPOINT = "/api/chat";

// Selección dinámica de prompt según personaje
function getPrompt(character) {
  switch (character.toLowerCase()) {
    case "homero": return HOMERO_PROMPT;
    case "goku": return GOKU_PROMPT;
    case "woody": return WOODY_PROMPT;
    default: return HOMERO_PROMPT; // fallback por defecto
  }
}

// Función principal: obtiene la respuesta de un personaje según los mensajes de UI
export async function getCharacterReply(uiMessages, character = "homero") {
  // 1. Recortar historial para controlar tokens y no enviar demasiado contexto
  const trimmed = getTrimmedHistory(uiMessages);

  // 2. Obtener el prompt dinámico según el personaje elegido en la UI
  const systemPrompt = getPrompt(character);
  
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
    console.log(`[Tokens AI] 📊 Input: ${usage.promptTokenCount} | Output: ${usage.candidatesTokenCount} (límite: 40 máx)`);
  } else {
    console.log(`[Tokens AI] ⚠️  Sin metadata de tokens en la respuesta`);
  }

  // Devolver el texto final para mostrar en la UI
  return text;
}