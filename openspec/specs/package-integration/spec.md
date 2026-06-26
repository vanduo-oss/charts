# package-integration Specification

## Purpose

npm exports, build artifacts, the optional Vue subpath, and published package contents.

## Requirements

### Requirement: ESM, CJS, and IIFE builds

The package SHALL publish ESM (`dist/index.js`), CJS (`dist/index.cjs`), and an IIFE (`dist/vanduo-charts.iife.js`) exposing `window.VanduoCharts`.

#### Scenario: Named imports

- GIVEN a bundler resolving `@vanduo-oss/charts`
- WHEN importing named members
- THEN the chart factories (`BarChart`, `LineChart`, `AreaChart`, `ScatterChart`, `DonutChart`, `PieChart`) and lifecycle functions (`init`, `destroy`, `destroyAll`, `reinit`) SHALL be available

#### Scenario: Script-tag global

- GIVEN the IIFE loaded in a browser
- THEN `window.VanduoCharts` SHALL expose the same API plus scale and path helpers

### Requirement: CSS export

The package SHALL expose styles via `@vanduo-oss/charts/css` mapping to `dist/vanduo-charts.css`.

#### Scenario: CSS side-effect import

- GIVEN an ESM application
- WHEN `import '@vanduo-oss/charts/css'` is used
- THEN chart styles SHALL be available

### Requirement: Optional Vue subpath

The package SHALL expose `@vanduo-oss/charts/vue` (`dist/vue.js`, `dist/vue.cjs`, types `dist/vue.d.ts`) with `vue` declared as an OPTIONAL peer dependency, so vanilla consumers are unaffected. Behaviour is defined by the `vue-bindings` capability.

#### Scenario: Vue consumer

- GIVEN a Vue 3 application
- WHEN importing `{ VdChart }` from `@vanduo-oss/charts/vue`
- THEN the component SHALL be available and `vue` SHALL resolve from the host application

#### Scenario: Vanilla consumer unaffected

- GIVEN a non-Vue consumer importing only `@vanduo-oss/charts`
- THEN `vue` SHALL NOT be required to install or build the package

### Requirement: Published npm files

The package `files` field SHALL include only `dist/`, `README.md`, and `LICENSE` — not `openspec/` or source.

#### Scenario: Tarball contents

- GIVEN `pnpm pack`
- WHEN the tarball is inspected
- THEN built artifacts and README SHALL be included
- AND `openspec/` SHALL be excluded
