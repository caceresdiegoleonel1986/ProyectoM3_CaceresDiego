import { describe, it, expect, beforeEach } from "vitest";
import { showLoader, hideLoader } from "../src/ui/loader.js";

describe("Loader component", () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="messages"></div>`;
  });

  it("muestra el loader en el contenedor", () => {
    showLoader();
    const container = document.getElementById("messages");
    expect(container.innerHTML).toContain("Escribiendo...");
    expect(container.querySelector(".loader")).not.toBeNull();
  });

  it("elimina el loader del contenedor", () => {
    showLoader();
    hideLoader();
    const container = document.getElementById("messages");
    expect(container.querySelector(".loader")).toBeNull();
  });
});