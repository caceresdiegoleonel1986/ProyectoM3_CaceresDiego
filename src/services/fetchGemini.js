// Responsable de traer datos de la red (fetch a la serverless function)

import { fetchJson } from "./fetchJson.js";

export async function fetchGemini(messages, character) {
  console.log(`[fetchGemini] Enviando ${messages.length} mensajes, personaje: ${character}`);
  console.log(`[fetchGemini] Mensajes:`, messages);
  
  // Llama a la serverless function en /api/chat
  return await fetchJson("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, character }), // payload con mensajes y personaje
  }).then(response => {
    console.log(`[fetchGemini] Respuesta completa:`, response);
    console.log(`[fetchGemini] Respuesta keys:`, Object.keys(response));
    
    // Buscar metadata en diferentes ubicaciones
    const metadata = response?.usageMetadata || response?.usage || response?.metrics;
    console.log(`[fetchGemini] Metadata encontrada:`, metadata);
    
    if (metadata) {
      const inputTokens = metadata.promptTokenCount || metadata.input_tokens || 0;
      const outputTokens = metadata.candidatesTokenCount || metadata.output_tokens || 0;
      console.log(`[Tokens] Input: ${inputTokens} | Output: ${outputTokens} (máximo: 40)`);
    } else {
      console.log(`[fetchGemini] ⚠️ No hay metadata en la respuesta`);
    }
    
    return response;
  }).catch(err => {
    console.error(`[fetchGemini] Error:`, err);
    throw err;
  });
}