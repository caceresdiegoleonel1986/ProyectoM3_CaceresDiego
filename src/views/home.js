// Vista Home: bienvenida y acceso al chat

export default function Home() {
  return `
    <section class="home">
      <h1>Bienvenido</h1>
      <p>Elige un personaje y empieza a chatear.</p>
      <a href="/chat" data-link class="btn">Ir al Chat</a>
    </section>
  `;
}