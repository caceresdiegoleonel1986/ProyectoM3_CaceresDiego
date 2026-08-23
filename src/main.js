// Punto de entrada de la SPA
// Se encarga de inicializar el router y manejar los eventos de navegación

import { router } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  // Render inicial
  router();

  // Intercepta clicks en links con data-link para usar History API
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(null, "", e.target.href);
      router();
    }
  });
});

// Maneja el evento popstate (back/forward del navegador)
window.addEventListener("popstate", router);