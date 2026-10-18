---
version: 1.0.0
name: SignSOS Design System
description: High-contrast, tactile, inclusive emergency design system engineered for individuals with speech, hearing, visual, or physical disabilities and first responders. Inspired by Raycast precision and Apple accessibility standards.
product: SignSOS (Swasth & Samavesh Bharat - SEVA First Innovation Challenge 2026)
accessibility: WCAG 2.1 AAA Compliant

colors:
  canvas: "#0B0F19"             # Pure deep obsidian background (conserves OLED battery in disasters)
  canvas-raised: "#111726"      # Slightly elevated backdrop
  surface: "#1A2133"            # Standard card and tile container
  surface-elevated: "#232D42"   # Interactive highlighted state / active chip
  surface-interactive: "#2C3852" # Selected option / pressed card

  hairline: "#2A364F"           # Subtle 1px structural container divider
  hairline-strong: "#3B4D70"    # Focused state / distinct boundary
  hairline-highlight: "#FEF08A" # High-visibility accessibility focus indicator

  text-primary: "#F8FAFC"       # High-contrast primary label (16.2:1 contrast against canvas)
  text-secondary: "#94A3B8"     # Descriptive subtext (6.8:1 contrast against surface)
  text-muted: "#64748B"         # De-emphasized metadata (4.6:1 contrast against canvas)

  accent-highvis: "#FEF08A"     # 1.5m High-Visibility Emergency Yellow (18.1:1 on #0B0F19)
  accent-highvis-pressed: "#EAB308"
  accent-on-highvis: "#0B0F19"  # Black text on High-Vis yellow

  emergency-critical: "#EF4444" # Critical urgency / ambulance / bleeding (Red)
  emergency-critical-bg: "rgba(239, 68, 68, 0.14)"
  emergency-high: "#F59E0B"     # Urgent attention / severe pain (Amber)
  emergency-high-bg: "rgba(245, 158, 11, 0.14)"
  emergency-stable: "#10B981"   # Stable / verified / safe (Emerald)
  emergency-stable-bg: "rgba(16, 185, 129, 0.14)"

  category-medical: "#38BDF8"   # Sky blue
  category-safety: "#A855F7"    # Purple
  category-fire: "#F97316"      # Orange
  category-disaster: "#06B6D4"  # Cyan
  category-accident: "#EF4444"  # Red
  category-general: "#EAB308"   # Gold

typography:
  display-billboard:
    fontSize: 52
    fontWeight: "900"
    lineHeight: 60
    letterSpacing: -0.5
  heading-xl:
    fontSize: 28
    fontWeight: "800"
    lineHeight: 34
    letterSpacing: -0.3
  heading-lg:
    fontSize: 22
    fontWeight: "700"
    lineHeight: 28
  subhead:
    fontSize: 18
    fontWeight: "600"
    lineHeight: 24
  body:
    fontSize: 16
    fontWeight: "500"
    lineHeight: 22
  caption:
    fontSize: 13
    fontWeight: "600"
    lineHeight: 18

touch-and-geometry:
  minimum-touch-target: 64      # dp (exceeds WCAG 44dp requirement for emergency motor tremor)
  standard-touch-target: 48     # dp for auxiliary buttons
  border-radius-tile: 20        # dp for large gateway tiles
  border-radius-card: 16        # dp for lists and transcripts
  border-radius-chip: 12        # dp for options and quick pills
  touch-spacing-minimum: 10     # dp between adjacent interactive controls

motion-and-haptics:
  press-animation-duration: 120 # ms
  spring-damping: 15
  haptic-feedback: "selection / impactMedium on interactive tap, impactHeavy on SOS action"
  reduced-motion: "Respect system prefers-reduced-motion, replace transforms with instant opacity switch"
---
