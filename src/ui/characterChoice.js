let selectedCharacter = "homero";

export function initCharacterChoice() {
  const buttons = document.querySelectorAll(".choose-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".character-card");
      const charKey = card?.dataset.character;

      if (!charKey) return;

      setSelectedCharacter(charKey);
      history.pushState(null, "", "/chat");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
  });
}

export function setSelectedCharacter(charKey) {
  selectedCharacter = charKey || "homero";
}

export function getSelectedCharacter() {
  return selectedCharacter;
}