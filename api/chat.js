import { GoogleGenerativeAI } from "@google/generative-ai";

const RETRY_AFTER_FALLBACK_SECONDS = 30;
const MODEL_NAME = "gemini-flash-lite-latest";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { messages, character, systemPrompt, generationConfig } = req.body ?? {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages requerido y no vacío" });
    }

    // Inicializar SDK con tu API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Usar el prompt enviado o uno por defecto
    const prompt = systemPrompt || `Eres ${character}, respondé como ese personaje.`;

    // Construir historial (sin role "system")
    const contents = [
      { role: "user", parts: [{ text: prompt }] },
      ...messages.map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }))
    ];

    // Config de generación con límite de tokens
    const config = generationConfig || {
      maxOutputTokens: 40,
      temperature: 0.7,
    };
    
    console.log(`[Gemini API] Llamando con maxOutputTokens: ${config.maxOutputTokens}`);

    // Llamar a Gemini
    const result = await model.generateContent({ 
      contents,
      generationConfig: config 
    });

    // Log de tokens consumidos
    const usage = result?.response?.usageMetadata;
    if (usage) {
      console.log(`[Gemini Tokens] Input: ${usage.promptTokenCount} | Output: ${usage.candidatesTokenCount}`);
    }

    // Extraer texto de la respuesta
    const reply =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "No se pudo generar respuesta.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Error en Gemini:", error);

    // Manejo especial para rate limit
    if (error.status === 429) {
      return res.status(429).json({
        error: "Rate limit excedido",
        retryAfterSeconds: RETRY_AFTER_FALLBACK_SECONDS,
      });
    }

    return res.status(500).json({ error: "Error generando respuesta" });
  }
}