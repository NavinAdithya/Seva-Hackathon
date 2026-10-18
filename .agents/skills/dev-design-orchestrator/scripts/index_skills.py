#!/usr/bin/env python3
"""
dev-design-orchestrator: Skill & Tool Indexer
Fast, pruned scanner that indexes all 1,700+ skills across Antigravity, universal agents,
installed plugins, and active MCP tool servers into a unified skills_catalog.json.
"""

import os
import re
import json
import time

SEARCH_PATHS = [
    r"C:\Users\navan\.gemini\config\skills",
    r"C:\Users\navan\.gemini\antigravity\builtin\skills",
    r"C:\Users\navan\.agents\skills",
    r"c:\Sign-SOS\.agents\skills",
]

PLUGINS_ROOT = r"C:\Users\navan\.gemini\config\plugins"

MCP_SERVERS = {
    "hexstrike-ai": {
        "description": "120+ offensive security, reconnaissance, web security, CVE exploitation, binary analysis, and penetration testing tools.",
        "category": "security_pentest",
        "keywords": ["nmap", "gobuster", "nuclei", "sqlmap", "metasploit", "hydra", "burpsuite", "zap", "radare2", "ghidra", "exploit", "cve", "pentest", "vulnerability", "subfinder"]
    },
    "playwright": {
        "description": "End-to-end browser automation, web application testing, visual assertions, and codegen.",
        "category": "browser_testing",
        "keywords": ["playwright", "e2e", "browser test", "click", "assert", "codegen", "screenshot web"]
    },
    "chrome-browser": {
        "description": "Direct interactive Chrome browser control, DOM inspection, live navigation, and screenshotting.",
        "category": "browser_testing",
        "keywords": ["chrome", "inspect dom", "live browser", "click element", "take screenshot"]
    },
    "rea": {
        "description": "Reverse Engineering Anything: native binaries, Android APKs, Mach-O, Swift, Electron, decompiler, JEB, Ghidra, Frida.",
        "category": "reverse_engineering",
        "keywords": ["reverse engineer", "decompile", "disassemble", "apk", "mach-o", "native binary", "firmware", "frida", "ghidra", "jeb"]
    },
    "flutter_dart-mcp-server": {
        "description": "Flutter and Dart LSP, hot reload, hot restart, widget inspector, Flutter driver, and static analysis.",
        "category": "mobile_flutter",
        "keywords": ["flutter", "dart", "hot reload", "hot restart", "widget inspector", "pub dev", "analyze dart"]
    },
    "graphify": {
        "description": "Codebase AST knowledge graph, relationship tracing, god nodes, token reduction, and architecture mapping.",
        "category": "codebase_architecture",
        "keywords": ["graphify", "query graph", "trace relationship", "token reduction", "call graph", "architecture review"]
    },
    "firebase-mcp-server": {
        "description": "Firebase management: Firestore/Realtime DB security rules, app configuration, environment, deployment.",
        "category": "cloud_backend",
        "keywords": ["firebase", "firestore", "security rules", "firebase deploy", "firebase init"]
    },
    "shadcn": {
        "description": "Radix UI + Tailwind CSS component registry inspection, item installation, and accessibility audits.",
        "category": "ui_ux_design",
        "keywords": ["shadcn", "radix", "tailwind components", "add component", "component registry"]
    },
    "gemini-api_gemini-api-docs": {
        "description": "Official Google Gemini API and SDK documentation search and retrieval.",
        "category": "ai_llm",
        "keywords": ["gemini api", "google genai", "gemini docs", "live api", "generate content"]
    },
    "cloudflare-docs": {
        "description": "Cloudflare Workers, Pages migration, and Cloudflare platform documentation search.",
        "category": "cloud_backend",
        "keywords": ["cloudflare", "workers", "pages migration", "cloudflare docs"]
    },
    "notion-mcp-server": {
        "description": "Notion workspace interaction: read/write pages, blocks, databases, and sync markdown.",
        "category": "productivity",
        "keywords": ["notion", "notion database", "notion page", "notion block"]
    },
    "sequential-thinking": {
        "description": "Multi-step dynamic hypothesis reasoning and problem decomposition for complex reasoning tasks.",
        "category": "deep_reasoning",
        "keywords": ["sequential thinking", "complex reasoning", "multi-step plan", "hypothesis revision"]
    },
    "StitchMCP": {
        "description": "Google Stitch UI generation, screen creation from text, design system synchronization, and variants.",
        "category": "ui_ux_design",
        "keywords": ["stitch", "generate screen", "design system stitch", "stitch ui"]
    }
}

CATEGORIES = {
    "brand_design_system": ["brand", "linear", "apple", "stripe", "vercel", "raycast", "claude", "design.md", "design-system", "design tokens"],
    "ui_ux_design": ["ui", "ux", "screen", "button", "card", "layout", "typography", "palette", "modal", "navbar", "a11y", "accessibility", "contrast", "wcag", "touch target", "tailwind", "responsive"],
    "anti_slop_aesthetic": ["anti-slop", "taste", "high-end", "editorial", "brutalist", "minimalist", "premium", "award-winning", "unslop"],
    "animation_motion": ["animation", "animate", "gsap", "motion", "gesture", "reanimated", "spring", "haptic", "transition"],
    "3d_spatial": ["3d", "three.js", "threejs", "r3f", "react-three-fiber", "webgl", "blender", "mesh", "spatial", "shader", "gltf", "spline"],
    "code_minimalist_ponytail": ["ponytail", "refactor", "minimalist", "clean code", "bloat", "lazy senior", "diff", "simplify", "yagni"],
    "codebase_architecture": ["graphify", "architecture", "dependency", "ast", "token reduction", "call graph", "trace", "explain codebase"],
    "mobile_expo_rn": ["expo", "react-native", "react native", "eas", "ios", "android", "mobile app", "navigation"],
    "mobile_flutter": ["flutter", "dart", "pubspec", "widget", "bloc"],
    "security_pentest": ["security", "pentest", "vulnerability", "exploit", "cve", "recon", "nmap", "sqlmap", "ctf", "burp", "payload"],
    "reverse_engineering": ["decompile", "disassemble", "apk", "mach-o", "native binary", "frida", "ghidra", "jeb", "rea", "reverse"],
    "cloud_data": ["bigquery", "dataform", "dbt", "gcp", "google cloud", "spark", "pipeline", "etl", "sql", "firebase"],
    "ai_llm": ["gemini", "llm", "prompt", "vector", "embedding", "rag", "langchain", "agent"],
    "browser_testing": ["playwright", "devtools", "e2e", "browser test", "a11y-debugging", "lighthouse", "performance audit"]
}

EXCLUDE_DIRS = {"node_modules", ".git", "dist", "build", ".cache", "test", "coverage"}

def parse_frontmatter(file_path):
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read(2048)
        if content.startswith("---"):
            parts = content.split("---", 2)
            if len(parts) >= 3:
                raw_fm = parts[1]
                name_m = re.search(r"^\s*name:\s*(.+)$", raw_fm, re.MULTILINE)
                desc_m = re.search(r"^\s*description:\s*(.+)$", raw_fm, re.MULTILINE)
                name = name_m.group(1).strip("\"' ") if name_m else None
                desc = desc_m.group(1).strip("\"' ") if desc_m else ""
                return name, desc
    except Exception:
        pass
    return None, ""

def classify_category(name, desc):
    combined = f"{name} {desc}".lower()
    best_cat = "general_dev"
    max_hits = 0
    for cat, keywords in CATEGORIES.items():
        hits = sum(1 for kw in keywords if re.search(rf"\b{re.escape(kw)}\b", combined))
        if hits > max_hits:
            max_hits = hits
            best_cat = cat
    return best_cat

def build_catalog():
    t0 = time.time()
    skills = {}

    for search_dir in SEARCH_PATHS:
        if not os.path.exists(search_dir):
            continue
        try:
            for item in os.listdir(search_dir):
                item_path = os.path.join(search_dir, item)
                skill_md = os.path.join(item_path, "SKILL.md")
                if os.path.isdir(item_path) and os.path.isfile(skill_md):
                    name, desc = parse_frontmatter(skill_md)
                    cat = classify_category(name or item, desc)
                    skills[item] = {
                        "id": item,
                        "name": name or item,
                        "description": desc,
                        "category": cat,
                        "path": skill_md,
                        "type": "skill"
                    }
        except Exception:
            continue

    if os.path.exists(PLUGINS_ROOT):
        for root, dirs, files in os.walk(PLUGINS_ROOT):
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            if "SKILL.md" in files:
                skill_name = os.path.basename(root)
                skill_md = os.path.join(root, "SKILL.md")
                name, desc = parse_frontmatter(skill_md)
                cat = classify_category(name or skill_name, desc)
                skills[skill_name] = {
                    "id": skill_name,
                    "name": name or skill_name,
                    "description": desc,
                    "category": cat,
                    "path": skill_md,
                    "type": "skill"
                }

    # Add MCP tool suites
    for mcp_name, mcp_data in MCP_SERVERS.items():
        skills[f"mcp:{mcp_name}"] = {
            "id": f"mcp:{mcp_name}",
            "name": mcp_name,
            "description": mcp_data["description"],
            "category": mcp_data["category"],
            "path": f"mcp://{mcp_name}",
            "type": "mcp_tool"
        }

    duration = time.time() - t0
    catalog = {
        "version": 2,
        "indexed_at": time.strftime("%Y-%m-%d %H:%M:%S"),
        "scan_duration_sec": round(duration, 2),
        "total_skills": len([s for s in skills.values() if s["type"] == "skill"]),
        "total_mcp_servers": len([s for s in skills.values() if s["type"] == "mcp_tool"]),
        "total_items": len(skills),
        "items": skills
    }

    return catalog

def save_catalog(catalog, target_paths):
    for tp in target_paths:
        try:
            os.makedirs(os.path.dirname(tp), exist_ok=True)
            with open(tp, "w", encoding="utf-8") as f:
                json.dump(catalog, f, indent=2)
            print(f"Catalog saved ({len(catalog['items'])} items) -> {tp}")
        except Exception as e:
            print(f"Failed to save to {tp}: {e}")

def main():
    print("Starting full indexing of installed skills and tools...")
    catalog = build_catalog()
    destinations = [
        r"c:\Sign-SOS\.agents\skills\dev-design-orchestrator\skills_catalog.json",
        r"C:\Users\navan\.gemini\config\skills\dev-design-orchestrator\skills_catalog.json",
        r"C:\Users\navan\.agents\skills\dev-design-orchestrator\skills_catalog.json"
    ]
    save_catalog(catalog, destinations)
    print(f"Done! Indexed {catalog['total_skills']} skills and {catalog['total_mcp_servers']} MCP servers in {catalog['scan_duration_sec']}s.")

if __name__ == "__main__":
    main()
