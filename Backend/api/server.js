import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { analyzeMessage } from "./gemini.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Neurovia AI backend running");
});

app.post("/analyze", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message missing" });
  }

  let response = {
    intent: "academic_stress",
    supportLevel: "moderate",
    stressCategory: "exams"
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Neurovia backend running on http://localhost:${PORT}`);
});
