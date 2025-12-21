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
- Always respond ONLY in the language requested.
- Talk directly to the user only.
- Never create stories, characters, names, or scenes.
- Never narrate events or use third person.
- Respond strictly to the emotion or situation the user expresses.
- Respond in the same language as the user prompt.
- Use exactly 10 lines in your response.
- Use simple Islamic references where relevant ("Allah", "prayer", "patience", etc.)
- Use very simple words that even a small child can understand.
- Be supportive, gentle, and honest.
- No preaching, no lessons, no lectures.
- No emojis, titles, or explanations.

OUTPUT RULES:
- Exactly 10 lines.
- One simple sentence per line.
- Speak calmly and directly.
- Use ONLY the selected language.
- Do not mix languages.

If you cannot follow these rules, respond with a simple 10-line supportive message in the same language.
`;
}

/* ===================== SAFE FALLBACKS ===================== */
const SAFE_FALLBACKS = {
  en: [
    "I hear you.",
    "I am here with you.",
    "Your feeling matters.",
    "Take one slow breath.",
    "You are not alone.",
    "Trust in Allah.",
    "Be gentle with yourself.",
    "Make dua quietly.",
    "Allah is near.",
    "Peace is within reach."
  ],
  ar: [
    "أنا أسمعك.",
    "أنا هنا معك.",
    "مشاعرك مهمة.",
    "خذ نفسًا ببطء.",
    "أنت لست وحدك.",
    "ثق بالله.",
    "كن لطيفًا مع نفسك.",
    "صلِّ بصمت.",
    "الله قريب.",
    "السلام قريب منك."
  ],
  ur: [
    "میں آپ کی بات سن رہا ہوں۔",
    "میں آپ کے ساتھ ہوں۔",
    "آپ کے جذبات اہم ہیں۔",
    "آہستہ سے سانس لیں۔",
    "آپ اکیلے نہیں ہیں۔",
    "اللہ پر بھروسہ کریں۔",
    "اپنے آپ پر نرمی کریں۔",
    "خاموشی سے دعا کریں۔",
    "اللہ قریب ہے۔",
    "امن آپ کے قریب ہے۔"
  ],
  hi: [
    "मैं आपको सुन रहा हूँ।",
    "मैं आपके साथ हूँ।",
    "आपकी भावना मायने रखती है।",
    "धीरे से साँस लें।",
    "आप अकेले नहीं हैं।",
    "अल्लाह पर भरोसा करें।",
    "अपने आप के प्रति कोमल रहें।",
    "चुपचाप दुआ करें।",
    "अल्लाह पास हैं।",
    "शांति आपके पास है।"
  ],
  tr: [
    "Seni duyuyorum.",
    "Buradayım, seninleyim.",
    "Duygun önemli.",
    "Yavaşça bir nefes al.",
    "Yalnız değilsin.",
    "Allah’a güven.",
    "Kendine nazik ol.",
    "Sessizce dua et.",
    "Allah yakın.",
    "Huzur seninle."
  ],
  id: [
    "Aku mendengarkanmu.",
    "Aku ada di sini bersamamu.",
    "Perasaanmu penting.",
    "Tarik napas perlahan.",
    "Kamu tidak sendiri.",
    "Percayalah pada Allah.",
    "Bersikap lembut pada dirimu.",
    "Berdoa dengan tenang.",
    "Allah dekat.",
    "Damai ada bersamamu."
  ],
  fr: [
    "Je t’écoute.",
    "Je suis là avec toi.",
    "Ton sentiment compte.",
    "Respire lentement.",
    "Tu n’es pas seul.",
    "Fais confiance à Allah.",
    "Sois doux avec toi-même.",
    "Fais une prière tranquille.",
    "Allah est proche.",
    "La paix est avec toi."
  ],
  es: [
    "Te escucho.",
    "Estoy aquí contigo.",
    "Tu sentimiento importa.",
    "Respira despacio.",
    "No estás solo.",
    "Confía en Allah.",
    "Sé amable contigo mismo.",
    "Reza tranquilamente.",
    "Allah está cerca.",
    "La paz te acompaña."
  ],
  zh: [
    "我在听你说。",
    "我在你身边。",
    "你的感受很重要。",
    "慢慢呼吸。",
    "你并不孤单。",
    "信任安拉。",
    "善待自己。",
    "安静祈祷。",
    "安拉在你身边。",
    "平安与你同在。"
  ]
};

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
        contents: [{ parts: [{ text: systemPrompt(language) + "\nUser: " + prompt }] }]
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

/* ===================== MAIN ENTRY ===================== */
async function generateStory(promptText, languageCode = "en") {
  const providers = [callGemini, callDeepSeek, callOpenRouter];
  for (const fn of providers) {
    try {
      const text = await fn(promptText, languageCode);
      if (text) return { story: text };
    } catch (err) {
      console.warn(err.message);
    }
  }
  // fallback
  const lines = SAFE_FALLBACKS[languageCode] || SAFE_FALLBACKS.en;
  return { story: lines.join("\n") };
}

/* ===================== NETLIFY FUNCTION ===================== */
exports.handler = async function(event, context) {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const { promptText, languageCode } = body;
    if (!promptText) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "promptText required" })
      };
    }
    const result = await generateStory(promptText, languageCode || "en");
    return {
      statusCode: 200,
      body: JSON.stringify({ story: result.story })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        story:
          "I hear you.\nI am here with you.\nYour feeling matters.\nTake one slow breath.\nYou are not alone.\nTrust in Allah.\nBe gentle with yourself.\nMake dua quietly.\nAllah is near.\nPeace is within reach."
      })
    };
  }
};
