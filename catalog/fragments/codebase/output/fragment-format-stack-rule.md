---
id: fragment-format-stack-rule
name: Format Stack Rule
type: output
version: 1.0
domain: codebase
---

# Fragment: Format Stack Rule

Defines the structure and template for `rule-codebase-stack.md`, the project-local rule that governs AI agent behavior for codebase-specific conventions.

## Format

A markdown file with YAML frontmatter, organized into distinct sections covering stack, architecture, practices, and conventions. Designed to be read by AI agents before taking action on the codebase.

## Template

```markdown
---
id: rule-codebase-stack
name: <project_name> Codebase Stack
type: codebase
version: 1.0
---

# Rule: <project_name> Codebase Stack

This rule defines the canonical stack, architecture decisions, best practices, and coding conventions for <project_name>. AI agents must read and follow this rule before making any code changes.

## Project Identity

| Field | Value |
|-------|-------|
| Name | <project_name> |
| Type | <project_type> |
| Language | <primary_language> |
| Runtime | <runtime> |

## Tech Stack

| Technology | Role | Version |
|------------|------|---------|
| <technology_1> | <role_1> | <version_1> |
| <technology_2> | <role_2> | <version_2> |

## Architecture

<architecture_description — list of patterns and structural decisions in sentence or bullet form>

- <architecture_pattern_1>
- <architecture_pattern_2>

## Best Practices

<practices_that_are_consistently_enforced — numbered list for priority>

1. <best_practice_1>
2. <best_practice_2>

## Dos

Patterns and approaches to always follow:

- <do_1>
- <do_2>

## Don'ts

Patterns and approaches to actively avoid:

- **Never** <dont_1> — use <alternative_1> instead
- **Never** <dont_2>

## Conventions

<optional_section — naming rules, folder structure, team agreements>

- <convention_1>
- <convention_2>
```

## Example

```markdown
---
id: rule-codebase-stack
name: Storefront API Codebase Stack
type: codebase
version: 1.0
---

# Rule: Storefront API Codebase Stack

This rule defines the canonical stack, architecture decisions, best practices, and coding conventions for Storefront API. AI agents must read and follow this rule before making any code changes.

## Project Identity

| Field | Value |
|-------|-------|
| Name | Storefront API |
| Type | api |
| Language | TypeScript |
| Runtime | Node.js 20 |

## Tech Stack

| Technology | Role | Version |
|------------|------|---------|
| NestJS | Web framework | 10 |
| TypeORM | ORM | 0.3 |
| PostgreSQL | Primary database | 15 |
| Redis | Cache + queues | 7 |
| Zod | Input validation | 3 |
| Jest | Testing | 29 |

## Architecture

- Layered architecture: controllers → services → repositories
- Feature-based module structure (each domain is a NestJS module)
- Commands and queries separated (lightweight CQRS)
- All external services wrapped in adapters

## Best Practices

1. Always validate external input at the controller boundary using Zod
2. Keep services free of HTTP concerns — they receive plain objects, not request objects
3. Write unit tests for all services; integration tests for all repositories
4. Use database transactions for operations that span multiple repositories

## Dos

- Use named exports for all modules, services, and utilities
- Use `async/await` consistently — avoid mixing with `.then()`
- Use `class-validator` decorators on DTOs for OpenAPI documentation
- Keep controllers thin — delegate all business logic to services

## Don'ts

- **Never** use `any` in TypeScript — use `unknown` + type narrowing instead
- **Never** access `process.env` directly — use the `ConfigService` wrapper
- **Never** catch errors silently — always log or rethrow with context
- **Never** write raw SQL in services — use the repository layer

## Conventions

- File names: `kebab-case` for all files
- Module folders: named after business capability (e.g., `orders/`, `catalog/`, `pricing/`)
- DTOs: suffixed with `Dto` (e.g., `CreateOrderDto`)
- Entities: suffixed with `Entity` (e.g., `OrderEntity`)
- PR titles must follow Conventional Commits format
```

## Variables

| Placeholder | Source | Required |
|-------------|--------|----------|
| `<project_name>` | `project_name` from Phase 1 | Yes |
| `<project_type>` | `project_type` from Phase 1 | Yes |
| `<primary_language>` | `primary_language` from Phase 1 | Yes |
| `<runtime>` | `runtime` from Phase 1 | Yes |
| `<technology_N>` | `tech_stack` entries from Phase 2 | Yes |
| `<architecture_*>` | `architecture` from Phase 2 | Yes |
| `<best_practice_N>` | `best_practices` from Phase 2 | Yes |
| `<do_N>` | `dos` from Phase 2 | Yes |
| `<dont_N>` | `donts` from Phase 2 | Yes |
| `<convention_N>` | `conventions` from Phase 2 | No |
