import Home from "./views/home.js";
import Chat, { initChat } from "./views/chat.js";
import About from "./views/about.js";
import NotFound from "./views/notFound.js";
import { setStatus } from "./ui/status.js";
import { getSelectedCharacter } from "./ui/characterChoice.js";
import { addMessage, clearMessages, loadMessages, getMessages, saveMessages } from "./ui/chatUI.js";

const routes = {
  "/": Home,
  "/home": Home,
  "/chat": Chat,
  "/about": About,
};

export function router() {
  const path = window.location.pathname;

  if (
    path.startsWith("/img") ||
    path.startsWith("/styles") ||
    path.startsWith("/favicon") ||
    path.includes(".")
  ) {
    return path;
  }

  const view = routes[path] || NotFound;
  document.getElementById("app").innerHTML = view();

  if (path === "/chat") {
    setStatus("idle", "¡Hola! Empezá la conversación cuando quieras 👋");

    requestAnimationFrame(() => {
      initChat();

      const charKey = getSelectedCharacter() || "homero";
      if (charKey) {
        const characters = {
          homero: "Homero Simpson",
          goku: "Goku",
          woody: "Woody"
        };

        // cargar historial guardado del personaje
        loadMessages(charKey);

        // si no hay historial, mostrar saludo inicial
        if (getMessages().length === 0) {
          addMessage("character", `¡Hola! Soy ${characters[charKey]}, ¿qué querés saber?`, charKey);
          saveMessages(charKey);
        }
      }
    });
  }

  // Actualizar estado activo del nav
  const navLinks = document.querySelectorAll(".mainNav__link");
  navLinks.forEach(link => {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  return path;
}