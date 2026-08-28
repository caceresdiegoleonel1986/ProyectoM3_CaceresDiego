// Utilidad para controlar la frecuencia de ejecución de funciones

export function debounce(fn, delay) {
  let timer = null;
  return function debounced(...args) {
    clearTimeout(timer); // cancela cualquier ejecución pendiente
    // programa la ejecución de la función después del delay
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Utilidad para esperar un tiempo específico usando Promesas
export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}