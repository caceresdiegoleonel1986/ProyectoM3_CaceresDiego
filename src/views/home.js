import { initCharacterChoice } from "../ui/characterChoice.js";

export default function Home() {
  const html = `
    <h2>Elegí tu personaje</h2>
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
  `;
  setTimeout(initCharacterChoice, 0);
  return html;
}