import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateChatResponse(messages) {
  const lastMessage = messages[messages.length - 1]?.text || "";

  // Crisis detection (safe)
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
    // 🔥 CURRENT SUPPORTED MODEL
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are NIA, a warm, empathetic mental-health support companion for college students.",
      },
      ...messages.map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      })),
    ],
  });

  return {
    triggerSOS: false,
    reply: completion.choices[0].message.content,
  };
}
