'use strict';
(()=>{
 const versions=window.ELITE_VERSIONS,keys=Object.keys(versions),params=new URLSearchParams(location.search);
 const requested=params.get('version'),version=keys.includes(requested)?requested:keys.at(-1);
 const compare=keys.includes(params.get('compare'))?params.get('compare'):(version==='1.78'?'1.79':keys[keys.indexOf(version)-1]);
 window.ELITE_GUIDE=versions[version];window.ELITE_VERSION=version;
 for(const a of document.querySelectorAll('a[href="./"]'))a.href='?version='+version+'&compare='+compare+'#overview';
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const toolbar=document.createElement('section');toolbar.className='version-toolbar';toolbar.setAttribute('aria-label','Guide versions');
 toolbar.innerHTML=`<div><label for="guide-version">Reading version</label><select id="guide-version">${keys.map(k=>`<option value="${k}" ${k===version?'selected':''}>v${k}${k===keys.at(-1)?' · Latest':''}</option>`).join('')}</select></div><div><label for="compare-version">Compare against</label><select id="compare-version">${keys.map(k=>`<option value="${k}" ${k===compare?'selected':''}>v${k}</option>`).join('')}</select></div><p>${escape(versions[version].revision)}<br><small>Latest completed revision per version · HUD versioned separately</small></p>`;
 document.getElementById('main').prepend(toolbar);
 for(const id of ['guide-version','compare-version'])document.getElementById(id).addEventListener('change',()=>{
  const q=new URLSearchParams(location.search);q.set('version',document.getElementById('guide-version').value);q.set('compare',document.getElementById('compare-version').value);location.assign(location.pathname+'?'+q+location.hash);
 });
 const normalize=s=>String(s||'').replace(/v1\.(78|79|8)\b/g,'selected version');
 window.renderVersionComparison=id=>{
  const current=versions[version],other=versions[compare],items=d=>[...d.weapons,...d.shared];
  const selected=['overview','foundation'].includes(id)?items(current):items(current).filter(w=>w.id===id);
  const changes=[];
  for(const w of selected){const prior=items(other).find(x=>x.id===w.id);for(const r of w.rows){const p=prior?.rows.find(x=>x.label===r.label);if(normalize(p?.elite)!==normalize(r.elite))changes.push({section:w.name,id:w.id,label:r.label,before:p?.elite||'Not listed',after:r.elite});}}
  const panel=document.createElement('section');panel.className='version-changes panel';panel.setAttribute('aria-label','Changes between guide versions');
  panel.innerHTML=`<div class="comparison-title"><h2>${version===compare?'Same version selected':changes.length?'What changed here':'Unchanged between these versions'}</h2><span>v${escape(compare)} → v${escape(version)}</span></div>${requested&&!keys.includes(requested)?'<p role="status">That version is unavailable. Showing the latest supported version.</p>':''}<p>${version===compare?'Choose another version above to compare.':changes.length?'Values below compare the selected release revisions. Read from the comparison version to the version you are browsing.':'No documented gameplay or guide changes for this section between the selected release revisions.'}</p>${changes.length?`<div class="version-diffs">${changes.map(c=>`<article><a href="#${c.id}">${escape(c.section)}</a><h3>${escape(c.label)}</h3><div class="version-diff-values"><div><span>v${escape(compare)}</span><p>${escape(c.before)}</p></div><div><span>v${escape(version)}</span><p>${escape(c.after)}</p></div></div></article>`).join('')}</div>`:''}<details><summary>Release scope and package identity</summary><p>v1.78 preserves the published guide baseline. v1.79 uses its final linear-Flak revision. v1.8 uses the corrected interaction policy and final 875–1,750 UU Flak revision. Earlier same-version experiments are superseded. These are package defaults; server substitutions are separate. Later combat verification remains pending.</p><p>Reading v${version}: ${escape(current.revision)}</p><code>${current.packageSha256}</code><p>Comparing v${compare}: ${escape(other.revision)}</p><code>${other.packageSha256}</code><p><a href="./versions/${version}/comparison-data.json" download>Download v${version} data</a> · <a href="./versions/${compare}/comparison-data.json" download>Download v${compare} data</a></p></details>`;
  document.getElementById('content').prepend(panel);
  // Existing tools share unchanged models; update visible release labels without touching scripts.
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode())if(!['SCRIPT','STYLE'].includes(n.parentElement?.tagName)&&!n.parentElement?.closest('.version-toolbar,.version-changes'))n.textContent=n.textContent.replace(/v1\.78\b/g,'v'+version);
  document.querySelector('footer span').innerHTML=`Elite10K v${version} · Compared with authoritative B19<br>Package defaults, not a promise about every server.`;
  const download=document.querySelector('#sources a[download]');if(download)download.href=`./versions/${version}/comparison-data.json`;
  document.title+=` · v${version}`;
 };
})();
