# Firestore Data Schema – Neurovia

## Collection: sessions
Stores anonymous session-level insights.

Fields:
- sessionId (string)
- supportLevel (string) → low | moderate | crisis
- stressCategory (string) → exams | family | loneliness | finance | other
- createdAt (timestamp)

## Collection: mood_checkins (optional)
Stores optional self-reported check-ins.

Fields:
- sessionId (string)
- moodScore (number 1–5)
- timestamp (timestamp)

## Important Notes
- No names
- No emails
- No chat messages
- No device identifiers
- No IP addresses
