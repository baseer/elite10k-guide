"use strict";
(function(root,factory){const api=factory();if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ShockVariants=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 const data={
  "order": [
    "elite10k",
    "b19",
    "utplus",
    "stock",
    "ncp"
  ],
  "models": {
    "elite10k": {
      "name": "Elite10K v1.78",
      "beamDamage": 45,
      "coreDamage": 40.0,
      "beamInterval": 0.71,
      "coreInterval": 0.4945054945054945,
      "coreSpeed": 2548.0,
      "hitbox": {
        "componentRadius": 19.0,
        "localScale": [
          2.05,
          2.05,
          2.05
        ],
        "parentScale": [
          1.25,
          1.25,
          1.25
        ]
      },
      "max": 210.0,
      "min": 50.0,
      "inner": 77.0,
      "outer": 390.0,
      "falloff": 1.5,
      "movementBonuses": true,
      "source": {
        "asset": "UnrealTournament/Content/ERWeapon/ShockRifle/ShockBallLORD.uasset",
        "weaponAsset": "UnrealTournament/Content/ERWeapon/ShockRifle/ShockRifle-Elite.uasset",
        "sha256": "5FC0F19E125E09E7A8D915768F0FA3B7FBAF5867F21565A592D31A4304E15DF4"
      }
    },
    "b19": {
      "name": "Original Elite B19",
      "beamDamage": 45,
      "coreDamage": 40.0,
      "beamInterval": 0.71,
      "coreInterval": 0.45,
      "coreSpeed": 2800.0,
      "hitbox": {
        "componentRadius": 19.0,
        "localScale": [
          2.05,
          2.05,
          2.05
        ],
        "parentScale": [
          1.25,
          1.25,
          1.25
        ]
      },
      "max": 210.0,
      "min": 40.0,
      "inner": 77.0,
      "outer": 390.0,
      "falloff": 1.5,
      "movementBonuses": false,
      "source": {
        "asset": "UnrealTournament/Content/ArmasUNG/ShockRifle/ShockBallLORD.uasset",
        "weaponAsset": "UnrealTournament/Content/ArmasUNG/ShockRifle/ShockRifle-Elite.uasset",
        "sha256": "A17869BA76025E0F4FC3B9D52F37A271AF363E4760561AAB094DB82D4DD861CF"
      }
    },
    "utplus": {
      "name": "UT+ (standard)",
      "beamDamage": 45,
      "coreDamage": 45.0,
      "beamInterval": 0.7,
      "coreInterval": 0.59,
      "coreSpeed": 2300.0,
      "hitbox": {
        "componentRadius": 33.0,
        "localScale": [
          1,
          1,
          1
        ],
        "parentScale": [
          1,
          1,
          1
        ]
      },
      "max": 200.0,
      "min": 35.0,
      "inner": 20.0,
      "outer": 450.0,
      "falloff": 1,
      "movementBonuses": false,
      "source": {
        "asset": "UnrealTournament/Content/Blueprints/UT+/UT+/UTPlusNew/Shock/UT+Shock_Ball.uasset",
        "weaponAsset": "UnrealTournament/Content/Blueprints/UT+/UT+/UTPlusNew/Shock/UT+ShockRifle.uasset",
        "sha256": "208D9D6EFA99D6EF92C7905A6BA2F2482391C909206CD1669494EA6EB500310E"
      }
    },
    "stock": {
      "name": "Stock UT",
      "beamDamage": 45,
      "coreDamage": 45.0,
      "beamInterval": 0.7,
      "coreInterval": 0.622,
      "coreSpeed": 2300.0,
      "hitbox": {
        "componentRadius": 33.0,
        "localScale": [
          1,
          1,
          1
        ],
        "parentScale": [
          1,
          1,
          1
        ]
      },
      "max": 199.0,
      "min": 45.0,
      "inner": 0,
      "outer": 500,
      "falloff": 1,
      "movementBonuses": false,
      "source": {
        "asset": "G:\\Games\\UnrealTournamentEditor\\UnrealTournament\\Content\\RestrictedAssets\\Weapons\\ShockRifle\\ShockBall.uasset",
        "weaponAsset": "G:\\Games\\UnrealTournamentEditor\\UnrealTournament\\Content\\RestrictedAssets\\Weapons\\ShockRifle\\ShockRifle.uasset",
        "sha256": "245FC81DD2B80B0B810EB2DA98CCB2B6B8C782548EF012F9049A0110466320D6"
      }
    },
    "ncp": {
      "name": "NCP (UTNPShockRifle)",
      "beamDamage": 45,
      "coreDamage": 45.0,
      "beamInterval": 0.7,
      "coreInterval": 0.622,
      "coreSpeed": 2415.0,
      "hitbox": {
        "componentRadius": 33.0,
        "localScale": [
          1,
          1,
          1
        ],
        "parentScale": [
          1,
          1,
          1
        ]
      },
      "max": 200.0,
      "min": 35.0,
      "inner": 25.0,
      "outer": 455.0,
      "falloff": 1,
      "movementBonuses": false,
      "source": {
        "asset": "UnrealTournament/Content/Blueprints/UT+/UT+/UTPlusNew/Shock/UT+Shock_BallSeasonNC.uasset",
        "weaponAsset": "UnrealTournament/Content/Blueprints/Netcode/UTNPShockRifle.uasset",
        "sha256": "208D9D6EFA99D6EF92C7905A6BA2F2482391C909206CD1669494EA6EB500310E"
      }
    }
  },
  "verifiedDate": "2026-11-08",
  "hitboxDefinition": "Scaled Blueprint shootable sphere; normal actor scale. Separate from combo explosion radius.",
  "areaDefinition": "Spherical surface area4πr², not the flat aim silhouetteπr². Areas are rounded for display."
};
 const radius=model=>model.hitbox.componentRadius*Math.min(...model.hitbox.localScale.map((v,i)=>v*model.hitbox.parentScale[i]));
 const surfaceArea=model=>4*Math.PI*radius(model)**2;
 const crossSection=model=>Math.PI*radius(model)**2;
 return {models:data.models,order:data.order,verifiedDate:data.verifiedDate,radius,surfaceArea,crossSection};
});
