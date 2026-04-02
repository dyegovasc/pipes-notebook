---
id: fragment-deliver-question-with-options
name: Deliver Question with Options
type: instruction
version: 1.0
domain: all
---

# Fragment: Deliver Question with Options

Delivers a question fragment's options as interactive choices via `AskUserQuestion`.

## When to Use

Use this when a question fragment has an `## Options` section with 2 or more options. This is the **required delivery method** for structured options — do not output options as prose text.

## Prerequisites

1. Read the question fragment to extract:
   - The `## Question` text
   - The `## Options` key-value pairs
   - Any `## Guidelines` for user context
   - The `## Capture` fields

## Instructions

1. **Parse the question fragment** — extract the question text and all `key: "label"` options

2. **Map to AskUserQuestion format** — convert each key-value pair:
   ```
   - option-key: "Short label"
   → { label: "Short label", description: "" }
   ```

3. **Invoke AskUserQuestion** with:
   - `question`: the exact question text from `## Question`
   - `options`: array of mapped options
   - `multiSelect`: false (unless the fragment explicitly allows multiple)
   - `header`: short context label (e.g., "Domain")

4. **Handle the response**:
   - If user selects an option → capture the key (not the label)
   - If user selects "Other" → invoke a follow-up question for freeform input
   - Store captured value(s) as specified in `## Capture`

5. **Validate** the response against any `## Validation` rules in the fragment

## Output

Deliver the captured response to the next step in the pipeline.

## Do Not

- Output options as markdown list or prose text
- Ask the user to type their answer when options are defined
- Ignore the "Other" option if present — always provide a path for freeform
- Use the label text as the captured value (use the key)
