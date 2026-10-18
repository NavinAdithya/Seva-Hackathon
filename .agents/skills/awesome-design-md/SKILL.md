---
name: awesome-design-md
description: Curated collection of 84+ production-grade DESIGN.md design systems from leading tech, AI, and developer brands (Linear, Vercel, Stripe, Apple, Raycast, Claude, Expo, Runway, Supabase, Tesla, etc.). Use whenever designing, building, styling, or standardizing UI components, design tokens, colors, typography scales, or when the user asks to adopt a specific brand's aesthetic or create a DESIGN.md file.
---

# Awesome DESIGN.md

A comprehensive library of 84+ analyzed, production-grade `DESIGN.md` design system specifications from top brands (Stripe, Linear, Vercel, Apple, Raycast, Claude, Expo, Supabase, Tesla, Runway, etc.).

## Purpose
`DESIGN.md` defines a project's visual design system in pure Markdown:
- Exact color palettes (primary, canvas, soft-canvas, ink, mute, accents, borders, gradients)
- Typography scales (display, headline, body, caption, letter-spacing, line-heights)
- Border radii, elevation layers, shadows, and z-indices
- Component rules, spacing rhythm, and micro-interactions

## Available Brands (84+)
Key brands included in `C:\Users\navan\.gemini\config\awesome-design-md\design-md\`:
- **AI & Dev**: `claude`, `cursor`, `expo`, `linear.app`, `mistral.ai`, `ollama`, `opencode.ai`, `raycast`, `replicate`, `runwayml`, `supabase`, `together.ai`, `vercel`, `warp`, `x.ai`
- **Consumer & Tech**: `apple`, `airbnb`, `bmw`, `cal`, `figma`, `framer`, `notion`, `posthog`, `resend`, `spotify`, `stripe`, `superhuman`, `tesla`, `webflow`, `zapier`

## CLI Actions
Use the local helper script to search, inspect, or apply any design system:
```bash
# List all 84+ design systems
python C:\Users\navan\.gemini\config\awesome-design-md\design_md.py list

# Search by keyword or aesthetic (e.g. dark, minimalist, crypto, editorial)
python C:\Users\navan\.gemini\config\awesome-design-md\design_md.py search <query>

# Apply a brand's DESIGN.md to the current project
python C:\Users\navan\.gemini\config\awesome-design-md\design_md.py apply <brand> .

# Inspect the design tokens and typography of a brand
python C:\Users\navan\.gemini\config\awesome-design-md\design_md.py show <brand>
```

## How to Apply to Projects
1. **Identify the Aesthetic**: When a user mentions a brand aesthetic (e.g., "make it look like Linear" or "use Vercel style"), look up the matching brand in the library.
2. **Copy `DESIGN.md`**: Run `apply <brand>` to place `DESIGN.md` in the project root.
3. **Generate UI Matching Tokens**: Read the project's `DESIGN.md` and adhere strictly to its hex color values, font stacks, spacing scales, and border radii.
