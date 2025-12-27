import express from "express";
import cors from "cors";
import { generateChatResponse } from "./gemini.js";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || messages.length === 0) {
      return res.status(400).json({ reply: "No message received." });
    }

    const result = await generateChatResponse(messages);

    return res.json(result);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.json({
      reply: "Something went wrong. I'm still here with you though.",
    });
  }
});

app.listen(5000, () => {
  console.log("🔥 Backend running on http://localhost:5000");
});
