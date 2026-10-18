---
name: dev-design-orchestrator
description: Master autonomous orchestrator that automatically analyzes user prompts and routes execution to the appropriate specialized design, UI/UX, 3D, animation, or development skills (ui-ux-pro-max, taste-skill, awesome-design-md, 3dviz-pro-max, ponytail, graphify).
---

# Dev & Design Orchestrator (Autonomous Super-Skill)

The **`dev-design-orchestrator`** is the master execution engine for Antigravity. It unifies all installed design, UI/UX, 3D, animation, and engineering skills into a seamless, autonomous workflow.

Whenever a prompt arrives, this orchestrator evaluates the domain requirements and automatically activates the exact specialized skills and CLI tools needed for the task.

---

## Autonomous Skill Routing Matrix

| Domain | When Prompt Touches | Activated Skills | Primary Tool / Action |
|---|---|---|---|
| **1. Brand Design Systems** | Brands (Linear, Apple, Stripe, Vercel, Raycast, Claude, etc.), design tokens, `DESIGN.md` | **`awesome-design-md`** | Lookup `~/.gemini/config/awesome-design-md/design-md/<brand>/DESIGN.md`<br>Apply tokens: `python ~/.gemini/config/awesome-design-md/design_md.py apply <brand> .` |
| **2. UI/UX & Layout Structure** | Screens, navigation, forms, layouts, responsive design, color palettes, typography, accessibility | **`ui-ux-pro-max`** | Search guidelines: `python ~/.gemini/config/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <ux\|style\|color\|typography>`<br>Full system: `--design-system -p "<Project>"` |
| **3. Anti-Slop Visual Taste** | High-end visual hierarchy, editorial/brutalist styling, modernizing ugly/generic interfaces | **`taste-skill`** (`design-taste-frontend`, `high-end-visual-design`, `minimalist-ui`) | Ban template tropes (3 centered cards, soft purple pills). Enforce asymmetric layouts and high scale contrast. |
| **4. Animations & Micro-Interactions** | Gestures, haptics, transitions, scroll animations, GSAP, Reanimated, spring physics | **`ui-ux-pro-max`** & **`gpt-taste`** | Query animation presets: `python ~/.gemini/config/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain gsap`<br>GPU transforms & opacity only; respect reduced-motion. |
| **5. 3D & Spatial Visualization** | 3D models, Three.js, React Three Fiber, WebGL, Blender, spatial UI, physical simulation | **`3dviz-pro-max`** | Query 3D recipes: `python ~/.gemini/config/skills/3dviz-pro-max/scripts/search.py "<subject>"`<br>Single allocation lifecycle, 60fps mobile target. |
| **6. Code & Minimalist Engineering** | Writing code, refactoring, fixing bugs, creating endpoints/stores/components | **`ponytail`** | Follow the 6-Step Decision Ladder: reuse existing codebase code -> native platform primitives -> installed packages -> smallest complete diff. |
| **7. Architecture & Code Navigation** | "How does X work?", tracing dependencies, exploring unfamiliar code | **`graphify`** | Run `graphify query "<question>"` before reading raw files. Run `graphify update .` after modifications. |

---

## Automatic Execution Protocol

### Step 1: Detect & Compose
When analyzing any request, determine which facets are present. If a request spans multiple areas (e.g., *"Build an animated 3D emergency button card styled like Apple with clean code"*), compose the requirements seamlessly:
1. **Brand Aesthetic**: Pull Apple's design tokens from `awesome-design-md`.
2. **UI & A11y**: Enforce `ui-ux-pro-max` rules (44×44pt touch target, 4.5:1 text contrast, haptics).
3. **3D Element**: Anchor Three.js / React Three Fiber scene with `3dviz-pro-max` (allocate once, 60fps).
4. **Code Quality**: Apply `ponytail` (zero boilerplate, standard primitives, minimal diff).

### Step 2: Instant CLI Routing Helper
To query recommended skills and actions programmatically:
```bash
python .agents/skills/dev-design-orchestrator/scripts/router.py "<your prompt or task description>"
```
*(Supports `--json` for structured data).*

---

## Non-Negotiable Guardrails (Always Active)

1. **Accessibility (WCAG 2.1/2.2)**: Text contrast ≥ 4.5:1, touch target ≥ 44×44pt with ≥ 8pt spacing. Never remove focus rings or omit `accessibilityLabel` on icon buttons.
2. **Zero Slop**: Never generate generic AI template designs (generic pill badges, cookie-cutter card layouts, un-tokenized raw hex colors).
3. **Lazy Senior Dev (Ponytail)**: Solve the whole problem with the least new code. Never add unrequested wrapper components or unnecessary dependencies.
4. **3D Performance**: Allocate geometries and materials once; update matrices and uniforms on render tick. Never allocate in animation loops.
5. **Token Reduction (Graphify)**: Query the knowledge graph before broad raw source scans.
