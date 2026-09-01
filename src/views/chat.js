import { sendChatMessage } from "../services/chatService.js";
import { setStatus } from "../ui/status.js";
import { addMessage, getMessages, clearCharacterHistory, getWelcomeMessage } from "../ui/chatUI.js";
import { getSelectedCharacter } from "../ui/characterChoice.js";
import { showLoader, hideLoader } from "../ui/loader.js";
import { getCharacterConfig } from "../config/characters.js";

export default function Chat() {
  return `
    <section class="chat">
      <div id="messages" class="messages"></div>
      <div class="input-area">
        <input id="chat-input" type="text" placeholder="Escribe tu mensaje..." />
        <button id="send-btn">Enviar</button>
      </div>
      <div class="clear-area" style="display:none;">
        <button id="clear-history-btn">🗑️ Borrar historial</button>
      </div>
    </section>
  `;
}

export function initChat() {
  const sendBtn = document.getElementById("send-btn");
  const input = document.getElementById("chat-input");
  const clearArea = document.querySelector(".clear-area");
  const clearBtn = document.getElementById("clear-history-btn");

  if (!sendBtn || !input) return;

  const newSendBtn = sendBtn.cloneNode(true);
  sendBtn.parentNode.replaceChild(newSendBtn, sendBtn);

  newSendBtn.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;

    const character = getSelectedCharacter() || "homero";

    addMessage("user", text);
    setStatus("loading");
    showLoader();

    try {
      const response = await sendChatMessage({
        messages: getMessages(),
        character,
      });

      addMessage("character", response, character);
      setStatus("success", "Respuesta recibida");

      if (getMessages().length > 0) {
        clearArea.style.display = "block";
      }
    } catch (err) {
      addMessage("assistant", "Error al conectar con la AI");
      setStatus("error", "Error al conectar con la AI");
    } finally {
      hideLoader();
      input.value = "";
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      const character = getSelectedCharacter() || "homero";
      clearCharacterHistory(character);
      clearArea.style.display = "none";
      addMessage("character", getWelcomeMessage(character), character);
    });
  }
}