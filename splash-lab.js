'use strict';
window.SplashLab=(()=>{
 const fmt=n=>Number(n.toFixed(2)).toLocaleString('en-US');
 const old={rocket:[100,20,15,360],flak:[95,20,0,300]};
 const stock={rocket:[100,20,15,360],flak:[90,20,40,330]},utplus={rocket:[100,20,15,345],flak:[115,18,20,300]};
 const colors=['#79d3cf','#f4bc79','#aeb7ca','#c2a0ff'],dashes=['2 4','12 5','7 5',''];
 function render(){return `<p class="eyebrow">Field guide / Interactive tool</p><h1>Splash damage simulator</h1><p class="lede">One explosion. Four profiles. Move the target through the blast and see how damage changes.</p><section class="panel splash-lab"><div class="sl-toolbar"><div class="sl-toolbar-title"><span class="sl-kicker">LIVE COMPARISON</span><h2>Explore the blast</h2></div><button class="button secondary" id="sl-reset" type="button">Reset</button></div><div class="controls-grid"><div class="control"><label for="sl-projectile">Projectile</label><select id="sl-projectile"><option value="rocket">Rocket</option><option value="flak">Flak ball · secondary fire</option></select></div><div class="control"><div class="control-head"><label for="sl-distance">Radial hit distance</label><div class="input-wrap"><input id="sl-distance" type="number" min="0" max="450" step="any" value="150"><span>UU</span></div></div><input id="sl-range" dir="rtl" type="range" min="0" max="450" step="any" value="150" aria-label="Radial hit distance"><div class="sl-range-labels" aria-hidden="true"><span>450 UU</span><span>0 UU</span></div></div></div><div class="sl-presets inline-actions"><button type="button" data-place="center">Blast center</button><button type="button" data-place="inner">10K inner radius</button><button type="button" data-place="edge">10K blast edge</button><button type="button" data-place="outside">Outside all profiles</button></div><fieldset id="sl-legend" class="sl-legend"><legend>Compare weapon sets</legend></fieldset><div class="sl-workbench"><div class="sl-graphs"><div class="sl-visuals"><div><h2>Damage by distance</h2><svg id="sl-chart" viewBox="0 0 520 300" role="img" aria-label="Splash damage plotted against radial distance"></svg><p class="small-note">Click or drag the graph to move the target. Use the distance input or slider for keyboard control.</p></div><div><h2>2D blast surface area by cutoff damage</h2><svg id="sl-area-chart" viewBox="0 0 520 300" role="img" aria-label="2D blast surface area in square Unreal Units plotted against cutoff damage for selected weapon sets"></svg><p class="small-note">Area of the circular slice through the blast center where configured damage meets or exceeds the cutoff (πr²). Cutoff 0 shows the effective blast boundary; cutoffs above maximum damage have no qualifying area. Colors and line patterns match the legend.</p></div></div></div><div class="sl-summary"><div class="sl-blast-panel sl-visuals"><div><h2>Blast radius</h2><svg id="sl-blast" viewBox="0 0 420 300" role="img" aria-label="Top-down blast radius comparison"></svg><p class="small-note">Top-down radial-distance illustration. Colors and line patterns match the legend. The target marker represents a radial hit point.</p></div></div><div id="sl-results" class="sl-results" role="status" aria-live="polite"></div></div></div><details class="sl-size-details"><summary>Blast sizes &amp; surface areas</summary><div id="sl-sizes" class="table-wrap"></div></details><details><summary>Model &amp; limits</summary><p id="sl-formula"></p><p>Distances are Unreal Units (UU), from the explosion to the qualifying radial hit point, rather than necessarily the player’s center. The graph shows configured damage; final damage is truncated to a whole number per hit. Cover, hit eligibility, collision geometry, armor, self-damage scaling, amplification and other modifiers are excluded. Spherical surface area = 4πr²; circular ground footprint = πr², using each profile’s outer blast radius. These are ideal geometric areas, not the exposed area of a target or actual coverage through terrain. Ground footprint assumes a horizontal slice through the blast center; an elevated explosion has a smaller intersection with the ground. A direct impact is not modeled separately. Flak ball secondary splash is separate from primary shards.</p><p>Values follow the release selected at the top of the guide. Original B19 uses the authoritative reference package. Stock UT and UT+ standard use verified projectile asset overrides plus their native class defaults. These reference profiles stay fixed when changing Elite10K releases. <a href="./splash-profiles-evidence.json">Profile values and verification evidence</a>.</p></details></section>`;}
 function mount(host,data){
  const $=s=>host.querySelector(s),p=new URLSearchParams(location.search),limit=450;
  const numeric=(k,f,min,max)=>{const s=p.get(k),v=Number(s);return s!==null&&s.trim()&&Number.isFinite(v)?Math.max(min,Math.min(max,v)):f;};
  let kind=p.get('projectile')==='flak'?'flak':'rocket',distance=numeric('splash-distance',150,0,limit);
  const ids=['stock','utplus','b19','elite'],requested=p.get('splash-profiles'),selected=new Set(requested===null?ids:requested.split('.').filter(id=>ids.includes(id)));
  $('#sl-legend').insertAdjacentHTML('beforeend',['Stock UT','UT+ (standard)','Original B19','Elite10K v'+data.version].map((name,i)=>`<label style="--sl-color:${colors[i]}"><input type="checkbox" data-splash-profile="${ids[i]}" ${selected.has(ids[i])?'checked':''}><svg viewBox="0 0 38 12" aria-hidden="true"><line x1="0" y1="6" x2="38" y2="6" stroke="${colors[i]}" stroke-width="3" stroke-dasharray="${dashes[i]}"/></svg><span>${name}</span></label>`).join(''));
  $('#sl-legend').addEventListener('change',e=>{const id=e.target.dataset.splashProfile;if(!id)return;e.target.checked?selected.add(id):selected.delete(id);update();});
  const damage=window.ReleaseHistory.splash;
  const line=(x1,y1,x2,y2,attr='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${attr}/>`;
  const text=(x,y,t,attr='')=>`<text x="${x}" y="${y}" ${attr}>${t}</text>`;
  function update(save=true){
   const profiles=[stock[kind],utplus[kind],old[kind],data.model.splash[kind]],names=['Stock UT','UT+ (standard)','Original B19','Elite10K v'+data.version],legacy=!!data.model.splash.legacy;
   host.querySelectorAll('[data-splash-profile]').forEach(el=>el.checked=selected.has(el.dataset.splashProfile));
   $('#sl-projectile').value=kind;$('#sl-distance').value=String(distance);$('#sl-range').value=distance;
   $('#sl-range').style.setProperty('--fill',100*distance/limit+'%');
   const x=d=>498-d/limit*450,y=d=>252-d/125*218;
   let graph='';
   for(const n of [0,25,50,75,100,125])graph+=line(48,y(n),498,y(n),'class="sl-grid"')+text(38,y(n)+4,n,'text-anchor="end"');
   for(const n of [0,100,200,300,400,450])graph+=text(x(n),274,n,'text-anchor="middle"');
   graph+=text(48,18,'Damage')+text(498,295,'Radial distance · UU','text-anchor="end"');
   profiles.forEach((a,i)=>{if(!selected.has(ids[i]))return;
    // Include exact radius/cutoff endpoints so discontinuities stay vertical.
    let end=a[3];if(i===3&&legacy&&a[1]<40)end=a[2]+(a[0]-40)/(a[0]-a[1])*(a[3]-a[2]);
    const points=[[0,a[0]],[a[2],a[0]],[end,i===3&&legacy&&a[1]<40?40:damage(end,a,i===3&&legacy)],[end,0],[limit,0]];
    graph+=`<polyline points="${points.map(([d,v])=>x(d)+','+y(v)).join(' ')}" fill="none" stroke="${colors[i]}" stroke-width="3" stroke-dasharray="${dashes[i]}"/>`;
    graph+=`<circle cx="${x(distance)}" cy="${y(damage(distance,a,i===3&&legacy))}" r="5" fill="${colors[i]}"/>`;
   });
   graph+=line(x(distance),30,x(distance),252,'stroke="#f1d28b" stroke-dasharray="3 4"');$('#sl-chart').innerHTML=graph;
   // Invert the same radial model, then plot circular area (πr²).
   const areaMax=450000,area=r=>Math.PI*r*r;
   const rx=d=>76+d/125*422,ry=v=>250-v/areaMax*216;
   let areaGraph='';
   for(const n of [0,100000,200000,300000,400000,450000])areaGraph+=line(76,ry(n),498,ry(n),'class="sl-grid"')+text(66,ry(n)+4,fmt(n),'text-anchor="end"');
   for(const n of [0,25,50,75,100,125])areaGraph+=text(rx(n),272,n,'text-anchor="middle"');
   areaGraph+=text(76,18,'2D blast surface area · UU²')+text(498,295,'Cutoff damage','text-anchor="end"');
   profiles.forEach((a,i)=>{
    if(!selected.has(ids[i]))return;
    const floor=i===3&&legacy?Math.max(40,a[1]):a[1];
    const edge=a[2]+(a[0]-floor)/(a[0]-a[1])*(a[3]-a[2]);
    const points=[[0,edge],[floor,edge]];
    // Area is quadratic in cutoff: sample the curve rather than joining endpoints.
    for(let step=1;step<=160;step++){
     const cutoff=floor+(a[0]-floor)*step/160;
     points.push([cutoff,a[2]+(a[0]-cutoff)/(a[0]-a[1])*(a[3]-a[2])]);
    }
    areaGraph+=`<polyline data-area-profile="${ids[i]}" points="${points.map(([d,r])=>rx(d)+','+ry(area(r))).join(' ')}" fill="none" stroke="${colors[i]}" stroke-width="3" stroke-dasharray="${dashes[i]}"/>`;
    // Above maximum damage no radius qualifies; leave the discontinuity unjoined.
    areaGraph+=line(rx(a[0]),ry(0),rx(125),ry(0),`stroke="${colors[i]}" stroke-width="2" stroke-dasharray="${dashes[i]}"`);
    areaGraph+=`<circle cx="${rx(a[0])}" cy="${ry(area(a[2]))}" r="3" fill="${colors[i]}"/>`;
   });
   $('#sl-area-chart').innerHTML=areaGraph;
   const scale=.29,cx=270,cy=146;
   let blast='';
   profiles.forEach((a,i)=>{blast+=`<circle cx="${cx}" cy="${cy}" r="${a[3]*scale}" fill="${colors[i]}" fill-opacity=".055" stroke="${colors[i]}" stroke-width="2" stroke-dasharray="${dashes[i]}"/>`;if(a[2])blast+=`<circle cx="${cx}" cy="${cy}" r="${a[2]*scale}" fill="${colors[i]}" fill-opacity=".25"/>`;});
   blast+=line(cx,cy,cx-distance*scale,cy,'stroke="#f1d28b" stroke-width="2"')+`<circle cx="${cx}" cy="${cy}" r="4" fill="white"/><circle cx="${cx-distance*scale}" cy="${cy}" r="7" fill="#f1d28b" stroke="#111116" stroke-width="2"/>`+text(cx,cy-15,'Impact','text-anchor="middle"')+text(cx-distance*scale,cy+25,fmt(distance)+' UU','text-anchor="middle"');
   blast+=text(12,284,'Outer rings = configured blast radii');$('#sl-blast').innerHTML=blast;
   const values=profiles.map((a,i)=>{const raw=damage(distance,a,i===3&&legacy);return {whole:Math.trunc(raw)};}),elite=values[3];
   $('#sl-results').innerHTML=`<div class="sl-result-title"><h2>${selected.has('elite')?'Elite10K v'+data.version:'Damage comparison'}</h2><span>ONE EXPLOSION</span></div><div class="sl-elite-summary" ${selected.has('elite')?'':'hidden'}><p class="sl-damage-display"><output>${elite.whole}</output><span>FINAL DAMAGE</span></p><p class="sl-gain" ${selected.has('b19')?'':'hidden'}>${elite.whole-values[2].whole>=0?'+':''}${elite.whole-values[2].whole} damage versus original B19</p></div>${selected.size?'':'<p class="small-note">Select a weapon set above to compare damage.</p>'}<div class="sl-result-bars">${[3,2,1,0].filter(i=>selected.has(ids[i])).map(i=>`<div class="sl-bar-row" data-profile="${['stock','utplus','b19','elite'][i]}" style="--sl-color:${colors[i]}"><div class="sl-bar-header"><span>${names[i]}</span><strong>${values[i].whole}</strong></div><div class="sl-track"><div class="sl-fill" style="width:${values[i].whole/125*100}%"></div></div></div>`).join('')}</div><p class="small-note">Whole-number damage, before armor. Each profile uses its own radial falloff; bars share a 125-damage scale.</p>`;
   $('#sl-sizes').innerHTML=`<table><caption class="sr-only">Blast radii and geometric area comparison</caption><thead><tr><th scope="col">Profile</th><th scope="col">Max / min damage</th><th scope="col">Inner / outer radius · UU</th><th scope="col">Spherical surface · UU²</th><th scope="col">Ground footprint · UU²</th><th scope="col">Area vs B19</th></tr></thead><tbody>${[3,2,1,0].filter(i=>selected.has(ids[i])).map(i=>{const a=profiles[i],pct=(a[3]**2/old[kind][3]**2-1)*100;return `<tr data-size-profile="${['stock','utplus','b19','elite'][i]}"><th scope="row" style="color:${colors[i]}">${names[i]}</th><td>${a[0]} / ${a[1]}</td><td>${fmt(a[2])} / ${fmt(a[3])}</td><td>${fmt(4*Math.PI*a[3]**2)}</td><td>${fmt(Math.PI*a[3]**2)}</td><td>${pct===0?'Same':fmt(Math.abs(pct))+'% '+(pct>0?'more':'less')}</td></tr>`;}).join('')}</tbody></table><p class="small-note">Spherical surface = 4πr²; ground footprint = πr², using the outer blast radius.</p>`;
   $('#sl-formula').textContent='Damage = max + (min − max) × clamp((distance − inner) / (outer − inner), 0, 1). Zero beyond the outer radius. At the radius itself the configured minimum still applies. '+(legacy?'This historical Elite10K release rejects raw damage below 40 instead of raising it to 40.':'This Elite10K release uses native linear splash.');
   if(save)window.GuideURL.write({projectile:kind,'splash-distance':distance,'splash-health':null,'splash-profiles':selected.size===4?null:ids.filter(id=>selected.has(id)).join('.')});
  }
  const setDistance=v=>{distance=Math.round(Math.max(0,Math.min(limit,v))*10)/10;update();};
  $('#sl-projectile').addEventListener('change',e=>{kind=e.target.value;update();});
  for(const id of ['#sl-distance','#sl-range']){
   $(id).addEventListener('input',e=>{if(e.target.value!==''&&e.target.validity.valid)setDistance(Number(e.target.value));});
   $(id).addEventListener('change',()=>update());
  }
  host.querySelectorAll('[data-place]').forEach(b=>b.addEventListener('click',()=>{const a=data.model.splash[kind];distance=({center:0,inner:a[2],edge:a[3],outside:Math.max(a[3],old[kind][3],stock[kind][3],utplus[kind][3])+10})[b.dataset.place];update();}));
  $('#sl-reset').addEventListener('click',()=>{kind='rocket';distance=150;ids.forEach(id=>selected.add(id));update();});
  const chart=$('#sl-chart'),move=e=>{const pt=chart.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;const local=pt.matrixTransform(chart.getScreenCTM().inverse());setDistance((498-local.x)/450*limit);};
  chart.addEventListener('pointerdown',e=>{chart.setPointerCapture(e.pointerId);move(e);});chart.addEventListener('pointermove',e=>{if(chart.hasPointerCapture(e.pointerId))move(e);});chart.addEventListener('pointerup',e=>{if(chart.hasPointerCapture(e.pointerId))chart.releasePointerCapture(e.pointerId);});
  update(false);return ()=>{};
 }
 return {render,mount};
})();
