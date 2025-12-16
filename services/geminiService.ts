
import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("API_KEY is missing in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const streamChatResponse = async (
  history: { role: string; text: string }[],
  newMessage: string,
  onChunk: (text: string) => void
) => {
  const client = getClient();
  if (!client) {
    onChunk("I am currently offline due to a missing configuration (API Key). Please check the console for details.");
    return;
  }

  try {
    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are 'Aura', an advanced AI voice assistant and guide for Arunava Saha's luxury portfolio website.
        
        IDENTITY:
        - Name: Aura
        - Role: Interactive Guide & AI Assistant
        - Tone: Professional yet friendly, intelligent, slightly futuristic, and helpful. 
        - Style: Concise spoken-style responses (avoid long markdown lists unless asked). Use clear, natural language suitable for text-to-speech.

        ARUNAVA'S PROFILE:
        - Role: AI Developer & Automation Engineer.
        - Core Skills: Python, React, TensorFlow, Gemini API, n8n, AWS.
        - Key Projects: 'Neural Nexus' (AI Analytics), 'Quantum Flow' (Automation), 'Visionary 3D'.
        - Experience: Senior AI Developer at InnovateTech Solutions.

        CAPABILITIES:
        - You can guide the user through the website.
        - You can explain technical skills and projects.
        - You can answer questions about Arunava's career.

        INTERACTION RULES:
        - If the user says "take me to projects" or "show skills", acknowledge it enthusiastically (e.g., "Navigating to the Projects section now.").
        - If the user says "start tour", act as a tour guide introducing the portfolio.
        - Keep answers under 80 words for better voice experience, unless requested otherwise.
        - Use emojis sparingly to add personality.
        `,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessageStream({ message: newMessage });

    for await (const chunk of result) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("I apologize, but I'm having trouble connecting to the neural network right now. Please try again later.");
  }
};
