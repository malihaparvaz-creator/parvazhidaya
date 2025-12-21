require("dotenv").config();
const fetch = require("node-fetch");
const AbortController = global.AbortController || require("abort-controller");

/* ===================== TIMEOUT ===================== */

function withTimeout(ms) {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller;
}

async function safeFetch(url, options, name) {
  const controller = withTimeout(8000);
  const res = await fetch(url, { ...options, signal: controller.signal });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`${name} HTTP ${res.status}: ${t}`);
  }

  return res.json();
}

function clean(text) {
  if (!text || typeof text !== "string") return null;
  return text.trim();
}

/* ===================== SYSTEM PROMPT ===================== */

function systemPrompt(language) {
  return `
You are a calm, kind support assistant.

STRICT RULES:
- Always respond ONLY in the language requested. Do NOT mix languages or scripts. 
- If you cannot produce proper text in that language, output the predefined $(SAFE_FALLBACKS) fallback in the same language. 
- Strictly follow this rule for every response.
- Talk directly to the user ssonly.
- Never create stories, characters, names, or scenes.
- Never narrate events or use third person.
- Do not invent people, places, or situations.
- Do not turn metaphors into stories.
- Respond strictly to the emotion or situation the user expresses.
- Respond in the same language as the user prompt.
- Use exactly 10 lines in your response.
- Respond using Islamic words and concepts where appropriate.
- Use simple Islamic references (like "Allah", "Prophet Muhammad", "prayer", "patience", "trust in Allah", etc.) where relevant.
- Do not reference specific religious texts or quotes.
- If the user mentions an object (like “onion”), treat it as how the user feels.
- Use very simple words that even a small child can understand.
- Be supportive, gentle, and honest.
- No preaching, no lessons, no lectures.
- No emojis.
- No titles.
- No explanations.

OUTPUT RULES:
- Exactly 10 lines.
- One simple sentence per line.
- Speak calmly and directly.
- Use ONLY the selected language.
- Do not mix languages.
- Do not add anything before or after the 10 lines.

If you cannot follow these rules, respond with a simple 10-line supportive message in the same language.
`;
}

/* ===================== AI PROVIDERS ===================== */

async function callGemini(prompt, language) {
  if (!process.env.GEMINI_KEY) throw new Error("Gemini key missing");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_KEY}`;

  const data = await safeFetch(
    url,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: systemPrompt(language) + "\nUser: " + prompt }]
        }]
      })
    },
    "Gemini"
  );

  const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join("\n");
  return clean(text);
}

async function callDeepSeek(prompt, language) {
  if (!process.env.DEEPSEEK_KEY) throw new Error("DeepSeek key missing");

  const data = await safeFetch(
    "https://api.deepseek.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DEEPSEEK_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt(language) },
          { role: "user", content: prompt }
        ],
        max_tokens: 200
      })
    },
    "DeepSeek"
  );

  return clean(data?.choices?.[0]?.message?.content);
}

async function callOpenRouter(prompt, language) {
  if (!process.env.OPENROUTER_KEY) throw new Error("OpenRouter key missing");

  const data = await safeFetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [
          { role: "system", content: systemPrompt(language) },
          { role: "user", content: prompt }
        ],
        max_tokens: 200
      })
    },
    "OpenRouter"
  );

  return clean(data?.choices?.[0]?.message?.content);
}

/* ===================== SAFE FALLBACK ===================== */

const SAFE_FALLBACKS = {
  en: [
    "I hear you.",
    "I am here with you.",
    "Your feeling matters.",
    "Take one slow breath.",
    "You are not alone."
  ],
  ar: [
    "أنا أسمعك.",
    "أنا هنا معك.",
    "مشاعرك مهمة.",
    "خذ نفسًا ببطء.",
    "أنت لست وحدك."
  ],
  ur: [
    "میں آپ کی بات سن رہا ہوں۔",
    "میں آپ کے ساتھ ہوں۔",
    "آپ کے جذبات اہم ہیں۔",
    "آہستہ سے سانس لیں۔",
    "آپ اکیلے نہیں ہیں۔"
  ],
  hi: [
    "मैं आपको सुन रहा हूँ।",
    "मैं आपके साथ हूँ।",
    "आपकी भावना मायने रखती है।",
    "धीरे से साँस लें।",
    "आप अकेले नहीं हैं।"
  ],
  tr: [
    "Seni duyuyorum.",
    "Buradayım, seninleyim.",
    "Duygun önemli.",
    "Yavaşça bir nefes al.",
    "Yalnız değilsin."
  ],
  id: [
    "Aku mendengarkanmu.",
    "Aku ada di sini bersamamu.",
    "Perasaanmu itu penting.",
    "Tarik napas perlahan.",
    "Kamu tidak sendirian."
  ],
  fr: [
    "Je t’écoute.",
    "Je suis là avec toi.",
    "Ton sentiment compte.",
    "Respire lentement.",
    "Tu n’es pas seul."
  ],
  es: [
    "Te escucho.",
    "Estoy aquí contigo.",
    "Tu sentimiento importa.",
    "Respira despacio.",
    "No estás solo."
  ],
  zh: [
    "我在听你说。",
    "我在你身边。",
    "你的感受很重要。",
    "慢慢呼吸。",
    "你并不孤单。"
  ]
};

/* ===================== MAIN ===================== */

async function generateStory(promptText, languageCode = "en") {
  const providers = [
    callGemini,
    callDeepSeek,
    callOpenRouter
  ];

  for (const fn of providers) {
    try {
      const text = await fn(promptText, languageCode);
      if (text) {
        return { story: text };
      }
    } catch (err) {
      console.warn(err.message);
    }
  }

  const lines = SAFE_FALLBACKS[languageCode] || SAFE_FALLBACKS.en;
  return { story: lines.join("\n") };
}

module.exports = { generateStory };
