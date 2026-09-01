export function getHistoryKey(characterKey) {
  return `chatHistory_${characterKey}`;
}

export function saveHistory(characterKey, messages) {
  if (!characterKey) return;
  localStorage.setItem(getHistoryKey(characterKey), JSON.stringify(messages));
}

export function loadHistory(characterKey) {
  if (!characterKey) return [];
  const saved = localStorage.getItem(getHistoryKey(characterKey));
  return saved ? JSON.parse(saved) : [];
}

export function clearStoredHistory(characterKey) {
  if (!characterKey) return;
  localStorage.removeItem(getHistoryKey(characterKey));
}
