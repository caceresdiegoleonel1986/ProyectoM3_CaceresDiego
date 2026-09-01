// Manejo de estados visuales: idle, loading, success, error

let state = { status: "idle", message: null };

export function setStatus(newStatus, message = null) {
  state = { status: newStatus, message };
  renderStatus();
}

function renderStatus() {
  const container = document.getElementById("messages");
  if (!container) return;

  // Eliminar status anterior
  const oldStatus = container.querySelector(".status");
  if (oldStatus) oldStatus.remove();

  // Renderizar según estado
  switch (state.status) {
    case "idle":
      container.innerHTML += `<div class="status idle">${state.message || ""}</div>`;
      break;
    case "loading":
      container.innerHTML += `<div class="status loading">${state.message || "La IA está pensando..."}</div>`;
      break;
    case "error":
      container.innerHTML += `<div class="status error">⚠️ ${state.message}</div>`;
      break;
    case "success":
      container.innerHTML += `<div class="status success">✔️ ${state.message}</div>`;
      // Eliminar automáticamente el mensaje de éxito después de 2s
      setTimeout(() => {
        const successEl = container.querySelector(".status.success");
        if (successEl) successEl.remove();
      }, 2000);
      break;
  }
}