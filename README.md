# elite10k-guide
Elite10K Field Guide and interactive weapon calculators

The archive covers 37 completed weapon releases from v1.57 through v1.93.
Version labels retain the game's spelling (v1.6, v1.7 and v1.8). Each entry uses
the final normal revision, with diagnostic-only and superseded tuning builds
excluded. The optional HUD and native client DLL have separate release histories.

`versions/releases.json` records the package hashes, release provenance and
calculator parameters. Each version has a downloadable comparison-data snapshot.
`versions-data.js` supplies the same data to the navbar, comparisons and tools;
`release-history.js` applies the selected model to the calculators and copy.

Run `node verify-history.cjs` to check all 37 snapshots and 407,296 numerical
cases. Release artifacts were independently verified by full pak SHA256; archived
snapshots were reconstructed in memory from verified hash-addressed assets.
The authoritative original B19 remains the comparison reference.

Latest v1.81/v1.82 snapshots retain all-nine Shredded, Hammer 1.8-second charge and original shard visuals. Rifle headshot scales are version-aware; Lightning headshots require the fully powered firing state. Body diagrams show both front-on coverage and 3D capsule surface area with a shared 80×216-UU example.

Final v1.83 adds the finished regular-rocket shell to rocket grenades and permits your own third-person switch glow in behindview 1, with the existing effect timing and first-person exclusion. Sniper tracer, lingering smoke length/lifetime/opacity, and Flak visuals match final v1.82.

Final v1.84 requires the central shard plus seven outer shards on the same live enemy for Shredded; the spare may miss or hit another enemy. Final v1.85 centers rocket spin, fixes the single-loaded-rocket HUD ring fade and extends the Hammer alt shield to 0.75 game seconds while retaining its 0.66-second refire interval.

Final v1.85 restores Hammer jump readiness to 0.50 seconds. v1.86 adds globally cheapest-unpaid Stinger recovery. v1.88 restores native rocket firing with a pending-switch retry. v1.89 uses red-only rocket rings, native time-decaying Flak and native Shredded. v1.90 reduces ring size, removes the Stinger size pulse and simplifies Flak stored damage. Final v1.91 uses 0.475-second Stinger recovery, native Bio/rocket/Flak contacts and landed-goo handling, and rocket trace exclusions on both weapon channels. Latest optional HUD is separately versioned v1.15.

Final v1.93 adds dynamic 0.50-second Stinger recovery, continuous fallback repayment with per-shot debt, a new-press reserve lock and the native-interval tap gate. Primary fire pauses repayment. v1.92 is preserved as the earlier 0.45-second tuning-only release.

