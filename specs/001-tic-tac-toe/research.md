# Research: Tic Tac Toe SPA

## Decisions
- Stack: Vite + React (light TS), Tailwind CSS, shadcn/ui.
- State: Local component state (useState) with derived game status; no global store.
- Persistence: None (ephemeral). Optional localStorage explicitly deferred per constitution.
- Routing: None (single page).
- Components: Board, Cell; simple layout utilities from Tailwind; shadcn/ui only if it speeds up buttons/layout.

## Rationale
- Matches constitution: zero backend, minimal deps, one page, quick to build and deploy.
- React + Vite provides fast dev server and tiny setup; Tailwind speeds styling; shadcn/ui offers prebuilt primitives if needed.

## Alternatives Considered
- SvelteKit or vanilla TS: simpler runtime but React is familiar and fast to scaffold with Vite.
- Adding router/state libs: unnecessary for single screen flow.

## Open Questions Resolved
- TS vs JS: choose light TS for better DX; keep types minimal.
- shadcn extent: use selectively (e.g., Button) to avoid bloat.
