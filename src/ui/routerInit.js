import { router } from "../router.js";
import { setupLinkInterception } from "../navigation.js";

export function initRouter() {
  // Render inicial
  router();

  // Interceptar clicks en links internos
  setupLinkInterception();

  // Manejar back/forward del navegador
  window.addEventListener("popstate", router);
}