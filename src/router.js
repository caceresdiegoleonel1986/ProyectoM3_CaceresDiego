import Home from "./views/home.js";
import Chat, { initChat, syncClearHistoryButton } from "./views/chat.js";
import About from "./views/about.js";
import NotFound from "./views/notFound.js";
import { setStatus } from "./ui/status.js";
import { getSelectedCharacter } from "./ui/characterChoice.js";
import { addMessage, getMessages, loadMessages, getWelcomeMessage } from "./ui/chatUI.js";
import { getCharacterConfig } from "./config/characters.js";

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
    setStatus("idle", "");

    requestAnimationFrame(() => {
      const charKey = getSelectedCharacter() || "homero";
      const config = getCharacterConfig(charKey);

      initChat();
      loadMessages(charKey);
      syncClearHistoryButton();

      if (getMessages().length === 0) {
        addMessage("character", config.greeting, charKey);
      } else {
        syncClearHistoryButton();
      }
    });
  }

  const navLinks = document.querySelectorAll(".mainNav__link");
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  return path;
}