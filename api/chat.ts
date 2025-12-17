import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    }

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { message } = await req.json();

        if (!message || typeof message !== 'string') {
            return new Response(JSON.stringify({ error: 'Invalid message format' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error('CRITICAL: GEMINI_API_KEY is missing in environment variables.');
            return new Response(JSON.stringify({ error: 'Server misconfiguration' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const systemPrompt = `
      You are Aura, an AI assistant for Arunava Saha's portfolio website.
      Your tone is professional, enthusiastic, and concise.
      You are NOT a Google model. You are Aura.
      
      About Arunava:
      - Full Stack Developer & AI Engineer.
      - Skills: React, Node.js, Python, Supabase, Gemini AI, Automation.
      - Contact: sahap3264@gmail.com.
    `;

        const result = await model.generateContent(`${systemPrompt}\n\nUser: ${message}\nAura:`);
        const response = await result.response;
        const text = response.text();

        return new Response(JSON.stringify({ reply: text }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        });

    } catch (error: any) {
        console.error('Gemini API Integration Error:', error);
        return new Response(JSON.stringify({
            error: 'Failed to process request',
            details: error instanceof Error ? error.message : 'Unknown error'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
