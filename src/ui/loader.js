// Muestra un indicador animado de "escribiendo..."
export function showLoader() {
  const container = document.getElementById("messages");
  if (!container) return;

  // Crear un div con clase "loader" y texto
  const loader = document.createElement("div");
  loader.className = "loader";
  loader.textContent = "Escribiendo...";
  container.appendChild(loader);
}

// Oculta el indicador de "escribiendo..." si existe
export function hideLoader() {
  const container = document.getElementById("messages");
  if (!container) return;

  // Buscar el div con clase "loader" y eliminarlo
  const loader = container.querySelector(".loader");
  if (loader) loader.remove();
}