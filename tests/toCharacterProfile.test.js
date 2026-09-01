import { describe, it, expect } from "vitest";
import { toCharacterProfile } from "../src/transform/toCharacterProfile.js";

describe("toCharacterProfile", () => {
  it("devuelve nombre y respuesta cuando el JSON es válido", () => {
    const raw = {
      character: "Homero Simpson",
      candidates: [
        {
          content: {
            parts: [{ text: "Hola Diego, soy Homero" }]
          }
        }
      ]
    };

    const profile = toCharacterProfile(raw);
    expect(profile.name).toBe("Homero Simpson");
    expect(profile.reply).toBe("Hola Diego, soy Homero");
  });

  it("usa valores por defecto cuando faltan datos", () => {
    const raw = {};
    const profile = toCharacterProfile(raw);
    expect(profile.name).toBe("Desconocido");
    expect(profile.reply).toBe("Sin respuesta");
  });
});