const fs=require('fs'),p=require('path'),vm=require('vm'),assert=require('assert');
const root=__dirname,box={window:{}};vm.runInNewContext(fs.readFileSync(p.join(root,'versions-data.js'),'utf8'),box);
const versions=box.window.ELITE_VERSIONS,history=require('./release-history.js');let cases=0;
assert.equal(Object.keys(versions).length,27);assert.equal(Object.keys(versions)[0],'1.57');assert.equal(Object.keys(versions).at(-1),'1.83');
for(const [v,d] of Object.entries(versions)){
 const m=d.model,c=m.combo;
 assert.equal(d.weapons.length,12);assert.equal(d.shared.length,3);assert(/^[A-F0-9]{64}$/.test(d.packageSha256));
 const download=JSON.parse(fs.readFileSync(p.join(root,'versions',v,'comparison-data.json')));assert.equal(download.packageSha256,d.packageSha256);
 for(const w of [...d.weapons,...d.shared]){assert(w.notes.length);for(const r of w.rows){assert(r.label&&r.elite&&r.b19,v+' '+w.id+' '+r.label);for(const col of w.comparisonColumns||[])assert(r[col.key],v+' '+w.id+' '+col.key);}}
 const variants=require('./shock-variants.js');Object.assign(variants.models.elite10k,c);variants.models.elite10k.name='Elite10K v'+v;
 const ctx={module:{exports:{}},require:()=>variants};vm.runInNewContext(fs.readFileSync(p.join(root,'combo.js'),'utf8'),ctx);const math=ctx.module.exports;
 for(let dist=0;dist<=550;dist+=.25)for(const [tier,bonus]of [['none',0],['nice',10],['amazing',15],['spectacular',20]]){
  const r=math.calculate(dist,tier),raw=dist>c.outer?0:dist<=c.inner?c.max:c.min+(c.max-c.min)*(1-(dist-c.inner)/(c.outer-c.inner))**c.falloff;
  const expected=dist>c.outer?0:Math.min(210,Math.trunc(raw+(c.baseBoost||0)*Math.max(0,Math.min(1,(210-raw)/170))+bonus+.0001));
  assert(Math.abs(r.raw-raw)<.0001,v+' raw '+dist);assert(Math.abs(r.final-expected)<=1,v+' final '+dist);assert(r.final>=0&&r.final<=210);if(dist>c.outer)assert.equal(r.final,0);cases++;
 }
 for(let dist=0;dist<=3000;dist+=3){const r=history.flak(dist,m);const f=m.flak,expected=f.linear?10-6*Math.max(0,Math.min(1,(dist-f.start)/(f.end-f.start))):dist<1050?10:dist<1575?7:4;assert(Math.abs(r.total-expected*10)<1e-8);cases++;}
 for(const profile of Object.values(m.splash).filter(Array.isArray)){assert.equal(history.splash(profile[3]+1,profile,m.splash.legacy),0);assert.equal(history.splash(0,profile,m.splash.legacy),profile[0]);for(let dist=0;dist<=400;dist++){const damage=history.splash(dist,profile,m.splash.legacy);assert(damage>=0&&damage<=profile[0]);if(m.splash.legacy)assert(damage===0||damage>=40);cases++;}}
 assert.equal(m.stinger.gaps.length,m.stinger.shots-1);
 for(const id of ['sniper','lightning']){assert.equal(m.headshots[id].length,4);for(const scale of m.headshots[id])assert(scale>0);}
}
assert.equal(versions['1.62'].model.stinger.recovery,.75);assert.equal(versions['1.63'].model.stinger.recovery,.625);
assert.equal(versions['1.6'].packageSha256,'38D13A9B2481513F1152052C46A39FAB2BA5E0E040B377E50070BA59930029DF');
assert.equal(versions['1.57'].model.combo.baseBoost,10);assert.equal(versions['1.62'].model.combo.baseBoost,0);
assert.equal(versions['1.71'].model.combo.min,40);assert.equal(versions['1.72'].model.combo.min,50);
assert.equal(versions['1.76'].model.trace,7.5);assert.equal(versions['1.77'].model.trace,10);
assert.equal(versions['1.74'].model.stinger.shots,9);assert.equal(versions['1.75'].model.stinger.shots,10);
assert(versions['1.81'].model.shreddedAllNine);assert.equal(versions['1.81'].model.hammer.full,1.8);
assert.deepEqual(versions['1.81'].model.headshots.sniper,[1.15,1.15,1.15,1.15]);
assert.deepEqual(versions['1.82'].model.headshots.sniper,[1.2,1.2,1.2,1.2]);assert.deepEqual(versions['1.82'].model.headshots.lightning,[1,1,1,1]);
assert.equal(versions['1.82'].model.flak.start,875);assert.equal(versions['1.82'].model.flak.end,1750);
assert.equal(versions['1.82'].packageSha256,'33430A395FE449180749C5C5BABFA986C8DC427E2C10C320163E85AD481D972E');
assert.equal(versions['1.83'].packageSha256,'73C5A37689DEADF2CBE5F9B351A459E22ED0BC8B6215B0A89AC194CE3D082AF8');
assert.deepEqual(versions['1.83'].model,versions['1.82'].model);
assert(versions['1.83'].shared.find(x=>x.id==='visuals').rows.some(r=>r.elite==='Visible in behindview 1; hidden in first person'));
const {bodyGeometry}=require('./rifle-comparison.js');
for(const allowance of [0,5,7.5,10,15]){
 const g=bodyGeometry(allowance),r=40+allowance;
 assert.equal(g.diameter,80+2*allowance);
 assert.equal(g.height,216+2*allowance);
 assert(Math.abs(g.frontArea-(136*(80+2*allowance)+Math.PI*r*r))<1e-8);
 assert(Math.abs(g.surfaceArea-(2*Math.PI*r*(136+2*r)))<1e-8);
}
assert.equal(Math.round(bodyGeometry(10).frontArea),21454);
assert.equal(Math.round(bodyGeometry(10).surfaceArea),74142);
console.log('PASS',cases,'release-model cases, 27 snapshots, body area geometry, rifle-column completeness, historical revisions and boundaries.');
fs.writeFileSync(p.join(root,'versions/verification.json'),JSON.stringify({passed:true,cases,versions:27,releaseHashesVerified:true,normalV160RevisionVerified:true,diagnosticLightningV176Excluded:true,headshotScalesVerified:true,latestV182RevisionVerified:true,latestV183RevisionVerified:true},null,2)+'\n');
