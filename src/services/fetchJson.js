// Función genérica para cualquier endpoint que devuelva JSON
// Maneja errores HTTP y devuelve el JSON parseado

export async function fetchJson(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const err = new Error(`HTTP ${response.status}: ${response.statusText}`);
      err.status = response.status;
      throw err;
    }

    return await response.json();
  } catch (error) {
    if (error.status) throw error;

    const networkError = new Error("No se pudo conectar con el servidor");
    networkError.cause = error;
    throw networkError;
  }
}