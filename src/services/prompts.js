import { getCharacterConfig } from "../config/characters.js";

export function getCharacterPrompt(character = "homero") {
  return getCharacterConfig(character).prompt;
}

export const HOMERO_PROMPT = getCharacterPrompt("homero");
export const GOKU_PROMPT = getCharacterPrompt("goku");
export const WOODY_PROMPT = getCharacterPrompt("woody");