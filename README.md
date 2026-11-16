# elite10k-guide
Elite10K Field Guide and interactive weapon calculators

The archive covers 41 completed weapon releases from v1.57 through v1.97.
Version labels retain the game's spelling (v1.6, v1.7 and v1.8). Each entry uses
the final normal revision, with diagnostic-only and superseded tuning builds
excluded. The optional HUD and native client DLL have separate release histories.

`versions/releases.json` records the package hashes, release provenance and
calculator parameters. Each version has a downloadable comparison-data snapshot.
`versions-data.js` supplies the same data to the navbar, comparisons and tools;
`release-history.js` applies the selected model to the calculators and copy.

Run `node verify-history.cjs` to check all 41 snapshots and 451,328 numerical
cases. Release artifacts were independently verified by full pak SHA256; archived
snapshots were reconstructed in memory from verified hash-addressed assets.
The authoritative original B19 remains the comparison reference.

Latest v1.81/v1.82 snapshots retain all-nine Shredded, Hammer 1.8-second charge and original shard visuals. Rifle headshot scales are version-aware; Lightning headshots require the fully powered firing state. Body diagrams show both front-on coverage and 3D capsule surface area with a shared 80×216-UU example.

Final v1.83 adds the finished regular-rocket shell to rocket grenades and permits your own third-person switch glow in behindview 1, with the existing effect timing and first-person exclusion. Sniper tracer, lingering smoke length/lifetime/opacity, and Flak visuals match final v1.82.

Final v1.84 requires the central shard plus seven outer shards on the same live enemy for Shredded; the spare may miss or hit another enemy. Final v1.85 centers rocket spin, fixes the single-loaded-rocket HUD ring fade and extends the Hammer alt shield to 0.75 game seconds while retaining its 0.66-second refire interval.

Final v1.85 restores Hammer jump readiness to 0.50 seconds. v1.86 adds globally cheapest-unpaid Stinger recovery. v1.88 restores native rocket firing with a pending-switch retry. v1.89 uses red-only rocket rings, native time-decaying Flak and native Shredded. v1.90 reduces ring size, removes the Stinger size pulse and simplifies Flak stored damage. Final v1.91 uses 0.475-second Stinger recovery, native Bio/rocket/Flak contacts and landed-goo handling, and rocket trace exclusions on both weapon channels. Latest optional HUD is separately versioned v1.15.

Final v1.93 adds dynamic Stinger recovery (final idle target0.475s, fallback multiplier1.5 for ideal1.145436s), continuous fallback repayment with per-shot debt, a new-press reserve lock and the native-interval tap gate. Primary fire pauses repayment. v1.92 is preserved as the earlier 0.45-second tuning-only release.


Final v1.94 replaces the movement tick helper with owner inventory initialization and replaces additive Stinger fallback debt with shot-confirmed quiet recovery, frozen during primary fire. Final v1.95 retains this gameplay and uses Link core white endpoint 0.6 / opacity 1.0. Final rendered/network acceptance is pending. Earlier snapshots remain unchanged.

Final v1.96 updates public branding. Final v1.97 uses Flak bases10.4/20.8 with floors4/8 and native age decay over875–1750UU at a constant13000UU/s (about1.25–2.5 tuning dodges),15% smaller rocket rings, and two independent saved local commands:10kWeaponSwitchFlash0/1 and10kRocketLoadRings0/1. Optional HUD1.18 supplies the spectator spread fix and current ON/OFF console notices at join/map initialization. The preferences use local SaveGames, not Game.ini. Native persistence/console status tests passed; rendered acceptance remains pending.

Final v1.98 adds Elite10K Settings (10kSettings), radius scale0–1.75/default1, material opacity0–1/default.875 and switch indicators0/1/defaultOn. Exact zero hides only custom rings. Apply tracks value edits; defaults delete overrides on Apply. Current pulse white tint13.5%; ring default5% smaller than pre-reduction. Older commands removed; optional HUD stays1.18 with updated settings notices. The preserved release is authoritative if an older server overwrites the installed pak.

Final v2.0 adds Stock UT and UT+ columns to Flak/Rocket. Primary Flak decay now corresponds to700–1400UU at constant13000UU/s (native age-based, not accumulated distance). Early grenade recovery is1.05/.895/.74s for1/2/3 grenades selected during loading; regular/late selection remains1.05s. Unknown reference values are explicitly labeled. All42 previous snapshots remain unchanged.

2026-11-16 installed v2.0 rifle update: Sniper/Lightning traces7.5UU; Sniper head radius1.15 in all shooter states (B19 stopped/slow1.65, aimed/running1.15); Lightning headshots disabled using all four existing size parameters0. Normal/charged body70/85, charge and800UU chain retained. Installed Flak ball92.5%B19; requested93% build explicitly staged only. Settings are local, no host required. Previous2.0 snapshot archived under versions/2.0/revisions; all42 earlier version snapshots unchanged.

2026-11-16 movement reference correction: replaces six current-v2.0 B19 stock-setting placeholders with verified inherited defaults (dodge-jump reset0.35s, ground acceleration3200, walking braking520, friction10.5, fast initial acceleration12000, air/dodge-air0.55/0.41). Native editor/server constructors and property metadata agree; original B19 contains no overrides. Earlier public source4000/0.45 is explicitly distinguished. Evidence: stock-movement-evidence.json. No weapon/server tuning changed; older version snapshots preserved.
