## Context

Vanduo ecosystem packages are intentionally framework-agnostic ("data in, SVG out", zero runtime deps, ESM/CJS/IIFE). Adding Vue support must not compromise that for vanilla/CDN users.

## Decision

Ship Vue bindings as a separate `./vue` subpath, not from the main entry:

- `vue` is an OPTIONAL peer (`peerDependenciesMeta.vue.optional`) and `external` in esbuild, so installing or building the core never pulls Vue, and vanilla users see no change.
- The component is a thin wrapper around the existing factories: it creates a chart instance in `onMounted` into a plain `<div class="vd-chart">` the server can pre-render (SSR-safe), calls `instance.update()` on reactive prop changes, recreates the instance on a `type` change (different renderer), and `destroy()`s on unmount.
- Per-kind components (`VdBarChart` …) are thin wrappers that fix `type`.

## Build output impact

esbuild gains two entries — `dist/vue.js` (ESM) and `dist/vue.cjs` (CJS) — both with `external: ['vue']`; `src/vue.d.ts` is copied to `dist/vue.d.ts`. The existing `index.*`, IIFE, and CSS outputs are unchanged.

## Alternatives considered

- **vd2-only wrappers (no package change):** rejected — every Vue consumer would reinvent the wiring, and the docs would not demonstrate real installation of the published package.
- **Vue as a hard dependency / main-entry export:** rejected — would couple the framework-agnostic core to Vue and force the dependency on vanilla users.
