import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { generateChatResponse } from "./groq.js";

const app = express();

/* ===============================
   Middleware
=============================== */
app.use(cors({
  origin: "*", // allow Firebase + all origins (OK for MVP)
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

/* ===============================
   Health Check Route
=============================== */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* ===============================
   Chat Route (IMPORTANT)
=============================== */
app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    // Validate request
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        reply: "No messages received",
      });
    }

    // Call Groq / LLM
    const result = await generateChatResponse(messages);

    res.status(200).json(result);
  } catch (error) {
    console.error("SERVER ERROR:", error.message);

    res.status(500).json({
      reply: "Something went wrong, but I’m still here with you.",
    });
  }
});

/* ===============================
   Server Start
=============================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Backend running on port ${PORT}`);
});
