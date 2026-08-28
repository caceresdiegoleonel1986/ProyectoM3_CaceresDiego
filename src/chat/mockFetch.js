// Simulador de fetch para pruebas locales
export async function mockFetch(payload) {
  console.log("Payload enviado a Gemini:", payload);

  // Simular error de rate limit si el mensaje contiene "429"
  if (payload.messages.some(m => m.content.includes("429"))) {
    return {
      status: 429,
      retryAfterSeconds: 5,
      error: {
        type: "rate_limit_error",
        message: "Rate limit exceeded"
      }
    };
  }

  // Simular respuesta exitosa
  return {
    status: 200,
    content: [
      { type: "text", text: "¡D'oh! Soy Homero Simpson 🍩\nMe gustan las donas.\nWoohoo!" }
    ],
    usage: {
      input_tokens: 120,
      output_tokens: 40
    },
    stop_reason: "end_turn"
  };
}