# @vanduo-oss/charts

Standalone SVG-first chart components for Vanduo dashboards and documentation.

Vanduo Charts is intentionally small: data in, accessible SVG out. It covers common 2D dashboard charts without adding data fetching, dashboards, Canvas rendering, animation timelines, or a grammar-of-graphics DSL.

## Install

```bash
pnpm add @vanduo-oss/charts
```

## Usage

```js
import { DonutChart } from '@vanduo-oss/charts';
import '@vanduo-oss/charts/css';

const chart = DonutChart({
  target: '#revenue-mix',
  data: [
    { channel: 'Product', revenue: 420 },
    { channel: 'Services', revenue: 180 },
    { channel: 'Support', revenue: 90 }
  ],
  label: 'channel',
  value: 'revenue',
  title: 'Revenue mix',
  tooltip: d => `${d.channel}: ${d.revenue}`,
  onSliceClick: ({ datum }) => console.log(datum)
});

chart.update({ data: nextData });
chart.resize();
chart.destroy();
```

## Chart Factories

- `BarChart({ target, data, x, y })`
- `LineChart({ target, data, x, y })`
- `AreaChart({ target, data, x, y })`
- `ScatterChart({ target, data, x, y })`
- `DonutChart({ target, data, label, value })`
- `PieChart({ target, data, label, value })`

Accessors can be field names, nested paths, or functions:

```js
BarChart({ target: '#chart', data, x: 'month', y: d => d.sales });
```

## Vanduo Auto Init

The browser bundle exposes `window.VanduoCharts`. If `window.Vanduo` is present, it self-registers as the `charts` component, so Vanduo v1.4 scoped lifecycle calls work:

```html
<script type="application/json" id="revenue-data">
[
  { "channel": "Product", "revenue": 420 },
  { "channel": "Services", "revenue": 180 }
]
</script>

<div
  data-vd-chart="donut"
  data-vd-chart-data="#revenue-data"
  data-vd-label="channel"
  data-vd-value="revenue"
  data-vd-title="Revenue mix">
</div>
```

```js
Vanduo.init(root);
Vanduo.destroy(root);
Vanduo.reinit('charts', root);
```

Auto-init supports field-name accessors. Use the imported JS API for callback accessors and event handlers.

## Vue 3

Optional Vue 3 components ship at `@vanduo-oss/charts/vue`. `vue` is an *optional* peer dependency — it is needed only when you import this subpath, so vanilla/CDN consumers are unaffected. The components are SSR-safe (the chart is created on mount into a plain container the server can pre-render) and re-render reactively when their props change.

```vue
<script setup>
import { VdChart } from '@vanduo-oss/charts/vue';
import '@vanduo-oss/charts/css';

const rows = [
  { month: 'Jan', sales: 120 },
  { month: 'Feb', sales: 180 },
  { month: 'Mar', sales: 90 }
];
</script>

<template>
  <VdChart type="bar" :data="rows" x="month" y="sales" title="Sales" :height="300" />
</template>
```

Per-kind components are also exported so you can drop the `type` prop: `VdBarChart`, `VdLineChart`, `VdAreaChart`, `VdScatterChart`, `VdDonutChart`, `VdPieChart`.

### Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `type` | `'bar' \| 'line' \| 'area' \| 'scatter' \| 'donut' \| 'pie'` | `'bar'` | Chart kind (ignored by the per-kind components). |
| `data` | `Array<Record<string, unknown>>` | `[]` | Row data. |
| `x`, `y` | `string \| (row) => unknown` | — | Cartesian accessors (bar/line/area/scatter). |
| `label`, `value` | `string \| (row) => unknown` | — | Pie/donut accessors. |
| `title`, `description` | `string` | — | Written into the SVG accessibility metadata. |
| `width` | `number` | — | Fixed width; omit for responsive. |
| `height` | `number` | `300` | Container min-height in px. |
| `innerRadiusRatio` | `number` | — | Donut/pie inner radius ratio. |
| `color` | `string \| (row) => string` | — | CSS color, a category-field name (distinct values → palette), or a per-datum function. |
| `series` | `Array<{ name, y?, data?, color? }>` | — | Multi-series: bar → grouped, line/area → one path each. |
| `legend` | `boolean \| { position }` | — | Multi-series charts show one by default; pass `false` to hide. |
| `xMin`, `xMax`, `yMin`, `yMax` | `number` | — | Pin axis bounds (else auto-scaled to the data). |
| `yTickCount` | `number` | `5` | Target number of y-axis ticks. |
| `theme` | `Record<string, unknown>` | — | Token overrides (see **Theme**). |
| `tooltip` | `(datum, ctx) => string \| string \| false` | — | Custom tooltip or disable. `ctx` is the typed `TooltipContext`. |
| `responsive` | `boolean` | `true` | Re-measure and re-render on container resize. |

Types ship for both the main entry (`dist/index.d.ts`) and the subpath (`dist/vue.d.ts`).

```ts
// Multi-series + per-datum color + pinned axis + typed tooltip
import { BarChart, type TooltipContext } from '@vanduo-oss/charts';
BarChart({
  target: '#chart',
  data: rows,
  x: 'month',
  series: [
    { name: 'Resisted', y: 'resisted', color: '#40c057' },
    { name: 'Smoked', y: 'smoked', color: '#fa5252' },
  ],
  yMin: 0,
  yMax: 10,
  legend: true,
  tooltip: (datum, ctx: TooltipContext) => `${ctx.seriesName}: ${ctx.value}`,
});
```

## Theme

The renderer reads Vanduo CSS tokens from the chart target:

- `--vd-text-primary`
- `--vd-text-muted`
- `--vd-border-color`
- `--vd-bg-primary`
- `--vd-chart-1` through `--vd-chart-8`

Compatibility aliases such as `--text-primary` and `--border-color` are used as fallbacks. Built-in colors are used if no Vanduo tokens are present.

## API Notes

Every chart instance exposes:

- `update(options)` - merge new options and render again
- `resize()` - measure the target and render again
- `destroy()` - remove SVG, tooltip, observers, and DOM state

Useful primitive exports:

- `createAccessor`
- `scaleLinear`
- `scaleBand`
- `scalePoint`
- `scaleTime`
- `scaleOrdinal`
- `resolveTheme`

## License

MIT

