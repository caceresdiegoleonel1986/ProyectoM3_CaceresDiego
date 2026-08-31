let selectedCharacter = null;

export function initCharacterChoice() {
  const buttons = document.querySelectorAll(".choose-btn");
  const status = document.getElementById("selected-character");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".character-card");
      const charKey = card.dataset.character;

      setSelectedCharacter(charKey);
      status.textContent = `Personaje elegido: ${card.querySelector("h3").textContent}`;
    });
  });
}

export function setSelectedCharacter(charKey) {
  selectedCharacter = charKey;
}

export function getSelectedCharacter() {
  return selectedCharacter;
}