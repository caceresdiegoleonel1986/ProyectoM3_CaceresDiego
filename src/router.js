// Router básico con History API

import Home from "./views/home.js";
import Chat from "./views/chat.js";
import About from "./views/about.js";
import NotFound from "./views/notFound.js";
import { setStatus } from "./ui/status.js";

const routes = {
  "/home": Home,
  "/chat": Chat,
  "/about": About,
};

export function router() {
  const path = window.location.pathname;

  // No interceptar recursos estáticos
  if (
    path.startsWith("/img") ||
    path.startsWith("/styles") ||
    path.startsWith("/favicon") ||
    path.includes(".")
  ) {
    return; // dejar que el servidor entregue el archivo
  }

  const view = routes[path] || NotFound;
  document.getElementById("app").innerHTML = view();

  // Estado inicial en chat
  if (path === "/chat") {
    setStatus("idle", "¡Hola! Empezá la conversación cuando quieras 👋");
  }
}