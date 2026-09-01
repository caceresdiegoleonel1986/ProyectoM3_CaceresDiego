import { fetchGemini } from "../services/fetchGemini.js";
import { toCharacterProfile } from "../transform/toCharacterProfile.js";
import { setStatus } from "../ui/status.js";
import { addMessage, getMessages, clearCharacterHistory } from "../ui/chatUI.js";
import { getSelectedCharacter } from "../ui/characterChoice.js";
import { showLoader, hideLoader } from "../ui/loader.js";

// Render principal del chat
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

// Inicialización del chat: listeners y flujo principal
export function initChat() {
  const sendBtn = document.getElementById("send-btn");
  const input = document.getElementById("chat-input");
  const clearArea = document.querySelector(".clear-area");
  const clearBtn = document.getElementById("clear-history-btn");

  if (!sendBtn || !input) return;

  // Reemplazar botón para limpiar listeners previos
  const newSendBtn = sendBtn.cloneNode(true);
  sendBtn.parentNode.replaceChild(newSendBtn, sendBtn);

  newSendBtn.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    setStatus("loading");
    showLoader();

    try {
      const character = getSelectedCharacter() || "homero";
      const raw = await fetchGemini(getMessages(), character);
      const profile = toCharacterProfile(raw);
      const response = profile.reply;

      addMessage("character", response, character);
      setStatus("success", "Respuesta recibida");

      // mostrar botón borrar si hay historial
      if (getMessages().length > 0) {
        clearArea.style.display = "block";
      }
    } catch (err) {
      addMessage("assistant", "Error al conectar con la AI");
      setStatus("error", "Error al conectar con la AI");
    } finally {
      hideLoader();
    }

    input.value = "";
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      const character = getSelectedCharacter() || "homero";
      clearCharacterHistory(character);

      // Ocultar botón borrar porque ya no hay historial
      clearArea.style.display = "none";

      // Mostrar saludo inicial otra vez
      const characters = {
        homero: "Homero Simpson",
        goku: "Goku",
        woody: "Woody"
      };
      addMessage("character", `¡Hola! Soy ${characters[character]}, ¿qué querés saber?`, character);
    });
  }
}