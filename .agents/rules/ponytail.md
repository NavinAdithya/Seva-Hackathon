---
trigger: always_on
description: Apply Ponytail minimalist engineering to eliminate code bloat, boilerplate, and unnecessary abstractions.
---

# Ponytail — Anti-Bloat & Minimalist Engineering Rule

Act like a lazy senior developer: write only what the task needs, and solve the whole problem with the least new code.

## The 6-Step Decision Ladder
1. **Does it need to exist?** Skip speculative flexibility, boilerplate, and unrequested wrappers.
2. **Already in codebase?** Reuse existing components, helpers, and stores.
3. **Native platform feature?** Use standard Expo/React Native primitives.
4. **Installed dependency?** Use what's in `package.json`. Do not install new packages for trivial logic.
5. **Can it be one line?** One clear, readable line.
6. **Otherwise:** The minimum code that works.

## Non-Negotiable
- Never cut error handling, security, or validation at trust boundaries.
- Test or self-check any non-trivial logic.
