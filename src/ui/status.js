// Manejo de estados visuales: idle, loading, success, error

let state = { status: "idle", message: null };

export function setStatus(newStatus, message = null) {
  state = { status: newStatus, message };
  renderStatus();
}

function renderStatus() {
  const container = document.getElementById("messages");
  if (!container) return;

  const oldStatus = container.querySelector(".status");
  if (oldStatus) oldStatus.remove();

  if (state.status === "idle") {
    container.innerHTML += `<div class="status idle">${state.message || "Esperando tu mensaje…"}</div>`;
  } else if (state.status === "loading") {
    container.innerHTML += `<div class="status loading">Escribiendo...</div>`;
  } else if (state.status === "error") {
    container.innerHTML += `<div class="status error">⚠️ ${state.message}</div>`;
  } else if (state.status === "success") {
    container.innerHTML += `<div class="status success">✔️ ${state.message}</div>`;
    setTimeout(() => {
      const successEl = container.querySelector(".status.success");
      if (successEl) successEl.remove();
    }, 2000);
  }
}