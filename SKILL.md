---
name: vanduo-charts
description: Use when adding charts with @vanduo-oss/charts — standalone, token-themed, SSR-safe SVG charts (bar/line/area/scatter/donut/pie) with an optional typed Vue 3 subpath. Covers install, the factory + Vue API, options, theming, security, and caveats. RETIRED 2026-07-25 — final version 0.2.0; successor: `@vanduo-oss/vd3-cbun/charts`; no further releases.
---

# @vanduo-oss/charts

> **⚠️ Retired — 2026-07-25.** `@vanduo-oss/charts` is no longer developed or released.
> The Vanduo **legacy** line (the dual-engine Vanilla + Vue 3 system) is retired; development
> continues in the **perspective** line. `@vanduo-oss/vd3-cbun/charts` is the successor. The final release, `0.2.0`, stays on npm and keeps working — this is a stop to development, not a removal.
>
> New docs: <https://vanduo-oss.github.io/vd3-docs/> · Migration guide: <https://vanduo-oss.github.io/vd3-docs/guides/migration>

Standalone **SVG-first charts** for the Vanduo design system: data in, accessible SVG out. Token-themed and SSR-safe; framework-agnostic with an optional typed Vue 3 layer at `./vue`. Intentionally small — no data fetching, Canvas, or grammar-of-graphics DSL.

## Install

```sh
pnpm add @vanduo-oss/charts
```

```js
import { BarChart } from "@vanduo-oss/charts";
import "@vanduo-oss/charts/css";

const chart = BarChart({ target: "#chart", data: rows, x: "month", y: "sales" });
chart.update({ data: next }); chart.resize(); chart.destroy();
```

Vue 3 (optional peer `vue >=3.3`): `import { VdChart } from "@vanduo-oss/charts/vue"`.

## Architecture

- Data-in / SVG-out factories; instance methods drive updates (no virtual DOM).
- Colors read from Vanduo CSS custom properties on the target (`--vd-text-primary`, `--vd-border-color`, `--vd-chart-1`…`--vd-chart-8`); built-in fallbacks if tokens absent.
- Core factories + Vue components are framework-agnostic and server-renderable; the browser bundle exposes `window.VanduoCharts` and self-registers as the Vanduo `charts` component.

## API

- **Factories** (Cartesian: `target,data,x,y`): `BarChart`, `LineChart`, `AreaChart`, `ScatterChart`. (Categorical: `target,data,label,value`): `DonutChart`, `PieChart`. Each returns a `ChartInstance` with `update(options)`, `resize()`, `destroy()`, `showTooltip`/`hideTooltip`.
- **Key options:** `x`/`y`/`label`/`value` (field name, dotted path, or fn), `color`, `series` (multi-series — bar grouped, line/area one path each), `dataLabels`, `annotations` (reference lines), `legend`, `tooltip(datum, ctx)`, axis `xMin/xMax/yMin/yMax/yTickCount/yIncludeZero`, `theme`, `width`, `height`, `responsive`, `onPointClick`/`onBarClick`/`onSliceClick`.
- **Vue:** `VdChart` (`type: 'bar'|'line'|'area'|'scatter'|'donut'|'pie'`) + per-kind `VdBarChart`/`VdLineChart`/`VdAreaChart`/`VdScatterChart`/`VdDonutChart`/`VdPieChart`.
- **Primitives:** `createAccessor`, `scaleLinear/scaleTime/scaleBand/scalePoint/scaleOrdinal`, `resolveTheme`, `ticks`, `niceDomain`, `linePath/areaPath/arcPath`, `TooltipContext`, `VD_CHARTS_VERSION`.

## Security

- SVG is generated directly from data; no `eval`, no inline scripts. Title/description go into SVG a11y metadata.
- XSS-safe as long as your `tooltip`/label callbacks don't inject untrusted HTML.

## Caveats

- `vue` is an **optional** peer — needed only for `@vanduo-oss/charts/vue`; vanilla/CDN consumers unaffected.
- Vue components create the chart on mount (SSR-safe); changing `type` recreates it, otherwise props `update()` in place.
- `data-vd-chart` auto-init supports field-name accessors only; use the JS API for callbacks/events.

## Docs

Full documentation and live demos: https://vanduo.dev
