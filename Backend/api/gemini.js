import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeMessage(message) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are an intent classifier for a student mental health app.

Return ONLY valid JSON in this exact format:
{
  "intent": "venting_general | academic_stress | anxiety_loneliness | family_pressure | self_harm_intent",
  "supportLevel": "low | moderate | crisis",
  "stressCategory": "exams | family | loneliness | other"
}

Rules:
- If message shows self-harm or suicide → crisis + self_harm_intent
- Do not add extra text. JSON ONLY.

Message:
"${message}"
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return JSON.parse(text);
}
