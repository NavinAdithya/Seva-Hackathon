# Graph Report - Sign-SOS  (2026-10-18)

## Corpus Check
- 100 files · ~342,795 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 1137 nodes · 1548 edges · 90 communities (82 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6f50ea18`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- assets.mjs
- responder.tsx
- draw.mjs
- dependencies
- package.json
- inspect.mjs
- expo
- lint.mjs
- cdp.mjs
- Page
- brandkit/SKILL.md
- compilerOptions
- rules.mjs
- CORE DIRECTIVE: IMAGE-FIRST WEBSITE DESIGN TO CODE
- CORE DIRECTIVE: PREMIUM MOBILE APP IMAGE DIRECTION
- High-Agency Frontend Skill
- Appendix B - Canonical Sources (read these before reinventing)
- 4. Recipes
- theme.ts
- Design Audit
- Analysis & Synthesis Instructions
- Agent Skill: Principal UI/UX Architect & Motion Choreographer (Awwwards-Tier)
- The run
- SKILL: Industrial Brutalism & Tactical Telemetry UI
- Design System: Taste Standard
- Imagery
- The study
- CORE DIRECTIVE: AWWWARDS-LEVEL IMAGE ART DIRECTION
- 2. THE COMBINATORIAL VARIATION ENGINE
- Colour
- Layout
- 4. DESIGN ENGINEERING DIRECTIVES (Bias Correction)
- SignSOS 🚨
- Tells — the dated registry
- Type
- Words
- 10. REFERENCE VOCABULARY (Pattern Names the Agent Should Know)
- tasteskill: Anti-Slop Frontend Skill
- CORE DIRECTIVE: AWWWARDS-LEVEL DESIGN ENGINEERING
- 22. STYLE VARIATION ENGINE
- Protocol: Premium Utilitarian Minimalism UI Architect
- Ponytail Help
- AGENTS.md
- Critique — judging the render
- 11. COMPONENT EXECUTION GUIDELINES
- 18. EXTRA CREATIVITY & IMPLEMENTATION EDGE
- Ponytail Help
- 9. AI TELLS (Forbidden Patterns)
- 12. THE COMBINATORIAL VARIATION ENGINE
- 8. ANTI-AI-SLOP RULES
- tasteskill v2 (`design-taste-frontend`)
- 11. REDESIGN PROTOCOL
- 3. DEFAULT ARCHITECTURE & CONVENTIONS
- 6. PERFORMANCE & ACCESSIBILITY GUARDRAILS
- Full-Output Enforcement
- 33. CATEGORY-SPECIFIC BIAS
- 13. COLOR & MATERIAL RULES
- 4. HERO MINIMALISM RULES
- 29. ANTI-AI-SLOP RULES
- 5. IMAGE COUNT & PAGE SLICING
- agent/skills/ponytail-audit/SKILL.md
- Ponytail Gain
- agent/skills/ponytail-review/SKILL.md
- Ponytail
- 0. BRIEF INFERENCE (Read the Room Before Anything Else)
- 12. THE BLOCK LIBRARY (Contract - Implementations Land Here Iteratively)
- 5. CONTEXT-AWARE PROACTIVITY
- 8. DARK MODE PROTOCOL
- 21. MOBILE ANTI-AI-TELLS RULE
- .claude/skills/ponytail-audit/SKILL.md
- Ponytail Gain
- .claude/skills/ponytail-review/SKILL.md
- Ponytail
- agent/skills/ponytail-debt/SKILL.md
- Ponytail — Anti-Bloat & Minimalist Engineering Rule
- Awesome DESIGN.md
- 33. DEFAULT SECTION PACKS
- 14. HERO MINIMALISM RULES
- 37. EXAMPLE INTERPRETATIONS
- 2. PLATFORM MODE RULE
- 37. EXAMPLE INTERPRETATIONS
- 15. DEFAULT SITE PACKS
- 20. EXAMPLE INTERPRETATIONS
- .claude/skills/ponytail-debt/SKILL.md
- imagegen-frontend-web/SKILL.md
- GEMINI.md
- 7. DIAL DEFINITIONS (Technical Reference)
- awesome-design-md Permanent Action Rule

## God Nodes (most connected - your core abstractions)
1. `CORE DIRECTIVE: IMAGE-FIRST WEBSITE DESIGN TO CODE` - 39 edges
2. `CORE DIRECTIVE: PREMIUM MOBILE APP IMAGE DIRECTION` - 39 edges
3. `getOne()` - 31 edges
4. `useAppStore` - 23 edges
5. `search()` - 22 edges
6. `CORE DIRECTIVE: AWWWARDS-LEVEL IMAGE ART DIRECTION` - 22 edges
7. `triggerSelection()` - 21 edges
8. `getVideo()` - 19 edges
9. `tasteskill: Anti-Slop Frontend Skill` - 16 edges
10. `Appendix B - Canonical Sources (read these before reinventing)` - 15 edges

## Surprising Connections (you probably didn't know these)
- `init()` --calls--> `seedDatabase()`  [EXTRACTED]
  app/_layout.tsx → src/db/seed.ts
- `loadCard()` --calls--> `getEmergencyCard()`  [EXTRACTED]
  app/emergency-card.tsx → src/db/queries.ts
- `loadPhrases()` --calls--> `getPhrasesByCategory()`  [EXTRACTED]
  app/symptoms/[categoryId].tsx → src/db/queries.ts
- `RootLayout()` --calls--> `seedDatabase()`  [EXTRACTED]
  app/_layout.tsx → src/db/seed.ts
- `RootLayout()` --calls--> `useAppStore`  [EXTRACTED]
  app/_layout.tsx → src/store/useAppStore.ts

## Import Cycles
- None detected.

## Communities (90 total, 8 thin omitted)

### Community 0 - "assets.mjs"
Cohesion: 0.07
Nodes (85): AIC_FIELDS, AIC_HEADERS, applyThumb(), ARCHIVE_LICENCE, args, argv, base(), clock() (+77 more)

### Community 1 - "responder.tsx"
Cohesion: 0.07
Nodes (63): BillboardScreen(), loadPhrase(), EmergencyCardScreen(), loadCard(), EmergencyGatewayScreen(), RootLayout(), init(), ResponderScreen() (+55 more)

### Community 2 - "draw.mjs"
Cohesion: 0.09
Nodes (39): adjustments(), argv, assetQueries(), ASSETS_PATH, briefStop(), briefWords(), deal(), dealHero() (+31 more)

### Community 3 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, expo, expo-av, expo-constants, expo-haptics, expo-linking, expo-localization, expo-location (+17 more)

### Community 4 - "package.json"
Cohesion: 0.04
Nodes (42): config, { getDefaultConfig }, devDependencies, @types/react, typescript, reactNativeDirectoryCheck, expo, doctor (+34 more)

### Community 5 - "inspect.mjs"
Cohesion: 0.10
Nodes (12): allow, args, asJson, fails, HEIGHT, merged, outDir, report (+4 more)

### Community 6 - "expo"
Cohesion: 0.11
Nodes (18): backgroundColor, adaptiveIcon, package, expo, android, icon, ios, name (+10 more)

### Community 7 - "lint.mjs"
Cohesion: 0.17
Nodes (11): args, asJson, byId, EXT, files, findings, R, roots (+3 more)

### Community 10 - "brandkit/SKILL.md"
Cohesion: 0.04
Nodes (44): 1. Logo Cover, 1. Monogram + Meaning, 2 × 3 REFERENCE-STYLE LAYOUT, 2. Logo Construction, 2. Product Action, 3. Digital Application, 3. Metaphor Fusion, 4. Brand Essence (+36 more)

### Community 11 - "compilerOptions"
Cohesion: 0.25
Nodes (7): expo/tsconfig.base, compilerOptions, baseUrl, paths, strict, extends, include

### Community 12 - "rules.mjs"
Cohesion: 0.53
Nodes (5): colourFamily(), hexToHsl(), inRange(), judge(), RULE_IDS

### Community 13 - "CORE DIRECTIVE: IMAGE-FIRST WEBSITE DESIGN TO CODE"
Cohesion: 0.06
Nodes (34): 10. IMAGE-FIRST CODEX WEBSITE WORKFLOW, 11. WHEN TO TRIGGER IMAGE GENERATION FIRST, 13. WEBSITE REFERENCE RULE, 15. RESPONSIVE FIRST-VIEW RULE, 16. ANTI-NESTED-BOX RULE, 17. REDUCE MICRO-UI CLUTTER RULE, 18. SECTION IMAGE GENERATION RULE, 19. WEBSITE IMAGE SYSTEM RULE (+26 more)

### Community 14 - "CORE DIRECTIVE: PREMIUM MOBILE APP IMAGE DIRECTION"
Cohesion: 0.06
Nodes (34): 10. DEVICE MOCKUP FRAME RULE, 11. ONBOARDING FLOW RULE, 12. FIRST SCREEN CLEANLINESS RULE, 13. SAFE AREA AND SYSTEM REGION RULE, 14. NAVIGATION RULE, 15. CLEAN LAYOUT RULE, 16. CREATIVE IMAGE DIRECTION RULE, 17. BACKGROUND TEXTURE AND SURFACE RULE (+26 more)

### Community 15 - "High-Agency Frontend Skill"
Cohesion: 0.06
Nodes (30): 10. FINAL PRE-FLIGHT CHECK, 1. ACTIVE BASELINE CONFIGURATION, 2. DEFAULT ARCHITECTURE & CONVENTIONS, 3. DESIGN ENGINEERING DIRECTIVES (Bias Correction), 4. CREATIVE PROACTIVITY (Anti-Slop Implementation), 5. PERFORMANCE GUARDRAILS, 6. TECHNICAL REFERENCE (Dial Definitions), 7. AI TELLS (Forbidden Patterns) (+22 more)

### Community 16 - "Appendix B - Canonical Sources (read these before reinventing)"
Cohesion: 0.09
Nodes (21): APPENDICES - Real Source-Backed Reference Material, Appendix A - Install Commands per Design System, Appendix B - Canonical Sources (read these before reinventing), Appendix C - Apple Liquid Glass: Honest Web Approximation, Apple Liquid Glass (Apple platforms only), Atlassian, Bootstrap, Carbon (+13 more)

### Community 17 - "4. Recipes"
Cohesion: 0.10
Nodes (19): 1. The budget, 2. Four questions before any animation, 3. Tokens, 4. Recipes, 5. Signature moves, 6. Reduced motion and performance, 7. What gives generated motion away, Accordion (+11 more)

### Community 20 - "Design Audit"
Cohesion: 0.10
Nodes (19): Code Quality, Color and Surfaces, Component Patterns, Content, Design Audit, Fix Priority, How This Works, Iconography (+11 more)

### Community 21 - "Analysis & Synthesis Instructions"
Cohesion: 0.11
Nodes (18): 1. Define the Atmosphere, 2. Map the Color Palette, 3. Establish Typography Rules, 4. Define the Hero Section, 5. Describe Component Stylings, 6. Define Layout Principles, 7. Define Responsive Rules, 8. Encode Motion Philosophy (+10 more)

### Community 22 - "Agent Skill: Principal UI/UX Architect & Motion Choreographer (Awwwards-Tier)"
Cohesion: 0.11
Nodes (17): 1. Meta Information & Core Directive, 2. THE "ABSOLUTE ZERO" DIRECTIVE (STRICT ANTI-PATTERNS), 3. THE CREATIVE VARIANCE ENGINE, 4. HAPTIC MICRO-AESTHETICS (COMPONENT MASTERY), 5. MOTION CHOREOGRAPHY (FLUID DYNAMICS), 6. PERFORMANCE GUARDRAILS, 7. EXECUTION PROTOCOL, 8. PRE-OUTPUT CHECKLIST (+9 more)

### Community 23 - "The run"
Cohesion: 0.12
Nodes (16): 10. Report, 1. Read the brief and the project, 2. Write the argument, 3. Draw the direction, 4. Find the idea, 5. Write the words, 6. Build it, still, 7. Gate (+8 more)

### Community 24 - "SKILL: Industrial Brutalism & Tactical Telemetry UI"
Cohesion: 0.12
Nodes (16): 1. Skill Meta, 2.1 Swiss Industrial Print, 2.2 Tactical Telemetry & CRT Terminal, 2. Visual Archetypes, 3.1 Macro-Typography (Structural Headers), 3.2 Micro-Typography (Data & Telemetry), 3.3 Textural Contrast (Artistic Disruption), 3. Typographic Architecture (+8 more)

### Community 25 - "Design System: Taste Standard"
Cohesion: 0.13
Nodes (14): 1. Visual Theme & Atmosphere, 2. Color Palette & Roles, 3. Typography Rules, 4. Component Stylings, 5. Hero Section, 6. Layout Principles, 7. Responsive Rules, 8. Motion & Interaction (Code-Phase Intent) (+6 more)

### Community 26 - "Imagery"
Cohesion: 0.14
Nodes (13): 10. Markup and credits, 11. Video, 1. What the study measured, 2. Decide what imagery exists, 3. Real pictures from the open collections, 4. The dealt photographs, 5. Cropping and placing, 6. Treatment (+5 more)

### Community 27 - "The study"
Cohesion: 0.14
Nodes (13): 10. The 25 highest-scored sites and their ideas, 11. How the skill was tested, 1. Method and its limits, 2. Scores, 3. Where the idea comes from, 4. Headlines, 5. Type, 6. Devices: what separates strong from weak, and what does not (+5 more)

### Community 28 - "CORE DIRECTIVE: AWWWARDS-LEVEL IMAGE ART DIRECTION"
Cohesion: 0.14
Nodes (14): 10. SECTION RHYTHM RULE, 12. DENSITY & SPACING DISCIPLINE, 14. IMAGE / MEDIA DIRECTION, 16. MULTI-IMAGE CONSISTENCY RULE, 17. CLARITY CHECK, 19. RESPONSE BEHAVIOR, 1. ACTIVE BASELINE CONFIGURATION, 21. FINAL GOAL (+6 more)

### Community 29 - "2. THE COMBINATORIAL VARIATION ENGINE"
Cohesion: 0.14
Nodes (14): 2. THE COMBINATORIAL VARIATION ENGINE, Background Character, Background Mode (per-section), Composition Anchor (per-section), CTA Variation, Hero Architecture, Hero Scale (per-page), Motion-Implied Language (+6 more)

### Community 30 - "Colour"
Cohesion: 0.17
Nodes (11): 1. What the study measured, 2. The roles, 3. Proportion, 4. Surfaces without lines or shadows, 5. Colour fields, 6. Dark pages, 7. Colour and photographs, 8. Contrast (+3 more)

### Community 31 - "Layout"
Cohesion: 0.17
Nodes (11): 1. What strong pages do, 2. Margins and the grid, 3. Where text sits, 4. Empty space, 5. Sections: carry the idea, vary the arrangement, 6. Navigation, 7. Endings, 8. The phone is a second composition (+3 more)

### Community 32 - "4. DESIGN ENGINEERING DIRECTIVES (Bias Correction)"
Cohesion: 0.17
Nodes (12): 4.10 Quotes & Testimonials, 4.11 Page Theme Lock (Light / Dark Mode Consistency), 4.1 Typography, 4.2 Color Calibration, 4.3 Layout Diversification, 4.4 Materiality, Shadows, Cards, 4.5 Interactive UI States, 4.6 Data & Form Patterns (+4 more)

### Community 33 - "SignSOS 🚨"
Cohesion: 0.17
Nodes (11): 📱 Architecture & Tech Stack, 🏆 Competition Context, ⚖️ Ethical & AAC Scope Boundary, 🛠️ How to Run the App, 🚀 Key Screens, Prerequisites, Quick Start, Running on Android (+3 more)

### Community 34 - "Tells — the dated registry"
Cohesion: 0.18
Nodes (10): 1. First wave (2023–2024), 2. Second wave (2025), 3. Third wave (2025–2026): the "fix" that became the look, 4. Gallery fashion, banned as house style, 5. Structural tells, 6. Copy tells, 7. Motion tells, 8. Why removal is not enough (+2 more)

### Community 35 - "Type"
Cohesion: 0.18
Nodes (10): 1. What the study measured, 2. The scale: few sizes, far apart, 3. Setting display type, 4. Setting text, 5. Loading the fonts properly, 6. One family or two, 7. Details that separate set type from typed text, 8. Mistakes the inspector cannot see (+2 more)

### Community 36 - "Words"
Cohesion: 0.20
Nodes (9): 1. Write the argument first, 2. The two-line headline, 3. Headline shapes that work, 4. Supporting line, body, buttons, 5. Proof without inventing it, 6. Things that read as generated, 7. Micro-typography, Contents (+1 more)

### Community 37 - "10. REFERENCE VOCABULARY (Pattern Names the Agent Should Know)"
Cohesion: 0.20
Nodes (10): 10. REFERENCE VOCABULARY (Pattern Names the Agent Should Know), Animation Library Choice, Cards & Containers, Galleries & Media, Hero Paradigms, Layout & Grids, Micro-Interactions & Effects, Navigation & Menus (+2 more)

### Community 38 - "tasteskill: Anti-Slop Frontend Skill"
Cohesion: 0.20
Nodes (10): 13. OUT OF SCOPE, 14. FINAL PRE-FLIGHT CHECK, 1.A Dial Inference (design read → dial values), 1.B Use-Case Presets, 1.C How the Dials Drive Output, 1. THE THREE DIALS (Core Configuration), 2.A When to reach for a real design system (use official packages), 2.B When the brief is an aesthetic, not a system (+2 more)

### Community 39 - "CORE DIRECTIVE: AWWWARDS-LEVEL DESIGN ENGINEERING"
Cohesion: 0.20
Nodes (9): 1. PYTHON-DRIVEN TRUE RANDOMIZATION (BREAKING THE LOOP), 2. AIDA STRUCTURE & SPACING, 3. HERO ARCHITECTURE & THE 2-LINE IRON RULE, 4. THE GAPLESS BENTO GRID, 5. ADVANCED GSAP MOTION & HOVER PHYSICS, 6. COMPONENT ARSENAL & CREATIVITY, 7. CONTENT, ASSETS & STRICT BANS, 8. MANDATORY PRE-FLIGHT <design_plan> (+1 more)

### Community 40 - "22. STYLE VARIATION ENGINE"
Cohesion: 0.20
Nodes (10): 22. STYLE VARIATION ENGINE, Decorative Asset Set, Image Art Direction Bias, Motion-Implied Language, Palette Logic, Signature Component Set, Structure Bias, Texture / Surface Treatment (+2 more)

### Community 41 - "Protocol: Premium Utilitarian Minimalism UI Architect"
Cohesion: 0.20
Nodes (9): 1. Protocol Overview, 2. Absolute Negative Constraints (Banned Elements), 3. Typographic Architecture, 4. Color Palette (Warm Monochrome + Spot Pastels), 5. Component Specifications, 6. Iconography & Imagery Directives, 7. Subtle Motion & Micro-Animations, 8. Execution Protocol (+1 more)

### Community 42 - "Ponytail Help"
Cohesion: 0.22
Nodes (8): Band (Claude Code), Configure Default Mode, Deactivate, Levels, More, Ponytail Help, Skills, Update

### Community 43 - "AGENTS.md"
Cohesion: 0.20
Nodes (9): Building with EAS, Codebase Architecture & Token Reduction (Graphify), Commands, Design Systems & Brand Aesthetics (awesome-design-md), Expo has changed — do not trust your training data, Minimalist Code & Anti-Bloat (Ponytail), Navigation & Routing, Rules (+1 more)

### Community 44 - "Critique — judging the render"
Cohesion: 0.22
Nodes (8): 1. How to look, 2. The score, 3. Caps, 4. Writing the critique, 5. What to fix first, 6. When to stop, Contents, Critique — judging the render

### Community 45 - "11. COMPONENT EXECUTION GUIDELINES"
Cohesion: 0.22
Nodes (9): 11. COMPONENT EXECUTION GUIDELINES, 3D Cascading Card Deck, Diagonal Staggered Square Masonry, Hover-Accordion Slice Layout, Off-Grid Editorial Layout, Pristine Gapless Bento Grid, Product UI Panel Stack, Turning Polaroid Arc (+1 more)

### Community 46 - "18. EXTRA CREATIVITY & IMPLEMENTATION EDGE"
Cohesion: 0.22
Nodes (9): 18. EXTRA CREATIVITY & IMPLEMENTATION EDGE, Composition variety check, Conversion focus, Cross-section contrast, CTA specificity, Cultural / tonal alignment, Data-viz restraint, Image variety inside one comp (+1 more)

### Community 47 - "Ponytail Help"
Cohesion: 0.22
Nodes (8): Band (Claude Code), Configure Default Mode, Deactivate, Levels, More, Ponytail Help, Skills, Update

### Community 48 - "9. AI TELLS (Forbidden Patterns)"
Cohesion: 0.25
Nodes (8): 9.A Visual & CSS, 9. AI TELLS (Forbidden Patterns), 9.B Typography, 9.C Layout & Spacing, 9.D Content & Data ("Jane Doe" Effect), 9.E External Resources & Components, 9.F Production-Test Tells (banned outright), 9.G EM-DASH BAN (the single most-violated Tell)

### Community 49 - "12. THE COMBINATORIAL VARIATION ENGINE"
Cohesion: 0.25
Nodes (8): 12. THE COMBINATORIAL VARIATION ENGINE, Background Character, Hero Architecture, Motion-Implied Language, Section System, Signature Component Set, Theme Paradigm, Typography Character

### Community 50 - "8. ANTI-AI-SLOP RULES"
Cohesion: 0.25
Nodes (8): 8. ANTI-AI-SLOP RULES, Carousel / marquee slop (layout), Content slop, Data / KPI slop, Density slop, Layout slop, Typography slop, Visual slop

### Community 51 - "tasteskill v2 (`design-taste-frontend`)"
Cohesion: 0.29
Nodes (6): Contents, How it works, Install, Notes, Requirements, tasteskill v2 (`design-taste-frontend`)

### Community 52 - "11. REDESIGN PROTOCOL"
Cohesion: 0.29
Nodes (7): 11.A Detect the Mode (first action), 11.B Audit Before Touching, 11.C Preservation Rules, 11.D Modernisation Levers (priority order), 11.E Decision Tree: Targeted Evolution vs Full Redesign, 11.F What Never Changes Silently, 11. REDESIGN PROTOCOL

### Community 53 - "3. DEFAULT ARCHITECTURE & CONVENTIONS"
Cohesion: 0.29
Nodes (7): 3.A Stack, 3.B State, 3.C Icons, 3.D Emoji Policy, 3. DEFAULT ARCHITECTURE & CONVENTIONS, 3.E Responsiveness & Layout Mechanics, 3.F Dependency Verification (mandatory)

### Community 54 - "6. PERFORMANCE & ACCESSIBILITY GUARDRAILS"
Cohesion: 0.29
Nodes (7): 6.A Hardware Acceleration, 6.B Reduced Motion (mandatory), 6.C Dark Mode (mandatory for any consumer-facing page), 6.D Core Web Vitals Targets, 6.E DOM Cost, 6.F Z-Index Restraint, 6. PERFORMANCE & ACCESSIBILITY GUARDRAILS

### Community 55 - "Full-Output Enforcement"
Cohesion: 0.29
Nodes (6): Banned Output Patterns, Baseline, Execution Process, Full-Output Enforcement, Handling Long Outputs, Quick Check

### Community 56 - "33. CATEGORY-SPECIFIC BIAS"
Cohesion: 0.29
Nodes (7): 33. CATEGORY-SPECIFIC BIAS, Commerce, Fintech, Health / Fitness, Productivity, Social, Wellness / Lifestyle

### Community 57 - "13. COLOR & MATERIAL RULES"
Cohesion: 0.29
Nodes (7): 13. COLOR & MATERIAL RULES, Background Confidence Rule, Background-image harmony, Gradient Discipline, Materiality, Palette Discipline, Strong guidance

### Community 58 - "4. HERO MINIMALISM RULES"
Cohesion: 0.29
Nodes (7): 4. HERO MINIMALISM RULES, Absolute Hero Rules, Graphic Restraint, Headline Rule, Hero Composition Bias, Pre-output check, Typography Execution

### Community 59 - "29. ANTI-AI-SLOP RULES"
Cohesion: 0.33
Nodes (6): 29. ANTI-AI-SLOP RULES, Content slop, Density slop, Layout slop, Typography slop, Visual slop

### Community 60 - "5. IMAGE COUNT & PAGE SLICING"
Cohesion: 0.33
Nodes (6): 5. IMAGE COUNT & PAGE SLICING, Continuity Rule, Counting rule, Format, Section size variety, THIS IS THE PRIMARY OUTPUT RULE

### Community 61 - "agent/skills/ponytail-audit/SKILL.md"
Cohesion: 0.40
Nodes (4): 1. Map first, 2. Look for, 3. Check before you report, 4. Output

### Community 62 - "Ponytail Gain"
Cohesion: 0.40
Nodes (4): Boundaries, Honesty boundary, Ponytail Gain, Scoreboard

### Community 63 - "agent/skills/ponytail-review/SKILL.md"
Cohesion: 0.40
Nodes (4): 1. Understand first, 2. Look for, 3. Check before you report, 4. Output

### Community 64 - "Ponytail"
Cohesion: 0.40
Nodes (4): Before you write, Levels, Ponytail, The smallest complete change

### Community 65 - "0. BRIEF INFERENCE (Read the Room Before Anything Else)"
Cohesion: 0.40
Nodes (5): 0.A Read these signals first, 0.B Output a one-line "Design Read" before generating, 0. BRIEF INFERENCE (Read the Room Before Anything Else), 0.C If the brief is ambiguous, ask one question, do not guess, 0.D Anti-Default Discipline

### Community 66 - "12. THE BLOCK LIBRARY (Contract - Implementations Land Here Iteratively)"
Cohesion: 0.40
Nodes (5): 12.A File Location, 12.B Required Frontmatter, 12.C Required Body Sections, 12.D Block-Library Discipline, 12. THE BLOCK LIBRARY (Contract - Implementations Land Here Iteratively)

### Community 67 - "5. CONTEXT-AWARE PROACTIVITY"
Cohesion: 0.40
Nodes (5): 5.A Sticky-Stack - Canonical Skeleton, 5.B Horizontal-Pan - Canonical Skeleton, 5.C Scroll-Reveal Stagger - Canonical Skeleton (lighter alternative), 5. CONTEXT-AWARE PROACTIVITY, 5.D Forbidden Animation Patterns

### Community 68 - "8. DARK MODE PROTOCOL"
Cohesion: 0.40
Nodes (5): 8.A Token Strategy (pick one, stick to it), 8.B Do Not Prescribe Specific Colors Here, 8.C Default Mode, 8.D Test in Both Modes Before Finishing, 8. DARK MODE PROTOCOL

### Community 69 - "21. MOBILE ANTI-AI-TELLS RULE"
Cohesion: 0.40
Nodes (5): 21. MOBILE ANTI-AI-TELLS RULE, Copy AI tells, Layout AI tells, UI clutter tells, Visual AI tells

### Community 70 - ".claude/skills/ponytail-audit/SKILL.md"
Cohesion: 0.40
Nodes (4): 1. Map first, 2. Look for, 3. Check before you report, 4. Output

### Community 71 - "Ponytail Gain"
Cohesion: 0.40
Nodes (4): Boundaries, Honesty boundary, Ponytail Gain, Scoreboard

### Community 72 - ".claude/skills/ponytail-review/SKILL.md"
Cohesion: 0.40
Nodes (4): 1. Understand first, 2. Look for, 3. Check before you report, 4. Output

### Community 73 - "Ponytail"
Cohesion: 0.40
Nodes (4): Before you write, Levels, Ponytail, The smallest complete change

### Community 74 - "agent/skills/ponytail-debt/SKILL.md"
Cohesion: 0.50
Nodes (3): Boundaries, Output, Scan

### Community 75 - "Ponytail — Anti-Bloat & Minimalist Engineering Rule"
Cohesion: 0.50
Nodes (3): Non-Negotiable, Ponytail — Anti-Bloat & Minimalist Engineering Rule, The 6-Step Decision Ladder

### Community 76 - "Awesome DESIGN.md"
Cohesion: 0.33
Nodes (5): Available Brands (84+), Awesome DESIGN.md, CLI Actions, How to Apply to Projects, Purpose

### Community 77 - "33. DEFAULT SECTION PACKS"
Cohesion: 0.50
Nodes (4): 12-section pack, 33. DEFAULT SECTION PACKS, 4-section pack, 8-section pack

### Community 78 - "14. HERO MINIMALISM RULES"
Cohesion: 0.50
Nodes (4): 14. HERO MINIMALISM RULES, Absolute Hero Rules, Headline Rule, Hero Cleanliness Rule

### Community 79 - "37. EXAMPLE INTERPRETATIONS"
Cohesion: 0.50
Nodes (4): 37. EXAMPLE INTERPRETATIONS, Example 1, Example 2, Example 3

### Community 80 - "2. PLATFORM MODE RULE"
Cohesion: 0.50
Nodes (4): 2. PLATFORM MODE RULE, Android-native premium, Cross-platform premium neutral, iOS-native premium

### Community 81 - "37. EXAMPLE INTERPRETATIONS"
Cohesion: 0.50
Nodes (4): 37. EXAMPLE INTERPRETATIONS, Example 1, Example 2, Example 3

### Community 82 - "15. DEFAULT SITE PACKS"
Cohesion: 0.50
Nodes (4): 12-section pack, 15. DEFAULT SITE PACKS, 4-section pack, 8-section pack

### Community 83 - "20. EXAMPLE INTERPRETATIONS"
Cohesion: 0.50
Nodes (4): 20. EXAMPLE INTERPRETATIONS, Example 1, Example 2, Example 3

### Community 84 - ".claude/skills/ponytail-debt/SKILL.md"
Cohesion: 0.50
Nodes (3): Boundaries, Output, Scan

### Community 87 - "7. DIAL DEFINITIONS (Technical Reference)"
Cohesion: 0.50
Nodes (4): 7. DIAL DEFINITIONS (Technical Reference), DESIGN_VARIANCE (Level 1-10), MOTION_INTENSITY (Level 1-10), VISUAL_DENSITY (Level 1-10)

## Knowledge Gaps
- **15 isolated node(s):** `@react-native-async-storage/async-storage`, `expo-av`, `expo-constants`, `expo-linking`, `expo-localization` (+10 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 809 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `tasteskill: Anti-Slop Frontend Skill` connect `tasteskill: Anti-Slop Frontend Skill` to `4. DESIGN ENGINEERING DIRECTIVES (Bias Correction)`, `0. BRIEF INFERENCE (Read the Room Before Anything Else)`, `12. THE BLOCK LIBRARY (Contract - Implementations Land Here Iteratively)`, `5. CONTEXT-AWARE PROACTIVITY`, `8. DARK MODE PROTOCOL`, `10. REFERENCE VOCABULARY (Pattern Names the Agent Should Know)`, `Appendix B - Canonical Sources (read these before reinventing)`, `9. AI TELLS (Forbidden Patterns)`, `11. REDESIGN PROTOCOL`, `3. DEFAULT ARCHITECTURE & CONVENTIONS`, `6. PERFORMANCE & ACCESSIBILITY GUARDRAILS`, `7. DIAL DEFINITIONS (Technical Reference)`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `@react-native-async-storage/async-storage`, `expo-av`, `expo-constants` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `assets.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.06648426812585499 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Should `responder.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07465667915106117 - nodes in this community are weakly interconnected._
- **Why does `CORE DIRECTIVE: AWWWARDS-LEVEL IMAGE ART DIRECTION` connect `CORE DIRECTIVE: AWWWARDS-LEVEL IMAGE ART DIRECTION` to `11. COMPONENT EXECUTION GUIDELINES`, `18. EXTRA CREATIVITY & IMPLEMENTATION EDGE`, `15. DEFAULT SITE PACKS`, `20. EXAMPLE INTERPRETATIONS`, `8. ANTI-AI-SLOP RULES`, `imagegen-frontend-web/SKILL.md`, `13. COLOR & MATERIAL RULES`, `4. HERO MINIMALISM RULES`, `5. IMAGE COUNT & PAGE SLICING`, `2. THE COMBINATORIAL VARIATION ENGINE`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Should `draw.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.09292929292929293 - nodes in this community are weakly interconnected._