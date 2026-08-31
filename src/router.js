// Router básico con History API

import Home from "./views/home.js";
import Chat, { initChat } from "./views/chat.js";
import About from "./views/about.js";
import NotFound from "./views/notFound.js";
import { setStatus } from "./ui/status.js";
import { getSelectedCharacter } from "./ui/characterChoice.js"; // 👈 importar el seleccionado
import { addMessage, clearMessages } from "./ui/chatUI.js";

const routes = {
  "/": Home,
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
    return;
  }

  const view = routes[path] || NotFound;
  document.getElementById("app").innerHTML = view();

  // Estado inicial en chat
  if (path === "/chat") {
    setStatus("idle", "¡Hola! Empezá la conversación cuando quieras 👋");
    initChat();
    clearMessages();

    // 👇 Mostrar mensaje de bienvenida del personaje elegido
    const charKey = getSelectedCharacter();
    if (charKey) {
      const characters = {
        homero: "Homero Simpson",
        goku: "Goku",
        woody: "Woody"
      };
      const name = characters[charKey];
      if (name) {
        addMessage("character", `¡Hola! Soy ${name}, ¿qué querés saber?`, charKey);
      }
    }
  }
}