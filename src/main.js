import { initRouter } from "./ui/routerInit.js";
import { initThemeToggle } from "./ui/themeToggle.js";
import Chat, { initChat } from "./views/chat.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  initRouter((route) => {
    if (route === "/chat") {
      app.innerHTML = Chat();
      initChat(); // ahora sí existen #send-btn y #chat-input
    }
  });

  initThemeToggle();
});