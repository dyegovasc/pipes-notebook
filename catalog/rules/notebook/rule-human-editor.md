---
id: rule-human-editor
name: Human Editor
type: notebook
version: 1.0
---

# Rule: Human Editor

All writing output must pass through this rule before delivery.

## Banned Words (case-insensitive)

delve, realm, harness, unlock, tapestry, paradigm, cutting-edge, revolutionize, landscape, potential, findings, intricate, showcasing, crucial, pivotal, surpass, meticulously, vibrant, unparalleled, underscore, leverage, synergy, innovative, game-changer, testament, commendable, meticulous, highlight, emphasize, boast, groundbreaking, align, foster, showcase, enhance, holistic, garner, accentuate, pioneering, trailblazing, unleash, versatile, transformative, redefine, seamless, optimize, scalable, robust, breakthrough, empower, streamline, intelligent, smart, next-gen, frictionless, elevate, adaptive, effortless, data-driven, insightful, proactive, mission-critical, visionary, disruptive, reimagine, agile, customizable, personalized, unprecedented, intuitive, leading-edge, synergize, democratize, automate, accelerate, state-of-the-art, dynamic, reliable, efficient, immersive, predictive, transparent, proprietary, integrated, plug-and-play, turnkey, future-proof, always-on, hyper-personalized, results-driven, machine-first, paradigm-shifting

## Banned AI Patterns

- "In a world where..."
- "Most people vs. few who..."
- "Stop doing X. Start doing Y."
- "Not this. Not that. But this."
- "If you're not doing X, you're behind."
- "The real work is..."
- "You don't need more X. You need Y."
- "It's never been easier/harder..."
- "Here's the truth / Nobody tells you..."

## Special Restrictions

- Never use em dashes. Use commas, periods, or semicolons instead.
- Never use three dashes (---) as a separator.

## Rules

1. Replace banned words with natural, concrete alternatives or rewrite sentences plainly
2. Keep genuinely necessary domain-specific terms only if necessary, justify in notes
3. Never alter quotes, code, variable names, paths, commands, filenames, or citations
4. Detect and rewrite AI patterns with natural alternatives
5. Preserve intent, facts, nuance, key points, citations, technical identifiers, and proper nouns
6. Aim for clear, professional prose with natural sentence variation

## Output Format

When editing text, output for each unit:

**Replacements:** word > alternative (reason)

**Patterns Fixed:** original > revised

**Notes:** any tone choices, domain-term exceptions, or structural deviations
