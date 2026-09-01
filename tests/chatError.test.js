import { describe, it, expect, beforeEach, vi } from "vitest";
import Chat, { initChat } from "../src/views/chat.js";
import { fetchGemini } from "../src/services/fetchGemini.js"; // 👈 importá fetchGemini
import { getMessages } from "../src/ui/chatUI.js";

vi.mock("../src/services/fetchGemini.js", () => ({
  fetchGemini: vi.fn()
}));

describe("Integración Chat - Error", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="app"></div>`;
    document.getElementById("app").innerHTML = Chat();
    initChat(); // inicializa listeners
  });

  it("muestra mensaje de error cuando la API falla", async () => {
    // Simular fallo de la API
    fetchGemini.mockRejectedValueOnce(new Error("Fallo de red"));

    const input = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");

    input.value = "Hola Homero";
    sendBtn.click();

    // Esperar a que se procese la promesa
    await new Promise(resolve => setTimeout(resolve, 10));

    const messages = getMessages();
    expect(messages.length).toBe(2); // usuario + mensaje de error
    expect(messages[0].content).toBe("Hola Homero");
    expect(messages[1].content).toBe("Error al conectar con la AI");

    const container = document.getElementById("messages");
    expect(container.innerHTML).toContain("Error al conectar con la AI");
  });
});