export function initThemeToggle() {
  const toggleBtn = document.getElementById("toggle-dark");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");

    // Cambiar ícono según el modo activo
    if (document.body.classList.contains("dark")) {
      toggleBtn.textContent = "☀️"; // modo oscuro → mostrar sol
    } else {
      toggleBtn.textContent = "🌙"; // modo claro → mostrar luna
    }
  });

  // Estado inicial al cargar la página
  if (document.body.classList.contains("dark")) {
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }
}