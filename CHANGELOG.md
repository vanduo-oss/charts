# Changelog

All notable changes to `@vanduo-oss/charts` are documented here.

## [0.1.0] — 2026-06-27

### Added

- **Optional Vue 3 bindings** at `@vanduo-oss/charts/vue` — a generic `VdChart` component plus per-kind components (`VdBarChart`, `VdLineChart`, `VdAreaChart`, `VdScatterChart`, `VdDonutChart`, `VdPieChart`). `vue` is an *optional* peer dependency, marked external in the build, so vanilla/CDN consumers are unaffected. SSR-safe (the chart is created on mount) with reactive props.
- First OpenSpec capabilities: `vue-bindings` and an extended `package-integration` covering the `./vue` subpath.
- `llms.txt` LLM context file and a README **Vue 3** section.

### Changed

- `CHANGELOG.md` is now published with the package (`files`).

## [0.0.1] — 2026-05-20

### Added

- Initial standalone npm package: SVG-first chart factories `BarChart`, `LineChart`, `AreaChart`, `ScatterChart`, `DonutChart`, `PieChart`.
- ESM, CJS, and IIFE builds plus `@vanduo-oss/charts/css`.
- Field-name, nested-path, and function accessors; per-instance `update()`, `resize()`, `destroy()`.
- Vanduo auto-init (`window.VanduoCharts`, `data-vd-chart` attributes) with scoped lifecycle (`init`, `destroy`, `reinit`).
- CSS-token theming (`--vd-chart-1…8`, text/border/bg tokens) with compatibility-alias fallbacks.
- Primitive exports: `createAccessor`, `scaleLinear`, `scaleBand`, `scalePoint`, `scaleTime`, `scaleOrdinal`, `resolveTheme`, path/arc helpers.
