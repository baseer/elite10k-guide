'use strict';
// Illustrations use the existing scoring inputs; all scoring remains in GuideMath.
window.ComboMovement = (() => {
 const arrow = '<marker id="cm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="context-stroke"/></marker>';
 const svg = (id, title, body) => `<svg id="${id}" viewBox="0 0 280 190" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${title}</title><desc id="${id}-desc"></desc>${body}</svg>`;
 const player = (x,y,id='') => `<g ${id?`id="${id}"`:''} transform="translate(${x} ${y})" class="cm-player"><circle r="10"/><path d="M-4 3 0-5 4 3"/></g>`;
 const core = (x,y,id='') => `<g ${id?`id="${id}"`:''} transform="translate(${x} ${y})" class="cm-core"><circle r="12"/><circle r="5"/></g>`;
 const card = (kind,title,help,graphic,controls,detail) => `<article class="cm-card cm-${kind}"><h3>${title}</h3><figure>${graphic}</figure><p class="cm-help" id="cm-${kind}-help">${help}</p>${controls}<p class="cm-contribution" id="cm-${kind}-detail">${detail}</p></article>`;
 function render(control) {
  const angle = svg('cm-angle','Angle between core flight and your firing line',`${arrow}<path d="M22 60H256" class="cm-muted-line" marker-end="url(#cm-arrow)"/><text x="184" y="25">Core flight</text><path id="cm-sight" class="cm-angle-line" marker-end="url(#cm-arrow)"/><path id="cm-angle-arc" class="cm-angle-line"/><text id="cm-angle-label" class="cm-value"></text>${core(164,60)}<text x="150" y="42">Core</text>${player(0,0,'cm-angle-player')}<text id="cm-player-label">You</text>`);
  const speed = svg('cm-speed','Diagonal player movement split into across-path and along-path components','<path d="M244 44V164" class="cm-muted-line" marker-end="url(#cm-arrow)"/><text x="188" y="23">Core’s path</text>'+core(244,62)+'<path id="cm-speed-along" class="cm-muted-line cm-dashed" marker-end="url(#cm-arrow)"/><path id="cm-speed-right-angle" class="cm-muted-line"/><path id="cm-speed-motion" class="cm-motion-line" marker-end="url(#cm-arrow)"/><text x="18" y="35" class="cm-motion-text">Your movement</text><path id="cm-speed-vector" class="cm-speed-line" marker-end="url(#cm-arrow)"/><text x="77" y="177" class="cm-speed-text">Across = counts</text><text id="cm-speed-along-label" y="111">Along: 0</text>'+player(40,144,'cm-speed-player')+'<text x="18" y="177">You</text>');
  const distance = svg('cm-distance','Current player-to-core separation in reference dodge lengths','<text x="22" y="34">Player-to-core distance</text><path d="M30 100H250" class="cm-muted-line cm-dashed"/><path id="cm-distance-line" class="cm-distance-line"/><path d="M103.33 116v7M176.67 116v7M250 116v7" class="cm-muted-line"/><text x="103.33" y="143" text-anchor="middle">1</text><text x="176.67" y="143" text-anchor="middle">2</text><text x="250" y="143" text-anchor="middle">3</text><text x="140" y="177" text-anchor="middle">Reference dodge lengths</text>'+player(30,100)+'<text x="18" y="80">You</text>'+core(140,100,'cm-distance-core')+'<text id="cm-distance-label" y="77" text-anchor="middle" class="cm-distance-text">Core</text>');
  const speedButtons = '<div class="speed-references" aria-label="Sideways speed references"><button type="button" data-speed="0">0 across</button><button type="button" data-speed="940">Run · 940</button><button type="button" data-speed="1500">Dodge · 1,500</button></div>';
  const inputs = (id,label,value,min,max,step,unit,help) => control(id,label,value,min,max,step,unit).replace('class="control"',`class="control" aria-describedby="cm-${help}-help"`);
  return `<div class="cm-controls">${card('angle','Angle to core flight','Move off the core’s path to create an angle between its flight and your firing line.',angle,inputs('angle','Angle',30,0,90,1,'°','angle'),'')}${card('speed','Sideways speed','Blue is your movement. Only its green part across the core’s path counts; the dashed part along it adds 0 points.',speed,inputs('side-speed','Speed across core path',1000,0,1500,1,'UU/s','speed').replace(/<div class="endpoints">[\s\S]*?<\/div>/,speedButtons),'')}${card('distance','Separation from core','Your current distance to the core, not the number of times you have dodged.',distance,inputs('separation','Separation',1.5,.5,3,.1,'dodge lengths','distance'),'')}</div><p class="cm-geometry-note">Illustrations show a top-down example. The game measures angle, speed and separation in 3D when your core explodes. Player-to-core separation is separate from the target’s distance to the blast.</p><details class="cm-speed-note"><summary>About the speed references</summary><p>Run (940 UU/s) and initial ground dodge (1,500 UU/s) assume movement directly across the core’s flight. Actual speed varies during a dodge. Moving along its path adds no sideways-speed points. These are <a href="https://github.com/JimmieKJ/unrealTournament/blob/clean-master/UnrealTournament/Source/UnrealTournament/Private/UTCharacterMovement.cpp#L20" target="_blank" rel="noopener">default speed references</a>.</p></details><div class="cm-equation" aria-label="Movement score breakdown"><span><b id="cm-angle-points"></b> angle pts</span><span aria-hidden="true">+</span><span><b id="cm-speed-points"></b> speed pts</span><span aria-hidden="true">then ×</span><span><b id="cm-factor"></b> distance</span></div>`;
 }
 function update(angle,speed,separation) {
  const $ = id => document.getElementById(id), n = value => Number(value.toFixed(2)).toLocaleString('en-US');
  const a=angle*Math.PI/180, x=164-98*Math.cos(a),y=60+98*Math.sin(a),anglePoints=100*(1-Math.cos(a)),speedPoints=3*speed/1000,factor=Math.max(1,Math.min(2,separation));
  $('cm-sight').setAttribute('d',`M${x} ${y}L164 60`);
  $('cm-angle-player').setAttribute('transform',`translate(${x} ${y})`);
  $('cm-player-label').setAttribute('x',x-12);$('cm-player-label').setAttribute('y',y+28);
  // Both vectors are reversed at the core to show the same included angle.
  $('cm-angle-arc').setAttribute('d',angle?`M130 60A34 34 0 0 0 ${164-34*Math.cos(a)} ${60+34*Math.sin(a)}`:'');
  $('cm-angle-label').setAttribute('x',angle<15?112:164-53*Math.cos(a/2));$('cm-angle-label').setAttribute('y',angle<15?86:66+53*Math.sin(a/2));$('cm-angle-label').textContent=`${n(angle)}°`;
  const sx=40+116*speed/1500;
  $('cm-speed-vector').setAttribute('d',`M40 144H${sx}`);$('cm-speed-vector').style.opacity=speed?1:0;
  $('cm-speed-motion').setAttribute('d',`M40 144L${sx} 68`);
  $('cm-speed-along').setAttribute('d',`M${sx} 144V68`);
  $('cm-speed-right-angle').setAttribute('d',`M${sx-10} 144V134H${sx}`);$('cm-speed-right-angle').style.opacity=speed?1:0;
  $('cm-speed-along-label').setAttribute('x',sx+10);
  $('cm-speed-player').setAttribute('transform',`translate(40 144) rotate(${Math.atan2(sx-40,76)*180/Math.PI})`);
  const cx=30+220*separation/3;$('cm-distance-core').setAttribute('transform',`translate(${cx} 100)`);$('cm-distance-line').setAttribute('d',`M42 100H${cx-12}`);$('cm-distance-label').setAttribute('x',cx);
  $('cm-angle-points').textContent=n(anglePoints);$('cm-speed-points').textContent=n(speedPoints);$('cm-factor').textContent=n(factor)+'×';
  $('cm-angle-detail').textContent=`${n(anglePoints)} angle points`;$('cm-speed-detail').textContent=`${n(speedPoints)} speed points`;$('cm-distance-detail').textContent=`${n(factor)}× multiplier · ≈ ${n(separation*696.378845)} UU`;
  $('cm-angle-desc').textContent=`${angle} degree angle between the core flight and the player's firing line, contributing ${n(anglePoints)} points.`;
  $('cm-speed-desc').textContent=`Blue is your diagonal movement. Green is its component across the vertical core path: ${speed} UU per second, contributing ${n(speedPoints)} points. The dashed component along the core path contributes zero. The along-path component is illustrative, not another scoring input.`;
  $('cm-distance-desc').textContent=`${separation} reference dodge lengths from player to core, approximately ${n(separation*696.378845)} UU. Distance multiplier ${n(factor)}.`;
  for(const button of document.querySelectorAll('.cm-speed [data-speed]'))button.setAttribute('aria-pressed',String(Number(button.dataset.speed)===speed));
  for(const id of ['angle','side-speed','separation'])$(''+id+'-number').setAttribute('aria-describedby',`cm-${id==='side-speed'?'speed':id==='separation'?'distance':'angle'}-help`);
 }
 return {render,update};
})();
