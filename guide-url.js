'use strict';
// Shared by real GitHub Pages entry points; no server rewrite or 404 fallback needed.
window.GuideURL=(()=>{
 const base=new URL('.',document.baseURI), ids=new Set(['overview','switch-times','combo']);
 for(const d of Object.values(window.ELITE_VERSIONS||{}))for(const w of [...d.weapons,...d.shared])ids.add(w.id);
 ids.add('weapon-interactions');
 const section=()=>{const part=location.pathname.slice(base.pathname.length).replace(/^\/|\/$/g,'');return ids.has(part)?part:'overview';};
 function write(values){const u=new URL(location.href);for(const [k,v]of Object.entries(values))u.searchParams.set(k,String(v));if(u.href!==location.href){history.replaceState(null,'',u);links();window.dispatchEvent(new Event('guide:settings'));}}
 function url(id,search=location.search){const u=new URL(id==='overview'?'./':id+'/',base);u.search=search;return u;}
 function links(){for(const a of document.querySelectorAll('a[href]')){const u=new URL(a.getAttribute('href'),document.baseURI),id=a.dataset.guideSection||u.hash.slice(1);if(u.origin===location.origin&&ids.has(id)){a.dataset.guideSection=id;a.href=url(id,location.search);}else if(u.hash&&a.getAttribute('href').startsWith('#')){const local=new URL(location.href);local.hash=u.hash;a.href=local;}}}
 function go(id,replace=false,search=location.search){if(!ids.has(id))return;const u=url(id,search);if(id!==section())for(const k of ['distance','score','health','movement','angle','side-speed','separation'])u.searchParams.delete(k);history[replace?'replaceState':'pushState'](null,'',u);window.dispatchEvent(new Event('guide:navigate'));links();}
 function legacy(){const id=location.hash.slice(1);if(ids.has(id)){history.replaceState(null,'',url(id));return true;}return false;}
 legacy();if(location.hash==='#sources')document.getElementById('sources').open=true;window.dispatchEvent(new Event('guide:settings'));
 document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target||a.hasAttribute('download'))return;const u=new URL(a.href);if(u.hash==='#sources')document.getElementById('sources').open=true;if(u.origin!==location.origin||u.search!==location.search)return;const id=a.dataset.guideSection||(ids.has(u.hash.slice(1))?u.hash.slice(1):null);if(!id)return;e.preventDefault();go(id);});
 window.addEventListener('hashchange',()=>{if(legacy())window.dispatchEvent(new Event('guide:navigate'));});
 window.addEventListener('popstate',()=>{if(location.hash&&!ids.has(location.hash.slice(1)))return;legacy();if(location.hash==='#sources')document.getElementById('sources').open=true;window.dispatchEvent(new Event('guide:navigate'));});
 const number=(key,min,max,fallback)=>{const raw=new URLSearchParams(location.search).get(key),v=Number(raw);return raw!==null&&raw.trim()!==''&&Number.isFinite(v)?Math.max(min,Math.min(max,v)):fallback;};
 function combo(){return {distance:number('distance',0,550,253),score:number('score',0,100000,0),health:number('health',1,200,100)};}
 function readMovement(){try{const value=JSON.parse(new URLSearchParams(location.search).get('movement'));return value&&typeof value==='object'?value:null;}catch{return null;}}
 function comboScoring(){if(section()!=='combo')return;const params=new URLSearchParams(location.search);if(['angle','side-speed','separation'].some(k=>params.has(k)))document.getElementById('movement-info').open=true;for(const key of ['angle','side-speed','separation']){const n=document.getElementById(key+'-number'),s=document.getElementById(key+'-slider');if(!n||!s)continue;const v=number(key,+s.min,+s.max,+s.value);s.value=v;s.dispatchEvent(new Event('input'));for(const input of [n,s])input.addEventListener('input',()=>write({[key]:s.value}));}}
 return {section,links,go,write,combo,readMovement,comboScoring};
})();
