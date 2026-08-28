// Función que traduce errores técnicos en mensajes claros para el usuario
export function getUserMessage(error) {
  // Caso: recurso no encontrado
  if (error?.status === 404) {
    return "El recurso que buscas no existe.";
  }

  // Caso: demasiadas solicitudes (rate limit)
  if (error?.status === 429) {
    return "La IA está saturada. Intenta de nuevo en un minuto.";
  }

  // Caso: error interno del servidor (5xx)
  if (error?.status >= 500) {
    return "La API está teniendo problemas. Intenta en unos minutos.";
  }

  // Caso: error de conexión (fetch fallido)
  if (error?.name === "TypeError" && error.message.includes("fetch")) {
    return "No pudimos conectar con la API. Revisa tu conexión.";
  }

  // Caso genérico: cualquier otro error
  return "Algo salió mal. Intenta de nuevo.";
}