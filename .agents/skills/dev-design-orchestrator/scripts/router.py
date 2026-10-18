#!/usr/bin/env python3
"""
dev-design-orchestrator: Autonomous Skill Router
Analyzes user prompts and automatically maps work to the optimal specialized skill suite:
- ui-ux-pro-max: UI/UX design intelligence, design systems, accessibility (WCAG 4.5:1), 79 styles, 192 palettes.
- taste-skill: Anti-slop frontend art direction, high-end agency aesthetics, brutalist/minimalist editorial layouts.
- awesome-design-md: 84+ verified brand design systems (Linear, Vercel, Stripe, Apple, Raycast, Claude, etc.).
- 3dviz-pro-max: Spatial 3D scenes, Three.js, React Three Fiber, WebGL, Blender, and 60fps performance rigs.
- ponytail: Anti-bloat, minimalist engineering, lazy senior dev architecture, smallest complete working change.
- graphify: Knowledge graph AST navigation, token reduction engine, relationship tracing.
"""

import sys
import json
import re
import argparse

SKILL_ROUTING_MAP = {
    "brand_design_system": {
        "patterns": [
            r"\b(linear|vercel|stripe|apple|raycast|expo|claude|supabase|tesla|runway|tailwind|shadcn)\b",
            r"\b(brand|brandkit|brand-identity|design\.md|design tokens|brand system)\b"
        ],
        "skill": "awesome-design-md",
        "action": "Look up brand specification in ~/.gemini/config/awesome-design-md/design-md/<brand>/DESIGN.md or apply tokens via design_md.py apply <brand> .",
        "guardrail": "Strictly adopt exact hex tokens, typography scales, line-heights, and elevation shadows from DESIGN.md."
    },
    "3d_spatial": {
        "patterns": [
            r"\b(3d|three\.js|threejs|r3f|react-three-fiber|webgl|blender|mesh|geometry|spatial|shader|gltf|glb|model|scene|canvas 3d|orbit)\b"
        ],
        "skill": "3dviz-pro-max",
        "action": "Search 3D recipes: python ~/.gemini/config/skills/3dviz-pro-max/scripts/search.py \"<subject>\" and apply spatial reasoning.",
        "guardrail": "Maintain 60fps on mobile. Reuse geometries/materials; update transforms on tick without allocating inside animation loops."
    },
    "ui_ux_design": {
        "patterns": [
            r"\b(ui|ux|screen|page|card|button|navbar|modal|dialog|header|footer|dashboard|form|input|select|picker|tabs|layout|palette|typography|font|contrast|touch|a11y|accessibility|wcag)\b"
        ],
        "skill": "ui-ux-pro-max",
        "action": "Query UI/UX intelligence: python ~/.gemini/config/skills/ui-ux-pro-max/scripts/search.py \"<query>\" --domain <ux|style|color|typography|chart|icons>",
        "guardrail": "WCAG 4.5:1 text contrast, minimum 44x44pt touch targets, no focus ring removal, visible labels and accessible labels on icon buttons."
    },
    "anti_slop_aesthetic": {
        "patterns": [
            r"\b(anti-slop|taste|high-end|premium|award-winning|handcrafted|editorial|brutalist|minimalist|sleek|clean design|redesign|ugly|generic)\b"
        ],
        "skill": "taste-skill",
        "action": "Activate design-taste-frontend / high-end-visual-design / minimalist-ui / industrial-brutalist-ui.",
        "guardrail": "Ban generic AI templates (cookie-cutter 3-card grids, soft purple pills, monotonous gradients). Enforce intentional asymmetrical rhythm and high contrast."
    },
    "animation_motion": {
        "patterns": [
            r"\b(animate|animation|gsap|transition|micro-interaction|gesture|reanimated|spring|motion|haptic|fade|slide|keyframe)\b"
        ],
        "skill": "ui-ux-pro-max (gsap) & gpt-taste",
        "action": "Query motion guidance: python ~/.gemini/config/skills/ui-ux-pro-max/scripts/search.py \"<query>\" --domain gsap",
        "guardrail": "Context-aware timing (150-300ms typical), animate GPU transforms/opacity only (never layout properties like width/height), support reduced-motion."
    },
    "codebase_architecture": {
        "patterns": [
            r"\b(how does|where is|architecture|trace|dependency|flow|call graph|explain codebase|find all references|code structure)\b"
        ],
        "skill": "graphify",
        "action": "Run graphify query \"<question>\" before reading raw files. Run graphify update . after modifying code.",
        "guardrail": "Prioritize knowledge graph queries over broad file reads to reduce context token consumption by 70x+."
    },
    "coding_and_refactoring": {
        "patterns": [
            r"\b(code|fix|bug|refactor|implement|build|create|add feature|clean up|simplify|endpoint|handler|service|store|hook|component)\b"
        ],
        "skill": "ponytail",
        "action": "Apply the 6-Step Decision Ladder: reuse existing codebase code -> native primitives -> installed dependencies -> smallest complete diff.",
        "guardrail": "Eliminate boilerplate and speculative wrappers. Never cut validation, error handling, security, or data-loss protection."
    }
}

def analyze_prompt(text):
    text_lower = text.lower()
    matched_skills = []
    
    for category, config in SKILL_ROUTING_MAP.items():
        score = 0
        matching_terms = []
        for pat in config["patterns"]:
            matches = re.findall(pat, text_lower)
            if matches:
                score += len(matches)
                matching_terms.extend(matches)
        if score > 0:
            matched_skills.append({
                "category": category,
                "skill": config["skill"],
                "score": score,
                "matches": list(set(matching_terms)),
                "action": config["action"],
                "guardrail": config["guardrail"]
            })
            
    # Sort by score descending
    matched_skills.sort(key=lambda x: x["score"], reverse=True)
    
    # If no specific match, default to ponytail + ui-ux-pro-max base guidance
    if not matched_skills:
        matched_skills.append({
            "category": "coding_and_refactoring",
            "skill": "ponytail",
            "score": 1,
            "matches": ["default_fallback"],
            "action": SKILL_ROUTING_MAP["coding_and_refactoring"]["action"],
            "guardrail": SKILL_ROUTING_MAP["coding_and_refactoring"]["guardrail"]
        })
        
    return matched_skills

def main():
    parser = argparse.ArgumentParser(description="Autonomous Skill Router for Antigravity")
    parser.add_argument("prompt", nargs="+", help="The user prompt or task description to analyze")
    parser.add_argument("--json", action="store_true", help="Output result as JSON")
    args = parser.parse_args()

    full_text = " ".join(args.prompt)
    results = analyze_prompt(full_text)

    if args.json:
        print(json.dumps(results, indent=2))
        return

    print("================================================================================")
    print("                 DEV-DESIGN-ORCHESTRATOR: AUTONOMOUS ROUTING                     ")
    print("================================================================================")
    print(f"Task Analyzed: \"{full_text}\"\n")
    print(f"Active Skills Identified ({len(results)}):\n")

    for idx, item in enumerate(results, 1):
        print(f"[{idx}] Category: {item['category'].upper()}")
        print(f"    Skill      : {item['skill']}")
        print(f"    Keywords   : {', '.join(item['matches'])}")
        print(f"    Action     : {item['action']}")
        print(f"    Guardrail  : {item['guardrail']}\n")
    print("================================================================================")

if __name__ == "__main__":
    main()
