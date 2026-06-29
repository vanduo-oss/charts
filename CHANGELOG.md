# Changelog

All notable changes to `@vanduo-oss/charts` are documented here.

## [0.1.1] — 2026-06-29

Additive feature release. All new options are backward-compatible.

### Added

- **Main-entry types** — the `.` export now ships `dist/index.d.ts` (the factory API: `BarChart`/`LineChart`/`AreaChart`/`ScatterChart`/`DonutChart`/`PieChart`, scales, path helpers, `niceDomain`, `TooltipContext`, `Series`, etc.). Previously only `./vue` was typed.
- **Per-datum / per-series color** — `color` now accepts a function `(row) => cssColor` (in addition to a CSS color string or a category-field name).
- **Multi-series** — `series: Array<{ name, y?, data?, color? }>` for bar (grouped bars via an inner band scale), line, and area (one path per series). Series share the chart `data` with their own `y`, or carry their own `data`.
- **Legend** — `legend: boolean | { position }`. Multi-series charts render a legend by default; single-series charts show one when `color` is a category field and `legend` is truthy.
- **Axis range & ticks** — `yMin` / `yMax` / `xMin` / `xMax` pin the scale bounds (otherwise auto-scaled), and `yTickCount` sets the target y tick count.
- **Typed tooltip context** — a function `tooltip` now receives `(datum, context)`, where `context` is a typed `TooltipContext` (`{ datum, x?, y?, value?, label?, index?, seriesIndex?, seriesName? }`). Backward-compatible: the raw datum is still the first argument.

### Changed

- `niceDomain(values, options)` accepts an options object `{ includeZero?, min?, max?, tickCount? }`; the legacy boolean `includeZero` shorthand still works.

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
