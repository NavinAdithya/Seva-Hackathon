---
trigger: always_on
description: Automatically leverage the awesome-design-md collection of 84+ brand design systems whenever styling UI, establishing design systems, or mimicking specific brand aesthetics.
---

# awesome-design-md Permanent Action Rule

You have permanent access to the **`awesome-design-md`** collection of 84+ verified brand design systems located at:
`C:\Users\navan\.gemini\config\awesome-design-md\design-md\`

## Automatic Behavior:
1. **Brand Aesthetic Matching**:
   Whenever a user asks to model or style a UI, screen, website, or mobile application after a recognized brand (e.g., Linear, Vercel, Stripe, Apple, Raycast, Expo, Claude, Supabase, Tesla, Runway, etc.):
   - Look up the brand's verified specification in `C:\Users\navan\.gemini\config\awesome-design-md\design-md\<brand>\DESIGN.md` (or run `python C:\Users\navan\.gemini\config\awesome-design-md\design_md.py show <brand>`).
   - Extract the authentic design tokens: exact hex colors, typography scales, line-heights, letter-spacing, border-radii, elevation shadows, and spacing rhythm.
   - If requested to establish a permanent design system for the current workspace, copy it to the root via:
     ```bash
     python C:\Users\navan\.gemini\config\awesome-design-md\design_md.py apply <brand> .
     ```

2. **Project `DESIGN.md` Enforcement**:
   - If a `DESIGN.md` file exists in the root of the project, treat it as the **visual source of truth** (complementing `AGENTS.md` which is the functional source of truth).
   - Ensure all frontend/UI components, color constants, stylesheets, and Tailwind/React Native themes adhere strictly to the rules defined in `DESIGN.md`.

3. **No Slop & High Visual Cohesion**:
   - Never use arbitrary un-themed hex codes or generic fonts when a defined `DESIGN.md` or brand system exists.
   - Use the curated tokens for consistent, production-grade visual design.
