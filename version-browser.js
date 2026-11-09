'use strict';
(()=>{
 const versions=window.ELITE_VERSIONS,keys=Object.keys(versions),params=new URLSearchParams(location.search);
 const requested=params.get('version'),version=keys.includes(requested)?requested:keys.at(-1);
 const compare=keys.includes(params.get('compare'))&&params.get('compare')!==version?params.get('compare'):null;
 window.ELITE_GUIDE=versions[version];window.ELITE_VERSION=version;window.ReleaseHistory.activate(window.ELITE_GUIDE);const originalComboRender=window.EliteCombo.render;window.EliteCombo.render=()=>window.ReleaseHistory.comboCopy(originalComboRender());
 for(const a of document.querySelectorAll('a[href="./"]'))a.href='?version='+version+(compare?'&compare='+compare:'')+'#overview';
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const header=document.querySelector('.site-header'),brand=header.querySelector('.brand');
 brand.querySelector('.version')?.remove();
 const group=document.createElement('div');group.className='header-brand-group';brand.before(group);group.append(brand);
 const controls=document.createElement('div');controls.className='navbar-versions';controls.setAttribute('aria-label','Guide versions');
 controls.innerHTML=`<details class="navbar-menu version-menu"><summary aria-label="Choose guide version">v${version}<svg class="ui-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter"/></svg></summary><div class="navbar-menu-options"><p>Guide version</p>${keys.map(k=>`<a data-read-version="${k}" ${k===version?'aria-current="true"':''}>v${k}${k===keys.at(-1)?'<small>Latest</small>':''}</a>`).join('')}</div></details><details class="navbar-menu compare-menu${compare?' comparing':''}"><summary aria-label="Compare versions">${compare?'vs v'+compare:'Compare versions'}<svg class="ui-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter"/></svg></summary><div class="navbar-menu-options"><p>Compare v${version} against</p>${keys.filter(k=>k!==version).map(k=>`<a data-compare-version="${k}" ${k===compare?'aria-current="true"':''}>v${k}</a>`).join('')}${compare?'<a class="stop-comparing" data-stop-comparing>Stop comparing</a>':''}</div></details>`;
 group.append(controls);
 const quick=document.createElement('button');quick.type='button';quick.className='navbar-quick-summary';header.append(quick);
 quick.addEventListener('click',()=>{const panel=document.querySelector('.version-changes');if(panel){panel.open=!panel.open;quick.setAttribute('aria-expanded',String(panel.open));}});
 function updateLinks(){for(const a of controls.querySelectorAll('a')){const q=new URLSearchParams(location.search);q.set('version',a.dataset.readVersion||version);if(a.hasAttribute('data-stop-comparing')||(a.dataset.readVersion&&a.dataset.readVersion===compare))q.delete('compare');else if(a.dataset.compareVersion)q.set('compare',a.dataset.compareVersion);else if(compare)q.set('compare',compare);else q.delete('compare');a.href=location.pathname+'?'+q+(location.hash||'#overview');}}
 updateLinks();window.addEventListener('hashchange',updateLinks);
 let keyboardNavigation=false;
 document.addEventListener('keydown',e=>{if(e.key==='Tab')keyboardNavigation=true;});
 document.addEventListener('pointerdown',()=>{keyboardNavigation=false;});
 for(const menu of controls.querySelectorAll('details')){
  menu.querySelector('summary').addEventListener('click',e=>{if(e.pointerType==='mouse'){e.preventDefault();menu.open=true;}});
  menu.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){for(const other of controls.querySelectorAll('details'))if(other!==menu)other.open=false;menu.open=true;}});
  menu.addEventListener('pointerleave',()=>{if(!menu.contains(document.activeElement))menu.open=false;});
  menu.addEventListener('focusin',()=>{if(keyboardNavigation)menu.open=true;});
  menu.addEventListener('focusout',e=>{if(!menu.contains(e.relatedTarget))menu.open=false;});
  menu.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.querySelector('summary').focus();menu.open=false;e.preventDefault();}});
 }
 document.addEventListener('click',e=>{for(const menu of controls.querySelectorAll('details'))if(!menu.contains(e.target))menu.open=false;});
 const normalize=s=>String(s||'').replace(/v1\.\d+\b/g,'selected version');
 window.renderVersionComparison=id=>{
  const current=versions[version],other=versions[compare],items=d=>[...d.weapons,...d.shared];
  const selected=['overview','foundation'].includes(id)?items(current):items(current).filter(w=>w.id===(id==='combo'?'shock':id==='switch-times'?'shock':id));
  const changes=[];
  if(compare)for(const w of selected){const prior=items(other).find(x=>x.id===w.id);for(const r of w.rows){const p=prior?.rows.find(x=>x.label===r.label);if(normalize(p?.elite)!==normalize(r.elite))changes.push({section:w.name,id:w.id,label:r.label,before:p?.elite||'Not listed',after:r.elite});}}
  quick.textContent=compare?'v'+compare+' → v'+version+' · '+(changes.length?changes.length+' change'+(changes.length===1?'':'s')+' · '+[...new Set(changes.map(c=>c.label))].slice(0,3).join(' / '):'No changes in this section'):versions[version].revision;
  quick.disabled=!compare;quick.setAttribute('aria-label',compare?'Show version comparison: '+quick.textContent:'Release summary: '+quick.textContent);if(compare)quick.setAttribute('aria-expanded','false');else quick.removeAttribute('aria-expanded');
  if(compare){
  const panel=document.createElement('details');panel.className='version-changes panel'+(changes.length?' has-changes':'');panel.setAttribute('aria-label','Changes between guide versions');
  panel.innerHTML=`<summary class="version-summary"><span class="version-summary-title">Version comparison <span class="change-count">${version===compare?'Same version':changes.length?changes.length+' change'+(changes.length===1?'':'s'):'No changes'}</span></span><span class="version-summary-pair">v${escape(compare)} → v${escape(version)}</span><span class="version-summary-action"><span class="when-closed">Show details</span><span class="when-open">Hide details</span><svg class="ui-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="square" stroke-linejoin="miter"/></svg></span></summary><div class="version-comparison-body">${requested&&!keys.includes(requested)?'<p role="status">That version is unavailable. Showing the latest supported version.</p>':''}<p>${version===compare?'Choose another version above to compare.':changes.length?'Values below compare the selected release revisions. Read from the comparison version to the version you are browsing.':'No documented gameplay or guide changes for this section between the selected release revisions.'}</p>${changes.length?`<div class="version-diffs">${changes.map(c=>`<article><a href="#${c.id}">${escape(c.section)}</a><h3>${escape(c.label)}</h3><div class="version-diff-values"><div><span>v${escape(compare)}</span><p>${escape(c.before)}</p></div><div><span>v${escape(version)}</span><p>${escape(c.after)}</p></div></div></article>`).join('')}</div>`:''}<details><summary>Release scope and package identity</summary><p>The archive covers v1.57 onward. Each label uses its final completed normal revision, verified against a preserved pak or complete hash-addressed snapshot. Diagnostic-only builds, native DLL revisions and the separate optional HUD history are excluded. These are package defaults; server substitutions are separate. Later combat verification remains pending.</p><p>Reading v${version}: ${escape(current.revision)}</p><code>${current.packageSha256}</code><p>Comparing v${compare}: ${escape(other.revision)}</p><code>${other.packageSha256}</code><p><a href="./versions/${version}/comparison-data.json" download>Download v${version} data</a> · <a href="./versions/${compare}/comparison-data.json" download>Download v${compare} data</a></p></details></div>`;
  document.getElementById('content').prepend(panel);
  }
  // Existing tools share unchanged models; update visible release labels without touching scripts.
  for(const container of document.querySelectorAll('.side-foot,footer,#sources')){const walker=document.createTreeWalker(container,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode())n.textContent=n.textContent.replace(/v1\.78\b/g,'v'+version);}
  document.querySelector('footer span').innerHTML=`Elite10K v${version} · Compared with authoritative B19<br>Package defaults, not a promise about every server.`;
  const download=document.querySelector('#sources a[download]');if(download)download.href=`./versions/${version}/comparison-data.json`;
  for(const summary of document.querySelectorAll('summary'))if(!summary.querySelector('.ui-chevron')){for(const marker of summary.querySelectorAll('[aria-hidden="true"]'))marker.remove();summary.insertAdjacentHTML('beforeend',"<svg class=\"ui-chevron\" viewBox=\"0 0 16 16\" fill=\"none\" aria-hidden=\"true\"><path d=\"m4 6 4 4 4-4\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"square\" stroke-linejoin=\"miter\"/></svg>");}
  document.title+=` · v${version}`;
 };
})();
