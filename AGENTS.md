# Elite10K guide agent instructions

Read README.md, docs/ONBOARDING.md and current-release.json before editing.
This repo publishes https://baseer.github.io/elite10k-guide/ through GitHub Pages.
The development repo is https://github.com/baseer/Elite10K; cooked packages and
build recipes belong there. The older chatgpt.site guide is historical.

Only verified preserved release artifacts establish current game behavior.
Installed client packages may have been overwritten by older server downloads.
Keep weapons, optional HUD and movement settings versions/hashes separate.
Current weapons v2.08, HUD v1.19 and movement v0.1 are recorded in current-release.json.
Original Elite means B19 SHA256 A17869BA76025E0F4FC3B9D52F37A271AF363E4760561AAB094DB82D4DD861CF.

Update comparison-data.json, its JS wrapper, versions-data.js, the selected
version's JSON, versions/releases.json and applicable evidence together.
Preserve prior same-version data under versions/VERSION/revisions before changing
it. Preserve every unrelated historical snapshot. Never rebuild history using
an older external script that discards appended releases.

Run node verify-history.cjs, node verify-movement.cjs, node verify-neutral-gap.cjs
and node verify-current-release.cjs after release/model changes. Run relevant
browser checks at desktop/mobile sizes for changed presentation. Preserve
shareable URL behavior and all existing calculators/sections.

After index.html changes run node build-routes.cjs and commit generated section
entry points. Use relative base paths compatible with /elite10k-guide/ hosting.
Serve over HTTP for previews. Do not silently change package versions or treat
ideal distance/time models as in-game network measurements. Native Flak decay
is age-based; constant-speed distance is an approximation.

Separate recorded runtime/deployment evidence from checks performed in this edit.
When publication is requested, push the authorized changes, check GitHub Pages
build status and verify live content. Never claim publication from a local test.
