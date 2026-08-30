import { fetchGemini } from "../services/fetchGemini.js";
import { toCharacterProfile } from "../transform/toCharacterProfile.js";
import { setStatus } from "../ui/status.js";
import { addMessage, getMessages, renderMessages } from "../ui/chatUI.js";
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

// Inicialización del chat: listeners y flujo principal
export function initChat() {
  const sendBtn = document.getElementById("send-btn");
  const input = document.getElementById("chat-input");

  sendBtn.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;

    // 1. Agregar mensaje del usuario
    addMessage("user", text);
    setStatus("loading");
    showLoader(); // 👈 mostrar loader

    try {
      // 2. Obtener personaje seleccionado (o fallback a Homero)
      const character = getSelectedCharacter() || "homero";

      // 3. Definir clase CSS según personaje
      let cssClass = "";
      if (character === "homero") cssClass = "message-homero";
      if (character === "goku") cssClass = "message-goku";
      if (character === "woody") cssClass = "message-woody";

      // 4. Llamar a Gemini con historial y personaje
      const raw = await fetchGemini(getMessages(), character);
      const profile = toCharacterProfile(raw);
      const response = profile.reply;

      // 5. Agregar respuesta del asistente con estilo
      addMessage("assistant", response, cssClass);
      setStatus("success", "Respuesta recibida");
    } catch (err) {
      // 6. Manejo de errores
      addMessage("assistant", "Error al conectar con la AI");
      setStatus("error", "Error al conectar con la AI");
    } finally {
      // 7. Ocultar loader siempre
      hideLoader();
    }

    // 8. Renderizar mensajes y limpiar input
    renderMessages();
    input.value = "";
  });
}