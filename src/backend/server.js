require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { generateStory } = require('./generate');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', async (req, res) => {
  try {
    const { checkProvidersHealth } = require('./generate');
    const providerStatus = await checkProvidersHealth();
    const ok = providerStatus.every(p => p.hasKey && p.reachable);
    return res.json({ ok, providers: providerStatus });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err && err.message });
  }
});

app.get("/ping", (req, res) => {
  console.log("PING HIT");
  res.json({ ok: true });
});

app.post('/api/generate', async (req, res) => {
  const { promptText, languageCode } = req.body || {};
  if (!promptText || typeof promptText !== 'string') return res.status(400).json({ error: 'promptText required' });

  try {
    const result = await generateStory(promptText, languageCode || 'en');
    if (!result) return res.status(500).json({ error: 'All models failed.' });
    return res.json(result);
  } catch (err) {
    console.error('Generate endpoint error:', err && err.message);
    return res.status(500).json({ error: 'Generation failed' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
