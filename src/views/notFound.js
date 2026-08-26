// Vista NotFound: renderiza un mensaje 404 cuando la ruta no existe

export default function NotFound() {
  return `
    <section class="not-found">
      <h2>404 - Página no encontrada</h2>
      <a href="/home" data-link>Volver al inicio</a>
    </section>
  `;
}