---
id: fragment-ask-writing-preferences
type: question
name: Ask Writing Preferences
version: 1.0
domain: notebook
---

# Fragment: Ask Writing Preferences

## Question

What are your writing preferences for this notebook? Help the agent generate a tailored writing style rule.

Please answer the following:

1. **Tone** — What tone should writing in this notebook have? (e.g. formal, casual, technical, conversational, academic)
2. **Banned words or patterns** — Are there words, phrases, or patterns you want to avoid? Common defaults to consider:
   - Filler words: "very", "really", "quite", "just", "basically", "actually"
   - Business jargon: "leverage", "synergy", "circle back", "deep dive"
   - AI-sounding phrases: "delve into", "it's worth noting", "in conclusion"
   - Passive voice overuse
3. **Formatting constraints** — Any formatting rules? (e.g. no em dashes, no Oxford comma, sentence case headings only, max paragraph length)
4. **Domain exceptions** — Are there domains where different rules apply? (e.g. technical docs use a different tone than personal notes)
5. **Anything else** — Any other preferences not covered above?

## Capture

Record the following from the user's response:

- `tone`: the desired overall tone
- `banned_words`: list of words or phrases to avoid
- `banned_patterns`: structural or stylistic patterns to avoid
- `formatting_rules`: formatting constraints
- `domain_exceptions`: domains with different rules (empty if none)
- `extra_preferences`: anything else the user specifies

## Options

- formal: "Formal and professional"
- casual: "Casual and conversational"
- technical: "Technical and precise"
- academic: "Academic and structured"
- mixed: "Depends on the domain"

## Guidelines

- The banned word defaults listed in the question are suggestions — the user may adopt, modify, or ignore them
- Do not pre-populate the rule with defaults the user didn't confirm
- If the user provides a partial answer, ask for the missing parts before advancing
