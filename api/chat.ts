import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    try {
        const { message } = req.body;
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Invalid message' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('CRITICAL: GEMINI_API_KEY Missing');
            return res.status(500).json({ error: 'Server Config Error' });
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`;

        const systemPrompt = `You are Aura, an assistant for Arunava Saha. Professional and concise.`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: systemPrompt }, { text: `User: ${message}\nAura:` }] }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini Error:', errorText);
            return res.status(response.status).json({ error: 'AI Provider Error', details: errorText });
        }

        const data = await response.json();
        const reply = (data as any).candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) return res.status(500).json({ error: 'Empty response from AI' });

        return res.status(200).json({ reply });

    } catch (error: any) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
