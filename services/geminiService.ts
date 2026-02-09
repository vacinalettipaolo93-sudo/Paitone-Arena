
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Sei l'assistente virtuale di 'Paitone Arena - Tennis & Padel Club by NEXT', situato a Paitone, in provincia di Brescia.
Il centro dispone di:
- 2 campi da Tennis in terreno veloce (hard court).
- 3 campi da Padel 'Italian Padel' coperti di ultima generazione.

Il tuo compito è aiutare gli utenti con informazioni su:
1. Prenotazioni (disponibili dalle 08:00 alle 23:00).
2. Prezzi: Tennis 15€/ora, Padel 40€/ora (per 4 persone).
3. Dove siamo: Via dello Sport, Paitone (BS).
4. Slogan: "Tennis & Padel Club by NEXT".

Sii cordiale, professionale e usa un tono sportivo e moderno. Rispondi sempre in italiano. Se ti chiedono del brand, sottolinea che siamo "Paitone Arena".
`;

export const getGeminiResponse = async (userPrompt: string) => {
  try {
    const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : '';
    if (!apiKey) {
      return "Configurazione AI mancante. Contatta l'amministratore.";
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text || "Mi dispiace, non sono riuscito a elaborare la tua richiesta.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Si è verificato un errore nella connessione con l'assistente. Riprova più tardi.";
  }
};
