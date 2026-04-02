---
id: fragment-ask-project-context
name: Ask Project Context
type: question
version: 1.0
domain: codebase
---

# Fragment: Ask Project Context

Gathers the foundational identity of the codebase: project name, type, and primary language/runtime.

## Question

Let's establish the project context before defining the stack rule.

> **What is this project?**
>
> Answer the following:
>
> 1. **Project name** — What is the project called?
> 2. **Project type** — Pick the closest match:
>    - `web-app` — Browser-based frontend or full-stack web app
>    - `api` — Backend service / REST or GraphQL API
>    - `cli` — Command-line tool
>    - `library` — Reusable package or SDK
>    - `mobile` — iOS, Android, or cross-platform mobile
>    - `data` — Data pipeline, ETL, analytics, or ML project
>    - `monorepo` — Multi-package repository
>    - `other` — Describe
> 3. **Primary language and runtime** — e.g., TypeScript / Node.js, Python 3.11, Go 1.22, Java 21 + Spring

## Guidelines

- This is about the *project identity*, not the full stack — deeper tech stack details come next.
- If the project spans multiple types (e.g., full-stack monorepo), pick the primary one and note the secondary.
- The runtime matters — include version when relevant (e.g., Node 20 vs Node 18 may have different conventions).

## Capture

- **project_name**: The human-readable project name
- **project_type**: One of the type keys above (or freeform description if `other`)
- **primary_language**: e.g., `TypeScript`
- **runtime**: e.g., `Node.js 20`, `Python 3.11`, `JVM 21`
