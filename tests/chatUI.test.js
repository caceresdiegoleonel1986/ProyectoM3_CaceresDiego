import { describe, it, expect, beforeEach } from "vitest";
import { addMessage, getMessages, renderMessages, clearMessages } from "../src/ui/chatUI.js";

describe("ChatUI", () => {
  beforeEach(() => {
    // Simula el contenedor de mensajes en el DOM
    document.body.innerHTML = `<div id="messages"></div>`;
    clearMessages(); // limpia historial antes de cada test
    renderMessages(); // forzar render inmediato
  });

  it("agrega un mensaje y lo renderiza", () => {
    addMessage("user", "Hola mundo");
    renderMessages(); // forzar render inmediato

    const container = document.getElementById("messages");
    expect(getMessages().length).toBe(1);
    expect(container.innerHTML).toContain("Hola mundo");
    expect(container.querySelector(".message--user")).not.toBeNull();
  });

  it("renderiza múltiples mensajes", () => {
    addMessage("user", "Hola");
    addMessage("assistant", "Hola Diego");
    renderMessages(); // forzar render inmediato

    const container = document.getElementById("messages");
    expect(getMessages().length).toBe(2);
    expect(container.innerHTML).toContain("Hola");
    expect(container.innerHTML).toContain("Hola Diego");
    expect(container.querySelector(".message--assistant")).not.toBeNull();
  });

  it("clearMessages vacía el historial", () => {
    addMessage("user", "Mensaje temporal");
    renderMessages(); // forzar render inmediato

    clearMessages();
    renderMessages(); // forzar render inmediato

    const container = document.getElementById("messages");
    expect(getMessages().length).toBe(0);
    expect(container.innerHTML).toBe("");
  });
});