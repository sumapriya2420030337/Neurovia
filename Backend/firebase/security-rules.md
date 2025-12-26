# Firestore Security Rules – Neurovia

Principles:
- Anonymous access only
- No read access to raw data by users
- Only aggregated analytics are exposed

Rules Summary:
- Users can WRITE only their own session data
- Users cannot READ other sessions
- Institution dashboard uses read-only aggregated queries
- No document updates after creation (append-only)

Rationale:
These rules prevent data misuse and ensure privacy-first design.
