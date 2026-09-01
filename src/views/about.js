export default function About() {
  return `
    <section class="view about">
      <h1>Sobre el Proyecto</h1>
      <p class="about__intro">
        Esta SPA utiliza Gemini AI para simular conversaciones con tres personajes icónicos: Homero Simpson, Goku y Woody. Cada uno tiene su propio estilo, personalidad y forma de responder.
      </p>

      <div class="characters-info">
        <div class="character-card">
          <img src="/img/Homero.jpg" alt="Homero Simpson" />
          <h3>Homero Simpson</h3>
          <p>
            Personaje principal de <strong>Los Simpson</strong>. Trabaja en la planta nuclear de Springfield y es conocido por su amor a las donas 🍩, la cerveza Duff y su frase “¡D’oh!”. 
            Representa el humor cotidiano y la torpeza entrañable.
          </p>
        </div>

        <div class="character-card">
          <img src="/img/Goku.png" alt="Goku" />
          <h3>Goku</h3>
          <p>
            Protagonista de <strong>Dragon Ball</strong>. Un Saiyajin que vive para entrenar y superar sus límites. 
            Su energía positiva, su espíritu de lucha y su deseo de proteger a los demás lo convierten en un símbolo de perseverancia 💥.
          </p>
        </div>

        <div class="character-card">
          <img src="/img/Woody.jpg" alt="Woody" />
          <h3>Woody</h3>
          <p>
            El vaquero líder del grupo de juguetes en <strong>Toy Story</strong>. 
            Es leal, valiente y siempre pone la amistad por encima de todo 🤠. 
            Representa el valor de la cooperación y la empatía.
          </p>
        </div>
      </div>
    </section>
  `;
}