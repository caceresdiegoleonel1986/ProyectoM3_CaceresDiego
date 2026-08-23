// Router básico usando History API
// Renderiza vistas dinámicamente según la ruta actual

import Home from "./views/home.js";
import Chat from "./views/chat.js";
import About from "./views/about.js";

export function router() {
  const routes = {
    "/home": Home,
    "/chat": Chat,
    "/about": About,
  };

  const path = window.location.pathname;
  const view = routes[path] || Home;

  document.getElementById("app").innerHTML = view();
}