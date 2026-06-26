# lifecycle Specification

## Purpose

Declarative auto-initialization, instance tracking, update/destroy, and optional Vanduo framework registration.

## Requirements

### Requirement: Declarative initialization

`init(root)` SHALL scan `root` (or the document when omitted) for `[data-vd-chart]` elements and render each one, reading the chart kind from `data-vd-chart` and options from `data-vd-*` attributes. Data SHALL come from `data-vd-chart-data` (an inline JSON array, or a `#selector` referencing a script element) or, when absent, the element's text content.

#### Scenario: Auto-init from data attributes

- GIVEN `<div data-vd-chart="bar" data-vd-x="month" data-vd-y="sales">[ …JSON… ]</div>`
- WHEN `init()` runs
- THEN a bar chart SHALL render into that element
- AND the instance SHALL be tracked in the `instances` map keyed by the element

#### Scenario: Idempotent init

- GIVEN an element that is already initialized
- WHEN `init()` runs again over the same root
- THEN the element SHALL NOT be re-initialized and its existing instance SHALL be preserved

### Requirement: Instance update and teardown

A chart instance SHALL expose `update(nextOptions)`, `resize()`, and `destroy()`. `destroy(el)` and `destroyAll(root)` SHALL remove tracked instances; `reinit(root)` SHALL destroy then re-init within `root`.

#### Scenario: Update re-renders

- GIVEN a live chart instance
- WHEN `update({ data: nextData })` is called
- THEN the SVG SHALL re-render with the merged options

#### Scenario: Destroy clears the target

- GIVEN a live chart instance
- WHEN `destroy()` is called
- THEN the target's rendered SVG SHALL be removed and the instance SHALL be untracked

### Requirement: Optional Vanduo registration

When `window.Vanduo` exists at load, the IIFE build SHALL register as `charts` so scoped `Vanduo.init(root)`, `Vanduo.destroy(root)`, and `Vanduo.reinit('charts', root)` operate without framework changes.

#### Scenario: Scoped framework init

- GIVEN `vanduo.min.js` loaded before the charts IIFE
- WHEN `Vanduo.init(root)` runs
- THEN `[data-vd-chart]` elements within `root` SHALL initialize
