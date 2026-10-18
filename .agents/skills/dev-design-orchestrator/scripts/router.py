#!/usr/bin/env python3
"""
dev-design-orchestrator: Autonomous Skill & Tool Router
Analyzes user prompts, leverages 1,740+ indexed skills and 13+ MCP servers,
and selects the exact right combination of skills based on the work.
Ensures the agent never blindly uses one single skill or overloads the task with bloat.
"""

import os
import sys
import json
import re
import argparse

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CATALOG_PATH = os.path.join(SCRIPT_DIR, "skills_catalog.json")

# Fallback paths for catalog if not found in current directory
FALLBACK_CATALOG_PATHS = [
    r"C:\Users\navan\.gemini\config\skills\dev-design-orchestrator\skills_catalog.json",
    r"c:\Sign-SOS\.agents\skills\dev-design-orchestrator\skills_catalog.json",
    r"C:\Users\navan\.agents\skills\dev-design-orchestrator\skills_catalog.json"
]

CORE_DOMAIN_RULES = {
    "brand_design_system": {
        "patterns": [r"\b(linear|vercel|stripe|apple|raycast|expo|claude|supabase|tesla|runway)\b", r"\b(brand|brandkit|design\.md|design tokens|brand identity)\b"],
        "primary_skill": "awesome-design-md",
        "action": "Extract authentic design tokens from ~/.gemini/config/awesome-design-md/design-md/<brand>/DESIGN.md or apply via design_md.py apply <brand> .",
        "guardrail": "Adhere strictly to verified brand color tokens, typography scales, line-heights, and elevation shadows."
    },
    "ui_ux_design": {
        "patterns": [r"\b(ui|ux|screen|page|card|button|modal|dialog|form|input|picker|navbar|tabs|layout|palette|typography|a11y|accessibility|contrast|wcag|touch target)\b"],
        "primary_skill": "ui-ux-pro-max",
        "action": "Query UI/UX intelligence: python ~/.gemini/config/skills/ui-ux-pro-max/scripts/search.py \"<query>\" --domain <ux|style|color|typography|chart|icons>",
        "guardrail": "Enforce 10-tier hierarchy: WCAG 4.5:1 text contrast, touch targets >=44x44pt, aria/accessibility labels, no focus ring removal."
    },
    "anti_slop_visuals": {
        "patterns": [r"\b(anti-slop|taste|high-end|premium|award-winning|handcrafted|editorial|brutalist|minimalist|clean look|modernize|unslop|redesign)\b"],
        "primary_skill": "taste-skill",
        "action": "Activate design-taste-frontend / high-end-visual-design / minimalist-ui / industrial-brutalist-ui.",
        "guardrail": "Ban generic AI templates (cookie-cutter 3-card grids, soft purple pills, monotonous gradients). Create intentional asymmetric rhythm."
    },
    "animation_motion": {
        "patterns": [r"\b(animate|animation|gsap|transition|micro-interaction|gesture|reanimated|spring|motion|haptic|fade|slide)\b"],
        "primary_skill": "ui-ux-pro-max (gsap) & gpt-taste",
        "action": "Query motion guidance: python ~/.gemini/config/skills/ui-ux-pro-max/scripts/search.py \"<query>\" --domain gsap",
        "guardrail": "Context-aware timing (150-300ms), GPU transforms and opacity only (never animate layout properties like width/height), support reduced-motion."
    },
    "spatial_3d": {
        "patterns": [r"\b(3d|three\.js|threejs|r3f|react-three-fiber|webgl|blender|mesh|geometry|spatial|shader|gltf|glb|canvas 3d|spatial puzzle|orbit)\b"],
        "primary_skill": "3dviz-pro-max",
        "action": "Search 3D recipes: python ~/.gemini/config/skills/3dviz-pro-max/scripts/search.py \"<subject>\" and apply spatial reasoning.",
        "guardrail": "Target 60fps on mobile. Single-allocation lifecycle (allocate geometries/materials once, update transforms/uniforms on tick)."
    },
    "code_minimalist_ponytail": {
        "patterns": [r"\b(code|fix|bug|refactor|implement|build|create|add feature|clean up|simplify|endpoint|handler|service|store|hook|component|logic)\b"],
        "primary_skill": "ponytail",
        "action": "Apply the 6-Step Decision Ladder: reuse existing codebase code -> native platform primitives -> installed dependencies -> smallest complete diff.",
        "guardrail": "Eliminate boilerplate, speculative wrappers, and 'blah blah codes'. Never cut security, validation, error handling, or tests."
    },
    "codebase_architecture": {
        "patterns": [r"\b(how does|where is|architecture|trace|dependency|flow|call graph|explain codebase|find all references|code structure|ast)\b"],
        "primary_skill": "graphify",
        "action": "Run graphify query \"<question>\" before reading raw files. Run graphify update . after modifications.",
        "guardrail": "Query knowledge graph first to minimize token consumption by 70x+."
    },
    "security_pentest": {
        "patterns": [r"\b(security|pentest|vulnerability|exploit|cve|recon|nmap|sqlmap|ctf|burp|payload|xss|injection|reverse engineering|crypto|malware)\b"],
        "primary_skill": "hexstrike-ai (MCP) & CTF skills",
        "action": "Leverage hexstrike-ai MCP tools (nmap_scan, sqlmap_scan, nuclei_scan, etc.) and ctf-* specialized skills.",
        "guardrail": "Authorize security targets strictly; provide reproducible proof-of-concept and remediation guidance."
    },
    "browser_testing": {
        "patterns": [r"\b(playwright|e2e|browser test|browser automation|click button on web|scrape|chrome devtools|a11y audit web)\b"],
        "primary_skill": "playwright (MCP) / chrome-browser (MCP)",
        "action": "Execute playwright or chrome-browser MCP tools for live DOM inspection, screenshot verification, and automated assertions.",
        "guardrail": "Verify visual states with screenshots; avoid flaky sleeps by waiting on explicit DOM selectors."
    }
}

def load_catalog():
    for p in [CATALOG_PATH] + FALLBACK_CATALOG_PATHS:
        if os.path.exists(p):
            try:
                with open(p, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                pass
    return None

def detect_workspace_stack():
    """Detect the current workspace tech stack to filter out mismatched skills."""
    stack = {"is_react_native": False, "is_expo": False, "is_flutter": False, "is_web": False}
    cwd = os.getcwd()
    
    # Check package.json
    pkg_json = os.path.join(cwd, "package.json")
    if os.path.exists(pkg_json):
        try:
            with open(pkg_json, "r", encoding="utf-8") as f:
                data = json.load(f)
                deps = {**data.get("dependencies", {}), **data.get("devDependencies", {})}
                if "expo" in deps:
                    stack["is_expo"] = True
                    stack["is_react_native"] = True
                elif "react-native" in deps:
                    stack["is_react_native"] = True
                if "react" in deps or "next" in deps or "vue" in deps:
                    stack["is_web"] = True
        except Exception:
            pass

    if os.path.exists(os.path.join(cwd, "pubspec.yaml")):
        stack["is_flutter"] = True

    return stack

def search_catalog_direct(query, catalog, limit=10):
    terms = set(re.findall(r"\w+", query.lower()))
    matches = []
    
    for item_id, item in catalog.get("items", {}).items():
        name_terms = set(re.findall(r"\w+", item["name"].lower()))
        desc_terms = set(re.findall(r"\w+", item["description"].lower()))
        score = len(terms & name_terms) * 3 + len(terms & desc_terms)
        if score > 0:
            matches.append((score, item))
            
    matches.sort(key=lambda x: x[0], reverse=True)
    return [m[1] for m in matches[:limit]]

def route_task(prompt, catalog):
    prompt_lower = prompt.lower()
    stack = detect_workspace_stack()
    matched_domains = []
    
    # 1. Match core domain rules
    for domain_id, config in CORE_DOMAIN_RULES.items():
        score = 0
        hits = []
        for pat in config["patterns"]:
            found = re.findall(pat, prompt_lower)
            if found:
                score += len(found)
                hits.extend(found)
        if score > 0:
            matched_domains.append({
                "domain": domain_id,
                "score": score,
                "primary_skill": config["primary_skill"],
                "action": config["action"],
                "guardrail": config["guardrail"],
                "hits": list(set(hits))
            })

    matched_domains.sort(key=lambda x: x["score"], reverse=True)

    # 2. Contextual Stack Guard: filter out inappropriate skills
    skipped_tools = []
    if stack["is_expo"] and not any(re.search(r"\bflutter\b", prompt_lower) for _ in [1]):
        skipped_tools.append("flutter_dart-mcp-server & Flutter skills (Project is Expo / React Native)")

    # 3. Fine-grained skill lookup across 1,740+ catalog
    catalog_matches = []
    if catalog:
        catalog_matches = search_catalog_direct(prompt, catalog, limit=6)

    # 4. Formulate Multi-Skill Composition (Anti-Blindness)
    primary_skills = []
    complementary_skills = []
    recommended_mcp = []

    # Assign from matched domains
    for d in matched_domains:
        skill_name = d["primary_skill"]
        if "MCP" in skill_name:
            recommended_mcp.append({"name": skill_name, "reason": d["action"]})
        elif not primary_skills:
            primary_skills.append({"name": skill_name, "action": d["action"], "guardrail": d["guardrail"]})
        else:
            complementary_skills.append({"name": skill_name, "action": d["action"], "guardrail": d["guardrail"]})

    # If general coding is requested alongside UI, Ponytail is the complementary code reducer
    has_ui = any(d["domain"] in ["ui_ux_design", "brand_design_system", "anti_slop_visuals", "spatial_3d"] for d in matched_domains)
    has_code = any(d["domain"] == "code_minimalist_ponytail" for d in matched_domains)
    
    if has_ui and not has_code:
        # Automatically attach ponytail to prevent UI code bloat
        complementary_skills.append({
            "name": "ponytail",
            "action": CORE_DOMAIN_RULES["code_minimalist_ponytail"]["action"],
            "guardrail": "Keep component diff minimal: reuse existing theme tokens and store primitives."
        })

    # If no core domain matched, fallback to ponytail + catalog search
    if not primary_skills and not complementary_skills:
        primary_skills.append({
            "name": "ponytail",
            "action": CORE_DOMAIN_RULES["code_minimalist_ponytail"]["action"],
            "guardrail": CORE_DOMAIN_RULES["code_minimalist_ponytail"]["guardrail"]
        })

    return {
        "prompt": prompt,
        "workspace_stack": stack,
        "matched_domains": [d["domain"] for d in matched_domains],
        "primary_skills": primary_skills[:2],
        "complementary_skills": complementary_skills[:3],
        "recommended_mcp": recommended_mcp[:2],
        "catalog_discovered": [c["name"] for c in catalog_matches if c["type"] == "skill"][:4],
        "skipped_tools": skipped_tools
    }

def print_routing_report(result):
    print("=" * 80)
    print("      DEV-DESIGN-ORCHESTRATOR: MULTI-SKILL INTELLIGENCE ROUTER (1,750+ SKILLS)      ")
    print("=" * 80)
    print(f"Task Analyzed: \"{result['prompt']}\"")
    
    stack_info = []
    if result["workspace_stack"]["is_expo"]:
        stack_info.append("Expo / React Native")
    if result["workspace_stack"]["is_web"]:
        stack_info.append("Web (React/Next)")
    if result["workspace_stack"]["is_flutter"]:
        stack_info.append("Flutter")
    print(f"Active Workspace Context: {', '.join(stack_info) if stack_info else 'Standard Node/TypeScript'}\n")

    print("[*] PRIMARY SKILL (Core Task Driver):")
    for s in result["primary_skills"]:
        print(f"    -> {s['name']}")
        print(f"       Action    : {s['action']}")
        print(f"       Guardrail : {s['guardrail']}")

    if result["complementary_skills"]:
        print("\n[*] COMPLEMENTARY SKILLS (Synergy & Quality Assurance):")
        for s in result["complementary_skills"]:
            print(f"    -> {s['name']}")
            print(f"       Action    : {s['action']}")
            print(f"       Guardrail : {s['guardrail']}")

    if result["recommended_mcp"]:
        print("\n[*] RECOMMENDED MCP TOOLS (Live Execution Capabilities):")
        for m in result["recommended_mcp"]:
            print(f"    -> {m['name']}: {m['reason']}")

    if result["catalog_discovered"]:
        print(f"\n[*] SPECIFIC MATCHES FROM 1,740+ CATALOG: {', '.join(result['catalog_discovered'])}")

    if result["skipped_tools"]:
        print(f"\n[-] INTENTIONALLY BYPASSED (Anti-Bloat Protection): {', '.join(result['skipped_tools'])}")

    print("=" * 80)

def main():
    parser = argparse.ArgumentParser(description="Multi-Skill Autonomous Router for Antigravity")
    parser.add_argument("prompt", nargs="*", help="The task prompt to analyze")
    parser.add_argument("--json", action="store_true", help="Output result as JSON")
    parser.add_argument("--refresh", action="store_true", help="Re-index all installed skills and tools")
    parser.add_argument("--search", type=str, help="Search the 1,740+ skills catalog directly")
    args = parser.parse_args()

    if args.refresh:
        indexer_script = os.path.join(SCRIPT_DIR, "index_skills.py")
        if os.path.exists(indexer_script):
            os.system(f"python {indexer_script}")
        else:
            print("Indexer script not found.")
        return

    catalog = load_catalog()

    if args.search:
        if not catalog:
            print("Catalog not found. Run --refresh first.")
            return
        results = search_catalog_direct(args.search, catalog, limit=10)
        print(f"Found {len(results)} matches for '{args.search}':\n")
        for r in results:
            print(f"• [{r['type'].upper()}] {r['name']} ({r['category']})")
            print(f"  {r['description'][:100]}...\n")
        return

    if not args.prompt:
        print("Please provide a prompt to analyze, or use --search / --refresh.")
        return

    full_text = " ".join(args.prompt)
    result = route_task(full_text, catalog)

    if args.json:
        print(json.dumps(result, indent=2))
    else:
        print_routing_report(result)

if __name__ == "__main__":
    main()
