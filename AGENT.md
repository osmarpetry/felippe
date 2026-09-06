# AGENT.md

Notes for whoever (human or agent) picks up dependency work on this repo next.

## 2026-09-07 — Dependabot npm group PR #2 (react/types/biome/tailwind, 7 updates)

- Merged. All minor/patch bumps: react 19.2.5→19.2.8, @types/react 19.2.14→19.2.18,
  react-dom 19.2.5→19.2.8, @types/react-dom 19.2.3→19.2.7, @biomejs/biome 2.2.0→2.5.12,
  @tailwindcss/postcss 4.1.14→4.3.3, tailwindcss 4.1.14→4.3.3.
- CI was red on "Code formatting" before the fix. Root cause: biome 2.5 tightened CSS
  parsing (Tailwind `@theme` at-rules now rejected unless `css.parser.tailwindDirectives`
  is enabled) and enforces `lint/a11y/noSvgWithoutTitle` on `**/*.svg`, which caught the
  stock Next.js template SVGs in `public/`.
- Fix applied directly (not a dependency issue, a config gap exposed by the bump):
  - `biome.json`: added `css.parser.tailwindDirectives: true`.
  - `biome.json`: excluded `public/**/*.svg` from lint scope — those are static assets,
    not accessible UI markup, so `noSvgWithoutTitle` doesn't apply.
  - Ran `biome migrate --write` (schema bumped to 2.5.12, `rules.recommended` →
    `rules.preset: "recommended"`).
  - `tsconfig.json`: `next build` auto-rewrote `jsx: "preserve"` → `"react-jsx"` and added
    `.next/dev/types/**/*.ts` to `include` — this is Next 16's mandatory change (automatic
    JSX runtime), not something to revert.
- Verified with `pnpm run lint` and `pnpm run build` (Turbopack) locally before pushing.
- No test script in package.json; lint + build is the full CI surface for this repo.

### Next steps if resumed
- None outstanding for this batch. Watch for the next Dependabot npm group PR — if biome
  gets another minor bump, check `biome.json` schema drift the same way (`biome migrate`).
