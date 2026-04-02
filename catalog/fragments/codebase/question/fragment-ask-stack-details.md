---
id: fragment-ask-stack-details
name: Ask Stack Details
type: question
version: 1.0
domain: codebase
---

# Fragment: Ask Stack Details

Gathers the full technical picture of the project: libraries and frameworks, architecture patterns, best practices, and explicit dos and don'ts.

## Question

Now let's capture the technical details that will define the stack rule.

Answer each section below. You can answer all at once or section by section.

---

> **1. Tech Stack**
>
> List the key technologies, frameworks, and libraries this project uses.
>
> Examples: React 18, Next.js 14, Tailwind CSS, Prisma, Zod, tRPC, PostgreSQL, Redis, Docker

---

> **2. Architecture**
>
> What architecture patterns or structural decisions does this project follow?
>
> Examples: feature-based folder structure, layered architecture, event-driven, CQRS, domain-driven design, BFF pattern, REST + OpenAPI

---

> **3. Best Practices**
>
> What practices does this project enforce consistently?
>
> Examples: always use TypeScript strict mode, colocate tests with source, write tests before merging, use environment variables for all secrets

---

> **4. Dos** — patterns and approaches to always follow
>
> Examples: use Zod for all input validation, use named exports only, keep components under 200 lines, use conventional commits

---

> **5. Don'ts** — patterns and approaches to actively avoid
>
> Examples: never use `any` in TypeScript, never commit .env files, avoid global state, don't use `class` components

---

> **6. Project Conventions** *(optional)*
>
> Any naming rules, file structure conventions, or team agreements not covered above?
>
> Examples: use `kebab-case` for file names, domain folders are named after business capabilities, PRs must link a Jira ticket

## Guidelines

- Be explicit and specific — vague entries like "write clean code" are not useful.
- Focus on what's actually enforced today, not aspirational practices.
- If a don't has an approved alternative, mention it (e.g., "don't use X — use Y instead").
- Sections 4 and 5 benefit most from specificity.

## Capture

- **tech_stack**: List of technologies (name + version when relevant)
- **architecture**: List of architecture patterns and structural decisions
- **best_practices**: List of consistently enforced practices
- **dos**: List of explicit patterns to follow
- **donts**: List of explicit patterns to avoid, with alternatives where applicable
- **conventions**: Optional list of naming rules, folder structure, or team agreements
