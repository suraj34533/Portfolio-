import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
    runtime: 'edge', // Use Edge runtime for faster cold starts
};

export default async function handler(req: Request) {
    // CORS Headers for cross-origin requests (if needed, mostly for localhost/preview)
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers });
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
            status: 405,
            headers,
        });
    }

    try {
        const { message } = await req.json();

        if (!message) {
            return new Response(JSON.stringify({ error: 'Message is required' }), {
                status: 400,
                headers,
            });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error('Missing GEMINI_API_KEY');
            return new Response(JSON.stringify({ error: 'Server Configuration Error' }), {
                status: 500,
                headers,
            });
        }

        // Initialize Gemini
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Chat context/instructions
        const context = `
      You are Aura, an AI assistant for Arunava Saha's portfolio website. 
      Your goal is to help visitors navigate the site, understand Arunava's skills (Full Stack, AI, Automation), and explain his projects.
      
      Key Information:
      - Arunava is a Full Stack Developer and AI Engineer.
      - Skills: React, Node.js, Python, Supabase, Gemini AI, Automation.
      - Projects include: Portfolio Website (this one), Fitness AI, Real Estate Bot.
      - Contact: sahap3264@gmail.com, +91 7304356686.

      Tone: Professional, friendly, enthusiastic, and concise. 
      Do NOT mention you are a Google model. You are Aura.
    `;

        // Start chat or send message
        // For simplicity in this stateless function, we verify single turn or short context.
        // Ideally, pass history from frontend if needed. 
        // Here we're doing a simple generation for robustness.
        const result = await model.generateContent(`${context}\n\nUser: ${message}\nAura:`);
        const response = await result.response;
        const text = response.text();

        return new Response(JSON.stringify({ reply: text }), {
            status: 200,
            headers,
        });

    } catch (error: any) {
        console.error('Gemini API Error:', error);
        return new Response(JSON.stringify({
            error: 'Failed to process request',
            details: error.message
        }), {
            status: 500,
            headers,
        });
    }
}
