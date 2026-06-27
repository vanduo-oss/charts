## 1. OpenSpec

- [x] 1.1 Add `openspec/config.yaml` and baseline capability specs (chart-rendering, lifecycle, theming, interaction, package-integration, vue-bindings)
- [x] 1.2 Add this change (proposal, tasks, design, spec deltas)

## 2. Vue bindings

- [x] 2.1 `src/vue.js` — `VdChart` + per-kind components; SSR-safe; `update()` on prop change, recreate on `type` change, `destroy()` on unmount
- [x] 2.2 `src/vue.d.ts` — typed `VdChartProps`; copied to `dist/vue.d.ts` by the build

## 3. Build & package

- [x] 3.1 `scripts/build.js` — esbuild esm + cjs vue entry with `vue` external
- [x] 3.2 `package.json` — `./vue` export, optional `vue` peer (`peerDependenciesMeta`), `vue` devDep, version `0.1.0`
- [x] 3.3 `pnpm build` produces `dist/vue.js`, `dist/vue.cjs`, `dist/vue.d.ts`

## 4. Verify & ship

- [x] 4.1 vd2 consumes `@vanduo-oss/charts/vue`: `vue-tsc` clean, vitest + Playwright pass (3 SVG charts, engine toggle, zero console errors)
- [ ] 4.2 Publish `@vanduo-oss/charts@0.1.0`, then pin vd2 to `^0.1.0` (replace `file:../charts`)
- [ ] 4.3 `openspec archive 2026-06-26-add-vue-bindings` after publish
