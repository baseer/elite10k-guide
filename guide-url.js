'use strict';
// Shared by real GitHub Pages entry points; no server rewrite or 404 fallback needed.
window.GuideURL=(()=>{
 const base=new URL('.',document.baseURI), ids=new Set(['overview','switch-times','combo']);
 for(const d of Object.values(window.ELITE_VERSIONS||{}))for(const w of [...d.weapons,...d.shared])ids.add(w.id);
 ids.add('weapon-interactions');
 const section=()=>{const part=location.pathname.slice(base.pathname.length).replace(/^\/|\/$/g,'');return ids.has(part)?part:'overview';};
 function write(values){const u=new URL(location.href);if(window.ELITE_VERSION)u.searchParams.set('version',window.ELITE_VERSION);for(const [k,v]of Object.entries(values))v===null?u.searchParams.delete(k):u.searchParams.set(k,String(v));if(u.href!==location.href){history.replaceState(null,'',u);links();window.dispatchEvent(new Event('guide:settings'));}}
 function url(id,search=location.search){const u=new URL(id==='overview'?'./':id+'/',base);u.search=search;return u;}
 function links(){for(const a of document.querySelectorAll('a[href]')){if(a.classList.contains('heading-permalink')){const local=new URL(location.href);local.hash=a.dataset.anchor;a.href=local;continue;}const u=new URL(a.getAttribute('href'),document.baseURI),id=a.dataset.guideSection||u.hash.slice(1);if(u.origin===location.origin&&ids.has(id)){a.dataset.guideSection=id;a.href=url(id,location.search);}else if(u.hash&&a.getAttribute('href').startsWith('#')){const local=new URL(location.href);local.hash=u.hash;a.href=local;}}}
 function go(id,replace=false,search=location.search){if(!ids.has(id))return;const u=url(id,search);if(id!==section())for(const k of ['distance','score','health','movement','angle','side-speed','separation',...movementKeys])u.searchParams.delete(k);history[replace?'replaceState':'pushState'](null,'',u);window.dispatchEvent(new Event('guide:navigate'));links();}
 function legacy(){const id=location.hash.slice(1);if(ids.has(id)){history.replaceState(null,'',url(id));return true;}return false;}
 legacy();if(location.hash==='#sources')document.getElementById('sources').open=true;window.dispatchEvent(new Event('guide:settings'));
 document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target||a.hasAttribute('download'))return;const u=new URL(a.href);if(u.hash==='#sources')document.getElementById('sources').open=true;if(a.classList.contains('heading-permalink')){e.preventDefault();history.pushState(null,'',u);scrollToHeading();copyPermalink(a,u.href);return;}if(u.origin!==location.origin||u.search!==location.search)return;const id=a.dataset.guideSection||(ids.has(u.hash.slice(1))?u.hash.slice(1):null);if(!id)return;e.preventDefault();go(id);});
 window.addEventListener('hashchange',()=>{if(legacy())window.dispatchEvent(new Event('guide:navigate'));else scrollToHeading();});
 window.addEventListener('popstate',()=>{if(location.hash&&!ids.has(location.hash.slice(1))){scrollToHeading();return;}legacy();if(location.hash==='#sources')document.getElementById('sources').open=true;window.dispatchEvent(new Event('guide:navigate'));});
 const number=(key,min,max,fallback)=>{const raw=new URLSearchParams(location.search).get(key),v=Number(raw);return raw!==null&&raw.trim()!==''&&Number.isFinite(v)?Math.max(min,Math.min(max,v)):fallback;};
 function combo(){return {distance:number('distance',0,550,253),score:number('score',0,100000,0),health:number('health',1,200,100)};}
 const customParams={maxSpeed:'custom-speed',acceleration:'custom-accel',fastAcceleration:'custom-initial-accel',fastThreshold:'custom-threshold',friction:'custom-friction',braking:'custom-braking',brakeFriction:'custom-brake-friction',brakeFactor:'custom-brake-factor'};
 const movementKeys=['mode','start','speed','gap','time','profiles','custom-open','source','advanced','chart','playback',...Object.values(customParams)];
 function readMovement(){
  const p=new URLSearchParams(location.search);
  if(p.has('movement')){try{const value=JSON.parse(p.get('movement'));if(value&&typeof value==='object')return value;}catch{}}
  if(!movementKeys.some(k=>p.has(k)))return null;
  const numeric=key=>{const raw=p.get(key);return raw!==null&&raw.trim()!==''&&Number.isFinite(Number(raw))?Number(raw):undefined;};
  const mode=p.get('mode')||'accelerate';
  return {mode,start:numeric('start')??(mode==='accelerate'?0:100),speed:numeric('speed'),gap:numeric('gap'),elapsed:numeric('time')===undefined?undefined:numeric('time')/1000,profiles:p.has('profiles')?p.get('profiles').split(/[., ]/):undefined,custom:Object.fromEntries(Object.entries(customParams).map(([key,param])=>[key,numeric(param)])),customExpanded:p.get('custom-open')==='1',source:p.get('source'),advanced:p.get('advanced')==='1',chart:p.get('chart'),rate:p.get('playback')};
 }
 function writeMovement(state,defaults){
  const values=Object.fromEntries(['movement',...movementKeys].map(k=>[k,null]));
  const put=(key,value,fallback)=>{if(String(value)!==String(fallback))values[key]=value;};
  put('mode',state.mode,'accelerate');put('start',state.start,state.mode==='accelerate'?0:100);put('speed',state.speed,1);put('gap',state.gap,30);put('time',Math.round(state.elapsed*1000),0);
  put('profiles',state.profiles.join('.'),defaults.profiles.join('.'));put('custom-open',state.customExpanded?1:0,0);put('source',state.source,'elite');put('advanced',state.advanced?1:0,0);put('chart',state.chart,'distance');put('playback',state.rate,'0.25');
  for(const [key,param]of Object.entries(customParams))put(param,state.custom[key],defaults.custom[key]);
  write(values);
 }
 function comboScoring(){if(section()!=='combo')return;const params=new URLSearchParams(location.search);if(['angle','side-speed','separation'].some(k=>params.has(k)))document.getElementById('movement-info').open=true;for(const key of ['angle','side-speed','separation']){const n=document.getElementById(key+'-number'),s=document.getElementById(key+'-slider');if(!n||!s)continue;const v=number(key,+s.min,+s.max,+s.value);s.value=v;s.dispatchEvent(new Event('input'));for(const input of [n,s])input.addEventListener('input',()=>write({[key]:s.value}));}}
 function headingLinks(){
  for(const h of document.querySelectorAll('#main h2,#main h3,#main h4,#main details > summary')){
   if(h.closest('a'))continue;
   let a=h.querySelector(':scope > .heading-permalink');
   if(!h.id){const slug=h.textContent.trim().toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'heading';const base='section-'+slug;let id=base,n=2;while(document.getElementById(id))id=base+'-'+n++;h.id=id;}
   if(!a){a=document.createElement('a');a.className='heading-permalink';a.textContent='#';a.dataset.anchor=h.id;a.dataset.label='Copy link to '+h.textContent.trim();a.setAttribute('aria-label',a.dataset.label);a.title='Copy link to this section';h.append(a);}
   const u=new URL(location.href);u.hash=h.id;if(a.href!==u.href)a.href=u;
  }
 }
 async function copyPermalink(a,url){
  let status=document.getElementById('permalink-status');if(!status){status=document.createElement('span');status.id='permalink-status';status.className='sr-only';status.setAttribute('role','status');document.body.append(status);}
  try{
   if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(url);
   else{const input=document.createElement('textarea');input.value=url;input.style.cssText='position:fixed;opacity:0';document.body.append(input);input.select();const copied=document.execCommand('copy');input.remove();if(!copied)throw Error('Clipboard unavailable');}
   a.textContent='✓';a.setAttribute('aria-label','Section link copied');status.textContent='Section link copied';clearTimeout(a.copyTimer);a.copyTimer=setTimeout(()=>{a.textContent='#';a.setAttribute('aria-label',a.dataset.label);},1600);
  }catch{status.textContent='Right-click the section link to copy its address';}
 }
 function scrollToHeading(){
  if(!location.hash)return;
  let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
  // The chart title changes between speed and signed velocity; its anchor does not.
  if(id==='section-speed-over-time'&&section()==='movement')id='section-velocity-over-time';
  const target=document.getElementById(id);if(!target)return;
  for(let parent=target.parentElement;parent;parent=parent.parentElement)if(parent.tagName==='DETAILS')parent.open=true;
  if(target.tagName==='DETAILS')target.open=true;
  const panel=target.closest('[role=tabpanel][hidden]');if(panel){const tab=[...document.querySelectorAll('[aria-controls]')].find(t=>t.getAttribute('aria-controls')===panel.id);if(panel.closest('.movement-lab'))panel.dispatchEvent(new CustomEvent('guide:reveal-tab',{detail:panel.id,bubbles:true}));else tab?.click();}
  const align=()=>{if(!target.isConnected)return;const sticky=document.querySelector('.ml-sticky-controls');const covered=sticky&&!sticky.contains(target)&&!(target.compareDocumentPosition(sticky)&Node.DOCUMENT_POSITION_FOLLOWING);target.style.scrollMarginTop=(covered?sticky.getBoundingClientRect().height+24:24)+'px';target.scrollIntoView({block:'start',behavior:'auto'});};
  requestAnimationFrame(()=>{align();requestAnimationFrame(()=>requestAnimationFrame(align));});
 }
 // A browser may restore its own scroll after the initial dynamic render.
 window.addEventListener('load',()=>scrollToHeading(),{once:true});
 window.addEventListener('pageshow',()=>scrollToHeading());
 let headingObserver;
 function headings(){headingLinks();if(!headingObserver){headingObserver=new MutationObserver(()=>headingLinks());headingObserver.observe(document.getElementById('main'),{childList:true,subtree:true});}scrollToHeading();}
 return {section,links,go,write,combo,readMovement,writeMovement,comboScoring,headings};
})();
