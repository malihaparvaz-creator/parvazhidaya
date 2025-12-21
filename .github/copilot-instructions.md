# Copilot / AI Agent Instructions — Parvaz Hidaya

This file gives focused, actionable guidance for AI coding agents working on this repository.

1. Project overview
- **Type**: Create React App single-page app. See [README.md](README.md#L1-L200).
- **Main layout**: source under [src/](src) with UI components in [src/components/](src/components).
- **Client-only state**: No server code in repo — app state and persistence use browser APIs (see `localStorage` usage in [src/hooks/useHistory.js](src/hooks/useHistory.js#L1-L200)).

2. Architecture & data flow
- `useHistory(userId)` (in [src/hooks/useHistory.js](src/hooks/useHistory.js#L1-L200)) is the single source of truth for story history; it persists per-user state to `localStorage` under key `parvaz_hidaya_history_v2_<userId>`.
- `useFavorites(history, updateHistory)` (in [src/hooks/useFavorites.js](src/hooks/useFavorites.js#L1-L200)) derives favorites from the history and calls `updateHistory(id, updates)` to mutate items.
- Components render from `src/components/*` and expect to receive history/favorites and mutation callbacks rather than accessing `localStorage` directly. Inspect `FavoritesView.jsx` and `HistoryView.jsx` for patterns.

3. Important files to inspect
- [src/hooks/useHistory.js](src/hooks/useHistory.js#L1-L200) — history storage, add/update/delete helpers, and `getHistoryStats` memo.
- [src/hooks/useFavorites.js](src/hooks/useFavorites.js#L1-L200) — derived favorites API (toggle/add/remove/clear).
- [src/components/](src/components) — small functional components (`Button.jsx`, `DropdownMenu.jsx`, `Input.jsx`, `StoryDetailView.jsx`) that accept props and callbacks.

4. Conventions and patterns
- Hooks are named `useX` and live in `src/hooks/`.
- Components use `.jsx` extension and are functional (no class components).
- Mutations follow an immutable pattern: `updateHistory(id, updates)` returns a new history array (see `setHistory(prev => prev.map(...))`). Follow this when adding new helpers.
- Persistence is synchronous to `localStorage` inside a `useEffect` watching the state — avoid redundant writes by editing through the existing `addToHistory` / `updateHistory` helpers.

5. Dev/test/build commands
- Start dev server: `npm start` (serves at http://localhost:3000). See [README.md](README.md#L1-L200).
- Run tests: `npm test`.
- Build: `npm run build`.

6. Typical small tasks examples
- To add a UI action that marks a story favorite: call `updateHistory(id, { is_favorite: true })` rather than writing to `localStorage` directly.
- To display counts use `getHistoryStats` returned by `useHistory` to avoid recomputing dates/counts in components.

7. What to avoid
- Do not introduce server-side code or new persistence layers — this repo is client-only.
- Avoid calling `localStorage` from components; use `useHistory` helpers to keep behavior consistent.

8. If you change persistence
- If you must change the `localStorage` schema, increment the key version (the code uses `parvaz_hidaya_history_v2_...`) and include a migration step in `useHistory` initialization.

9. Where to add tests
- Add component tests next to components or under `src/__tests__` using the existing Create React App test runner. Prefer testing hooks via helper wrappers that provide required props (e.g., a fake `userId`).

10. Contact & follow-up
- If anything is unclear, ask for a specific file and feature to inspect. Provide small diffs or test cases that demonstrate desired behavior.

---
Keep changes small and follow existing hook-based patterns. Ask for clarification before introducing cross-cutting changes (new global state, external APIs, or build-system changes).
