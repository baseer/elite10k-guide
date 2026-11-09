'use strict';
(function(root){
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 const api={
  flak(distance,model,ordinary=8,central=true){const f=model.flak,n=f.linear?10-6*clamp((distance-f.start)/(f.end-f.start),0,1):distance<f.start?10:distance<f.end?7:4;return {ordinary:n,central:n*2,total:ordinary*n+(central?n*2:0)};},
  splash(distance,profile,legacy=false){const [max,min,inner,outer]=profile;if(distance>outer)return 0;const raw=max+(min-max)*clamp((distance-inner)/(outer-inner),0,1);return legacy&&raw<40?0:raw;},
  activate(data){const m=data.model,c=m.combo;Object.assign(root.ShockVariants.models.elite10k,{name:'Elite10K v'+data.version,min:c.min,max:c.max,inner:c.inner,outer:c.outer,falloff:c.falloff,baseBoost:c.baseBoost,coreInterval:m.shockInterval,source:{sha256:data.packageSha256}});},
  comboCopy(html){const d=root.ELITE_GUIDE,m=d.model.combo,box=document.createElement('div');box.innerHTML=html;
   const formula=`Raw damage: ${m.min} + ${m.max-m.min} × (1 − clamp((r − ${m.inner}) / ${m.outer-m.inner}, 0, 1))^${m.falloff}. Full damage inside ${m.inner} UU; zero outside ${m.outer} UU.`;
   for(const el of box.querySelectorAll('p,li,.formula,.source')){
    if(el.children.length&&el.matches('p,li')&&el.querySelector('ul,section'))continue;
    const t=el.textContent;
    if(el.id==='distance-hint')el.textContent=`All profiles use the same radial-hit distance. Elite10K v${d.version} ends at ${m.outer} UU; B19 at 390 UU. The slider extends to 550 UU to show all blast edges.`;
    else if(el.matches('.formula')&&t.includes('t = clamp'))el.textContent=formula;
    else if(el.matches('.formula')&&t.includes('base = raw'))el.textContent=(m.baseBoost?'Base = raw + 10 × clamp((210 − raw) / 170, 0, 1).':'Base = raw; no separate boost.')+' Own-core movement: Nice +10, Amazing +15, Spectacular +20. Final = min(210, trunc(base + movement + 0.0001)).';
    else if(t.includes('For Elite10K and B19, raw damage'))el.textContent=formula+' B19 retains 40–210, 77/390 UU and falloff 1.5.';
    else if(t.includes('Elite10K’s combo damage falls'))el.textContent=`Elite10K v${d.version} raw damage falls from ${m.max} to ${m.min} with exponent ${m.falloff}. `+(m.baseBoost?'A tapered boost adds up to 10 before movement.':'There is no separate base boost.')+' Movement bonuses are fixed at +10/+15/+20, with a 210 cap.';
    else if(t.includes('Stock has its own 500 UU'))el.textContent='Stock uses its own 500-UU outer radius and 45 minimum. Damage is zero beyond its outer radius. The selected Elite10K profile uses the independently listed parameters.';
    else if(t.includes('No hit outside the radius:'))el.textContent=`No hit outside the radius: even Spectacular gives zero beyond ${m.outer} UU in this release.`;
    else if(t.includes('Each version uses its own radial falloff. Elite10K applies only'))el.textContent='Each profile uses its own radial falloff. Elite10K applies the selected release’s base boost, if any, followed by the eligible movement bonus and 210 cap.';
    else if(t.includes('Foreign cores get Anticombo!'))el.textContent=`Foreign cores show ${d.model.foreignLabel} and receive no movement bonus.`;
    else if(t.includes('A long-distance core can explode'))el.textContent=`Explosion-to-target distance determines radial damage. Shooter-to-core distance contributes to movement score. Bonuses do not extend this release’s ${m.outer}-UU blast radius.`;
    else if(t.includes('Actual movement bonus labels can shrink'))el.textContent=d.model.confirmedNotices?'Bonus labels can shrink to +0 at the cap. Own-core notices require confirmed enemy health/armor loss or credited kills; live no-damage notices are suppressed. Foreign-core bonuses remain disabled.':'Bonus labels can shrink to +0 at the cap. This release uses earlier hit/credit feedback signals; it predates the v1.76 confirmed enemy health/armor measurement.';
    else if(el.matches('.source')&&t.includes('Verified package defaults.')){el.textContent=`Verified Elite10K v${d.version} package ${d.packageSha256}. Original B19 reference ${d.baselineSha256}. UT+ uses its standard variant; NCP uses its competitive seasonal profile. Server overrides, armor and cover are excluded.`;}
   }
   for(const el of box.querySelectorAll('th'))if(el.textContent==='v1.78')el.textContent='v'+d.version;
   const walker=document.createTreeWalker(box,NodeFilter.SHOW_TEXT);let text;while(text=walker.nextNode())text.textContent=text.textContent.replace(/v1\.78\b/g,'v'+d.version);
   return box.innerHTML;
  }
 };
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ReleaseHistory=api;
})(typeof globalThis!=='undefined'?globalThis:this);
