import { addMessage } from "./chatUI.js";

export function initChat() {
  const sendBtn = document.getElementById("send-btn");
  const input = document.getElementById("chat-input");

  if (sendBtn && input) {
    // Reemplazar el botón para limpiar listeners previos
    const newSendBtn = sendBtn.cloneNode(true);
    sendBtn.parentNode.replaceChild(newSendBtn, sendBtn);

    newSendBtn.addEventListener("click", () => {
      const text = input.value.trim();
      if (!text) return;

      addMessage("user", text);
      input.value = "";

      addMessage("assistant", "Procesando tu mensaje...");
    });
  }
}