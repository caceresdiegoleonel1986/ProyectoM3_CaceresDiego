const MODEL_NAME = "gemini-flash-lite-latest";
const MAX_OUTPUT_TOKENS = 120;
const TEMPERATURE = 0.7;
const MAX_TURNS_HISTORY = 8;

// Convierte mensajes de UI al formato de Gemini
export function toApiMessages(uiMessages) {
  return uiMessages.map((msg) => ({
    role: msg.role === "character" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));
}

// Construye el payload para Gemini
export function buildPayload({ systemPrompt, uiMessages }) {
  const payload = {
    model: MODEL_NAME,
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: toApiMessages(uiMessages),
    generationConfig: {
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      temperature: TEMPERATURE,
    },
  };

  // Debug: mostrar estructura de mensajes
  console.log(`[Payload] Enviando ${uiMessages.length} mensajes | maxTokens: ${MAX_OUTPUT_TOKENS}`);
  
  return payload;
}

// Normaliza la respuesta cruda a texto limpio
export function normalizeAIResponse(raw) {
  const parts = raw?.candidates?.[0]?.content?.parts ?? [];
  return parts
    .filter((p) => typeof p.text === "string")
    .map((p) => p.text)
    .join("")
    .trim();
}

export function getTrimmedHistory(messages, maxTurns = MAX_TURNS_HISTORY) {
  return messages.slice(-maxTurns);
}