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
          <img src="/img/Homero.png" alt="Homero Simpson">
          <h3>Homero Simpson</h3>
          <button class="choose-btn">Elegir</button>
        </div>
        <div class="character-card" data-character="goku">
          <img src="/img/Goku.png" alt="Goku">
          <h3>Goku</h3>
          <button class="choose-btn">Elegir</button>
        </div>
        <div class="character-card" data-character="woody">
          <img src="/img/Woody.png" alt="Woody">
          <h3>Woody</h3>
          <button class="choose-btn">Elegir</button>
        </div>
      </section>
    </section>
  `;
  setTimeout(initCharacterChoice, 0);
  return html;
}

// Sin estado visible en la Home: la selección se resuelve al navegar al chat.