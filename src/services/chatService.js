import { fetchGemini } from "./fetchGemini.js";

export async function sendChatMessage({ messages, character = "homero" }) {
  console.log(`[sendChatMessage] Iniciando con ${messages.length} mensajes, personaje: ${character}`);
  
  const raw = await fetchGemini(messages, character);

  if (raw?.reply) {
    return raw.reply;
  }

  if (raw?.candidates?.[0]?.content?.parts?.length) {
    const text = raw.candidates[0].content.parts
      .filter((part) => typeof part.text === "string")
      .map((part) => part.text)
      .join("")
      .trim();

    if (text) return text;
  }

  return "No se pudo generar respuesta.";
}
