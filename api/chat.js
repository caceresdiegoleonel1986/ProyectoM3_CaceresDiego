// Serverless Function en Vercel
// Conecta con Gemini y devuelve el JSON crudo

import { prompts } from "../src/transform/prompts.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { messages, character } = req.body;
  const systemPrompt = prompts[character] || prompts.homero;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "system", parts: [{ text: systemPrompt }] },
            ...messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }))
          ]
        })
      }
    );

    const data = await response.json();

    // 👉 Devuelve el JSON crudo (sin simplificar)
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Error en la función serverless" });
  }
}