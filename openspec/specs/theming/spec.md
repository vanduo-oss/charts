# theming Specification

## Purpose

Charts derive colors from Vanduo design tokens and follow the active theme, with per-chart overrides.

## Requirements

### Requirement: Token-derived theming

Charts SHALL resolve colors, text, grid, and axis values from Vanduo CSS custom properties (`--vd-*`) on the target's computed style, so charts follow the active theme and Theme Customizer selection automatically.

#### Scenario: Follows active theme

- GIVEN a chart rendered under a given Vanduo theme
- WHEN the theme/customizer changes the `--vd-*` tokens and the chart re-renders
- THEN the chart SHALL reflect the updated token-derived colors

### Requirement: Theme override option

A `theme` option SHALL allow overriding token-derived colors, text, grid, and axis values per chart.

#### Scenario: Override colors

- GIVEN `theme: { /* color/text/grid/axis overrides */ }`
- WHEN the chart renders
- THEN the provided overrides SHALL take precedence over the token-derived defaults
