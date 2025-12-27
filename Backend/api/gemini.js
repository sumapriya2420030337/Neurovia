import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);

export async function generateChatResponse(messages) {
  const lastUserMessage = messages[messages.length - 1]?.text?.toLowerCase();

  // 🚨 CRISIS DETECTION (HARD STOP)
  const crisisWords = [
    "kill myself",
    "suicide",
    "die",
    "end my life",
    "i want to die",
  ];

  if (crisisWords.some(word => lastUserMessage.includes(word))) {
    return {
      triggerSOS: true,
      reply: "I'm really glad you reached out. You’re not alone, and help is available right now."
    };
  }

  // 🧠 Convert frontend messages → Gemini format
  const chatHistory = messages
    .filter(m => m.sender === "user") // 🔥 CRITICAL: user only
    .map(m => ({
      role: "user",
      parts: [{ text: m.text }]
    }));

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `
You are NIA, a mental-health support companion for college students.

Rules:
- Be empathetic, warm, and human
- Do NOT repeat the same sentence
- Validate emotions before advice
- Gently challenge negative thinking
- No clinical language
- No judgment
`
  });

  const chat = model.startChat({
    history: chatHistory,
  });

  const result = await chat.sendMessage(lastUserMessage);
  const response = result.response.text();

  return {
    reply: response,
    triggerSOS: false
  };
}
