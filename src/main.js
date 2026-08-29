// Punto de entrada de la SPA
// Inicializa el router y configura la navegación interna

import { router } from "./router.js";
import { setupLinkInterception } from "./navigation.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Render inicial
  router();

  // 2. Interceptar clicks en links internos
  setupLinkInterception();

  // 3. Manejar back/forward del navegador
  window.addEventListener("popstate", router);

  // 4. Toggle dark/light mode
  const toggleBtn = document.getElementById("toggle-dark");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      document.body.classList.toggle("light");
    });
  }
});