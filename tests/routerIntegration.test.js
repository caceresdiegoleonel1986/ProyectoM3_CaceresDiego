import { describe, it, expect, beforeEach } from "vitest";
import { router } from "../src/router.js";

describe("Integración Router", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="app"></div>`;
  });

  it("renderiza la vista Home en /home", () => {
    window.history.pushState({}, "", "/home"); // simula la URL
    router();
    const app = document.getElementById("app");
    expect(app.innerHTML).toContain("Elegí tu personaje");
  });

  it("renderiza la vista Chat en /chat", () => {
    window.history.pushState({}, "", "/chat");
    router();
    const app = document.getElementById("app");
    expect(app.innerHTML).toContain("Enviar");
    expect(app.querySelector("#chat-input")).not.toBeNull();
  });

  it("renderiza la vista About en /about", () => {
  window.history.pushState({}, "", "/about");
  router();
  const app = document.getElementById("app");
  expect(app.innerHTML).toContain("Sobre el Proyecto");
});

  it("renderiza 404 en ruta desconocida", () => {
    window.history.pushState({}, "", "/ruta-inexistente");
    router();
    const app = document.getElementById("app");
    expect(app.innerHTML).toContain("404");
  });
});