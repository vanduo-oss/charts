# Retire charts — Tasks

- [x] 1. Tag the final state: `git tag -a retired-v0.2.0` and push it (must happen before the repo goes read-only).
- [x] 2. Add the retirement notice to the top of `README.md` with the successor and migration links.
- [x] 3. Add the `## Retired — 2026-07-25` entry to `CHANGELOG.md`.
- [x] 4. Add the retirement note to `SKILL.md` (frontmatter `description` + body banner).
- [x] 5. Move all unshipped OpenSpec changes to `openspec/changes/archive/`, each proposal marked **ABANDONED**.
- [x] 6. Write the `specs/lifecycle/spec.md` delta recording the retired lifecycle, the keep-working guarantee, and the discoverability requirements.
- [x] 7. Confirm `openspec validate retire-charts --type change` passes and `openspec list` shows no other active change.
- [x] 8. Open the retirement PR against `main` and merge it.
- [ ] 9. Run `npm deprecate @vanduo-oss/charts` pointing at the successor (requires npm 2FA — maintainer-run).
- [ ] 10. Close Dependabot PRs, disable Dependabot, sweep stale branches, set the `[RETIRED]` description + topic.
- [ ] 11. Archive the repository on GitHub.
