# AI Conversation Logic – Neurovia

Owner: Member 2 (AI & Conversation)

This folder documents the AI behavior contract.

## Flow
User Message  
→ Dialogflow Intent Detection  
→ Gemini Empathy Response (if not crisis)  
→ Severity Classification  
→ Frontend reacts based on severity  

## Crisis Rule
If severity = crisis:
- AI response is ignored
- Chat input is disabled
- SOS / Support screen is shown
- Human help takes priority

## Data Policy
- No chat messages stored
- Only anonymized labels sent to backend
- Fully privacy-first design
