import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock fetchGemini
vi.mock("../src/services/fetchGemini.js", () => ({
  fetchGemini: vi.fn().mockResolvedValue({
    character: "Homero",
    reply: "Hola Diego, soy Homero",
    candidates: [
      {
        content: {
          parts: [{ text: "Hola Diego, soy Homero" }]
        }
      }
    ]
  })
}));

import { router } from "../src/router.js";
import Chat, { initChat } from "../src/views/chat.js";
import { getMessages, clearMessages } from "../src/ui/chatUI.js";

describe("End-to-End Router + Chat", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="app"></div>`;
    clearMessages();
  });

  it("navega a /chat, envía mensaje y recibe respuesta", async () => {
    window.history.pushState({}, "", "/chat");
    router();
    initChat();

    const input = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");

    input.value = "Hola Homero";
    sendBtn.click();

    await new Promise(resolve => setTimeout(resolve, 100));

    const messages = getMessages();
    expect(messages.length).toBe(2);
    expect(messages[0].content).toBe("Hola Homero");
    expect(messages[1].content).toBe("Hola Diego, soy Homero");
  });

  it("navega a /about y renderiza About", () => {
    window.history.pushState({}, "", "/about");
    router();
    const html = document.getElementById("app").innerHTML;
    expect(html).toContain("Sobre el Proyecto"); // texto real del h2
  });

  it("navega a ruta desconocida y renderiza NotFound", () => {
    window.history.pushState({}, "", "/random");
    router();
    const html = document.getElementById("app").innerHTML;
    expect(html).toContain("404 - Página no encontrada"); // texto real del h2
  });
});