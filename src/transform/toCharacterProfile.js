// Convierte el JSON crudo de Gemini en un perfil apto para la UI
// Extrae el texto y arma un objeto con nombre y respuesta

export function toCharacterProfile(raw) {
  return {
    name: raw?.character ?? "Desconocido",
    reply: raw?.reply || raw?.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta",
  };
}