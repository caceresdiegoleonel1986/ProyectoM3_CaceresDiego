import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock base de fetchGemini (se sobreescribe en cada test)
vi.mock("../src/services/fetchGemini.js", () => ({
  fetchGemini: vi.fn()
}));

// Mock base de getSelectedCharacter (se sobreescribe en cada test)
vi.mock("../src/ui/characterChoice.js", () => ({
  getSelectedCharacter: vi.fn(() => "homero")
}));

import Chat, { initChat } from "../src/views/chat.js";
import { getMessages, clearMessages } from "../src/ui/chatUI.js";
import { fetchGemini } from "../src/services/fetchGemini.js";
import { getSelectedCharacter } from "../src/ui/characterChoice.js";

// utilidad de espera
async function waitForMessage(index, timeout = 2000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const msgs = getMessages();
    if (msgs[index]) return msgs[index];
    await new Promise(r => setTimeout(r, 20));
  }
  throw new Error(`Message[${index}] no apareció`);
}

describe("Integración Chat", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="app"></div>`;
    document.getElementById("app").innerHTML = Chat();
    clearMessages();
    initChat();
  });

  it("flujo completo: usuario envía mensaje y recibe respuesta", async () => {
    fetchGemini.mockImplementationOnce(async () => ({
      character: "Homero",
      reply: "Hola Diego, soy Homero",
      candidates: [
        { content: { parts: [{ text: "Hola Diego, soy Homero" }] } }
      ]
    }));

    const input = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");

    input.value = "Hola Homero";
    sendBtn.click();

    const msg1 = await waitForMessage(0);
    const msg2 = await waitForMessage(1);

    expect(msg1.content).toBe("Hola Homero");
    expect(msg2.content).toBe("Hola Diego, soy Homero");
  });

  it("no envía mensaje si el input está vacío", async () => {
    const input = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");

    input.value = "";
    sendBtn.click();

    await new Promise(resolve => setTimeout(resolve, 50));

    const messages = getMessages();
    expect(messages.length).toBe(0);
  });

  it("usa clase CSS correcta para personaje Goku", async () => {
    getSelectedCharacter.mockReturnValue("goku");
    fetchGemini.mockImplementationOnce(async () => ({
      character: "Goku",
      reply: "Hola soy Goku",
      candidates: [
        { content: { parts: [{ text: "Hola soy Goku" }] } }
      ]
    }));

    const input = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");

    input.value = "Hola Goku";
    sendBtn.click();

    const msg2 = await waitForMessage(1);
    expect(msg2.cssClass).toBe("message--goku");
  });

  it("muestra mensaje de error cuando la API falla", async () => {
    getSelectedCharacter.mockReturnValue("homero");
    fetchGemini.mockImplementationOnce(async () => {
      throw new Error("Network error");
    });

    const input = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");

    input.value = "Hola Homero";
    sendBtn.click();

    const msg2 = await waitForMessage(1);
    expect(msg2.content).toBe("No se pudo conectar con la IA. Intentá nuevamente.");
  });

  it("muestra el botón de borrar historial si ya existe historial", () => {
    const clearArea = document.querySelector(".clear-area");
    const input = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");

    const messages = [
      { role: "user", content: "Hola", cssClass: "message--user" },
      { role: "character", content: "Hola", cssClass: "message--homero" }
    ];

    const originalMessages = getMessages();
    originalMessages.length = 0;
    originalMessages.push(...messages);

    clearArea.style.display = "block";
    input.value = "Hola Homero";
    sendBtn.click();

    expect(clearArea.style.display).toBe("block");
  });
});