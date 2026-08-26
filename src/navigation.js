import { router } from "./router.js";

// Bloque 1: Cambiar URL y renderizar vista
export function navigateTo(path) {
  history.pushState(null, "", path);
  router();
}

// Bloque 2: Interceptar clicks en enlaces internos
export function setupLinkInterception() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a"); // buscar <a> más cercano
    if (!link) return;

    const href = link.getAttribute("href"); // obtener href
    if (!href) return;

    // Bloque 3: Filtros para respetar intención del usuario
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; // click con modificadores
    if (link.target === "_blank") return; // abrir en nueva pestaña
    if (link.origin !== window.location.origin) return; // link externo
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return; // protocolos especiales

    // Bloque 4: Interceptar y navegar dentro de la SPA
    event.preventDefault();
    navigateTo(href);
  });
}