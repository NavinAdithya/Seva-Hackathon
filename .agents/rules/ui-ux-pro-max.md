---
trigger: always_on
description: UI/UX design intelligence for web, mobile, and desktop. Activates on all UI/UX design, component creation, refactoring, color and typography decisions, accessibility audits, responsive layouts, design systems, and animations.
---

# UI/UX Pro Max Permanent Action Rule

This workspace is integrated with the **`ui-ux-pro-max`** design intelligence suite:
- Local Workspace Skill: `.agents/skills/ui-ux-pro-max/`
- Search CLI: `python .agents/skills/ui-ux-pro-max/scripts/search.py`
- Database: 79 styles, 192 product palettes, 74 font pairings, 119 UX guidelines, 105 curated icons, 17 GSAP presets, 25 chart types, 22 technology stacks.

## When to Trigger
Activate whenever:
1. Designing, building, refactoring, restyling, or reviewing React Native / Expo screens, components, and user flows.
2. The user asks for design systems, styling palettes, font combinations, chart selections, or layout structures.
3. Conducting accessibility (a11y) audits: WCAG 4.5:1 contrast, tap targets ≥44×44pt, accessible labels for screen readers.
4. Building responsive mobile layouts (safe area insets, keyboard avoiding views, dynamic notch sizing).

## Search Tool Usage
```bash
python .agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <ux|style|color|typography|chart|icons|gsap>
```

For design system generation:
```bash
python .agents/skills/ui-ux-pro-max/scripts/search.py "<product_type> <keywords>" --design-system -p "Sign-SOS"
```

## Non-Negotiable Mobile & UI Rules
1. **Accessibility**: Minimum text contrast 4.5:1. Never remove accessible focus indicators or accessibility labels on icon buttons.
2. **Touch Targets**: Minimum 44×44pt touchable area for all pressable elements with at least 8pt spacing between adjacent interactive controls.
3. **Typography**: Hierarchy must use established theme scales; avoid hardcoded arbitrary font sizes or unstyled raw hex colors.
4. **Motion & Feedback**: Meaningful haptic and visual feedback on touch/press; avoid blocking animations or unconstrained re-renders.
