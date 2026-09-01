let selectedCharacter = null;

export function initCharacterChoice() {
  const buttons = document.querySelectorAll(".choose-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".character-card");
      const charKey = card.dataset.character;

      setSelectedCharacter(charKey);

      // 👇 Navegar directamente al chat
      history.pushState(null, "", "/chat");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
  });
}

export function setSelectedCharacter(charKey) {
  selectedCharacter = charKey;
}

export function getSelectedCharacter() {
  return selectedCharacter;
}