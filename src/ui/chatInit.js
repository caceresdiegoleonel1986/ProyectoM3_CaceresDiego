import { addMessage, clearMessages } from "./chatUI.js";
import { setSelectedCharacter } from "./characterChoice.js";

const characters = {
  homero: { name: "Homero Simpson" },
  goku: { name: "Goku" },
  woody: { name: "Woody" }
};

export function initChat() {
  const characterButtons = document.querySelectorAll(".character-card button");
  const chatSection = document.querySelector(".chat");
  const homeSection = document.querySelector(".home");

  characterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const charKey = btn.dataset.character;
      const currentCharacter = characters[charKey];

      setSelectedCharacter(charKey);
      homeSection.style.display = "none";
      chatSection.style.display = "block";

      clearMessages();

      addMessage(
        "character",
        `¡Hola! Soy ${currentCharacter.name}, ¿qué querés saber?`,
        charKey
      );
    });
  });
}