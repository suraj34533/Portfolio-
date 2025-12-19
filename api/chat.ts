import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const MODELS = ['gemini-2.5-flash', 'gemini-2.5-pro'];

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { message } = req.body;
    if (!message || typeof message !== 'string') return res.status(400).json({ error: 'Invalid message' });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('CRITICAL: GEMINI_API_KEY Missing');
        return res.status(500).json({ error: 'Server Config Error' });
    }

    const systemPrompt = `You are Aura, an assistant for Arunava Saha. Professional and concise.`;
    const payload = {
        contents: [{ parts: [{ text: systemPrompt }, { text: `User: ${message}\nAura:` }] }]
    };

    let lastError = null;

    for (const model of MODELS) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
            console.log(`Attempting model: ${model}`);

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.warn(`Model ${model} failed: ${response.status}`, errorText);
                lastError = errorText;
                continue; // Try next model
            }

            const data = await response.json();
            const reply = (data as any).candidates?.[0]?.content?.parts?.[0]?.text;

            if (reply) return res.status(200).json({ reply });

        } catch (error) {
            console.error(`Error with model ${model}:`, error);
            lastError = error;
        }
    }

    // All models failed
    console.error('All models failed. Last error:', lastError);
    return res.status(500).json({ error: 'AI Service Unavailable', details: String(lastError) });
}
