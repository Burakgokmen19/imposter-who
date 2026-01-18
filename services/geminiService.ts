import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWord = async (): Promise<{ word: string; hint: string }> => {
  try {
    const model = 'gemini-3-flash-preview'; 
    
    const response = await ai.models.generateContent({
      model: model,
      contents: "Casus Kim (Spyfall) oyunu için bir kelime ve bu kelimeye ait genel bir ipucu kategorisi ver.",
      config: {
        systemInstruction: "Sen bir oyun yöneticisisin. Türkçe dilinde tek bir kelime ve o kelimeyi çok açık etmeyen genel bir kategori/ipucu ver. Çıktı JSON formatında olmalı.",
        temperature: 1.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            word: {
              type: Type.STRING,
              description: "Oyunun gizli kelimesi (Örn: İtfaiye, Pizza, Paris)",
            },
            hint: {
              type: Type.STRING,
              description: "Casus için genel bir ipucu kategorisi (Örn: Meslek, Yiyecek, Şehir)",
            },
          },
          required: ["word", "hint"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response text");

    const result = JSON.parse(text);
    return {
      word: result.word || "Hata",
      hint: result.hint || "Bilinmiyor"
    };

  } catch (error) {
    console.error("Gemini API hatası:", error);
    return { word: "", hint: "" }; // Fallback handled in App.tsx
  }
};
