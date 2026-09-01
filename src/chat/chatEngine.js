// Motor de chat: maneja historial, payloads y respuestas
export class ChatEngine {
  constructor(systemPrompt, maxHistory = 10) {
    this.systemPrompt = systemPrompt; // prompt inicial del personaje
    this.messages = [];               // historial de mensajes
    this.isLoading = false;           // flag para evitar envíos simultáneos
    this.maxHistory = maxHistory;     // límite de historial
  }

  // Construye el payload para enviar a Gemini
  buildPayload(userMessage) {
    if (!userMessage.trim()) throw new Error("Mensaje vacío");

    this.messages.push({ role: "user", content: userMessage });

    // Si se excede el historial, resumir
    if (this.messages.length > this.maxHistory) {
      this.summarizeHistory();
    }

    return {
      model: "mock-gemini", // stub por ahora
      system: this.systemPrompt,
      max_tokens: 134,
      temperature: 0.7,
      messages: this.messages
    };
  }

  // Envía mensaje y maneja rate limit (429)
  async sendMessage(userMessage, mockFetch) {
    if (this.isLoading) throw new Error("Ya hay un envío en curso");
    this.isLoading = true;

    const payload = this.buildPayload(userMessage);

    try {
      const res = await mockFetch(payload);

      // Manejo de rate limit
      if (res.status === 429) {
        const wait = res.retryAfterSeconds * 1000;
        await new Promise(r => setTimeout(r, wait));
        const retryRes = await mockFetch(payload);
        if (retryRes.status === 429) {
          throw new Error("Rate limit excedido, intenta más tarde");
        }
        return this.normalizeResponse(retryRes);
      }

      return this.normalizeResponse(res);
    } finally {
      this.isLoading = false;
    }
  }

  // Normaliza respuesta y limita a 3 líneas
  normalizeResponse(res) {
    let text = res.content?.map(c => c.text).join(" ") || "";

    const lines = text.split("\n");
    if (lines.length > 3) {
      text = lines.slice(0, 3).join("\n");
    }

    this.messages.push({ role: "assistant", content: text });

    if (this.messages.length > this.maxHistory) {
      this.summarizeHistory();
    }

    return { text, usage: res.usage };
  }

  // Resumir historial viejo para ahorrar tokens
  summarizeHistory() {
    const oldMessages = this.messages.slice(0, this.messages.length - this.maxHistory + 1);
    const summaryText = oldMessages.map(m => `${m.role}: ${m.content}`).join(" | ");
    const summary = { role: "system", content: `Resumen: ${summaryText}` };

    const recent = this.messages.slice(-this.maxHistory + 1);
    this.messages = [summary, ...recent];
  }
}