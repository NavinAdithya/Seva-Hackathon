---
name: dev-design-orchestrator
description: Master autonomous orchestrator that indexes and intelligently routes across all 1,745+ installed skills and 13+ active MCP tool suites. Prevents blind single-tool usage and eliminates bloat by selecting the exact primary, complementary, and MCP tools needed for any task.
---

# Dev & Design Autonomous Master Orchestrator

The **`dev-design-orchestrator`** is the master autonomous intelligence layer for Antigravity. It indexes your entire ecosystem of **1,745+ installed skills** and **13+ MCP servers**, continuously maintaining a unified catalog to route tasks with high precision.

---

## Anti-Blindness & Multi-Skill Synergy

A common failure mode of AI assistants is either:
1. **Blind Single-Skill Bias**: Using only one default skill (e.g., only general coding) even when the user asked for high-end styling, accessibility, or 3D graphics.
2. **Tool Bloat**: Dumping dozens of irrelevant skills into the context, wasting tokens and polluting instructions.

The orchestrator guarantees **balanced, context-aware execution**:
- **Primary Skill (Driver)**: Handles the central objective (e.g., `ui-ux-pro-max` for UI layouts, `3dviz-pro-max` for 3D scenes, `hexstrike-ai` for security audits, `graphify` for architecture tracing).
- **Complementary Skills (Quality Assurance)**: Enforces cross-cutting standards (e.g., `ponytail` to prevent boilerplate and keep code diffs minimal; `awesome-design-md` for brand tokens; `taste-skill` for anti-slop visual hierarchy).
- **Active MCP Tools (Real-Time Execution)**: Integrates live MCP capabilities (e.g., `playwright` for web testing, `shadcn` for components, `flutter_dart-mcp-server` for Flutter LSP, `chrome-browser` for live DOM).
- **Intentionally Bypassed**: Filters out mismatched platforms (e.g., skips Flutter tools when the workspace is React Native / Expo).

---

## Ecosystem Scope (1,745+ Skills & MCP Tools)

| Domain | Indexed Capabilities | Primary & Complementary Skills |
|---|---|---|
| **Mobile & Expo** | `expo-*`, `upgrading-expo`, `building-native-ui`, `zustand-store-ts`, `zod-validation-expert` | **`ui-ux-pro-max`** + **`ponytail`** |
| **Brand Systems** | Linear, Apple, Stripe, Vercel, Raycast, Claude, Supabase, Tesla, Runway (84+ brand specs) | **`awesome-design-md`** |
| **UI/UX & A11y** | 79 design styles, 192 product palettes, 74 font pairings, 119 UX rules, WCAG 4.5:1 | **`ui-ux-pro-max`** |
| **Anti-Slop Visuals** | Asymmetric layouts, editorial typography, Swiss brutalism, minimalist UI | **`taste-skill`** suite |
| **Motion & Gestures** | GSAP presets, scroll triggers, GPU-accelerated transforms, spring physics, haptics | **`ui-ux-pro-max`** (gsap) & **`gpt-taste`** |
| **3D & Spatial** | Three.js, React Three Fiber, WebGL, Blender, spatial UI, physical simulation | **`3dviz-pro-max`** |
| **Code Minimalism** | 6-Step Decision Ladder, smallest clean diff, zero boilerplate, anti-bloat | **`ponytail`** (Lazy Senior Dev) |
| **Code Navigation** | AST knowledge graph, relationship tracing, token reduction, call graphs | **`graphify`** |
| **Security & Pentest** | 120+ tools (Nmap, Gobuster, SQLMap, Nuclei, Metasploit, Ghidra, Burp), CTF skills | **`hexstrike-ai` (MCP)** + `ctf-*` |
| **Web & E2E Testing** | Browser automation, live DOM inspection, screenshot validation, codegen | **`playwright` (MCP)** & **`chrome-browser`** |
| **Cloud & Data** | BigQuery SQL, Dataform, dbt, Cloud Composer, Spark, Firebase | `gcp-data-pipelines`, `firebase-mcp-server` |

---

## CLI Tools

### 1. Analyze Task Routing
Evaluate which skills, MCP tools, and guardrails apply to a prompt:
```bash
python .agents/skills/dev-design-orchestrator/scripts/router.py "<your prompt or task description>"
```

### 2. Search All 1,745+ Installed Skills
Directly search the catalog by keyword:
```bash
python .agents/skills/dev-design-orchestrator/scripts/router.py --search "expo"
python .agents/skills/dev-design-orchestrator/scripts/router.py --search "security"
```

### 3. Fetch & Re-Index Newly Installed Skills
Whenever you install new skills with `npx skills add` or add plugins:
```bash
python .agents/skills/dev-design-orchestrator/scripts/index_skills.py
# or
python .agents/skills/dev-design-orchestrator/scripts/router.py --refresh
```
*(Runs in ~3 seconds and updates `skills_catalog.json` across workspace, global, and universal folders).*
