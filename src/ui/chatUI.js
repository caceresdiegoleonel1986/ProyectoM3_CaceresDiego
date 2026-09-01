// Estado interno de mensajes
let messages = [];

// Mapa de personajes → clase CSS
const characterClassMap = {
  goku: "message--goku",
  homero: "message--homero",
  woody: "message--woody"
};

// Mapa de personajes → avatar
const characterAvatarMap = {
  goku: "/img/Goku.png",
  homero: "/img/Homero.jpg",
  woody: "/img/Woody.jpg"
};

// Getter
export function getMessages() {
  return messages;
}

// Guardar historial en localStorage por personaje
export function saveMessages(characterKey) {
  if (!characterKey) return;
  localStorage.setItem(`chatHistory_${characterKey}`, JSON.stringify(messages));
}

// Cargar historial desde localStorage por personaje
export function loadMessages(characterKey) {
  if (!characterKey) return;
  const saved = localStorage.getItem(`chatHistory_${characterKey}`);
  messages = saved ? JSON.parse(saved) : [];
  renderMessages();
}

// Agregar mensaje (renderiza inmediatamente)
export function addMessage(role, content, characterKey = null) {
  let cssClass;
  let avatar = null;

  if (role === "user") {
    cssClass = "message--user";
  } else if (role === "assistant") {
    cssClass = "message--assistant";
  } else if (role === "character" && characterKey) {
    cssClass = characterClassMap[characterKey] || "message--character";
    avatar = characterAvatarMap[characterKey] || null;
  } else {
    cssClass = "message";
  }

  messages = [...messages, { role, content, cssClass, avatar }];

  // Esperar a que el contenedor exista antes de renderizar
  requestAnimationFrame(() => renderMessages());

  // Guardar automáticamente cada vez que se agrega un mensaje
  if (characterKey) {
    saveMessages(characterKey);
  }
}

// Renderizar mensajes
export function renderMessages() {
  const container = document.getElementById("messages");
  if (!container) return; // evita errores si el chat aún no está montado

  container.innerHTML = "";

  messages.forEach(m => {
    const div = document.createElement("div");
    div.className = `message ${m.cssClass}`;

    const text = document.createElement("p");
    text.textContent = m.content;

    // Usuario → solo texto
    if (m.cssClass === "message--user") {
      div.appendChild(text);
    } else {
      // Personaje/asistente → avatar + texto
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

  // Auto-scroll al último mensaje
  container.scrollTop = container.scrollHeight;
}

// Limpiar mensajes
export function clearMessages() {
  messages = [];
  // Esperar a que el contenedor exista antes de limpiar
  requestAnimationFrame(() => renderMessages());
}

// Borrar historial de un personaje
export function clearCharacterHistory(characterKey) {
  if (!characterKey) return;
  localStorage.removeItem(`chatHistory_${characterKey}`);
  messages = [];
  requestAnimationFrame(() => renderMessages());
}