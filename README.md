# @vanduo-oss/charts

[![npm](https://img.shields.io/npm/v/@vanduo-oss/charts.svg)](https://www.npmjs.com/package/@vanduo-oss/charts)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

> **⚠️ Retired — 2026-07-25.** `@vanduo-oss/charts` is no longer developed or released.
> The Vanduo **legacy** line (the dual-engine Vanilla + Vue 3 system) is retired; development
> continues in the **perspective** line. `@vanduo-oss/vd3-cbun/charts` is the successor. The final release, `0.2.0`, stays on npm and keeps working — this is a stop to development, not a removal.
>
> New docs: <https://vanduo-oss.github.io/vd3-docs/> · Migration guide: <https://vanduo-oss.github.io/vd3-docs/guides/migration>

> Standalone SVG charts for the [Vanduo](https://vanduo.dev) design system.

Data in, accessible SVG out — bar, line, area, scatter, donut, and pie. Token-themed and SSR-safe, framework-agnostic with an optional typed Vue 3 layer. Intentionally small: no data fetching, Canvas, or grammar-of-graphics DSL.

## Install

```sh
pnpm add @vanduo-oss/charts
```

## Quick start

```js
import { BarChart } from "@vanduo-oss/charts";
import "@vanduo-oss/charts/css";

const chart = BarChart({
  target: "#chart",
  data: [{ month: "Jan", sales: 120 }, { month: "Feb", sales: 180 }],
  x: "month",
  y: "sales",
});

chart.update({ data: next });
chart.destroy();
```

Vue 3 (optional peer): `import { VdChart } from "@vanduo-oss/charts/vue"`.

```vue
<VdChart type="bar" :data="rows" x="month" y="sales" :height="300" />
```

## Documentation

- Docs & live demos — https://vanduo.dev
- Agent / LLM reference (full factory + Vue API, options, theming) — [SKILL.md](./SKILL.md)
- Changelog — [CHANGELOG.md](./CHANGELOG.md)

## License

[MIT](./LICENSE) © Vanduo
