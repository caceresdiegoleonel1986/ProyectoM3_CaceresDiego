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
  renderMessages(); // ✅ vuelve acá
}

// Renderizar mensajes
export function renderMessages() {
  const container = document.getElementById("messages");
  if (!container) return;

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

  container.scrollTop = container.scrollHeight;
}

// Limpiar mensajes
export function clearMessages() {
  messages = [];
  renderMessages();
}