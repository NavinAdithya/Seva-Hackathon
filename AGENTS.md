This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md

## Autonomous Master Orchestrator (dev-design-orchestrator)

All tasks in this workspace automatically route through the **`dev-design-orchestrator`** to select the required skill based on prompt intent:
- **UI/UX & Mobile Flow**: `ui-ux-pro-max` (44×44pt touch targets, WCAG 4.5:1, haptic feedback)
- **Brand System**: `awesome-design-md` (`DESIGN.md` tokens, Linear/Apple/Vercel/Stripe styles)
- **Visual Polish**: `taste-skill` (high-end visual hierarchy, ban cookie-cutter AI templates)
- **3D & Spatial Gestures**: `3dviz-pro-max` (Three.js, React Three Fiber, WebGL, 60fps mobile)
- **Code & Refactoring**: `ponytail` (lazy senior dev mode, smallest clean working diff)
- **Codebase Navigation**: `graphify` (Token Reduction Engine, AST knowledge graph)

Quick router CLI: `python .agents/skills/dev-design-orchestrator/scripts/router.py "<prompt>"`

## Taste & UI Design (Anti-Slop)

The `Leonxlnx/taste-skill` suite is permanently installed and active in this workspace (`.agents/skills/`) and globally:
- Use `design-taste-frontend`, `high-end-visual-design`, `minimalist-ui`, `industrial-brutalist-ui`, and `brandkit` for UI design and component styling.
- Ban generic AI defaults (e.g. cookie-cutter card layouts, monotonous gradients, generic pill badges).
- Prioritize authentic typography scales, intentional spacing, distinct visual hierarchy, and complete, production-ready code.

## Codebase Architecture & Token Reduction (Graphify)

- When exploring architecture, tracing dependencies, or answering codebase questions, check `graphify-out/` before reading raw source files.
- Run `graphify query "<question>"` or use the graphify MCP tools to query the graph efficiently.
- Run `graphify update .` after code modifications to keep AST relationships current without LLM token spend.

## Minimalist Code & Anti-Bloat (Ponytail)

- Think like a lazy senior developer: write the smallest, cleanest change that completely solves the problem.
- No boilerplate, speculative wrappers, or redundant abstractions ("blah blah codes").
- Leverage existing components, Expo/React Native primitives, and store helpers before adding new files or dependencies.
- Never compromise security, data-loss protection, or error handling.

## Design Systems & Brand Aesthetics (awesome-design-md)

- The 84+ brand `DESIGN.md` library (`Linear`, `Vercel`, `Stripe`, `Apple`, `Raycast`, `Expo`, `Claude`, etc.) is permanently installed.
- To adopt or inspect a brand's tokens: `python ~/.gemini/config/awesome-design-md/design_md.py apply <brand> .`
- When a `DESIGN.md` is present in the project, follow its color tokens, typography scales, and component styling strictly.

## UI/UX Pro Max (Design Intelligence & A11y)

- The `ui-ux-pro-max` design intelligence suite is permanently installed (`.agents/skills/ui-ux-pro-max` and globally).
- Search local UI rules, palettes, and typography before designing components:
  `python .agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <ux|style|color|typography|chart|icons|gsap>`
- Strict priority hierarchy: Accessibility (WCAG 4.5:1, touch targets ≥44×44pt) > Touch & Interaction > Performance > Style Selection > Responsive Layout > Typography & Colors.

## 3Dviz Pro Max (3D Scenes & Spatial Graphics)

- The `3dviz-pro-max` suite is permanently installed (`.agents/skills/3dviz-pro-max` and globally).
- Use for 3D modeling, spatial gestures, Three.js, React Three Fiber, WebGL, and Blender pipelines:
  `python .agents/skills/3dviz-pro-max/scripts/search.py "<subject>"`
- Ensure mobile performance (60fps): allocate geometries/materials once, update transforms in animation ticks, and anchor lighting rigs to world scale.
