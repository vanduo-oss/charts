# Retire charts — Proposal

## Why

Vanduo is consolidating on a single product line. The **perspective** line (`@vanduo-oss/vd3`,
`@vanduo-oss/vd3-cbun`, `vd3-docs`) is now the only line that is maintained, improved, and
released. The **legacy** line — this repository among them — is retired as of 2026-07-25.

`@vanduo-oss/charts` shipped standalone SVG chart components. Its final release is `0.2.0`.

This change records that decision in the repository itself, so that anyone arriving here later —
human or agent — learns it from the README, the changelog, and this proposal rather than from
inference about a stale commit date.

## What

[`@vanduo-oss/vd3-cbun/charts`](https://www.npmjs.com/package/@vanduo-oss/vd3-cbun) — the perspective line ships this as a tree-shakeable subpath export of its component bundle, Vue 3 only.

The Vue 3 half of this package has a direct successor; the **vanilla and IIFE builds do not**. `./iife` and the `window.Vanduo*` globals end here — `vd3-cbun` is Vue-only and picks up theming from vd3's `--vd-*` custom properties through the DOM rather than from a runtime.

## Scope

In scope:

- A retirement notice at the top of `README.md` (visible on the npm package page).
- A `## Retired` entry in `CHANGELOG.md`.
- A retirement note in `SKILL.md`, so an agent loading the skill sees it immediately.
- Moving every unshipped OpenSpec change under `openspec/changes/archive/`, each marked **ABANDONED**.
- Pinning transitive **dev**-dependency advisories (postcss) via `overrides` in
  `pnpm-workspace.yaml`, so the final CI run and the archived state are clean. These
  advisories were published after the last green run on `main` (2026-07-20) and are
  unrelated to this change; overrides apply to this repo's own install only and do not
  propagate to consumers of the published package.
- An annotated git tag `retired-v0.2.0` pinning the final state.

Out of scope:

- Any code, CSS, or behaviour change. Nothing shipped is altered and no version is bumped.
- Unpublishing from npm. Unpublishing would break every existing lockfile; the package is deprecated on the registry instead, which is advisory only.
- Taking down the CDN paths.

## Rollout

1. Land this change on `main`.
2. `npm deprecate @vanduo-oss/charts "…"` pointing at the successor.
3. Close open Dependabot PRs, disable Dependabot, sweep stale branches.
4. Archive the repository on GitHub (read-only; Actions and Dependabot stop, Pages keeps serving).
