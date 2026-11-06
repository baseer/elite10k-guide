window.ELITE_GUIDE = {
  "version": "1.72",
  "weapons": [
    {
      "id": "shock",
      "name": "Shock Rifle",
      "tag": "Movement rewards",
      "summary": "More reward for impressive combos that catch targets near the blast edge.",
      "rows": [
        {
          "label": "Beam damage",
          "b19": "45",
          "elite": "45",
          "note": ""
        },
        {
          "label": "Beam firing interval",
          "b19": "0.71 s",
          "elite": "0.71 s",
          "note": ""
        },
        {
          "label": "Core firing interval",
          "b19": "0.45 s",
          "elite": "0.474 s",
          "note": ""
        },
        {
          "label": "Core speed",
          "b19": "≈4.02 dodge lengths/s (2,800 UU/s)",
          "elite": "2,548 UU/s (91% of B19)",
          "note": "9% slower than authoritative B19’s 2,800 UU/s core."
        },
        {
          "label": "Weapon raise time",
          "b19": "0.30 s",
          "elite": "0.41 s",
          "note": "Normal v1.72 timing. All weapon lower times are 0.08 game seconds; firing-state restrictions still apply."
        },
        {
          "label": "Combo radius",
          "b19": "≈0.56 dodge lengths (390 UU)",
          "elite": "390 UU outer / 77 UU inner",
          "note": "Both versions stop beyond 390 UU."
        },
        {
          "label": "Unboosted combo damage",
          "b19": "40–210",
          "elite": "50–210",
          "note": "Falloff exponent 1.5 in both versions. Elite10K uses a 50-damage floor; B19 uses 40."
        },
        {
          "label": "Base combo bonus",
          "b19": "None",
          "elite": "None",
          "note": "Damage comes directly from the 50–210 radial curve, without a separate base boost."
        },
        {
          "label": "Movement damage bonuses",
          "b19": "None",
          "elite": "Nice +10 / Amazing +15 / Spectacular +20 damage",
          "note": "Constant eligible own-core additions to raw damage, capped at 210."
        },
        {
          "label": "Final combo cap",
          "b19": "210 base maximum",
          "elite": "210 after movement bonus",
          "note": ""
        },
        {
          "label": "Damage at outer edge",
          "b19": "40 raw at 390 UU",
          "elite": "50 at 390 UU",
          "note": "Before movement bonuses and armor."
        },
        {
          "label": "Combo falloff exponent",
          "b19": "1.5",
          "elite": "1.5",
          "note": "Curved falloff between 77 and 390 UU."
        },
        {
          "label": "Foreign-core feedback",
          "b19": "No 10K Denial feedback",
          "elite": "Anticombo!",
          "note": "No movement bonus for a foreign core."
        }
      ],
      "notes": [
        "Nice starts at movement score 8; Amazing at 20; Spectacular at 32. The angle/perpendicular-speed score uses the existing distance multiplier, clamped from 1× to 2×.",
        "Raw combo damage: D = 50 + 160 × (1 − clamp((r − 77) / 313, 0, 1))^1.5 within 390 UU. Inside 77 UU it is 210; beyond 390 UU it is zero. r is engine radial-hit distance, which can differ from player-center distance.",
        "No separate base damage boost. B19 uses 40–210 damage with the same 77/390 UU radii and falloff 1.5. Raising the floor to 50 is mathematically equivalent to the former tapered +10 base boost before rounding.",
        "Eligible own-core bonuses: Nice +10, Amazing +15, Spectacular +20. Final damage = min(210, trunc(D + bonus + 0.0001)).",
        "Actual-hit notices and kill-feed entries show actual whole-number movement bonus damage, with a single DMG suffix for an ordered multi-target list, e.g. Spectacular Combo! (+20, +8, +0 DMG). Bonus labels show movement damage only.",
        "No-kill notices use the existing shared yellow message class, steady 1× size and no announcer. Kill notices use their existing tier color and 3×→1× scale-in; qualifying voiced tiers use the usual announcer. Warmup own-core misses retain the blue bonus preview; live misses do not gain an own-core hit award.",
        "A foreign-core detonation displays Anticombo!, with no +DMG suffix or movement bonus. Without a kill it is yellow, steady 1× and silent. With a credited kill it is red, 3×→1× and uses the Denied voice cue and a dedicated Anticombo kill-feed label. Kill detection counts credited kills for that explosion, including warmup kills.",
        "One beam can pass through multiple cores. Its center-message priority is Spectacular > Amazing > Nice > Denial, independent of hit order. A qualifying own-core tier takes precedence over Denial.",
        "A positive enemy hit is recognized even when native radial-hit credit arrives late; self hits and zero damage do not count as that evidence. Native foreign-core tier announcements are suppressed independently of the center text.",
        "Diagnostic enlarged hitboxes/blasts and the 10% damage multiplier have been removed. Current release uses normal core collision, 390-UU outer radius and full damage.",
        "The refire put-down multiplier is 0.15 for both normal beams and combos. There is no separate combo-specific weapon-switch path."
      ],
      "lab": "shock"
    },
    {
      "id": "flak",
      "name": "Flak Cannon",
      "tag": "Distance tiers",
      "summary": "A slower primary cadence, clear shard damage bands, and a smaller flak ball.",
      "rows": [
        {
          "label": "Primary firing interval",
          "b19": "0.80 s",
          "elite": "0.90 s",
          "note": ""
        },
        {
          "label": "Primary shard speed",
          "b19": "≈18.67 dodge lengths/s (13,000 UU/s)",
          "elite": "≈18.67 dodge lengths/s (13,000 UU/s)",
          "note": "Restored to 100% of B19 in v1.3."
        },
        {
          "label": "Primary projectile count",
          "b19": "8 ordinary + 1 central",
          "elite": "8 ordinary + 1 central",
          "note": ""
        },
        {
          "label": "Primary damage model",
          "b19": "Native time attenuation / center bonus",
          "elite": "Travel-distance tiers",
          "note": "See the shard explorer below."
        },
        {
          "label": "Bounce damage multiplier",
          "b19": "0.65×",
          "elite": "1×",
          "note": "Total shard travel includes bounces—not just your current distance from the target."
        },
        {
          "label": "Shard hit momentum",
          "b19": "Native momentum",
          "elite": "0",
          "note": ""
        },
        {
          "label": "Ball collision radius",
          "b19": "30 UU",
          "elite": "13 UU",
          "note": "Physical collision, not splash radius."
        },
        {
          "label": "Ball initial speed",
          "b19": "≈4.67 dodge lengths/s (3,250 UU/s)",
          "elite": "3,006.25 UU/s (92.5% of B19)",
          "note": "92.5% of the corresponding authoritative B19 projectile speed."
        },
        {
          "label": "Ball maximum speed",
          "b19": "≈9.88 dodge lengths/s (6,880 UU/s)",
          "elite": "6,364 UU/s (92.5% of B19)",
          "note": "92.5% of the corresponding authoritative B19 projectile speed."
        },
        {
          "label": "Secondary firing interval",
          "b19": "0.97 s",
          "elite": "0.97 s",
          "note": ""
        },
        {
          "label": "Weapon raise time",
          "b19": "0.29 s",
          "elite": "0.41 s",
          "note": "Normal v1.72 timing. All weapon lower times are 0.08 game seconds; firing-state restrictions still apply."
        },
        {
          "label": "Ball base splash damage",
          "b19": "95",
          "elite": "95",
          "note": ""
        },
        {
          "label": "Low splash cutoff",
          "b19": "No custom 40 filter",
          "elite": "Below 40 rejected",
          "note": ""
        }
      ],
      "notes": [
        "Ordinary / central shards deal 10 / 20 below about 1½ dodge lengths travelled (1,050 UU), 7 / 14 from about 1½ to below 2¼ dodge lengths (1,575 UU), and 4 / 8 beyond that. Dodge equivalents are approximate; the exact thresholds remain 1,050 and 1,575 UU.",
        "The primary still has nine physical shards. The central shard counts as double damage; it is not a tenth projectile.",
        "Ball-spawned shards retain their separate 5-damage base. The primary distance-tier table does not apply to those shards.",
        "The ball has an orange visibility rim. Native attenuation and the temporary centered-hit bonus are disabled for primary tiered shards.",
        "The yellow projectile layers remain. The visible rocket-trail smoke layer uses opacity 0.2, half its previous 0.4 value; emitters are retained."
      ],
      "lab": "flak"
    },
    {
      "id": "rocket",
      "name": "Rocket Launcher",
      "tag": "Volley pacing",
      "summary": "Extra recovery for larger volleys, clearer projectile warnings, and a load-status HUD.",
      "rows": [
        {
          "label": "Primary interval",
          "b19": "1.05 s",
          "elite": "1.05 s",
          "note": ""
        },
        {
          "label": "Secondary refire / 1 rocket",
          "b19": "0.74 s",
          "elite": "1.05 s",
          "note": "Default fire-rate multiplier; no additional delay for extra loaded rockets."
        },
        {
          "label": "Secondary refire / 2 rockets",
          "b19": "0.74 s",
          "elite": "1.05 s",
          "note": "Default fire-rate multiplier; no additional delay for extra loaded rockets."
        },
        {
          "label": "Secondary refire / 3 rockets",
          "b19": "0.74 s",
          "elite": "1.05 s",
          "note": "Default fire-rate multiplier; no additional delay for extra loaded rockets."
        },
        {
          "label": "Delay between rockets in a volley",
          "b19": "0.015 s",
          "elite": "No added custom gap (0 s)",
          "note": "The custom VolleyGap term is zero; native scheduling still applies."
        },
        {
          "label": "Normal rocket speed",
          "b19": "Stock projectile setting",
          "elite": "≈3.55 dodge lengths/s (2,475 UU/s)",
          "note": "The active normal rocket is a replacement projectile."
        },
        {
          "label": "Seeking initial / maximum speed",
          "b19": "Stock seeking setting",
          "elite": "≈2.58 / 3.1 dodge lengths/s (1,800 / 2,160 UU/s)",
          "note": ""
        },
        {
          "label": "Grenade initial / maximum speed",
          "b19": "≈2.73 / 4.31 dodge lengths/s (1,900 / 3,000 UU/s)",
          "elite": "≈2.73 / 4.31 dodge lengths/s (1,900 / 3,000 UU/s)",
          "note": ""
        },
        {
          "label": "Weapon raise / lower time",
          "b19": "0.47 / 0.08 s",
          "elite": "0.41 / 0.08 s",
          "note": "Normal v1.72 timing. All weapon lower times are 0.08 game seconds; firing-state restrictions still apply."
        },
        {
          "label": "Low splash cutoff",
          "b19": "No custom 40 filter",
          "elite": "Below 40 rejected",
          "note": ""
        },
        {
          "label": "Cooldown bar",
          "b19": "Original presentation",
          "elite": "Removed",
          "note": "Loading rings and native crosshair remain."
        }
      ],
      "notes": [
        "Single-, double- and triple-rocket loaded volleys all use the 1.05-second base refire interval at the default fire-rate multiplier. The removed saved VolleyGap setting no longer adds delay; the normal EarliestFireTime guard still applies.",
        "The prominent front collar and short red sleeve improve rocket visibility. Opponents can see muzzle/load warning rings.",
        "The HUD shows loaded centers, charge progress, and release/grace feedback. A steady filled circle has a solid bright red inner disk at 50% of the dark red outer disk’s radius. The inner disk uses the ring red, without a gradient; opacity is unchanged. Newly loaded circles retain the 0.15-second completion pulse.",
        "The older Elite projectile with 3,200 initial speed is still packaged but is not the active normal rocket. Its values are not used as the comparison baseline here.",
        "The rocket cooldown bar is removed. The native crosshair, loaded-center circles, progress rings and separate loading/completion effects remain.",
        "The v1.72 projectile has a raised gunmetal shell over recessed translucent red panels. The shell blends into the original rear metal; the nose uses a uniform 0.45-unit surface offset, with a short transition at the triangle ring.",
        "The ring has centered, recessed red triangles with beveled metal edges. Red coating ends at the native rear shoulder. The red nose panels ease into a subtle orange tint at the front; rear red and underlying metal remain visible through the coating."
      ],
      "lab": "rocket"
    },
    {
      "id": "stinger",
      "name": "Stinger",
      "tag": "Burst reserve",
      "summary": "A nine-projectile accelerating opening with persistent recovery debt.",
      "rows": [
        {
          "label": "Primary damage",
          "b19": "12, inherited stock",
          "elite": "11",
          "note": ""
        },
        {
          "label": "Primary interval",
          "b19": "0.088 s",
          "elite": "0.088 s",
          "note": ""
        },
        {
          "label": "Secondary projectile base damage",
          "b19": "10",
          "elite": "10",
          "note": ""
        },
        {
          "label": "Opening sequence length",
          "b19": "12 projectiles",
          "elite": "9 projectiles",
          "note": ""
        },
        {
          "label": "Opening potential / all hits",
          "b19": "120 damage",
          "elite": "90 damage",
          "note": "Before armor and other modifiers."
        },
        {
          "label": "Opening first-to-last shot span",
          "b19": "≈0.379 s",
          "elite": "≈0.378 s",
          "note": "Modelled native scheduling; not a network timing guarantee."
        },
        {
          "label": "Sustained secondary interval",
          "b19": "0.148 s",
          "elite": "0.148 s",
          "note": ""
        },
        {
          "label": "Secondary ammo per projectile",
          "b19": "2",
          "elite": "2",
          "note": ""
        },
        {
          "label": "Full custom burst recovery",
          "b19": "No custom reserve system",
          "elite": "0.5 s debt",
          "note": "Restored v1.59 recharge setting, including partial-burst recovery budgets."
        },
        {
          "label": "Weapon raise / lower time",
          "b19": "0.48 / 0.08 s",
          "elite": "0.22 / 0.08 s",
          "note": "Normal v1.72 timing. All weapon lower times are 0.08 game seconds; firing-state restrictions still apply."
        }
      ],
      "notes": [
        "The opening is an acceleration sequence, not a claim that holding fire always stops after nine projectiles. The sustained interval remains separate.",
        "Actual modelled opening gaps are 200, 70, 50, 30, 14, 8, 4, and 2 ms. The 70 ms gap between bullets 2 and 3 and the 30 ms gap between bullets 4 and 5 match B19. The opening sequence contains nine shots.",
        "Releasing early does not erase recovery debt. Switching weapons does not reset it, and primary firing pauses reserve recovery.",
        "Stinger visuals are blue. Living-player momentum from secondary hits is removed, and projectile/trace responses were adjusted to avoid interference with shock cores.",
        "A full nine-shot burst needs 0.5 game seconds of recovery; partial bursts retain their corresponding recovery debt."
      ],
      "lab": "stinger"
    },
    {
      "id": "bio",
      "name": "Bio Rifle",
      "tag": "Goo tuning",
      "summary": "Less damage from normal and rapid goo, with a slightly slower large glob.",
      "rows": [
        {
          "label": "Normal primary damage",
          "b19": "40",
          "elite": "35",
          "note": ""
        },
        {
          "label": "Rapid mini-goo damage",
          "b19": "20",
          "elite": "13",
          "note": "Base damage 26 × GlobStrength 0.5 in v1.72."
        },
        {
          "label": "Normal fire interval",
          "b19": "0.30 s",
          "elite": "0.30 s",
          "note": ""
        },
        {
          "label": "Secondary interval",
          "b19": "0.35 s",
          "elite": "0.35 s",
          "note": ""
        },
        {
          "label": "Large glob initial speed",
          "b19": "≈9.33 dodge lengths/s (6,500 UU/s)",
          "elite": "≈8.87 dodge lengths/s (6,175 UU/s)",
          "note": "95% of B19."
        },
        {
          "label": "Large glob maximum speed",
          "b19": "≈14.07 dodge lengths/s (9,800 UU/s)",
          "elite": "≈13.37 dodge lengths/s (9,310 UU/s)",
          "note": ""
        },
        {
          "label": "Large glob damage parameters",
          "b19": "Base 18 / minimum 60",
          "elite": "Base 18 / minimum 60",
          "note": "Strength and native charged-goo rules still apply."
        },
        {
          "label": "Weapon raise / lower time",
          "b19": "0.48 / 0.08 s",
          "elite": "0.41 / 0.08 s",
          "note": "Normal v1.72 timing. All weapon lower times are 0.08 game seconds; firing-state restrictions still apply."
        }
      ],
      "notes": [
        "Mini-goo damage is derived from its base damage and 0.5 glob strength. Older notes that say 12 damage describe an earlier build.",
        "Collision responses reduce projectile interactions. The large/charged mode was not given the same direct damage reduction as normal and mini goo."
      ],
      "lab": "bio"
    },
    {
      "id": "link",
      "name": "Link Gun",
      "tag": "No heat",
      "summary": "Lower plasma damage, a continuous beam, and a cleaner green visual.",
      "rows": [
        {
          "label": "Primary projectile damage",
          "b19": "20, inherited native",
          "elite": "17",
          "note": ""
        },
        {
          "label": "Primary interval",
          "b19": "0.124 s",
          "elite": "0.124 s",
          "note": ""
        },
        {
          "label": "Primary initial / maximum speed",
          "b19": "≈13.21 / 14.22 dodge lengths/s (9,200 / 9,900 UU/s)",
          "elite": "≈13.21 / 14.22 dodge lengths/s (9,200 / 9,900 UU/s)",
          "note": ""
        },
        {
          "label": "Beam damage per tick",
          "b19": "28",
          "elite": "28",
          "note": ""
        },
        {
          "label": "Beam tick interval",
          "b19": "0.23 s",
          "elite": "0.23 s",
          "note": ""
        },
        {
          "label": "Beam range",
          "b19": "≈3.37 dodge lengths (2,350 UU)",
          "elite": "≈3.37 dodge lengths (2,350 UU)",
          "note": ""
        },
        {
          "label": "Pull warmup",
          "b19": "0.085 s",
          "elite": "0.085 s",
          "note": ""
        },
        {
          "label": "Pull ammo cost",
          "b19": "3",
          "elite": "3",
          "note": ""
        },
        {
          "label": "Weapon raise / lower time",
          "b19": "0.22 / 0.08 s",
          "elite": "0.22 / 0.08 s",
          "note": "Normal v1.72 timing. All weapon lower times are 0.08 game seconds; firing-state restrictions still apply."
        },
        {
          "label": "Heat presentation",
          "b19": "Original Elite behavior",
          "elite": "No-heat wrapper / heat bar suppressed",
          "note": ""
        }
      ],
      "notes": [
        "The native-derived Link implementation is retained. It does not use the temporary NCP weapon parent.",
        "The no-heat wrapper removes the heat presentation while keeping primary, beam, and pull roles. Primary plasma is a more defined green with a restrained white highlight."
      ],
      "lab": "link"
    },
    {
      "id": "sniper",
      "name": "Sniper Rifle",
      "tag": "Less push",
      "summary": "The same body and headshot damage, with a narrower trace and no shot momentum.",
      "rows": [
        {
          "label": "Body damage",
          "b19": "70",
          "elite": "70",
          "note": ""
        },
        {
          "label": "Headshot damage",
          "b19": "140",
          "elite": "140",
          "note": ""
        },
        {
          "label": "Firing interval",
          "b19": "1.36 s",
          "elite": "1.36 s",
          "note": ""
        },
        {
          "label": "Trace half-size",
          "b19": "15 UU",
          "elite": "7.5 UU",
          "note": "Verified in both weapon InstantHitInfo.TraceHalfSize and the trace controller defaults."
        },
        {
          "label": "Shot momentum",
          "b19": "20,000",
          "elite": "0",
          "note": ""
        },
        {
          "label": "Trace range",
          "b19": "≈143.6 dodge lengths (100,000 UU)",
          "elite": "≈143.6 dodge lengths (100,000 UU)",
          "note": ""
        },
        {
          "label": "Weapon raise / lower time",
          "b19": "0.41 / 0.08 s",
          "elite": "0.41 / 0.08 s",
          "note": "Normal v1.72 timing. All weapon lower times are 0.08 game seconds; firing-state restrictions still apply."
        }
      ],
      "notes": [
        "Trace size can be affected by mutator settings; the packaged default is 7.5 UU. Body/headshot damage and firing cadence are preserved.",
        "The current weapon is based on the pre-NCP foundation, not the experimental NCP sniper."
      ],
      "lab": "sniper"
    },
    {
      "id": "lightning",
      "name": "Lightning Rifle",
      "tag": "Hitscan replacement",
      "summary": "A custom map-slot replacement with an instant normal shot and retained charged behavior.",
      "rows": [
        {
          "label": "Map weapon replacement",
          "b19": "No custom B19 replacement",
          "elite": "Elite10K Lightning Rifle",
          "note": ""
        },
        {
          "label": "Normal fire model",
          "b19": "Stock projectile primary",
          "elite": "Instant hitscan",
          "note": ""
        },
        {
          "label": "Normal damage",
          "b19": "Stock projectile rules",
          "elite": "70",
          "note": ""
        },
        {
          "label": "Normal firing interval",
          "b19": "0.90 s in stock parent",
          "elite": "1.36 s",
          "note": ""
        },
        {
          "label": "Normal shot trace half-size",
          "b19": "Projectile primary",
          "elite": "7.5 UU",
          "note": "Verified in both weapon InstantHitInfo.TraceHalfSize and the trace controller defaults."
        },
        {
          "label": "Charged body / headshot",
          "b19": "Stock charged behavior",
          "elite": "85 / 140",
          "note": ""
        },
        {
          "label": "Charged refire interval",
          "b19": "Stock charged behavior",
          "elite": "1.66 s",
          "note": ""
        },
        {
          "label": "Weapon raise / lower time",
          "b19": "Stock map weapon",
          "elite": "0.41 / 0.08 s",
          "note": "Normal v1.72 timing. All weapon lower times are 0.08 game seconds; firing-state restrictions still apply."
        }
      ],
      "notes": [
        "B19 does not supply a custom Lightning Rifle asset. Its side of this comparison therefore refers to the stock map weapon, not a fictional B19-specific rifle.",
        "The normal shot is instant hitscan. Charged-shot and chaining behavior are retained. The charged interval adds 0.30 seconds to the 1.36-second base.",
        "The packaged trace default is 7.5 UU for this replacement. The old stock weapon’s stored 45-damage hitscan entry is not used as a verified primary projectile damage value here."
      ],
      "lab": null
    },
    {
      "id": "hammer",
      "name": "Impact Hammer",
      "tag": "Charge feedback",
      "summary": "Full charge arrives sooner, with clearer charge and mobility feedback.",
      "rows": [
        {
          "label": "Full damage charge time",
          "b19": "2.00 s",
          "elite": "1.60 s",
          "note": ""
        },
        {
          "label": "Full impact/jump charge fraction",
          "b19": "25%",
          "elite": "31.25%",
          "note": "Both correspond to 0.50 seconds of charge."
        },
        {
          "label": "Full impact/jump charge time",
          "b19": "0.50 s",
          "elite": "0.50 s",
          "note": ""
        },
        {
          "label": "Stored primary hit damage",
          "b19": "140",
          "elite": "140",
          "note": ""
        },
        {
          "label": "Primary / secondary intervals",
          "b19": "0.20 / 0.88 s",
          "elite": "0.20 / 0.66 s",
          "note": "Secondary refire interval reduced 25% from B19’s 0.88 seconds."
        },
        {
          "label": "Weapon raise / lower time",
          "b19": "0.115 / 0.07 s",
          "elite": "0.115 / 0.08 s",
          "note": "Normal v1.72 timing. All weapon lower times are 0.08 game seconds; firing-state restrictions still apply."
        },
        {
          "label": "Alt shield blocking size",
          "b19": "100% stock shield",
          "elite": "115% width and height",
          "note": "Visible shield mesh matches the 15% larger blocking coverage. Shield depth is unchanged."
        }
      ],
      "notes": [
        "The faster full damage charge is separate from the movement-ready point. The movement threshold remains 0.50 seconds.",
        "The HUD adds a charge arc and compact jump/blood-drop indicators, with translucent icons and a gold-to-red progression.",
        "The enlarged alt block uses a dedicated 10K shield projectile. Lifetime, movement and growth behavior are retained.",
        "The HUD halo feathers smoothly across the top red/gold join. Solid fill, border, icons and charge timing are unchanged."
      ],
      "lab": "hammer"
    },
    {
      "id": "enforcer",
      "name": "Enforcer",
      "tag": "Core tuning retained",
      "summary": "The active modern Enforcer keeps B19’s main damage and firing defaults.",
      "rows": [
        {
          "label": "Damage per shot",
          "b19": "20",
          "elite": "20",
          "note": ""
        },
        {
          "label": "Primary interval",
          "b19": "0.31 s",
          "elite": "0.31 s",
          "note": ""
        },
        {
          "label": "Secondary interval",
          "b19": "0.85 s",
          "elite": "0.85 s",
          "note": ""
        },
        {
          "label": "Ammo costs / primary, secondary",
          "b19": "1 / 3",
          "elite": "1 / 3",
          "note": ""
        },
        {
          "label": "Trace range",
          "b19": "≈35.9 dodge lengths (25,000 UU)",
          "elite": "≈35.9 dodge lengths (25,000 UU)",
          "note": ""
        },
        {
          "label": "Trace half-size",
          "b19": "0",
          "elite": "0",
          "note": ""
        },
        {
          "label": "Weapon raise / lower time",
          "b19": "0.26 / 0.08 s",
          "elite": "0.41 / 0.08 s",
          "note": "Normal v1.72 timing. All weapon lower times are 0.08 game seconds; firing-state restrictions still apply."
        }
      ],
      "notes": [
        "The comparison uses the active Enforcer-EliteW asset on both sides. The separate older backup Enforcer has different timings and is not the active replacement.",
        "The temporary NCP Enforcer inheritance is absent from v1.72. No precision increase is inferred simply from the weapon’s name."
      ],
      "lab": "enforcer"
    },
    {
      "id": "grenade",
      "name": "Grenade Launcher",
      "tag": "Low splash filter",
      "summary": "Retained firing cadence with a 40-damage splash threshold.",
      "rows": [
        {
          "label": "Primary / secondary intervals",
          "b19": "0.94 / 1.00 s",
          "elite": "0.94 / 1.00 s",
          "note": ""
        },
        {
          "label": "Low splash cutoff",
          "b19": "No custom 40 filter",
          "elite": "Below 40 rejected",
          "note": ""
        },
        {
          "label": "Normal / sticky projectile handling",
          "b19": "Original projectile path",
          "elite": "Integrated cutoff wrappers",
          "note": ""
        },
        {
          "label": "Replacement grenade damage parameters",
          "b19": "Original grenade behavior",
          "elite": "Base 90 / minimum 20",
          "note": "Candidate damage below 40 is filtered."
        },
        {
          "label": "Weapon raise / lower time",
          "b19": "0.51 / 0.08 s",
          "elite": "0.41 / 0.08 s",
          "note": "Normal v1.72 timing. All weapon lower times are 0.08 game seconds; firing-state restrictions still apply."
        }
      ],
      "notes": [
        "Normal and sticky grenades use dedicated cutoff handling. The raw minimum parameter can still say 20 while the custom filter rejects qualifying damage below 40.",
        "This is different from shock combos: shock already has a native radial minimum of 40, and its bonus modifier does not expand its explosion reach."
      ],
      "lab": "grenade"
    },
    {
      "id": "redeemer",
      "name": "Redeemer",
      "tag": "Stock slot retained",
      "summary": "No custom Redeemer rebalance is introduced by the active replacement list.",
      "rows": [
        {
          "label": "Map weapon replacement",
          "b19": "No custom B19 replacement",
          "elite": "Stock Redeemer retained",
          "note": ""
        },
        {
          "label": "Custom damage rebalance",
          "b19": "None in B19 package",
          "elite": "None in the active replacement list",
          "note": ""
        }
      ],
      "notes": [
        "This slot is included so the guide accounts for the full replacement list. It is not presented as a new Elite10K weapon feature."
      ],
      "lab": null
    }
  ],
  "shared": [
    {
      "id": "movement",
      "name": "Movement & interactions",
      "tag": "Shared rules",
      "summary": "Quicker dodge resets and fewer unintended projectile interactions.",
      "rows": [
        {
          "label": "Ground-dodge reset delay",
          "b19": "0.35 s native default",
          "elite": "0.01 s",
          "note": ""
        },
        {
          "label": "Wall-dodge reset delay",
          "b19": "0.20 s native default",
          "elite": "0.01 s",
          "note": ""
        },
        {
          "label": "Movement tier thresholds",
          "b19": "Native cosmetic combo award",
          "elite": "8 / 20 / 32",
          "note": ""
        },
        {
          "label": "Airborne score weighting",
          "b19": "Native 5 vs ground 3",
          "elite": "3 on ground and in air",
          "note": ""
        },
        {
          "label": "Dodge-jump reset delay",
          "b19": "Native / no custom B19 override",
          "elite": "0.01 s",
          "note": "Movement-state restrictions and airtime remain."
        },
        {
          "label": "Ground acceleration",
          "b19": "Native / no custom B19 override",
          "elite": "5,000 UU/s²",
          "note": "MaxAcceleration; normal ground acceleration."
        },
        {
          "label": "Walking braking / deceleration",
          "b19": "Native / no custom B19 override",
          "elite": "20,000 UU/s²",
          "note": "Both BrakingDecelerationWalking and DefaultBrakingDecelerationWalking."
        },
        {
          "label": "Ground friction",
          "b19": "Native / no custom B19 override",
          "elite": "14",
          "note": "Affects ground direction changes as well as stopping behavior."
        },
        {
          "label": "Fast initial acceleration",
          "b19": "Native / no custom B19 override",
          "elite": "100,000 UU/s²",
          "note": "Low-speed acceleration boost; blends toward regular acceleration as speed rises. It does not apply at full running speed."
        },
        {
          "label": "Air control / dodge-air control",
          "b19": "Native / no custom B19 override",
          "elite": "0.7 / 0.7",
          "note": "Normal and dodge air-control overrides."
        }
      ],
      "notes": [
        "Reset delay is the cooldown after the relevant movement event. It does not remove dodge airtime or other movement-state restrictions.",
        "Combo movement uses perpendicular player speed, not equal credit for running along the core’s flight direction. Its angle-plus-speed score is multiplied by 1× at one reference dodge length or less, up to 2× at two lengths or farther.",
        "Shock, flak, goo, and Stinger collision/trace responses were revised to reduce projectile interception. A server’s plugins and mutator configuration can still change runtime behavior.",
        "Distance reference: one dodge length ≈696 UU (Unreal Units), using the same reference as combo scoring. These are approximate distances, not a count of dodge inputs. Dodge lengths/s describes speed: how many reference lengths a projectile covers per second. Tiny collision and trace widths retain exact units because fractions of a dodge are less useful for them.",
        "These are the active movement overrides. The proposed v1.56 rollback and full-v1.25 movement test were shelved and are not installed.",
        "The reported rubber-banding was resolved by clients deleting old packages; it was not established as a movement-tuning bug. Use a single current Elite10K package with matching client/server versions.",
        "Fast initial acceleration applies at low speed. At speed, normal acceleration and ground friction govern steering; releasing input or exceeding the speed limit engages braking. The 220-UU/s boost threshold seen in the older local engine source is not presented here as a verified installed-binary override."
      ],
      "lab": null
    },
    {
      "id": "visuals",
      "name": "HUD & readability",
      "tag": "Visual feedback",
      "summary": "More readable projectiles and clearer information while loading or charging.",
      "rows": [
        {
          "label": "Rocket loading HUD",
          "b19": "Original crosshair feedback",
          "elite": "Loaded centers, progress rings, grace/release handling",
          "note": ""
        },
        {
          "label": "Rocket completion pulse",
          "b19": "No custom pulse material",
          "elite": "0.15 s red pulse",
          "note": ""
        },
        {
          "label": "Filled center peak opacity",
          "b19": "No custom disk",
          "elite": "96%",
          "note": ""
        },
        {
          "label": "Rocket pulse glow",
          "b19": "No custom completion glow",
          "elite": "Bright red core + soft ring halo",
          "note": ""
        },
        {
          "label": "Hammer feedback",
          "b19": "Original weapon feedback",
          "elite": "Charge arc, jump and damage badges",
          "note": ""
        },
        {
          "label": "Stinger presentation",
          "b19": "Original Elite effects",
          "elite": "Blue primary/secondary effects",
          "note": ""
        },
        {
          "label": "Standalone layout HUD",
          "b19": "Not part of B19",
          "elite": "Separate optional HUD package",
          "note": ""
        },
        {
          "label": "Steady loaded rocket center",
          "b19": "No custom disk",
          "elite": "Solid ring-red inner disk / 50% radius",
          "note": "Dark red outer disk; separate from the completion pulse."
        },
        {
          "label": "Blue preview / combo text",
          "b19": "Original blue text",
          "elite": "#4DC9FF — RGB 77, 201, 255",
          "note": "Slightly more saturated than #55CCFF; opacity unchanged."
        },
        {
          "label": "Stinger switch color",
          "b19": "Original weapon materials",
          "elite": "Linear RGB 0.015, 0.15, 1.5",
          "note": "Final retained v1.48 material revision."
        }
      ],
      "notes": [
        "Each steady loaded rocket circle has a solid bright red center at 50% of the outer disk’s radius. The completion pulse and its soft ring halo remain separate from this steady filled state.",
        "The brighter rocket material is cosmetic. It does not change loading intervals, damage, or projectile reach.",
        "The full-screen Elite10K HUD is a separate optional package. Weapon-specific overlays and projectile visuals are part of the weapon work; the two should not be confused.",
        "Visual changes have cooked successfully, but exact perceived brightness depends on the renderer and still needs live visual verification.",
        "Opponent weapon switches use destination-weapon colors and a brief glow; normal materials return after the switch. These cosmetics do not change weapon raise/lower times.",
        "Rocket red panels and collar details use rocky red surface variation. Link projectiles have a broader white center. Weapon display names use the 10K prefix.",
        "The switch helper synchronizes presentation with the native switch phase. Pending-weapon colors apply only while FlashExtra is zero and the synchronized phase is lowering; the latest pending request is reevaluated. Current-weapon fallback handles completed or missed transitions.",
        "Switch diagnostics/console spam are disabled in the normal release. Normal switch timing remains gameplay-controlled; cosmetic effects do not advance firing readiness."
      ],
      "lab": null
    },
    {
      "id": "foundation",
      "name": "Version & setup",
      "tag": "Know what is running",
      "summary": "This guide describes the installed v1.72 weapon package and its default settings.",
      "rows": [
        {
          "label": "Comparison baseline",
          "b19": "Authoritative original Elite B19",
          "elite": "Installed normal Elite10K v1.72",
          "note": ""
        },
        {
          "label": "NCP-derived weapon conversion",
          "b19": "Not used",
          "elite": "Removed from the current weapon foundation",
          "note": ""
        },
        {
          "label": "Alternative builds / tests",
          "b19": "Original package",
          "elite": "Reverted experiments excluded",
          "note": ""
        },
        {
          "label": "Game speed, armor, amplification",
          "b19": "Server/game settings",
          "elite": "Not included in calculator predictions",
          "note": ""
        }
      ],
      "notes": [
        "A locally installed v1.72 file does not upgrade a public server. Its server package controls gameplay, and older downloads can share internal paths with newer assets.",
        "Use matching client/server packages for reliable testing. Saved mutator settings may override packaged defaults.",
        "The authoritative B19 reference is preserved read-only. Earlier development backups are not used as the baseline for this guide.",
        "Package defaults and script inspection establish configured behavior. They do not prove every feature is free of multiplayer or scheduling issues.",
        "The active package now uses the stable filename Elite10K-WindowsNoEditor.pak and stable registry metadata, independent of the displayed release version.",
        "The v1.44 cleanup removed 100 unused asset entries (19,038,044 bytes at that step). Required effects and gameplay assets were retained.",
        "Use only the current Elite10K package. Disable or remove older copies instead of leaving multiple versions with the same internal asset paths mounted.",
        "This guide describes the final normal release, not the enlarged-core/radius or reduced-damage diagnostics. The confirmed Denial notification and multi-core priority fixes are retained.",
        "v1.72 restores the three v1.58 effect/sound/overlay assets, v1.59 Stinger recovery, Anticombo! text, and immediate weapon-switch glow. Client, server, launcher and redirect are synchronized for this release."
      ],
      "lab": null
    }
  ],
  "baselineSha256": "A17869BA76025E0F4FC3B9D52F37A271AF363E4760561AAB094DB82D4DD861CF",
  "packageSha256": "3CC6AD50DE25337EEF8CF1E8A037DD56D6674C2354BC16C2B89958B337F1E282",
  "verifiedDate": "2026-11-05",
  "assumptions": "Default settings, game seconds, no armor or damage amplification. Native/stock inherited values are labelled in the tables."
};
