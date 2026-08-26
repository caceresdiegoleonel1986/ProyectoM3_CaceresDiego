let selectedCharacter = null; 
// Bloque 1: variable global para guardar el personaje elegido

export function initCharacterChoice() {
  const buttons = document.querySelectorAll(".choose-btn"); 
  // Bloque 2: obtener todos los botones de elección

  const status = document.getElementById("selected-character"); 
  // Bloque 3: referencia al elemento que muestra el estado

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".character-card"); 
      // Bloque 4: encontrar la tarjeta del personaje clickeado

      selectedCharacter = card.dataset.character; 
      // Bloque 5: guardar el personaje elegido en la variable global

      status.textContent = `Personaje elegido: ${card.querySelector("h3").textContent}`; 
      // Bloque 6: actualizar el texto de estado con el nombre del personaje
    });
  });
}

export function getSelectedCharacter() {
  return selectedCharacter; 
  // Bloque 7: función para obtener el personaje elegido desde fuera
}