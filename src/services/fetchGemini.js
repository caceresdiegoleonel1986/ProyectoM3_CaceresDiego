// Responsable de traer datos de la red (fetch a la serverless function)

import { fetchJson } from "./fetchJson.js";

export async function fetchGemini(messages, character, config = {}) {
  console.log(`[fetchGemini] Enviando ${messages.length} mensajes, personaje: ${character}`);
  console.log(`[fetchGemini] Mensajes:`, messages);
  
  // Llama a la serverless function en /api/chat
  return await fetchJson("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      messages, 
      character,
      systemPrompt: config.systemPrompt,
      generationConfig: config.generationConfig
    }),
  }).then(response => {
    console.log(`[fetchGemini] Reply: ${response?.reply?.length || 0} caracteres`);
    return response;
  }).catch(err => {
    console.error(`[fetchGemini] Error:`, err);
    throw err;
  });
}