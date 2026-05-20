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

