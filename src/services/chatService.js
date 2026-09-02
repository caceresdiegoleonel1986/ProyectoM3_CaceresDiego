import { fetchGemini } from "./fetchGemini.js";
import { getCharacterConfig } from "../config/characters.js";

export async function sendChatMessage({ messages, character = "homero", config = {} }) {
  // Obtener config del personaje si no se proporciona
  if (!config.systemPrompt) {
    const charConfig = getCharacterConfig(character);
    config.systemPrompt = charConfig.prompt;
    config.generationConfig = config.generationConfig || {
      maxOutputTokens: 120,
      temperature: 0.7,
    };
  }
  
  const raw = await fetchGemini(messages, character, config);

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
