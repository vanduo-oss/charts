# vue-bindings Specification

## Purpose

Optional Vue 3 component bindings for the chart factories, shipped at `@vanduo-oss/charts/vue`. The core package stays framework-agnostic; these bindings are additive.

## Requirements

### Requirement: VdChart components

`@vanduo-oss/charts/vue` SHALL export a `VdChart` component plus per-kind components `VdBarChart`, `VdLineChart`, `VdAreaChart`, `VdScatterChart`, `VdDonutChart`, and `VdPieChart`.

#### Scenario: Render a bar chart

- GIVEN `<VdChart type="bar" :data="rows" x="month" y="sales" />`
- WHEN mounted in a Vue 3 application
- THEN an `<svg>` chart SHALL render into the component's container

#### Scenario: Per-kind component parity

- GIVEN `<VdDonutChart :data="rows" label="channel" value="revenue" />`
- THEN it SHALL render the same output as `<VdChart type="donut" …>`

### Requirement: Props mirror factory options

`VdChart` props SHALL mirror the chart options: `type`, `data`, `x`, `y`, `label`, `value`, `color`, `title`, `description`, `width`, `height` (default 300), `innerRadiusRatio`, `theme`, `tooltip`, and `responsive`.

#### Scenario: Reactive update

- GIVEN a mounted `VdChart`
- WHEN a non-`type` prop changes (e.g. `data`)
- THEN the chart SHALL update in place via the instance `update()`

#### Scenario: Type change recreates

- GIVEN a mounted `VdChart`
- WHEN the `type` prop changes
- THEN the previous instance SHALL be destroyed and a new instance of the new kind SHALL be created

### Requirement: SSR safety

The component SHALL render a plain container during SSR and create the chart only after mount on the client; it SHALL destroy the instance on unmount.

#### Scenario: Server render

- GIVEN server-side rendering with no DOM
- WHEN `VdChart` renders
- THEN it SHALL output an empty `<div class="vd-chart">` container without creating a chart instance

#### Scenario: Unmount cleanup

- GIVEN a mounted `VdChart`
- WHEN the component unmounts
- THEN the chart instance SHALL be destroyed

### Requirement: Vue is an optional peer

`vue` SHALL be declared as an optional peer dependency (`peerDependenciesMeta.vue.optional`) and marked external in the build, never bundled into the package.

#### Scenario: Build externalizes vue

- GIVEN the built `dist/vue.js`
- THEN it SHALL import `vue` at runtime rather than bundle it
