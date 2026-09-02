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
      <div class="clear-area" style="display:none;">
        <button id="clear-history-btn">🗑️ Borrar historial</button>
      </div>
      <div class="input-area">
        <input id="chat-input" type="text" placeholder="Escribe tu mensaje..." />
        <button id="send-btn">Enviar</button>
      </div>
    </section>
  `;
}

export function syncClearHistoryButton() {
  const clearArea = document.querySelector(".clear-area");
  if (!clearArea) return;

  const character = getSelectedCharacter() || "homero";
  const saved = localStorage.getItem(`chatHistory_${character}`);
  clearArea.style.display = saved && JSON.parse(saved).length > 0 ? "block" : "none";
}

export function initChat() {
  const sendBtn = document.getElementById("send-btn");
  const input = document.getElementById("chat-input");
  const clearArea = document.querySelector(".clear-area");
  const clearBtn = document.getElementById("clear-history-btn");
  let isSending = false;

  if (!sendBtn || !input) return;

  syncClearHistoryButton();

  const newSendBtn = sendBtn.cloneNode(true);
  sendBtn.parentNode.replaceChild(newSendBtn, sendBtn);

  const sendMessage = async () => {
    const text = input.value.trim();
    if (!text || isSending) return;

    const character = getSelectedCharacter() || "homero";
    isSending = true;
    newSendBtn.disabled = true;
    input.disabled = true;

    addMessage("user", text);
    showLoader();

    try {
      const response = await sendChatMessage({
        messages: getMessages(),
        character,
      });

      addMessage("character", response, character);
      setStatus("success", "Respuesta recibida");
      syncClearHistoryButton();
    } catch (err) {
      const errorMessage = err?.status === 429
        ? "La IA está temporalmente limitada. Esperá unos segundos e intentá nuevamente."
        : "No se pudo conectar con la IA. Intentá nuevamente.";
      addMessage("assistant", errorMessage);
      setStatus("error", errorMessage);
    } finally {
      hideLoader();
      input.value = "";
      isSending = false;
      newSendBtn.disabled = false;
      input.disabled = false;
      input.focus();
    }
  };

  newSendBtn.addEventListener("click", sendMessage);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      const character = getSelectedCharacter() || "homero";
      clearCharacterHistory(character);
      syncClearHistoryButton();
      addMessage("character", getWelcomeMessage(character), character);
      setStatus("success", "Historial borrado");
    });
  }
}