import { describe, it, expect, beforeEach } from "vitest";
import { router } from "../src/router.js";

describe("Router", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="app"></div>`;
  });

  it("renderiza Home en /home", () => {
    window.history.pushState({}, "", "/home");
    router();
    // Home.js tiene <h2>Elegí tu personaje</h2>
    expect(document.getElementById("app").innerHTML).toContain("Elegí tu personaje");
  });

  it("renderiza Chat en /chat", () => {
    window.history.pushState({}, "", "/chat");
    router();
    // Chat.js tiene botón con texto "Enviar"
    expect(document.getElementById("app").innerHTML).toContain("Enviar");
  });

  it("renderiza About en /about", () => {
    window.history.pushState({}, "", "/about");
    router();
    // About.js tiene <h2>Sobre el Proyecto</h2>
    expect(document.getElementById("app").innerHTML).toContain("Sobre el Proyecto");
  });

  it("renderiza NotFound en ruta desconocida", () => {
    window.history.pushState({}, "", "/no-existe");
    router();
    // NotFound.js tiene <h2>404 - Página no encontrada</h2>
    expect(document.getElementById("app").innerHTML).toContain("404 - Página no encontrada");
  });
});