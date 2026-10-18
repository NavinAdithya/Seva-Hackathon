---
trigger: always_on
description: Autonomous master orchestrator. Analyzes every user prompt and seamlessly activates the optimal specialized skill (UI/UX Pro Max, Taste-Skill Anti-Slop, Awesome Design MD, 3Dviz Pro Max, Ponytail Minimalist Dev, Graphify Token Reduction).
---

# Dev & Design Autonomous Orchestrator Rule

Whenever a user sends a prompt or delegates work in this workspace, **automatically route the task through the specialized skills matrix** without requiring the user to explicitly name the skill.

## Automatic Routing Protocol

1. **Brand Aesthetics & Design Systems**:
   - If styling after recognized brands (Linear, Apple, Stripe, Vercel, Raycast, Claude, etc.) or referencing `DESIGN.md`:
   - **Activate**: `awesome-design-md`. Apply brand tokens: `python ~/.gemini/config/awesome-design-md/design_md.py apply <brand> .`.

2. **UI/UX, Layouts & Accessibility (a11y)**:
   - For screens, cards, modals, navigation, buttons, forms, colors, typography, or accessibility:
   - **Activate**: `ui-ux-pro-max`. Run search: `python .agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <ux|style|color|typography|chart|icons|gsap>`.
   - **Enforce**: WCAG 4.5:1 text contrast, touch targets ≥ 44×44pt, `accessibilityLabel` on icon buttons, safe-area insets.

3. **High-End Visual Polish & Anti-Slop**:
   - For UI design, screen creation, and component styling:
   - **Activate**: `taste-skill` (`design-taste-frontend`, `high-end-visual-design`, `minimalist-ui`).
   - **Enforce**: Ban generic AI templates (cookie-cutter 3-card grids, soft purple pills, monotonous gradients).

4. **Animations, Haptics & Micro-Interactions**:
   - For motion, gestures, transitions, or physics:
   - **Activate**: `ui-ux-pro-max` (domain: `gsap`) & `gpt-taste`.
   - **Enforce**: Context-aware timing (150–300ms), GPU transforms/opacity only, reduced-motion support.

5. **3D Scenes, Spatial UI & Visualizations**:
   - For 3D models, Three.js, React Three Fiber, WebGL:
   - **Activate**: `3dviz-pro-max`. Query recipes: `python .agents/skills/3dviz-pro-max/scripts/search.py "<subject>"`.
   - **Enforce**: Single allocation lifecycle, 60fps mobile target.

6. **Code Implementation, Refactoring & Bug Fixing**:
   - For writing or refactoring code:
   - **Activate**: `ponytail` (Lazy Senior Developer).
   - **Enforce**: Write the smallest complete diff. Ban boilerplate, speculative wrappers, and "blah blah codes". Never cut security, validation, error handling, or tests.

7. **Codebase Exploration & Tracing**:
   - For navigating the codebase or tracing dependencies:
   - **Activate**: `graphify`.
   - **Enforce**: Query `graphify-out/graph.json` before reading raw source files. Keep synchronized with `graphify update .`.

## Instant Routing CLI
```bash
python .agents/skills/dev-design-orchestrator/scripts/router.py "<prompt>"
```
