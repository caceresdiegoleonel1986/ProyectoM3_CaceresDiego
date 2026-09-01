import { getCharacterConfig } from "../config/characters.js";
import { saveHistory, loadHistory, clearStoredHistory } from "../services/historyStore.js";

let messages = [];

export function getMessages() {
  return messages;
}

export function saveMessages(characterKey) {
  saveHistory(characterKey, messages);
}

export function loadMessages(characterKey) {
  messages = loadHistory(characterKey);
  renderMessages();
}

export function addMessage(role, content, characterKey = null) {
  const config = characterKey ? getCharacterConfig(characterKey) : null;

  const entry = {
    role,
    content,
    cssClass:
      role === "user"
        ? "message--user"
        : role === "assistant"
          ? "message--assistant"
          : config
            ? `message--${characterKey}`
            : "message",
    avatar: role === "character" && config ? config.avatar : null,
  };

  messages = [...messages, entry];
  requestAnimationFrame(() => renderMessages());

  if (characterKey) {
    saveMessages(characterKey);
  }
}

export function renderMessages() {
  const container = document.getElementById("messages");
  if (!container) return;

  container.innerHTML = "";

  messages.forEach((m) => {
    const div = document.createElement("div");
    div.className = `message ${m.cssClass}`;

    const text = document.createElement("p");
    text.textContent = m.content;

    if (m.cssClass === "message--user") {
      div.appendChild(text);
    } else {
      if (m.avatar) {
        const img = document.createElement("img");
        img.src = m.avatar;
        img.alt = "Avatar";
        img.className = "message__avatar";
        div.appendChild(img);
      }
      div.appendChild(text);
    }

    container.appendChild(div);
  });

  container.scrollTop = container.scrollHeight;
}

export function clearMessages() {
  messages = [];
  requestAnimationFrame(() => renderMessages());
}

export function clearCharacterHistory(characterKey) {
  clearStoredHistory(characterKey);
  messages = [];
  requestAnimationFrame(() => renderMessages());
}

export function getWelcomeMessage(characterKey = "homero") {
  return getCharacterConfig(characterKey).greeting;
}