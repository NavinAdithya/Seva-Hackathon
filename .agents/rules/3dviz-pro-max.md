---
trigger: always_on
description: Design and build expressive 3D scenes, explainers, spatial layouts, and interactive models with grounded subject knowledge. Activates on Three.js, WebGL, React Three Fiber, Blender, 3D visualization, scientific modeling, and spatial UI.
---

# 3Dviz Pro Max Permanent Action Rule

This workspace is integrated with the **`3dviz-pro-max`** spatial visualization intelligence suite:
- Local Workspace Skill: `.agents/skills/3dviz-pro-max/`
- Search CLI: `python .agents/skills/3dviz-pro-max/scripts/search.py`
- Design Context CLI: `python .agents/skills/3dviz-pro-max/scripts/design-context.py`

## When to Trigger
Activate whenever:
1. Designing, implementing, or optimizing 3D models, scenes, and animations (Three.js, React Three Fiber / Expo GL, Spline, Babylon.js).
2. Authoring interactive spatial visualizations, scientific explainers, or 3D gestures.
3. Managing 3D model assets (glTF, GLB, OBJ), mesh optimizations, texture compression, or shader materials.

## Guidelines
1. **Performance First**: Maintain 60fps on mobile. Never allocate new geometries or textures inside animation loops or `useFrame` callbacks.
2. **Subject Reasoning**: Model authentic physical/scientific proportions and connections before adding superficial textures.
3. **Lighting & World Scale**: Anchor world scale deliberately and use unified lighting rigs (environment maps + key lights) with appropriate shadow maps.
