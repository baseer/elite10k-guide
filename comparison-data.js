window.ELITE_GUIDE = {
  "version": "1.78",
  "weapons": [
    {
      "id": "shock",
      "name": "Shock Rifle",
      "tag": "Movement rewards",
      "summary": "More reward for impressive combos that catch targets near the blast edge.",
      "rows": [
        {
          "label": "Weapon raise time",
          "b19": "0.30 s",
          "elite": "0.41 s",
          "note": "Raise time is the time to equip this weapon; lower time is the time to put it away. Firing cooldown can delay a switch."
        },
        {
          "label": "Movement damage bonuses",
          "b19": "None",
          "elite": "Nice +10 / Amazing +15 / Spectacular +20 damage",
          "note": "Constant eligible own-core additions to raw damage, capped at 210."
        },
        {
          "label": "Foreign-core feedback",
          "b19": "No Anticombo notice",
          "elite": "Anticombo!",
          "note": "A foreign core is another player’s shock ball. Detonating one gives no movement damage bonus."
        }
      ],
      "notes": [
        "If you know B19, beam damage and beam firing interval are familiar: 45 damage and 0.71 seconds. Shock balls travel 9% slower and fire at 91% of B19’s rate, so allow a little more time for them to reach your target.",
        "Both combo blasts reach 390 UU and deal 210 damage near the center. At the outer edge, B19 falls to 40 damage and Elite10K falls to 50. The extra edge damage does not extend the blast radius.",
        "Detonate your own core while moving across its path to earn a movement bonus:Nice +10, Amazing +15 or Spectacular +20. Damage is capped at 210, so a close-center hit may show a smaller bonus or +0.",
        "Movement score 8 earns Nice, 20 earns Amazing and 32 earns Spectacular. The score uses your angle to the core’s flight path, your sideways speed and your distance from the core; being airborne alone adds no extra multiplier.",
        "Yellow combo text means confirmed enemy health or armor damage without a kill. Red means a credited kill. In warmup, a qualifying combo that misses can show a blue practice preview; during a match, a miss shows no notice. Self/team-only damage does not qualify.",
        "Detonating another player’s core is an Anticombo. It gets no movement damage bonus. The notice is yellow and silent without a kill; a credited kill uses red text, the Denied voice and an Anticombo kill-feed label.",
        "The+DMG label shows the extra movement damage actually applied, rather than the total blast damage. Multiple targets can produce a list such as +20,+8,+0 DMG.",
        "When one beam detonates several cores, the main notice favors Spectacular, then Amazing, then Nice, then Anticombo. Use the calculator for the detailed damage curve."
      ],
      "lab": "shock"
    },
    {
      "id": "flak",
      "name": "Flak Cannon",
      "tag": "Distance tiers",
      "summary": "Familiar firing speed, fixed shard damage bands and a smaller secondary blast with a stronger edge.",
      "rows": [
        {
          "label": "Primary firing interval",
          "b19": "0.80 s",
          "elite": "0.80 s",
          "note": "Matches the authoritative B19 primary interval."
        },
        {
          "label": "Primary shard speed",
          "b19": "≈18.67 dodge lengths/s (13,000 UU/s)",
          "elite": "≈18.67 dodge lengths/s (13,000 UU/s)",
          "note": "Same projectile speed as B19."
        },
        {
          "label": "Primary projectile count",
          "b19": "8 ordinary + 1 central",
          "elite": "8 ordinary + 1 central",
          "note": ""
        },
        {
          "label": "Primary damage model",
          "b19": "Damage decreases with flight time; central-hit bonus",
          "elite": "Travel-distance tiers",
          "note": "B19 also reduces shard damage after a bounce. Elite10K uses the fixed travel-distance bands below."
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
          "note": "Raise time is the time to equip this weapon; lower time is the time to put it away. Firing cooldown can delay a switch."
        },
        {
          "label": "Ball base splash damage",
          "b19": "95",
          "elite": "95",
          "note": ""
        },
        {
          "label": "Ball splash damage / blast radii",
          "b19": "95 max / 20 min · 0–300 UU",
          "elite": "95 max / 35 min · 0–240 UU",
          "note": "The center damage is unchanged. Elite10K has a smaller blast with a higher minimum damage at its edge. These values describe the explosion; ball-spawned shards are separate."
        }
      ],
      "notes": [
        "Primary fires at the same 0.80-second interval and shard speed as B19. Each shot has eight ordinary shards and one central shard; the central shard deals double an ordinary shard’s damage.",
        "Elite10K shard damage depends on total travel distance: 10 ordinary/20 central below 1, 050 UU, 7/14 from 1, 050 to below 1, 575 UU, and 4/8 farther away. That is roughly 1½ and 2¼ dodge lengths. Bounces count toward distance but do not apply B19’s separate 0.65× damage multiplier.",
        "B19’s shards lose damage with flight time and can receive a central-hit bonus. The explorer shows their starting damage potential; it does not model all of B19’s flight-time and hit-position effects.",
        "The secondary ball has a smaller collision radius: 13 UU versus 30 in B19. Its initial and maximum speeds are 92.5% of B19’s, so it travels slightly slower.",
        "Ball splash still peaks at 95 damage. B19 fades to 20 at 300 UU; Elite10K fades to 35 at 240 UU. Elite10K reaches less far, with a stronger edge hit. The ball also releases separate 5-damage shards.",
        "An orange rim helps the ball stand out in flight. Its yellow trail remains visible, with lighter smoke."
      ],
      "lab": "flak"
    },
    {
      "id": "rocket",
      "name": "Rocket Launcher",
      "tag": "Volley pacing",
      "summary": "Slower loaded-volley recovery than B19, smaller splash radius and a stronger minimum edge hit.",
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
          "elite": "0 s added delay",
          "note": "Rockets in a loaded volley have no intentional extra gap in Elite10K; frame timing can still separate their launches."
        },
        {
          "label": "Normal rocket initial / maximum speed",
          "b19": "2,700 / 2,700 UU/s",
          "elite": "2,475 / 2,475 UU/s · 91.7% of B19",
          "note": "Initial speed is launch speed; maximum speed is the configured speed cap. Both values are 8.3% lower in Elite10K. Normal and loaded non-seeking rockets use this profile."
        },
        {
          "label": "Seeking initial / maximum speed",
          "b19": "2,000 / 2,400 UU/s",
          "elite": "1,800 / 2,160 UU/s · 90% of B19",
          "note": "Both launch speed and maximum speed are 10% lower than B19."
        },
        {
          "label": "Grenade initial / maximum speed",
          "b19": "1,900 / 3,000 UU/s",
          "elite": "1,900 / 3,000 UU/s · 100% of B19",
          "note": "Launch speed and maximum speed are unchanged. These are Rocket Launcher grenades."
        },
        {
          "label": "Weapon raise / lower time",
          "b19": "0.47 / 0.08 s",
          "elite": "0.41 / 0.08 s",
          "note": "Raise time is the time to equip this weapon; lower time is the time to put it away. Firing cooldown can delay a switch. Loaded rocket/grenade volleys finish firing before a queued switch; switching back does not skip the remaining cooldown."
        },
        {
          "label": "Splash damage / blast radii",
          "b19": "100 max / 20 min · 15–360 UU",
          "elite": "100 max / 35 min · 15–296.667 UU",
          "note": "Full damage inside the inner radius, then a straight-line decrease to the minimum at the outer edge. Zero beyond the outer radius. Applies to normal, seeking and loaded rockets, plus Rocket Launcher grenades."
        },
        {
          "label": "Cooldown bar",
          "b19": "B19 weapon HUD",
          "elite": "Loading rings; no cooldown bar",
          "note": "The crosshair and loaded-rocket indicators remain visible."
        }
      ],
      "notes": [
        "Primary rockets keep the 1.05-second firing interval. Loaded secondary volleys use 1.05 seconds after the last rocket, compared with B19’s 0.74 seconds; one-, two- and three-rocket volleys use the same interval. Time spent loading is separate.",
        "Normal rockets launch at 2,475 UU/s versus B19’s 2,700: 91.7% of the original speed (8.3% slower). Seeking rockets launch at 1,800 versus 2,000 UU/s and have a 2,160 versus 2,400 UU/s cap: 90% in both cases. Rocket Launcher grenade speeds remain 100% of B19.",
        "Rocket splash peaks at 100 damage in both versions. B19 falls to 20 at 360 UU; Elite10K falls to 35 at about 296.667 UU. The full-damage core is 15 UU in both. Elite10K’s blast is smaller, but its edge hits harder.",
        "Splash damage decreases in a straight line between the inner and outer radii. Beyond the outer radius it is zero. Armor, damage amplification, collision and line of sight can change the health actually lost.",
        "You can queue a weapon switch while firing loaded rockets or grenades. It takes effect once the loaded volley has emptied. Switching away and back keeps the remaining shot cooldown.",
        "If a fire-rate modifier slows you during that cooldown, switching back can keep you locked out for the slower interval. Switching does not give an early next shot.",
        "Loading rings show progress and how many rockets are ready. A bright red center marks a loaded rocket; a brief pulse marks completion. The rocket’s red panels and metal collar help it stand out to other players."
      ],
      "lab": "rocket"
    },
    {
      "id": "stinger",
      "name": "Stinger",
      "tag": "Burst reserve",
      "summary": "Ten opening secondary shots instead of twelve, with recovery that carries across weapon switches.",
      "rows": [
        {
          "label": "Primary damage",
          "b19": "12",
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
          "elite": "10 projectiles",
          "note": ""
        },
        {
          "label": "Opening potential / all hits",
          "b19": "120 damage",
          "elite": "100 damage",
          "note": "Before armor and other modifiers."
        },
        {
          "label": "Opening first-to-last shot span",
          "b19": "≈0.379 s",
          "elite": "≈0.379 s",
          "note": "Time from first to last opening shot: 12 shots in B19 and 10 in Elite10K. Frame timing may shift actual shot times."
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
          "label": "Recovery after a full opening burst",
          "b19": "B19 firing cycle; no separate reserve cooldown",
          "elite": "0.5 s recovery",
          "note": "Shorter bursts need less recovery. Switching does not clear the cooldown."
        },
        {
          "label": "Weapon raise / lower time",
          "b19": "0.48 / 0.08 s",
          "elite": "0.22 / 0.08 s",
          "note": "Raise time is the time to equip this weapon; lower time is the time to put it away. Firing cooldown can delay a switch."
        }
      ],
      "notes": [
        "Primary damage is 11 instead of B19’s 12, at the same firing interval. Secondary projectiles still deal 10 each.",
        "The accelerating secondary opening contains ten shots instead of B19’s twelve: 100 potential damage instead of 120 if every shot hits. Both configured openings span about 0.379 seconds from first to last shot.",
        "Keep holding secondary to continue at the sustained 0.148-second interval. Ten is the opening reserve, rather than an automatic stopping point.",
        "A full opening burst takes 0.5 game seconds to recover. Releasing early needs less recovery; switching weapons does not erase it, and primary fire pauses recovery. This limits repeated rapid openings.",
        "Blue effects make the Stinger easier to recognize. Secondary hits do not push living players."
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
          "note": "Each small glob deals 13 damage before armor or amplification."
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
          "note": "Raise time is the time to equip this weapon; lower time is the time to put it away. Firing cooldown can delay a switch."
        }
      ],
      "notes": [
        "Normal goo deals 35 instead of 40; rapid mini goo deals 13 instead of 20. Firing intervals match B19.",
        "The large charged glob keeps its damage settings and travels at 95% of B19’s speed. Its actual damage also depends on glob strength and charged-goo rules."
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
          "b19": "20",
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
          "note": "Raise time is the time to equip this weapon; lower time is the time to put it away. Firing cooldown can delay a switch."
        }
      ],
      "notes": [
        "Primary plasma deals 17 instead of 20, with the same firing interval and projectile speeds as B19.",
        "Beam damage, tick interval, range and pull settings match B19. Elite10K keeps the primary/beam/pull roles and omits the heat bar.",
        "Plasma is green with a restrained white center for visibility."
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
          "elite": "10 UU · 66.7% of B19 Sniper",
          "note": "Trace half-size is the added hit allowance on each side of the aim line, not the size of the player. Doubling it gives the full shot thickness: 15 UU becomes 30 UU across; 10 UU becomes 20 UU across. Elite10K’s 20-UU trace is 66.7% as wide as B19 Sniper’s 30-UU trace (33.3% narrower)."
        },
        {
          "label": "Full normal-shot thickness",
          "b19": "30 UU",
          "elite": "20 UU · 66.7% of B19 Sniper",
          "note": "Full thickness = 2 × trace half-size. Elite10K normal Lightning and Sniper have the same shot thickness."
        },
        {
          "label": "Effective body-hit width · 80-UU target example",
          "b19": "110 UU",
          "elite": "100 UU · 90.9% of B19 Sniper",
          "note": "Example target width 80 UU + full shot thickness: 80 + 30 = 110 UU versus 80 + 20 = 100 UU. This describes total horizontal body-hit allowance, not the character model’s visible width."
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
          "note": "Raise time is the time to equip this weapon; lower time is the time to put it away. Firing cooldown can delay a switch."
        }
      ],
      "notes": [
        "Body/headshot damage remains 70/140 and the firing interval stays 1.36 seconds.",
        "The normal shot trace half-width is 10 UU instead of B19’s 15 UU, requiring tighter aim. Hits no longer apply the 20, 000 shot momentum from B19. Server weapon settings can override defaults.",
        "Trace half-size is the added hit allowance on each side of the aim line, not the size of the player. Doubling it gives the full shot thickness: 15 UU becomes 30 UU across; 10 UU becomes 20 UU across. Elite10K’s 20-UU trace is 66.7% as wide as B19 Sniper’s 30-UU trace (33.3% narrower).",
        "For a body-hit example, a target capsule with radius 40 UU is 80 UU wide. Add the shot allowance on both sides: B19 Sniper accepts an aim-line offset of up to 40 + 15 = 55 UU (110 UU across); Elite10K Sniper and normal Lightning accept 40 + 10 = 50 UU (100 UU across). That effective body-hit width is 90.9% of B19 Sniper’s (9.1% narrower). This is a width comparison, not a 33.3% reduction in the whole player hitbox or hit probability. Actual capsule size, pose, headshot checks, obstruction and server settings can change the result."
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
          "b19": "Stock map weapon",
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
          "elite": "10 UU · 66.7% of B19 Sniper",
          "note": "Trace half-size is the added hit allowance on each side of the aim line, not the size of the player. Doubling it gives the full shot thickness: 15 UU becomes 30 UU across; 10 UU becomes 20 UU across. Elite10K’s 20-UU trace is 66.7% as wide as B19 Sniper’s 30-UU trace (33.3% narrower). B19 Lightning uses a projectile primary, so this percentage compares with B19 Sniper, not B19 Lightning."
        },
        {
          "label": "Full normal-shot thickness",
          "b19": "Projectile primary; no hitscan width",
          "elite": "20 UU · 66.7% of B19 Sniper",
          "note": "Full thickness = 2 × trace half-size. Elite10K normal Lightning and Sniper have the same shot thickness."
        },
        {
          "label": "Effective body-hit width · 80-UU target example",
          "b19": "Projectile primary; separate collision rules",
          "elite": "100 UU · 90.9% of B19 Sniper",
          "note": "Example target width 80 UU + full shot thickness: 80 + 30 = 110 UU versus 80 + 20 = 100 UU. This describes total horizontal body-hit allowance, not the character model’s visible width."
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
          "note": "Raise time is the time to equip this weapon; lower time is the time to put it away. Firing cooldown can delay a switch."
        }
      ],
      "notes": [
        "B19 leaves this map slot as the stock Lightning weapon. Elite10K replaces it with a rifle whose normal shot is instant hitscan: 70 damage, 1.36-second interval and 10-UU trace half-width.",
        "The charged shot retains 85 body/140 headshot damage, chaining behavior and a 1.66-second refire interval. The B19 column describes the stock map weapon for this slot.",
        "Trace half-size is the added hit allowance on each side of the aim line, not the size of the player. Doubling it gives the full shot thickness: 15 UU becomes 30 UU across; 10 UU becomes 20 UU across. Elite10K’s 20-UU trace is 66.7% as wide as B19 Sniper’s 30-UU trace (33.3% narrower).",
        "For a body-hit example, a target capsule with radius 40 UU is 80 UU wide. Add the shot allowance on both sides: B19 Sniper accepts an aim-line offset of up to 40 + 15 = 55 UU (110 UU across); Elite10K Sniper and normal Lightning accept 40 + 10 = 50 UU (100 UU across). That effective body-hit width is 90.9% of B19 Sniper’s (9.1% narrower). This is a width comparison, not a 33.3% reduction in the whole player hitbox or hit probability. Actual capsule size, pose, headshot checks, obstruction and server settings can change the result.",
        "These trace dimensions describe normal fire only. B19 Lightning’s projectile and the charged shot are separate hit-detection cases; the Sniper percentages do not imply an equivalent B19 Lightning projectile size."
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
          "note": "Raise time is the time to equip this weapon; lower time is the time to put it away. Firing cooldown can delay a switch."
        },
        {
          "label": "Alt shield blocking size",
          "b19": "100% stock shield",
          "elite": "115% width and height",
          "note": "Visible shield mesh matches the 15% larger blocking coverage. Shield depth is unchanged."
        }
      ],
      "notes": [
        "Full damage charge takes 1.60 seconds instead of B19’s 2.00. The impact/jump-ready point still arrives at 0.50 seconds, so the faster damage charge does not make hammer jumps ready earlier.",
        "Secondary refire is 0.66 seconds instead of 0.88, and shield blocking is 15% wider and taller. Shield depth is unchanged.",
        "The charge arc and jump/damage icons show readiness. The halo blends smoothly between gold and red."
      ],
      "lab": "hammer"
    },
    {
      "id": "enforcer",
      "name": "Enforcer",
      "tag": "Core tuning retained",
      "summary": "B19 damage and firing cadence, with a longer equip time.",
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
          "note": "Raise time is the time to equip this weapon; lower time is the time to put it away. Firing cooldown can delay a switch."
        }
      ],
      "notes": [
        "Damage, primary/secondary firing intervals, ammo costs and trace range match B19. Equipping the Enforcer takes 0.41 seconds instead of 0.26.",
        "The shot trace has no added width in either version. The 10K display name does not indicate a separate accuracy bonus."
      ],
      "lab": "enforcer"
    },
    {
      "id": "grenade",
      "name": "Grenade Launcher",
      "tag": "Native splash",
      "summary": "B19 firing cadence, with a smaller blast and 35 minimum edge damage.",
      "rows": [
        {
          "label": "Primary / secondary intervals",
          "b19": "0.94 / 1.00 s",
          "elite": "0.94 / 1.00 s",
          "note": ""
        },
        {
          "label": "Splash damage / blast radii",
          "b19": "90 max / 20 min · 50–300 UU",
          "elite": "90 max / 35 min · 50–248 UU",
          "note": "Both regular and sticky grenades deal full damage through 50 UU, then decrease linearly to the minimum. Elite10K reaches 35 at 248 UU; B19 reaches 20 at 300 UU."
        },
        {
          "label": "Weapon raise / lower time",
          "b19": "0.51 / 0.08 s",
          "elite": "0.41 / 0.08 s",
          "note": "Raise time is the time to equip this weapon; lower time is the time to put it away. Firing cooldown can delay a switch."
        }
      ],
      "notes": [
        "Regular and sticky grenades keep B19’s 0.94/1.00-second primary/secondary firing intervals.",
        "Both versions deal 90 maximum splash damage through 50 UU. B19 falls to 20 at 300 UU; Elite10K falls to 35 at 248 UU. Elite10K trades some reach for a higher minimum edge hit.",
        "Damage decreases linearly between the inner and outer radii and is zero beyond the outer radius. The explorer shows the raw explosion damage before armor or amplification."
      ],
      "lab": "grenade"
    },
    {
      "id": "redeemer",
      "name": "Redeemer",
      "tag": "Stock slot retained",
      "summary": "The Redeemer keeps its stock weapon behavior in both versions.",
      "rows": [
        {
          "label": "Weapon in this slot",
          "b19": "Stock Redeemer",
          "elite": "Stock Redeemer",
          "note": "No Redeemer-specific damage rebalance in either package."
        }
      ],
      "notes": [
        "Play the Redeemer as you would in B19. This slot retains the stock weapon."
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
          "b19": "0.35 s",
          "elite": "0.01 s",
          "note": ""
        },
        {
          "label": "Wall-dodge reset delay",
          "b19": "0.20 s",
          "elite": "0.01 s",
          "note": ""
        },
        {
          "label": "Movement tier thresholds",
          "b19": "Standard UT combo awards (no damage bonus)",
          "elite": "8 / 20 / 32",
          "note": "Elite10K scores 8/20/32 earn Nice/Amazing/Spectacular damage bonuses."
        },
        {
          "label": "Airborne score weighting",
          "b19": "Speed weighting: 5 in air / 3 on ground",
          "elite": "3 on ground and in air",
          "note": "Controls the sideways-speed contribution to combo scoring."
        },
        {
          "label": "Dodge-jump reset delay",
          "b19": "Stock UT movement setting",
          "elite": "0.01 s",
          "note": "Movement-state restrictions and airtime remain."
        },
        {
          "label": "Ground acceleration",
          "b19": "Stock UT movement setting",
          "elite": "5,000 UU/s²",
          "note": "MaxAcceleration; normal ground acceleration."
        },
        {
          "label": "Walking braking / deceleration",
          "b19": "Stock UT movement setting",
          "elite": "20,000 UU/s²",
          "note": "Both BrakingDecelerationWalking and DefaultBrakingDecelerationWalking."
        },
        {
          "label": "Ground friction",
          "b19": "Stock UT movement setting",
          "elite": "14",
          "note": "Affects ground direction changes as well as stopping behavior."
        },
        {
          "label": "Fast initial acceleration",
          "b19": "Stock UT movement setting",
          "elite": "100,000 UU/s²",
          "note": "Low-speed acceleration boost; blends toward regular acceleration as speed rises. It does not apply at full running speed."
        },
        {
          "label": "Air control / dodge-air control",
          "b19": "Stock UT movement setting",
          "elite": "0.7 / 0.7",
          "note": "Normal and dodge air-control overrides."
        }
      ],
      "notes": [
        "Ground- and wall-dodge reset delays are 0.01 seconds instead of B19’s 0.35 and 0.20. You still need to complete the relevant movement and satisfy normal ground/wall requirements.",
        "Combo movement rewards sideways movement relative to the core’s flight. Running straight along its path contributes less than changing the angle. The score uses the same speed weighting on the ground and in the air.",
        "Acceleration is strongest when starting from low speed, then blends toward normal running acceleration. Ground friction affects steering; braking slows you when you release movement input or exceed the speed limit.",
        "Distance is shown in UU (Unreal Units) and approximate dodge lengths. One reference dodge length is about 696 UU. These describe distance, rather than how many dodge inputs to press.",
        "Projectile interactions are adjusted to reduce accidental interception between weapons. Server mutators and saved settings can change the defaults shown here."
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
          "label": "Rocket loading feedback",
          "b19": "B19 crosshair feedback",
          "elite": "Progress rings, loaded centers and completion pulse",
          "note": "A filled center marks a ready rocket; a 0.15-second red pulse marks loading completion."
        },
        {
          "label": "Hammer feedback",
          "b19": "B19 weapon feedback",
          "elite": "Charge arc and jump/damage indicators",
          "note": "Read jump readiness separately from full damage charge."
        },
        {
          "label": "Stinger appearance",
          "b19": "B19 weapon effects",
          "elite": "Blue primary and secondary effects",
          "note": "Cosmetic weapon identification."
        },
        {
          "label": "Full-screen HUD",
          "b19": "B19 / stock HUD",
          "elite": "Separate optional Elite10K HUD v1.13",
          "note": "The weapon package and the full-screen HUD are separate downloads."
        },
        {
          "label": "Firing feedback",
          "b19": "Stock HUD presentation",
          "elite": "Coordinated widget bounce",
          "note": "Ammo, vitals, weapon bar, kill feed, scoreboard and announcements follow the firing impulse."
        },
        {
          "label": "Weapon identification",
          "b19": "B19 weapon colors",
          "elite": "Shared weapon-bar and kill-feed colors",
          "note": "Shock, combo and Anticombo feed icons have a slightly lighter tint."
        },
        {
          "label": "Health / armor bars",
          "b19": "B19 / stock HUD",
          "elite": "Smooth 0.36-second fill/drain and glow",
          "note": "Numbers update with their own brief feedback animation."
        },
        {
          "label": "Ammo feedback",
          "b19": "B19 / stock HUD",
          "elite": "Brief number pulse when held ammo increases",
          "note": "Low-ammo warnings and unlimited-ammo infinity display are retained."
        },
        {
          "label": "Powerup display",
          "b19": "Stock icons and counters",
          "elite": "Sharper amp/boots icons and centered bold counters",
          "note": "Antialiased artwork, consistent padding and equal-width panels."
        },
        {
          "label": "Match status",
          "b19": "Stock game status",
          "elite": "Native status wording beneath the clock",
          "note": "Appears when the game supplies a status such as Waiting for Host or Overtime. Clock/status spacing adjusts when text is present."
        }
      ],
      "notes": [
        "The weapons supply their own load/charge indicators and projectile effects. Install the separate optional HUD for the full-screen header, vitals, ammo layout, kill feed, mini scoreboard and powerup panels.",
        "Loaded rocket rings and Hammer icons explain weapon readiness; they do not change firing or charge times.",
        "Other players’ weapon switches use destination-weapon colors with a brief glow. This helps identify what they are switching to.",
        "The optional HUD uses antialiased graphics and Ubuntu Mono clocks. DM and team modes have their own headers; the team layout includes your team and personal score.",
        "Status text keeps the game’s normal capitalization. It appears below the clock only while a status is supplied; the clock returns to its normal placement when the line is empty."
      ],
      "lab": null
    },
    {
      "id": "foundation",
      "name": "Version & setup",
      "tag": "Know what is running",
      "summary": "Choose the right package and read the comparisons with your B19 experience in mind.",
      "rows": [
        {
          "label": "Weapons compared",
          "b19": "Original Elite Weapons B19",
          "elite": "Elite10K v1.78",
          "note": "The two columns describe each version’s default behavior."
        },
        {
          "label": "Optional full-screen HUD",
          "b19": "B19 / stock HUD",
          "elite": "Elite10K HUD v1.13",
          "note": "Separate from weapon-specific indicators."
        },
        {
          "label": "Damage examples",
          "b19": "Before armor/amplification",
          "elite": "Before armor/amplification",
          "note": "Actual health loss depends on armor, damage boosts and server rules."
        },
        {
          "label": "Timing examples",
          "b19": "Game seconds",
          "elite": "Game seconds",
          "note": "Game speed and fire-rate modifiers affect real elapsed time."
        }
      ],
      "notes": [
        "Joining a server uses that server’s gameplay version. A newer local download does not change an older server’s balance.",
        "Keep one current Elite10K weapon package installed and avoid duplicate older copies. The weapon filename is Elite10K-WindowsNoEditor.pak; the optional full-screen HUD is a separate package.",
        "Tables show default settings. Server configuration and other mutators can override them. Times are game seconds, and damage examples exclude armor and amplification.",
        "Read max/min splash damage as center/edge damage. The inner radius is the full-damage zone; the outer radius is the blast’s limit. Minimum damage applies at the edge of an eligible hit, not outside the blast.",
        "The comparison uses the original Elite B19 package identified in Sources. Detailed formulas and package hashes are available there and in the combo calculator."
      ],
      "lab": null
    }
  ],
  "baselineSha256": "A17869BA76025E0F4FC3B9D52F37A271AF363E4760561AAB094DB82D4DD861CF",
  "packageSha256": "5FC0F19E125E09E7A8D915768F0FA3B7FBAF5867F21565A592D31A4304E15DF4",
  "verifiedDate": "2026-11-08",
  "assumptions": "Default settings; times are game seconds. Damage examples exclude armor and amplification. Stock UT means the base Unreal Tournament behavior used by B19 for that setting. Actual hits also depend on collision and line of sight.",
  "hudVersion": "1.13",
  "hudPackageSha256": "56453F0BA87A77F0A04CFA95452373CB96642D543ACBD83C2594FA29575CA8A7",
  "shockVariantData": "shock-variants.js"
}
;
