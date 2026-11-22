# Working on the guide

This is a static HTML/CSS/JavaScript site. Install Git and Node.js; Python is
convenient for preview. No framework build or package installation is needed
for numerical tests. Clone https://github.com/baseer/elite10k-guide and read
AGENTS.md before changing data. For mod development, use the separate private
Elite10K repository and its docs/AGENT_START.md and docs/CURRENT_STATE.md.

```powershell
node verify-history.cjs
node verify-movement.cjs
node verify-neutral-gap.cjs
node verify-current-release.cjs
python -m http.server 8000
```

Visit http://localhost:8000/ and direct section paths such as /movement/,
/flak/, /rocket/ and /splash/. Production is served at /elite10k-guide/;
relative bases and generated route entry points preserve that prefix.

## Source map

- comparison-data.json / comparison-data.js: current selected release defaults.
- versions-data.js: complete version archive used by selectors and comparisons.
- versions/VERSION/comparison-data.json: downloadable snapshot per version.
- versions/releases.json: release index; revisions/ preserves earlier same-version data.
- release-history.js: version-aware numerical models.
- guide.js / guide.css / index.html: sections, presentation and root shell.
- guide-url.js / version-browser.js: canonical paths, query state and release switching.
- combo.js / shock-variants.js / shock-comparison.js: combo model and diagrams.
- combo-movement.js / combo-scene.js: movement-score controls and shared interactive 3D player/core scene. Native canvas renderer, no external library. Geometry is in reference dodge lengths; player/rifle meshes are enlarged for readability. Drag or arrow keys orbit, Reset view restores forward-up orientation.
- movement-lab.js / movement-lab.css: movement simulation and custom scenarios.
- splash-lab.js / splash-lab.css: shared splash calculator.
- rifle-comparison.js / rocket-demo.js: weapon comparison widgets.
- *-evidence.json and current-release.json: provenance, assumptions and component identities.

## Updating a release

Obtain the completed release receipt and verify its preserved artifact SHA256
in the development workspace. Do not select an installed client copy by version
label. Compare actual properties/functions, including inherited native behavior.
Update every synchronized data representation listed in AGENTS.md. Archive the
old current-version snapshot before replacing it, and ensure other versions are
unchanged. HUD/movement component updates do not increment the weapons version.

Run the numerical checks and inspect relevant pages at desktop and mobile sizes.
For shell edits run `node build-routes.cjs`. Browser smoke verification uses
Playwright, installed separately; run `node verify-current-browser.cjs URL` with
PLAYWRIGHT_MODULE pointing to its module if it is not on Node's module path.
BROWSER_PATH can select a Chromium executable; Windows defaults to Edge.
This checks actual rendering/layout and browser errors, not gameplay.

GitHub Pages publishes this repo's main branch. When publication is authorized,
push, check its Pages deployment/workflow, then verify the live site's current
release JSON and changed pages. Synchronize the development repo's guide/dist
mirror afterward with the guide source commit and file hashes. Keep historical
verification receipts intact; do not present them as a new browser/runtime test.

## First instruction for an agent

"Read AGENTS.md and docs/ONBOARDING.md. Inspect current-release.json and the
selected release model. Run the existing numerical checks before editing.
For my requested change, preserve unrelated versions, tool state and section
navigation. Explain the changed behavior and verification, and publish only
within the authorized scope. Requested change: ..."
