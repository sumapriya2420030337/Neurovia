import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateChatResponse(messages) {
  // Normalize last user message safely
  const last = messages[messages.length - 1];
  const lastMessage =
    last?.text || last?.content || "";

  // Crisis detection (safe + minimal)
  const crisisWords = [
    "kill myself",
    "suicide",
    "end my life",
    "i want to die",
  ];

  if (crisisWords.some(w => lastMessage.toLowerCase().includes(w))) {
    return {
      triggerSOS: true,
      reply:
        "I’m really glad you reached out. You’re not alone, and help is available right now.",
    };
  }

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are NIA, a warm and empathetic mental-health companion for college students. " +
          "Keep responses supportive, calm, and concise (3–5 sentences max). " +
          "Ask only one gentle follow-up question.",
      },
      ...messages.map(m => ({
        role: m.role || (m.sender === "user" ? "user" : "assistant"),
        content: m.content || m.text,
      })),
    ],
  });

  return {
    triggerSOS: false,
    reply: completion.choices[0].message.content,
  };
}
