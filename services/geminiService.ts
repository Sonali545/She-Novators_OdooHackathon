
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is handled securely and not hard-coded.
// This relies on the execution environment having `process.env.API_KEY` set.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Chatbot will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getChatbotResponse = async (message: string, history: {role: string, parts: {text: string}[]}[]) => {
  if (!API_KEY) {
    return "The chatbot is currently unavailable. The API key is not configured.";
  }

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [...history, { role: "user", parts: [{ text: message }] }],
        config: {
            systemInstruction: "You are a friendly and helpful assistant for SkillForge. Your goal is to answer user questions about the platform, suggest skills to learn, or help them navigate. Keep your answers concise and encouraging.",
            thinkingConfig: { thinkingBudget: 0 } // Disable thinking for low latency
        },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I'm having trouble connecting right now. Please try again later.";
  }
};
