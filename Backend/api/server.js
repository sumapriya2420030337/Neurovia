import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { generateChatResponse } from "./groq.js";

const app = express();

/* ===============================
   Middleware
=============================== */
app.use(
  cors({
    origin: "*", // OK for MVP
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

/* ===============================
   Health Check
=============================== */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* ===============================
   Chat Route
=============================== */
app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ reply: "No messages received" });
    }

    const result = await generateChatResponse(messages);
    res.status(200).json(result);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({
      reply: "Something went wrong, but I’m still here with you.",
    });
  }
});

/* ===============================
   Feedback Route
=============================== */
app.post("/feedback", async (req, res) => {
  // 🔴 TEMP DEBUG LOG (ONLY ADDITION)
  console.log("📩 FEEDBACK BODY RECEIVED:", req.body);

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.FEEDBACK_EMAIL,
        pass: process.env.FEEDBACK_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Neurovia Feedback" <${process.env.FEEDBACK_EMAIL}>`,
      to: process.env.FEEDBACK_EMAIL,
      subject: "New Feedback Received – Neurovia",
      html: `
        <h2>New Feedback Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("FEEDBACK ERROR:", err);
    res.status(500).json({ success: false });
  }
});

/* ===============================
   Server Start
=============================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Backend running on port ${PORT}`);
});
