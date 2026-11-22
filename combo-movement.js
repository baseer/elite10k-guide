'use strict';
// Illustrations use the existing scoring inputs; all scoring remains in GuideMath.
window.ComboMovement = (() => {
 const arrow = '<marker id="cm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="context-stroke"/></marker>';
 const svg = (id, title, body) => `<svg id="${id}" viewBox="0 0 280 190" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${title}</title><desc id="${id}-desc"></desc>${body}</svg>`;
 const player = (x,y,id='') => `<g ${id?`id="${id}"`:''} transform="translate(${x} ${y})" class="cm-player"><circle r="10"/><path d="M-4 3 0-5 4 3"/></g>`;
 const core = (x,y,id='') => `<g ${id?`id="${id}"`:''} transform="translate(${x} ${y})" class="cm-core"><circle r="12"/><circle r="5"/></g>`;
 const card = (kind,title,help,graphic,controls,detail) => `<article class="cm-card cm-${kind}"><h3>${title}</h3><figure>${graphic}</figure><p class="cm-help" id="cm-${kind}-help">${help}</p>${controls}<p class="cm-contribution" id="cm-${kind}-detail">${detail}</p></article>`;
 function render(control) {
  const angle = svg('cm-angle','Angle between upward core flight and your firing line',`${arrow}<path id="cm-angle-core-path" d="M100 174V20" class="cm-muted-line" marker-end="url(#cm-arrow)"/><text x="115" y="24">Core flight</text><path id="cm-sight" class="cm-angle-line" marker-end="url(#cm-arrow)"/><path id="cm-angle-arc" class="cm-angle-line"/><text id="cm-angle-label" text-anchor="middle" class="cm-value"></text>${core(100,60)}<text x="58" y="64">Core</text>${player(0,0,'cm-angle-player')}<text id="cm-player-label">You</text>`);
  const speed = svg('cm-speed','Core flies straight ahead while the player position follows the selected angle','<path id="cm-speed-core-path" d="M140 133V22" class="cm-muted-line" marker-end="url(#cm-arrow)"/>'+core(140,76)+'<text x="157" y="28">Core flies</text><text x="157" y="48">straight ahead</text><path id="cm-speed-sight" class="cm-muted-line cm-dashed"/><path id="cm-speed-vector" class="cm-speed-line" marker-start="url(#cm-arrow)" marker-end="url(#cm-arrow)"/>'+player(140,150,'cm-speed-player')+'<text id="cm-speed-player-label">You</text><text x="140" y="184" text-anchor="middle" class="cm-speed-text">Sideways speed</text>');
  const distance = svg('cm-distance','Current player-to-core separation at the selected angle','<text x="12" y="15">Player-to-core distance</text><path id="cm-distance-axis" class="cm-muted-line cm-dashed"/><path id="cm-distance-line" class="cm-distance-line"/><path id="cm-distance-ticks" class="cm-muted-line"/><text id="cm-distance-tick-1">1</text><text id="cm-distance-tick-2">2</text><text id="cm-distance-tick-3">3</text><text x="184" y="184">Dodge lengths</text>'+player(140,165,'cm-distance-player')+'<text id="cm-distance-player-label">You</text>'+core(100,30,'cm-distance-core')+'<text id="cm-distance-label" x="72" y="35" text-anchor="end" class="cm-distance-text">Core</text>');
  const speedButtons = '<div class="speed-references" aria-label="Sideways speed references"><button type="button" data-speed="0">0 across</button><button type="button" data-speed="940">Run · 940</button><button type="button" data-speed="1500">Dodge · 1,500</button></div>';
  const inputs = (id,label,value,min,max,step,unit,help) => control(id,label,value,min,max,step,unit).replace('class="control"',`class="control" aria-describedby="cm-${help}-help"`);
  return `<div class="cm-controls">${card('angle','Angle to core flight','Move off the core’s path to create an angle between its flight and your firing line.',angle,inputs('angle','Angle',30,0,90,1,'°','angle'),'')}${card('speed','Sideways speed','The core flies straight ahead (bottom to top). You move sideways (left or right).',speed,inputs('side-speed','Speed across core path',1000,0,1500,1,'UU/s','speed').replace(/<div class="endpoints">[\s\S]*?<\/div>/,speedButtons),'')}${card('distance','Separation from core','Your current distance to the core, not the number of times you have dodged.',distance,inputs('separation','Separation',1.5,.5,3,.1,'dodge lengths','distance'),'')}</div><p class="cm-geometry-note">Illustrations show a top-down example. The game measures angle, speed and separation in 3D when your core explodes. Player-to-core separation is separate from the target’s distance to the blast.</p><details class="cm-speed-note"><summary>About the speed references</summary><p>Run (940 UU/s) and initial ground dodge (1,500 UU/s) assume movement directly across the core’s flight. Actual speed varies during a dodge. Moving along its path adds no sideways-speed points. These are <a href="https://github.com/JimmieKJ/unrealTournament/blob/clean-master/UnrealTournament/Source/UnrealTournament/Private/UTCharacterMovement.cpp#L20" target="_blank" rel="noopener">default speed references</a>.</p></details><div class="cm-equation" aria-label="Movement score breakdown"><span><b id="cm-angle-points"></b> angle pts</span><span aria-hidden="true">+</span><span><b id="cm-speed-points"></b> speed pts</span><span aria-hidden="true">then ×</span><span><b id="cm-factor"></b> distance</span></div>`;
 }
 function update(angle,speed,separation) {
  const $ = id => document.getElementById(id), n = value => Number(value.toFixed(2)).toLocaleString('en-US');
  const a=angle*Math.PI/180, x=100+98*Math.sin(a),y=60+98*Math.cos(a),anglePoints=100*(1-Math.cos(a)),speedPoints=3*speed/1000,factor=Math.max(1,Math.min(2,separation));
  $('cm-sight').setAttribute('d',`M${x} ${y}L100 60`);
  $('cm-angle-player').setAttribute('transform',`translate(${x} ${y}) rotate(${-angle})`);
  $('cm-player-label').setAttribute('x',x+14);$('cm-player-label').setAttribute('y',y+5);
  // Both vectors are reversed at the core to show the same included angle.
  $('cm-angle-arc').setAttribute('d',angle?`M100 94A34 34 0 0 0 ${100+34*Math.sin(a)} ${60+34*Math.cos(a)}`:'');
  $('cm-angle-label').setAttribute('x',100+48*Math.sin(a)+18*Math.cos(a));$('cm-angle-label').setAttribute('y',64+48*Math.cos(a)-18*Math.sin(a));$('cm-angle-label').textContent=`${n(angle)}°`;
  const sx=140+72*Math.sin(a),sy=76+72*Math.cos(a),arrowSize=40*speed/1500;
  $('cm-speed-player').setAttribute('transform',`translate(${sx} ${sy}) rotate(${-angle})`);
  $('cm-speed-sight').setAttribute('d',`M${sx} ${sy}L140 76`);
  $('cm-speed-player-label').setAttribute('x',sx+14);$('cm-speed-player-label').setAttribute('y',sy+18);
  $('cm-speed-vector').setAttribute('d',`M${sx-arrowSize} ${sy}H${sx+arrowSize}`);$('cm-speed-vector').style.opacity=speed?1:0;
  const R=45*separation,dx=100+R*Math.sin(a),dy=30+R*Math.cos(a);
  $('cm-distance-player').setAttribute('transform',`translate(${dx} ${dy}) rotate(${-angle})`);
  $('cm-distance-player-label').setAttribute('x',dx+14);$('cm-distance-player-label').setAttribute('y',dy+5);
  $('cm-distance-axis').setAttribute('d',`M100 30L${100+135*Math.sin(a)} ${30+135*Math.cos(a)}`);
  $('cm-distance-line').setAttribute('d',`M${100+12*Math.sin(a)} ${30+12*Math.cos(a)}L${100+(R-10)*Math.sin(a)} ${30+(R-10)*Math.cos(a)}`);
  const ticks=[];for(let i=1;i<=3;i++){const tx=100+45*i*Math.sin(a),ty=30+45*i*Math.cos(a);ticks.push(`M${tx-12*Math.cos(a)} ${ty+12*Math.sin(a)}l${-8*Math.cos(a)} ${8*Math.sin(a)}`);$('cm-distance-tick-'+i).setAttribute('x',tx-30*Math.cos(a));$('cm-distance-tick-'+i).setAttribute('y',ty+30*Math.sin(a)+5);}
  $('cm-distance-ticks').setAttribute('d',ticks.join(' '));
  $('cm-angle-points').textContent=n(anglePoints);$('cm-speed-points').textContent=n(speedPoints);$('cm-factor').textContent=n(factor)+'×';
  $('cm-angle-detail').textContent=`${n(anglePoints)} angle points`;$('cm-speed-detail').textContent=`${n(speedPoints)} speed points`;$('cm-distance-detail').textContent=`${n(factor)}× multiplier · ≈ ${n(separation*696.378845)} UU`;
  $('cm-angle-desc').textContent=`${angle} degree angle between the core flight and the player's firing line, contributing ${n(anglePoints)} points.`;
  $('cm-speed-desc').textContent=`The core flies straight ahead, from bottom to top. Your position and facing match the ${angle} degree firing angle. Left/right speed across the core path is ${speed} UU per second, earning ${n(speedPoints)} speed points.`;
  $('cm-distance-desc').textContent=`${separation} reference dodge lengths from player to core at the selected ${angle} degree angle, approximately ${n(separation*696.378845)} UU. Distance multiplier ${n(factor)}.`;
  for(const button of document.querySelectorAll('.cm-speed [data-speed]'))button.setAttribute('aria-pressed',String(Number(button.dataset.speed)===speed));
  for(const id of ['angle','side-speed','separation'])$(''+id+'-number').setAttribute('aria-describedby',`cm-${id==='side-speed'?'speed':id==='separation'?'distance':'angle'}-help`);
 }
 return {render,update};
})();
