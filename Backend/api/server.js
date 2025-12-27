import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { generateChatResponse } from "./groq.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || messages.length === 0) {
      return res.status(400).json({ reply: "No messages received" });
    }

    const result = await generateChatResponse(messages);
    res.json(result);
  } catch (err) {
    console.error("SERVER ERROR:", err.message);
    res.status(500).json({
      reply: "Something went wrong, but I’m still here with you.",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Backend running on http://localhost:${PORT}`);
});
