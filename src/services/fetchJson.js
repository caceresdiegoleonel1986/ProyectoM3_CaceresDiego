// Función genérica para cualquier endpoint que devuelva JSON
// Maneja errores HTTP y devuelve el JSON parseado

export async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const err = new Error(`HTTP ${response.status}: ${response.statusText}`);
    err.status = response.status;
    throw err;
  }

  return await response.json(); // devuelve el JSON ya parseado
}