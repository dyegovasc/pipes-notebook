---
id: fragment-ask-memory-contract
name: Ask Memory Contract
type: question
version: 1.0
domain: all
---

# Fragment: Ask Memory Contract

Capture the memory behavior a pipeline should declare.

## Question
Should this pipeline use notebook memory, and if so, what memory contract should it declare?

## Options
- none: "No memory support"
- read: "Read memory only"
- write: "Write memory only"
- read_write: "Read and write memory"

## Guidelines
- Choose the narrowest scope that fits the pipeline
- Identify whether the pipeline needs `MEMORY.md`, `CURRENT.md`, session notes, or note promotion
- Decide whether compaction is optional or required
- Choose `strict`, `normal`, or `adaptive` model guidance

## Capture
- Mode
- Scope
- Read targets
- Write targets
- Compaction requirement
- Model guidance
