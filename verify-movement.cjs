const assert=require('assert'),M=require('./movement-lab.js'),data=require('./comparison-data.json'),profiles=data.model.groundMovement.profiles;
let cases=0;
for(const p of profiles)for(const mode of ['accelerate','stop','reverse'])for(const startPercent of [0,10,25,50,75,100]){
 const r=M.simulate(p,{mode,startPercent});assert(r.completed!==null);assert(r.event.path>=0);assert(r.samples.every(s=>Math.abs(s.v)<=940+1e-9));
 for(let i=1;i<r.samples.length;i++){const a=r.samples[i-1],b=r.samples[i];assert(b.path>=a.path);if(mode==='accelerate')assert(b.v>=a.v);else assert(b.v<=a.v+1e-9);if(mode==='stop')assert(b.v>=0);}
 if(mode==='reverse'){assert(r.zero>=0&&r.zero<=r.completed);assert(r.samples.at(-1).v===-940);}
 const finer=M.simulate(p,{mode,startPercent,dt:.00025});assert(Math.abs(r.completed-finer.completed)<.004,p.id+mode+' step convergence');cases++;
}
const constant={...profiles[0],maxSpeed:100,acceleration:100,fastAcceleration:100,fastThreshold:200,friction:0,braking:100,brakeFriction:0,stopThreshold:0};
assert(Math.abs(M.simulate(constant,{mode:'accelerate',dt:.001,horizon:3}).completed-1)<.002);
assert(Math.abs(M.simulate(constant,{mode:'reverse',startPercent:100,dt:.001,horizon:3}).completed-2)<.002);
const p=profiles[0],stop=M.simulate(p,{mode:'stop',startPercent:100});const exact=Math.log((940+p.braking/10)/(p.stopThreshold+p.braking/10))/10;assert(Math.abs(stop.completed-exact)<.003);
assert.equal(M.simulate(profiles[0],{mode:'stop',startPercent:100}).completed,M.simulate(profiles[1],{mode:'stop',startPercent:100}).completed);
for(const mode of ['accelerate','stop','reverse'])assert(M.simulate(profiles.find(p=>p.id==="elite"),{mode,startPercent:mode==='accelerate'?0:100}).completed<M.simulate(profiles[0],{mode,startPercent:mode==='accelerate'?0:100}).completed);
console.log(JSON.stringify({passed:true,profileScenarios:cases,analyticAccelerationAndReversal:true,analyticReleaseBraking:true,timestepConvergence:true}));
