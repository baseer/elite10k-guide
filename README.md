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

Movement calculator: currentv2.0 #movement adds accelerate/stop/reverse180 modes, starting-speed/game-speed/timeline sliders, profile toggles, shared-distance animation, signed velocity plot and event timings. Table now has Stock/UT+/NCP/B19/10K columns. Numerical native-rule simulation1ms game steps, flat ground/no sprint. UT+ transient braking assignment versus persistent520 is explicit; NCP profile excludes optional UT+ mutator.

Movement layout refinement: combine identical Stock/NCP/B19 values into one movement column and one calculator toggle/lane/curve/result. Keep attack interaction profiles separate in their own table, and explain initialization differences in notes. No parameter or simulation-equation changes.

Movement percentage cards: 10K versus Stock/NCP/B19 and UT+ for the selected mode/start speed. Show completion-rate percentage and elapsed-time reduction separately, plus zero-crossing time reduction for reversal. Percentages independent of common game-speed scaling; zero-time targets show no percentage. Hidden profile lanes do not disable reference comparisons.

Latest v2.03: initial56000, Flakball93%, normalrocket90%, rifle traces10UU; shared configurable pulse, fixed toggle and B19 ball smoke/refraction, front glow preserved. SHA256 FD5A16B7FF1DB747EEC4B91D861BCFA43C7D4B9F646BB67E2F81ABFD01C81568. Historical snapshots unchanged.

Latest v2.04: original UT+ active braking2,000, native persistent520, custom setter removed; calculator settled520. Final v2.03 checkpoint corrected and archived prior public snapshot. Primary Flak exact v1.98, initial56k, ball93.5%, normalrocket91%, selected-color-only pulse. Package 4C8DBECD912F588AFA4C8987D8CCD3F579ABF23E99720BABDD5A860DD0449BE1.

Movementlab now includes cumulative distance over time above velocity, synchronizedtimeline, exactperprofilefactors andphaseequations. Currentv2.04braking2080; earlierUT+revisionarchived. Latesthash 2303138A1A4FC78B7D14C9C6E2A442224ADD07B05287D470E870A0E9510567B3.

Current v2.04 (2026-11-18): Flak ball 92.5% B19 (3006.25/6364 UU/s), normal rocket 90% B19 (2880/4680 UU/s). Movement remains initial56000/normal5000/transition200/braking2080. Since final1.98 only existing movement tuning changed; intermediate persistent setter removal was reverted. Prior speed snapshot archived; other46 snapshots unchanged. Installation HTTP redirect download unavailable/unverified. Package 1E8EC4641DF291C4A1925F251A27A2C72469C40ADC9AEB32841B41C90CD8546F.

## Section URLs and shared tool settings
Sections have real directory entry points (for example `movement/` and `combo/`), generated from the root shell by `node build-routes.cjs`. Run this after changing `index.html` or adding sections. All entry points share the root assets through a relative `<base>`; GitHub Pages serves direct links without a custom 404 or rewrite. Legacy section hashes are replaced with canonical paths. Native in-page anchors remain available.

`guide-url.js` owns navigation and query settings. Calculator distance, score, health, angle, side-speed and separation are URL parameters. The movement parameter is a version-independent JSON object containing the scenario, start speed, game speed, neutral gap, visible profiles, custom numeric values, graph, timeline, playback rate and expanded settings. Inputs are checked against the UI bounds when restoring. Adjustments replace the current history entry; section navigation pushes an entry. Release and comparison parameters remain intact. Simulation equations and archived snapshots are unchanged.

Movement URLs now use readable individual parameters, omitting release defaults: `movement/?version=2.04&mode=turn90`. Changed custom values use `custom-*` parameters, timeline `time` is milliseconds, and profile IDs are dot-separated. Existing JSON `movement` URLs still restore and convert automatically. Subsection headings and expandable summaries have stable hash anchors. The visible # copies the complete link; direct loads reveal enclosing details/tabs and scroll to the target.

Splash simulator: `splash/` is one shared Rocket / Flak ball secondary tool, linked from both weapon pages and the sidebar/mobile picker. It compares authoritative B19 with the selected release using `ReleaseHistory.splash`, including historical below-40 rejection. Distance and health inputs, exact-radius presets, radius illustration, draggable damage graph, raw/whole damage and remaining health share through `projectile`, `splash-distance` and `splash-health` query parameters. Cover, collision eligibility, armor, self scaling and direct-impact behavior are excluded. Archived snapshots and game packages are unchanged.
`splash/` also compares ideal spherical splash surface area (4πr²), circular ground footprint (πr²), and area change versus B19 using the outer blast radii. Geometry assumes an unobstructed blast and a footprint through its center.

Splash simulator now includes Stock UT and UT+ standard alongside B19 and the selected Elite10K release, with four curves/radius outlines, damage/health cards and area comparisons. Stock: rocket100/20,15/360; Flak90/20,40/330. UT+: rocket100/20,15/345; Flak115/18,20/300. UT+ projectile parents and pak hash reverified; unoverridden fields inherit native constructor defaults. See splash-profiles-evidence.json. The chart scales to125 raw damage; only historical Elite10K applies the below40 rejection.

Splash damage results use the combo calculator presentation: one prominent Elite10K final whole-number damage display, followed by aligned Elite10K/B19/UT+/Stock comparison bars on a shared125-damage scale. Raw damage and remaining health stay on each row. Blast parameters and geometric areas are preserved in an expandable comparison table. Inputs, graphs, release models and shareable settings are unchanged.
`splash/` distance slider now runs450UU left to0UU right, matching the combo calculator. Desktop places the two stacked graphs left of the final-damage comparison; mobile stacks results then graphs. Verified physical slider direction and responsive element positions.
Splash visual refinement: aligned three-field desktop controls, consistent spacing/type, shared legend, equal-height graph/results panels with matching top/bottom borders, quieter chart surfaces and responsive tablet/mobile layouts. Physical reversed slider, numerical results and archived models preserved. Browser verification at1440/1024/768/390/320px.
Splash panels, controls, chart frames and result bars use square corners. Distance/health sliders reuse the combo calculator track/thumb styling; distance keeps450-left/0-right with correctly mirrored fill. Target health now has a synchronized1..200 slider.
Splash graphs horizontally reversed: damage distance runs450 left to0 right, matching the distance slider. Blast impact is at right with target extending left. SVG labels remain readable and damage-chart pointer mapping follows the reversed axis.
Splash profile checkboxes filter both SVG graphs, damage bars and size/area rows; hiding Elite10K also hides its hero result. All-off selection shows a prompt. Selections persist in splash-profiles (dot-separated IDs; empty means none), keyboard focus survives updates, Reset restores all profiles and section navigation clears the tool parameter. All16 combinations verified.
