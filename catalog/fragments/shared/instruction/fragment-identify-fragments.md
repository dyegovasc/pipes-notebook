---
id: fragment-identify-fragments
name: Identify Fragments
type: instruction
version: 1.0
domain: all
---

# Fragment: Identify Fragments

Determines which fragments to reuse and which to create.

## Instructions

1. **For each defined phase, identify what fragments are needed**

2. **Check existing fragments for reuse opportunities:**
   - Review `context` fragments — Background information
   - Review `instruction` fragments — Directives on how to perform
   - Review `validation` fragments — Checks and verification
   - Review `output` fragments — Formatting and delivery
   - Review `question` fragments — Prompt templates for gathering input

3. **For each new fragment needed, ask:**
   - What should this fragment be called? (id)
   - What type is it? (context/instruction/validation/output/question)
   - What should it contain? (description)

4. **Validate:**
   - Ensure each phase has at least one fragment assigned

## Inputs

- Defined phases from `fragment-define-phases`
- Catalog of existing fragments

## Output

**To Reuse:**
- `fragment-existing-id` (from Phase X)

**To Create:**
- `fragment-new-id` (type: question) — Description
- `fragment-new-id` (type: instruction) — Description
