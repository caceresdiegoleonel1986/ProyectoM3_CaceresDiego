// Convierte el JSON crudo de Gemini en un perfil apto para la UI
// Extrae el texto y arma un objeto con nombre y respuesta
// NOTA: utilidad no conectada al flujo actual (chatService.js normaliza la respuesta por su cuenta);
// se conserva y se cubre con test como pieza reutilizable para un futuro perfil de personaje en la UI.
export function toCharacterProfile(raw) {
  return {
    name: raw?.character ?? "Desconocido",
    reply: raw?.reply || raw?.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta",
  };
}