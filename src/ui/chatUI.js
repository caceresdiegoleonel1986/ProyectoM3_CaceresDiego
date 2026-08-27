// Estado interno de mensajes en memoria
let messages = [];

// Getter: devuelve el array actual de mensajes
export function getMessages() {
  return messages;
}

// Agrega un nuevo mensaje al estado y lo renderiza en el contenedor
export function addMessage(role, content, cssClass = "") {
  // Usamos spread para mantener inmutabilidad
  messages = [...messages, { role, content, cssClass }];
  renderMessages();
}

// Renderiza todos los mensajes en el contenedor #messages
export function renderMessages() {
  const container = document.getElementById("messages");
  if (!container) return;

  // Limpiamos el contenedor antes de volver a dibujar
  container.innerHTML = "";

  // Creamos un <div> por cada mensaje y lo agregamos
  messages.forEach(m => {
    const div = document.createElement("div");
    div.className = m.cssClass || m.role;
    div.textContent = m.content; // textContent evita inyecciones de HTML
    container.appendChild(div);
  });

  // Auto-scroll al último mensaje
  container.scrollTop = container.scrollHeight;
}

// Limpia todos los mensajes y vuelve a renderizar
export function clearMessages() {
  messages = [];
  renderMessages();
}