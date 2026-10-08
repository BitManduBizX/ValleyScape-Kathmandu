import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Container health check endpoint
  app.get('/healthz', (_req, res) => {
    res.status(200).send('OK');
  });

  // Server-side Gemini AI Chat endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY environment variable is not configured on the server.',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const { messages } = req.body;
      const systemInstruction =
        "You are Valley Guru (or Guru Bhote), a friendly, context-aware, and deeply knowledgeable local guide for the Kathmandu Valley in Nepal. Respond using accurate, trusted travel data, cultural nuance, respectful etiquette, and authentic warmth. Use occasional Nepali greetings like 'Namaste!' where appropriate. Keep answers concise, helpful, and visually structured.";

      const formattedContents = Array.isArray(messages)
        ? messages.map((m) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: String(m.content || '') }],
          }))
        : [{ role: 'user', parts: [{ text: 'Namaste!' }] }];

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
        },
      });

      return res.json({ text: response.text || '' });
    } catch (error) {
      console.error('Gemini API Error:', error);
      const errMessage = error instanceof Error ? error.message : 'Failed to generate AI response.';
      return res.status(500).json({
        error: errMessage,
      });
    }
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));

    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
