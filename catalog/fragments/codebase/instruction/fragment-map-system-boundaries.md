---
id: fragment-map-system-boundaries
name: Map System Boundaries
type: instruction
version: 1.0
domain: codebase
---

# Fragment: Map System Boundaries

Identifies system boundaries, integration points, and components that will be affected by the feature implementation.

## Instructions

1. **Identify internal boundaries** — which modules, services, or layers does this feature touch?
2. **Identify external boundaries** — are there external APIs, databases, queues, or third-party services involved?
3. **Map data flow** — how will data move through the system to support this feature?
4. **Identify shared components** — flag any shared utilities, middleware, or contracts that this feature depends on or modifies
5. **List affected components** — compile a concrete list of components that will need changes

## Output
- `internal_boundaries`: list of internal modules/layers touched
- `external_boundaries`: list of external integrations involved
- `data_flow`: description of how data moves through the system
- `affected_components`: concrete list of components requiring changes
