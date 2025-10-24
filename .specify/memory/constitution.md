<!--
Sync Impact Report
- Version change: N/A → 1.0.0
- Modified principles: (new document)
- Added sections: Core Principles, Technical Constraints & Defaults, Development Workflow, Governance
- Removed sections: None
- Templates requiring updates:
  ✅ .specify/templates/plan-template.md (Constitution Check derives from this file; no change needed)
  ✅ .specify/templates/spec-template.md (no mandatory sections added/removed)
  ✅ .specify/templates/tasks-template.md (tests remain optional)
  ✅ .specify/templates/checklist-template.md (generic)
  ✅ .specify/templates/agent-file-template.md (generic)
- Follow-up TODOs:
  - TODO(SCREENSHOT): Add screenshot/GIF to README after demo
  - TODO(DEPLOY_URL): Add deployed URL to README once published
-->

# food-share Constitution

## Core Principles

### I. Timeboxed Throwaway MVP
- Single page with one core user flow; cut scope before cutting quality.
- Total build time is capped at 8–12 hours; stop when the core flow works end-to-end.
- No authentication, accounts, payments, or user data collection.
- Rationale: Validate the idea quickly and avoid sunk-cost architecture.

### II. Zero Backend, Static Only
- No custom servers; deploy as static assets (GitHub Pages/Netlify/Vercel).
- Persistence is local only (localStorage). Public APIs allowed only without secrets or PII.
- No environment variables, API keys, or secrets stored anywhere.
- Rationale: Eliminate ops/security complexity for a weekend prototype.

### III. Simplicity and Minimal Dependencies
- Use a lightweight SPA stack (e.g., Vite + React or Svelte) with plain JS or light TS.
- No router unless truly unavoidable; no global state libraries; prefer local component state.
- Keep modules under ~200 lines; one component per file; avoid abstractions until duplicated thrice.
- Rationale: Minimize setup, cognitive load, and refactor cost.

### IV. Good‑Enough Quality Bar
- App MUST run without console errors; handle network failures with simple toasts/retries.
- Basic responsiveness: desktop-first with acceptable mobile behavior.
- Manual test checklist only; no unit tests, CI, or lint gates unless trivial to add.
- Rationale: Match quality investment to timebox.

### V. Deploy, Observe, Decommission
- Single environment; manual one-off deploy; pin dependency versions.
- Minimal console logging; optional window.DEBUG flag; no analytics.
- After feedback, archive repo and disable deploy; keep README with a screenshot/GIF.
- Rationale: Reduce ongoing cost and maintenance to zero.

## Technical Constraints & Defaults
- Stack: Vite + React (or Svelte). Optional Tailwind for speed.
- Data: Ephemeral; hardcode seed data as needed; no migrations.
- Networking: Fetch only public endpoints; respect rate limits; cache last good response in memory/localStorage.
- UI: Minimal styling; optional dark mode toggle if trivial.
- Performance: “Feels snappy” is sufficient; avoid heavy libraries.

## Development Workflow
- Branching: Single main branch; commit directly; small, frequent commits; PRs optional.
- Tasks: Track as a simple checklist in notes or README; prioritize core flow first.
- Docs: README includes quickstart, demo steps, and deployed URL; add a short learnings section after demo.
- Versioning (this constitution): semantic; see Governance.

## Governance
- Authority: This constitution supersedes all other practices for this project.
- Amendments: The maintainer may amend via /speckit.constitution. Provide a one-line rationale in the Sync Impact Report.
- Versioning policy:
  - MAJOR: Backward-incompatible changes to principles/governance.
  - MINOR: New principle/section or materially expanded guidance.
  - PATCH: Clarifications or non-semantic edits.
- Compliance: Before demo, eyeball a “Constitution Check” in the plan to ensure principles are met (static deploy, no secrets, one page, etc.).

**Version**: 1.0.0 | **Ratified**: 2025-10-24 | **Last Amended**: 2025-10-24
