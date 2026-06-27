## Why

`@vanduo-oss/charts` was vanilla-only. The Vanduo docs are moving to the Vue 3 engine (`@vanduo-oss/vd2`), which needs first-class Vue components for the ecosystem packages. Rather than reimplement chart wiring inside vd2, charts should ship optional Vue bindings so any Vue 3 app can use `<VdChart>` directly — while the core stays framework-agnostic for vanilla/CDN users.

## What Changes

- Add an optional `./vue` subpath export (`src/vue.js` → `dist/vue.js` / `dist/vue.cjs`, types `dist/vue.d.ts`) shipping `VdChart` plus per-kind components (`VdBarChart`, `VdLineChart`, `VdAreaChart`, `VdScatterChart`, `VdDonutChart`, `VdPieChart`).
- Declare `vue` as an OPTIONAL peer dependency and mark it external in the esbuild build, so it is never bundled.
- Bump version `0.0.1` → `0.1.0` (additive, minor).
- Establish the package's first OpenSpec capability specs.

## Capabilities

### New Capabilities

- `vue-bindings`: optional Vue 3 components over the chart factories (SSR-safe, reactive props, optional `vue` peer).

### Modified Capabilities

- `package-integration`: add the `./vue` subpath export and the optional `vue` peer.

## Impact

- **Semver:** Minor — additive; the existing ESM/CJS/IIFE/CSS API is unchanged.
- **Compatibility:** Vanilla consumers are unaffected; `vue` is required only when importing `@vanduo-oss/charts/vue`.
- Files: `src/vue.js`, `src/vue.d.ts` (new); `scripts/build.js` (vue entry, `vue` external); `package.json` (`./vue` export, optional peer, `vue` devDep, version).
- Docs: vd2 consumes `@vanduo-oss/charts/vue` on its Charts page; built `dist/` syncs to docs ecosystem assets.
- Publish: requires publishing `@vanduo-oss/charts@0.1.0` before vd2 can pin the published `^0.1.0` range (vd2 uses `file:../charts` only for local dev).
