import { describe, it, expect, beforeEach } from "vitest";
import { setStatus } from "../src/ui/status.js";
import { showLoader, hideLoader } from "../src/ui/loader.js";

describe("Integración Status + Loader", () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = `<div id="messages"></div>`;
    container = document.getElementById("messages");
  });

  it("cuando se setea loading se muestra el loader", () => {
    setStatus("loading");
    showLoader();
    expect(container.querySelector(".loader")).not.toBeNull();
    expect(container.innerHTML).toContain("Escribiendo...");
  });

  it("cuando se setea success se elimina el loader", async () => {
    setStatus("loading");
    showLoader();
    setStatus("success", "Respuesta recibida");
    hideLoader();
    expect(container.querySelector(".loader")).toBeNull();
    expect(container.innerHTML).toContain("Respuesta recibida");
  });

  it("cuando se setea error se elimina el loader", () => {
    setStatus("loading");
    showLoader();
    setStatus("error", "Error al conectar");
    hideLoader();
    expect(container.querySelector(".loader")).toBeNull();
    expect(container.innerHTML).toContain("Error al conectar");
  });
});