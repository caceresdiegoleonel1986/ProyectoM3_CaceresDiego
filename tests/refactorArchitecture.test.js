import { describe, it, expect } from "vitest";
import { CHARACTERS, getCharacterConfig } from "../src/config/characters.js";
import { getCharacterPrompt } from "../src/services/prompts.js";

describe("Arquitectura centralizada", () => {
  it("expone la configuración de personajes en un solo lugar", () => {
    expect(CHARACTERS.homero.label).toBe("Homero Simpson");
    expect(CHARACTERS.goku.label).toBe("Goku");
    expect(CHARACTERS.woody.label).toBe("Woody");
  });

  it("devuelve el prompt correcto según personaje", () => {
    expect(getCharacterConfig("goku").greeting).toContain("Goku");
    expect(getCharacterPrompt("woody")).toContain("Woody");
  });
});
