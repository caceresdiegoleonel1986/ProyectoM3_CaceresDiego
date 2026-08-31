import { fetchGemini } from "../services/fetchGemini.js";
import { toCharacterProfile } from "../transform/toCharacterProfile.js";
import { setStatus } from "../ui/status.js";
import { addMessage, getMessages } from "../ui/chatUI.js";
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
    </section>
  `;
}

let chatInitialized = false;

// Inicialización del chat: listeners y flujo principal
export function initChat() {
  if (chatInitialized) return;
  chatInitialized = true;

  const sendBtn = document.getElementById("send-btn");
  const input = document.getElementById("chat-input");

  sendBtn.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;

    // 1. Agregar mensaje del usuario
    addMessage("user", text);
    setStatus("loading");
    showLoader();

    try {
      // 2. Obtener personaje seleccionado (fallback a Homero si no hay)
      const character = getSelectedCharacter() || "homero";

      // 3. Llamar a Gemini con historial y personaje
      const raw = await fetchGemini(getMessages(), character);
      const profile = toCharacterProfile(raw);
      const response = profile.reply;

      // 4. Agregar respuesta del personaje con avatar automático
      addMessage("character", response, character);
      setStatus("success", "Respuesta recibida");
    } catch (err) {
      // 5. Manejo de errores
      addMessage("assistant", "Error al conectar con la AI");
      setStatus("error", "Error al conectar con la AI");
    } finally {
      // 6. Ocultar loader siempre
      hideLoader();
    }

    // 7. Limpiar input (render ya lo hace addMessage)
    input.value = "";
  });
}