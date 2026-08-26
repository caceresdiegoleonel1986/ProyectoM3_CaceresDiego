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
});