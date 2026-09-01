import { initRouter } from "./ui/routerInit.js";
import { initThemeToggle } from "./ui/themeToggle.js";

document.addEventListener("DOMContentLoaded", () => {
  initRouter(); // el router se encarga de renderizar vistas y enganchar initChat
  initThemeToggle();
});