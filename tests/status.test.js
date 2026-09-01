import { describe, it, expect, beforeEach } from "vitest";
import { setStatus } from "../src/ui/status.js";

describe("Status component", () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = `<div id="messages"></div>`;
    container = document.getElementById("messages");
  });

  it("renderiza estado idle", () => {
    setStatus("idle", "Esperando tu mensaje…");
    expect(container.innerHTML).toContain("Esperando tu mensaje…");
    expect(container.querySelector(".status.idle")).not.toBeNull();
  });

  it("renderiza estado loading con mensaje de pensamiento", () => {
    setStatus("loading", "La IA está pensando...");
    expect(container.innerHTML).toContain("La IA está pensando...");
    expect(container.querySelector(".status.loading")).not.toBeNull();
  });

  it("renderiza estado error", () => {
    setStatus("error", "Error al conectar");
    expect(container.innerHTML).toContain("Error al conectar");
    expect(container.querySelector(".status.error")).not.toBeNull();
  });

  it("renderiza estado success y lo elimina después de 2s", async () => {
    setStatus("success", "Respuesta recibida");
    expect(container.querySelector(".status.success")).not.toBeNull();

    // Espera 2.5 segundos para que se elimine
    await new Promise(resolve => setTimeout(resolve, 2500));
    expect(container.querySelector(".status.success")).toBeNull();
  });
});