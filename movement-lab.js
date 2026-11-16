'use strict';
(function(root){
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
 function acceleration(p,speed){const blend=clamp(Math.abs(speed)/p.fastThreshold,0,1);return p.fastAcceleration*(1-blend)+p.acceleration*blend;}
 function step(p,v,mode,dt){
  if(mode==='stop'){
   const next=Math.max(0,Math.abs(v)-(p.brakeFriction*p.brakeFactor*Math.abs(v)+p.braking)*dt);
   return next<=p.stopThreshold?0:Math.sign(v)*next;
  }
  const input=mode==='reverse'?-1:1,a=acceleration(p,v);
  const turned=v-(v-input*Math.abs(v))*Math.min(dt*p.friction,1);
  return clamp(turned+input*a*dt,-p.maxSpeed,p.maxSpeed);
 }
 function simulate(p,{mode='accelerate',startPercent=0,dt=.001,horizon=1.5}={}){
  let v=p.maxSpeed*clamp(startPercent,0,100)/100,x=0,path=0,t=0;
  const samples=[{t,x,v,path}],target=mode==='stop'?0:mode==='reverse'?-p.maxSpeed:p.maxSpeed;
  let completed=v===target?0:null,zero=mode==='reverse'&&v===0?0:null,turnDistance=zero===0?0:null;
  for(let i=1;i<=Math.ceil(horizon/dt);i++){
   const prev=v;v=step(p,v,mode,dt);t=i*dt;x+=v*dt;path+=Math.abs(v)*dt;
   if(mode==='reverse'&&zero===null&&v<=0){const f=prev/(prev-v);zero=(i-1+f)*dt;turnDistance=samples.at(-1).x+prev*f*dt/2;}
   if(completed===null&&Math.abs(v-target)<1e-7)completed=t;
   samples.push({t,x,v,path});
  }
  const event=completed===null?null:sampleAt({samples},completed);
  return {profile:p,mode,startPercent,samples,completed,zero,turnDistance,event,dt};
 }
 function sampleAt(run,t){const s=run.samples;if(t<=0)return s[0];if(t>=s.at(-1).t)return s.at(-1);const at=t/(s[1].t||.001),i=Math.floor(at),f=at-i,a=s[i],b=s[i+1];return {t,x:a.x+(b.x-a.x)*f,v:a.v+(b.v-a.v)*f,path:a.path+(b.path-a.path)*f};}
 const colors={stock:'#aeb6cc',utplus:'#5ed7d0',ncp:'#f1c56b',b19:'#7eb5ff',elite:'#bd9bff'};
 const titles={accelerate:'Rest to full running speed',stop:'Release input and stop',reverse:'Hold the opposite direction'};
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const n=(x,d=1)=>Number(x.toFixed(d)).toLocaleString('en-US',{maximumFractionDigits:d});
 function render(){return `<section class="panel movement-lab" id="movement-lab"><div class="comparison-title"><div><p class="eyebrow">GROUND MOVEMENT · SAME INPUT</p><h2>Feel the change in direction</h2></div><span>INTERACTIVE MODEL</span></div><p>Accelerate, release input, or reverse direction. Every profile receives the same input on flat ground. Compare elapsed time, signed velocity, and ground covered.</p><div class="ml-modes" role="group" aria-label="Movement scenario"><button type="button" data-mode="accelerate" aria-pressed="true">Accelerate</button><button type="button" data-mode="stop" aria-pressed="false">Stop</button><button type="button" data-mode="reverse" aria-pressed="false">Reverse 180°</button></div><div class="ml-controls"><label>Starting speed <output id="ml-start-value">0%</output><input id="ml-start" type="range" min="0" max="100" step="1" value="0" aria-label="Starting speed percent"><small>Percent of each profile’s full running speed</small></label><label>Game speed <output id="ml-speed-value">1.0×</output><input id="ml-speed" type="range" min="0.5" max="1.5" step="0.05" value="1" aria-label="Game speed"><small>Changes real elapsed time; game-time results stay separate</small></label><label>Movement axis<select id="ml-axis"><option value="strafe">Strafe left / right</option><option value="forward">Forward / backward</option></select><small>Same ground equations; no sprint or camera turn</small></label></div><fieldset class="ml-profiles"><legend>Compare profiles</legend></fieldset><div class="ml-playback"><button type="button" id="ml-play">Play</button><button type="button" id="ml-reset">Reset time</button><label><input id="ml-slow" type="checkbox" checked> Slow playback (¼ real time)</label><strong id="ml-current-time">0 ms</strong></div><div class="ml-timeline"><label for="ml-time">Shared timeline <span id="ml-time-end"></span></label><input id="ml-time" type="range" min="0" max="600" step="1" value="0" aria-label="Movement timeline milliseconds"><div class="ml-time-labels"><span>Input changes here</span><span>Same clock for all profiles</span></div></div><p id="ml-input" class="ml-input"></p><div id="ml-track" class="ml-track" aria-label="Movement positions on a shared distance scale"></div><p class="small-note">All lanes share the same distance scale and origin. Arrow direction is actual motion; the input direction is shown separately. Negative speed means moving opposite the starting direction. Identical profile curves overlap; use the toggles to inspect them separately.</p><div class="ml-chart-title"><h3>Velocity over time</h3><span>● Reaches target · ◇ Reverses through zero</span></div><svg id="ml-chart" viewBox="0 0 800 280" role="img" aria-label="Signed velocity over elapsed real time"></svg><div id="ml-readout" class="ml-readout" role="status"></div><div class="table-wrap"><table class="ml-results"><caption>Results for the selected input</caption><thead><tr><th>Profile</th><th>Target reached · real time</th><th>Game time</th><th>Distance to target</th><th>Stops moving the old way</th></tr></thead><tbody></tbody></table></div><details class="ml-method"><summary>What this model includes—and its limits</summary><p>Full keyboard input, flat dry ground, native speed cap, low-speed acceleration blending, direction-changing friction, and release braking. Normal running speed is 940 UU/s in these profiles. Sprint, dodges, crouch, slopes, collisions, movement reduction, input latency and network prediction are excluded. Left/right and forward/backward reversals use the same one-axis model.</p><p>Release braking uses native BrakingFriction (5) × BrakingFrictionFactor (2), plus walking deceleration. It does not simply use the ground-friction column. Opposite input instead uses directional ground friction plus acceleration; it is not equivalent to releasing input and then starting again. Native braking snaps the final speed at or below 10 UU/s to zero.</p><p>Numerical simulation uses a 1 ms game-time step and the native update order, with post-update velocity integrated into position. Displayed times are approximate and can vary with actual frame scheduling. The diamonds interpolate the zero crossing between steps. This is a configured-rules simulation, not a measured gameplay or network benchmark.</p><p>UT+ periodically assigns walking braking 2,000, but native movement restores DefaultBrakingDecelerationWalking (520) after each move. The calculator models settled movement using 520, excluding the transient application frame. NCP here means the competitive TeamArena pawn without an additional UT+ movement mutator; its core ground defaults inherit Stock. A server stacking both mutators can differ.</p><p><a href="./movement-profiles-evidence.json" target="_blank" rel="noopener">Profile values, sources and verification</a></p></details></section>`;}
 function mount(host,profiles){
  const q=s=>host.querySelector(s),qa=s=>[...host.querySelectorAll(s)];let mode='accelerate',start=0,speed=1,elapsed=0,runs=[],duration=.6,playing=false,raf=0,last=0;
  q('.ml-profiles').insertAdjacentHTML('beforeend',profiles.map(p=>`<label style="--profile:${colors[p.id]}"><input type="checkbox" data-profile="${p.id}" checked><span>${esc(p.name)}</span></label>`).join(''));
  const selected=()=>profiles.filter(p=>q(`[data-profile="${p.id}"]`).checked);
  function stop(){playing=false;cancelAnimationFrame(raf);q('#ml-play').textContent='Play';}
  function recompute(){stop();runs=selected().map(p=>simulate(p,{mode,startPercent:start}));duration=Math.max(.15,...runs.map(r=>(r.completed??1.5)/speed))*1.2;elapsed=0;q('#ml-time').max=Math.ceil(duration*1000);q('#ml-time').value=0;q('#ml-time-end').textContent=n(duration*1000,0)+' ms real time';q('#ml-start-value').textContent=start+'%';q('#ml-speed-value').textContent=n(speed,2)+'×';draw();}
  function chart(){
   const W=800,H=280,l=58,r=20,top=20,bottom=38,max=940,y=v=>top+(max-v)/(2*max)*(H-top-bottom),x=t=>l+t/duration*(W-l-r);
   let out='';for(const v of [-940,0,940])out+=`<line x1="${l}" x2="${W-r}" y1="${y(v)}" y2="${y(v)}" class="ml-grid"/><text x="${l-8}" y="${y(v)+4}" text-anchor="end">${v}</text>`;
   for(let i=0;i<=4;i++){const t=duration*i/4;out+=`<text x="${x(t)}" y="${H-14}" text-anchor="middle">${n(t*1000,0)} ms</text>`;}
   for(const run of runs){const col=colors[run.profile.id];const pts=run.samples.filter((_,i)=>i%2===0).filter(s=>s.t/speed<=duration+.002).map(s=>`${x(s.t/speed)},${y(s.v)}`).join(' ');out+=`<polyline points="${pts}" fill="none" stroke="${col}" stroke-width="2"/>`;
    if(run.zero!==null){const xx=x(run.zero/speed),yy=y(0);out+=`<path d="M${xx},${yy-5}l5,5 -5,5 -5,-5Z" fill="${col}"/>`;}
    if(run.completed!==null)out+=`<circle cx="${x(run.completed/speed)}" cy="${y(mode==='stop'?0:mode==='reverse'?-940:940)}" r="4" fill="${col}"/>`;
   }
   out+=`<line x1="${x(elapsed)}" x2="${x(elapsed)}" y1="${top}" y2="${H-bottom}" class="ml-cursor"/><text x="${l}" y="12">UU/s · game velocity</text>`;q('#ml-chart').innerHTML=out;
  }
  function draw(){
   const axis=q('#ml-axis').value==='strafe'?'right':'forward',opposite=axis==='right'?'left':'backward',input=mode==='stop'?'Released—no direction held':mode==='reverse'?`Hold ${opposite} from time zero`:`Hold ${axis} from time zero`;
   q('#ml-input').textContent=`${titles[mode]} · ${input}`;q('#ml-current-time').textContent=n(elapsed*1000,0)+' ms real / '+n(elapsed*speed*1000,0)+' ms game';
   const current=runs.map(run=>({run,s:sampleAt(run,elapsed*speed)}));
   const allSamples=runs.flatMap(run=>run.samples.filter(s=>s.t<=duration*speed));const min=Math.min(0,...allSamples.map(s=>s.x)),max=Math.max(80,...allSamples.map(s=>s.x)),pad=Math.max(40,(max-min)*.08),lo=min-pad,hi=max+pad,pos=x=>10+80*(x-lo)/(hi-lo);
   q('#ml-track').innerHTML=`<div class="ml-scale"><span>${n(lo,0)} UU</span><span>Shared distance scale</span><span>${n(hi,0)} UU</span></div>`+current.map(({run,s})=>`<div class="ml-lane" style="--profile:${colors[run.profile.id]}"><div class="ml-lane-name">${esc(run.profile.name)}<small>${n(s.v,0)} UU/s · ${n(s.x,1)} UU from origin</small></div><div class="ml-lane-track"><span class="ml-origin" style="left:${pos(0)}%"></span><span class="ml-travel" style="left:${Math.min(pos(0),pos(s.x))}%;width:${Math.abs(pos(s.x)-pos(0))}%"></span><span class="ml-runner" style="left:${pos(s.x)}%" title="${n(s.x,1)} UU">${Math.abs(s.v)<.01?'●':s.v>0?'➜':'⬅'}</span></div></div>`).join('');
   q('#ml-readout').innerHTML=current.map(({run,s})=>`<div style="--profile:${colors[run.profile.id]}"><strong>${esc(run.profile.name)}</strong><span>${n(s.v,0)} <small>UU/s</small></span><small>${n(s.path,1)} UU travelled${run.completed!==null&&elapsed*speed>=run.completed?' · target reached':''}</small></div>`).join('');
   q('.ml-results tbody').innerHTML=runs.map(run=>`<tr><th style="color:${colors[run.profile.id]}">${esc(run.profile.name)}</th><td>${run.completed===null?'Beyond model window':n(run.completed/speed*1000,0)+' ms'}</td><td>${run.completed===null?'—':n(run.completed*1000,0)+' ms'}</td><td>${run.event?n(run.event.path,1)+' UU travelled':'—'}</td><td>${mode==='reverse'?n((run.zero??0)/speed*1000,0)+' ms · '+n(run.turnDistance??0,1)+' UU forward':'—'}</td></tr>`).join('');chart();
  }
  for(const button of qa('[data-mode]'))button.addEventListener('click',()=>{mode=button.dataset.mode;start=mode==='accelerate'?0:100;q('#ml-start').value=start;for(const b of qa('[data-mode]'))b.setAttribute('aria-pressed',String(b===button));recompute();});
  q('#ml-start').addEventListener('input',e=>{start=+e.target.value;recompute();});q('#ml-speed').addEventListener('input',e=>{speed=+e.target.value;recompute();});q('#ml-axis').addEventListener('change',draw);
  for(const c of qa('[data-profile]'))c.addEventListener('change',()=>{if(!selected().length)c.checked=true;recompute();});
  q('#ml-time').addEventListener('input',e=>{stop();elapsed=+e.target.value/1000;draw();});q('#ml-reset').addEventListener('click',()=>{stop();elapsed=0;q('#ml-time').value=0;draw();});
  function frame(now){if(!playing)return;if(last){elapsed=Math.min(duration,elapsed+(now-last)/1000*(q('#ml-slow').checked?.25:1));q('#ml-time').value=Math.round(elapsed*1000);draw();}last=now;if(elapsed>=duration){stop();return;}raf=requestAnimationFrame(frame);}
  q('#ml-play').addEventListener('click',()=>{if(playing){stop();return;}if(elapsed>=duration)elapsed=0;playing=true;last=0;q('#ml-play').textContent='Pause';raf=requestAnimationFrame(frame);});
  recompute();return ()=>stop();
 }
 const api={acceleration,step,simulate,sampleAt,render,mount};root.MovementLab=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);

