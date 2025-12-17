import type { VercelRequest, VercelResponse } from '@vercel/node';

// Allow Node.js runtime (default)
// No edge runtime config

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only POST allowed
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Invalid message format. Expected { message: string }' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('CRITICAL: GEMINI_API_KEY is missing');
            return res.status(500).json({ error: 'Server misconfiguration: Missing API Key' });
        }

        // Call Gemini REST API directly using fetch (Node.js 18+ supports fetch natively)
        const apiVersion = 'v1beta';
        const model = 'gemini-1.5-pro';
        const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${apiKey}`;

        const systemPrompt = `
      You are Aura, an AI assistant for Arunava Saha's portfolio website.
      Professional, friendly, and concise.
      Arunava is a Full Stack Developer & AI Engineer (React, Node, Python, data, automation).
      Contact: sahap3264@gmail.com.
    `;

        const payload = {
            contents: [
                {
                    parts: [
                        { text: systemPrompt },
                        { text: `User: ${message}\nAura:` }
                    ]
                }
            ]
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Gemini API Error:', response.status, errorText);
            return res.status(response.status).json({ error: 'Gemini API Error', details: errorText });
        }

        const data = await response.json();

        // Extract text from Gemini response structure
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!reply) {
            console.error('Unexpected Gemini response format:', JSON.stringify(data));
            return res.status(500).json({ error: 'Invalid response from AI model' });
        }

        return res.status(200).json({ reply });

    } catch (error: any) {
        console.error('Backend Request Error:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
