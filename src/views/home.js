import { initCharacterChoice } from "../ui/characterChoice.js";
import { setStatus } from "../ui/status.js";
import { getCharacterReply } from "../services/aiClient.js";

export default function Home() {
  const html = `
    <section class="view home">
      <div class="hero">
        <h2>Elegí tu personaje favorito y empezá el chat</h2>
      </div>

      <section class="characters">
        <div class="character-card" data-character="homero">
          <img src="/img/Homero.jpg" alt="Homero Simpson">
          <h3>Homero Simpson</h3>
          <button class="choose-btn">Elegir</button>
        </div>
        <div class="character-card" data-character="goku">
          <img src="/img/Goku.png" alt="Goku">
          <h3>Goku</h3>
          <button class="choose-btn">Elegir</button>
        </div>
        <div class="character-card" data-character="woody">
          <img src="/img/Woody.jpg" alt="Woody">
          <h3>Woody</h3>
          <button class="choose-btn">Elegir</button>
        </div>
      </section>

      <p id="selected-character" class="status"></p>
    </section>
  `;
  setTimeout(initCharacterChoice, 0);
  return html;
}

// Ejemplo de integración: cuando el usuario elige un personaje
export async function loadCharacter(character) {
  setStatus("loading", `Consultando a Gemini como ${character}...`);

  try {
    const reply = await getCharacterReply([], character); // [] = historial vacío
    setStatus("success", `Personaje ${character} listo para chatear`);
    document.getElementById("selected-character").textContent = reply;
  } catch (err) {
    setStatus("error", "No se pudo cargar el personaje.");
  }
}