# chart-rendering Specification

## Purpose

Render the supported chart kinds as accessible, theme-aware SVG from plain row data: bar, line, area, scatter, donut, and pie.

## Requirements

### Requirement: Supported chart kinds

The package SHALL provide factory functions `BarChart`, `LineChart`, `AreaChart`, `ScatterChart`, `DonutChart`, and `PieChart`, each returning a chart instance that renders an `<svg>` into the configured `target` element.

#### Scenario: Bar chart from category data

- GIVEN a `target` element and `data` of `{ month, sales }` rows
- WHEN `BarChart({ target, data, x: 'month', y: 'sales' })` is called
- THEN an `<svg>` with category bars, left and bottom axes, and grid lines SHALL render into the target

#### Scenario: Donut and pie polar layout

- GIVEN `data` of `{ channel, revenue }` rows
- WHEN `DonutChart({ target, data, label: 'channel', value: 'revenue' })` is called
- THEN arc slices with default `innerRadiusRatio` 0.62 and a center total SHALL render
- AND `PieChart` SHALL render the same polar layout with `innerRadiusRatio` 0

### Requirement: Accessible SVG output

Each chart SHALL render an `<svg role="img">`, and when `title` and/or `description` are provided it SHALL include corresponding accessibility metadata.

#### Scenario: Title and description metadata

- GIVEN a chart configured with `title` and `description`
- WHEN it renders
- THEN the SVG SHALL expose `role="img"` and contain the title/description text for assistive technology

### Requirement: Accessors and scales

Cartesian charts SHALL accept `x` and `y` accessors (key string or function); polar charts SHALL accept `label` and `value` accessors. The package SHALL provide scale helpers (`scaleLinear`, `scaleTime`, `scaleBand`, `scalePoint`, `scaleOrdinal`) and SHALL skip rows whose accessed value is null.

#### Scenario: Function accessor

- GIVEN `y: (row) => row.a + row.b`
- WHEN the chart renders
- THEN the computed value SHALL be plotted

#### Scenario: Null rows skipped

- GIVEN a data row whose x/y/value resolves to null
- WHEN the chart renders
- THEN that row SHALL be omitted from the plot
