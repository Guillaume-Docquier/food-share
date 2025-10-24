---

description: "Task list template for feature implementation"
---

# Tasks: Tic Tac Toe

**Input**: Design documents from `/specs/001-tic-tac-toe/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Manual checklist only per constitution/spec; no automated tests unless added explicitly.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P] [Story] Description`

- [P]: Can run in parallel (different files, no dependencies)
- [Story]: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Web app: `frontend/` with `src/` for code and `styles/` for CSS

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create `frontend/` project with Vite React TS template (in repo root)
      - Command: `npm create vite@latest frontend -- --template react-ts`
- [ ] T002 [P] Add Tailwind CSS (dev deps) and initialize config in `frontend/`
      - Command: `npm i -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`
- [ ] T003 [P] Configure Tailwind content in `frontend/tailwind.config.js` to include `./index.html`,`./src/**/*.{ts,tsx}`
- [ ] T004 [P] Add base styles file `frontend/src/index.css` (or `styles/globals.css`) with Tailwind directives
      - Contents: `@tailwind base; @tailwind components; @tailwind utilities;`
- [ ] T005 [P] Wire Tailwind CSS import in `frontend/src/main.tsx` (or `App.tsx`) to load the base styles
- [ ] T006 [P] Initialize shadcn/ui in `frontend/` and generate a Button component
      - Commands: `npx shadcn@latest init -d && npx shadcn@latest add button`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Minimal app shell and core logic helpers

- [ ] T007 Create `frontend/src/lib/game.ts` with helpers: `initialState()`, `isWin(cells)`, `isDraw(cells)`, `nextPlayer(player)`
- [ ] T008 Create base app shell `frontend/src/App.tsx` with container layout and placeholder board
- [ ] T009 [P] Add minimal layout styles (Tailwind classes) to center board and controls

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Play a full game (Priority: P1) 🎯 MVP

**Goal**: Play a complete game on a 3x3 grid, alternating X/O, ending with win or draw.

### Implementation for User Story 1

- [ ] T010 [P] [US1] Create `frontend/src/components/Cell.tsx` (props: value, onClick, index)
- [ ] T011 [P] [US1] Create `frontend/src/components/Board.tsx` rendering 9 Cell components in a 3x3 grid
- [ ] T012 [US1] Implement state in `App.tsx`: `cells: ("X"|"O"|null)[]`, `currentPlayer`, `isOver`, `winner`, `isDraw`, `moveCount`
- [ ] T013 [US1] Implement click handler in `App.tsx` to place mark if cell empty and game not over
- [ ] T014 [US1] Integrate win/draw detection via `lib/game.ts` and lock board on game end
- [ ] T015 [US1] Style board cells (square, responsive) using Tailwind utility classes

### Manual Test for User Story 1 (checklist)

- [ ] T016 [P] Verify alternating turns and correct symbol placement
- [ ] T017 [P] Verify occupied cells cannot be changed
- [ ] T018 [P] Verify win is detected on all 8 lines and prevents further moves
- [ ] T019 [P] Verify draw on a full board with no winner

**Checkpoint**: User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Restart game (Priority: P2)

**Goal**: Reset the board to start a new game at any time.

### Implementation for User Story 2

- [ ] T020 [US2] Add Restart control (shadcn Button) in `App.tsx`
- [ ] T021 [US2] Implement reset logic to initial state and ensure X starts

### Manual Test for User Story 2

- [ ] T022 [P] Restart after win restores clean board and default player
- [ ] T023 [P] Restart during in-progress game clears state correctly

**Checkpoint**: User Stories 1 and 2 work independently

---

## Phase 5: User Story 3 - Indicate turn and outcome (Priority: P3)

**Goal**: Show current player during play and clear end-of-game status.

### Implementation for User Story 3

- [ ] T024 [US3] Add turn indicator in `App.tsx` (e.g., "X to play" / "O to play")
- [ ] T025 [US3] Add end-of-game message ("X wins", "O wins", or "Draw")
- [ ] T026 [P] [US3] Provide subtle feedback when clicking an occupied cell (e.g., brief shake or muted notice)

### Manual Test for User Story 3

- [ ] T027 [P] Verify turn indicator updates after each valid move
- [ ] T028 [P] Verify end-of-game message shows correctly and board is locked

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T029 [P] Ensure board renders without horizontal scrolling on small screens
- [ ] T030 [P] Add basic keyboard support (optional): arrow keys move focus; Enter places mark
- [ ] T031 [P] Light/dark mode toggle (optional) if trivial with Tailwind
- [ ] T032 [P] Documentation update: add demo steps to `README.md` and link to deploy URL
- [ ] T033 [P] Deploy static build from `frontend/dist` (GitHub Pages/Netlify/Vercel)
- [ ] T034 [P] Add screenshot/GIF to README after demo

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): No dependencies - can start immediately
- Foundational (Phase 2): Depends on Setup completion - BLOCKS all user stories
- User Stories (Phase 3+): All depend on Foundational phase completion
- Polish (Final Phase): Depends on desired user stories being complete

### Within Each User Story

- Components before wiring handlers
- State updates before win/draw detection
- Core implementation before styling polish

### Parallel Opportunities

- Setup tasks marked [P] can run in parallel
- US1: Component files T010–T011 in parallel; manual tests in parallel
- US3: Indicator and feedback tasks can run in parallel after US1 base is ready
