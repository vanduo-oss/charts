# interaction Specification

## Purpose

Hover tooltips, datum click callbacks, and responsive resizing.

## Requirements

### Requirement: Tooltips

Charts SHALL show a tooltip on mark hover by default. A `tooltip` option SHALL accept a function or string to customize content, or `false` to disable tooltips.

#### Scenario: Custom tooltip content

- GIVEN `tooltip: (d) => \`${d.channel}: ${d.revenue}\``
- WHEN a mark is hovered
- THEN the tooltip SHALL display the returned content

#### Scenario: Tooltips disabled

- GIVEN `tooltip: false`
- WHEN a mark is hovered
- THEN no tooltip SHALL appear

### Requirement: Datum click callbacks

Bar and slice marks SHALL invoke their click callbacks (for example `onSliceClick`) with the associated datum.

#### Scenario: Slice click

- GIVEN a donut chart configured with `onSliceClick`
- WHEN a slice is clicked
- THEN the callback SHALL receive an object containing the clicked `datum`

### Requirement: Responsive resize

Unless `responsive: false` is set, a chart SHALL observe its target via `ResizeObserver` and re-render when the target's size changes. Where `ResizeObserver` is unavailable, the chart SHALL render once without error.

#### Scenario: Container resize

- GIVEN a responsive chart
- WHEN the target element's size changes
- THEN the chart SHALL re-render to fit the new size
