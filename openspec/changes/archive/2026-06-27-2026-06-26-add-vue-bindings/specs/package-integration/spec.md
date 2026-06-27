# package-integration

## ADDED Requirements

### Requirement: Optional Vue subpath

The package SHALL expose `@vanduo-oss/charts/vue` (`dist/vue.js`, `dist/vue.cjs`, types `dist/vue.d.ts`) with `vue` declared as an OPTIONAL peer dependency, so vanilla consumers are unaffected. Behaviour is defined by the `vue-bindings` capability.

#### Scenario: Vue consumer

- GIVEN a Vue 3 application
- WHEN importing `{ VdChart }` from `@vanduo-oss/charts/vue`
- THEN the component SHALL be available and `vue` SHALL resolve from the host application

#### Scenario: Vanilla consumer unaffected

- GIVEN a non-Vue consumer importing only `@vanduo-oss/charts`
- THEN `vue` SHALL NOT be required to install or build the package
