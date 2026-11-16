const assert=require('assert'),M=require('./movement-lab.js');let scenarios=0;
for(const version of ['2.0','2.01','2.02'])for(const p of require('./versions/'+version+'/comparison-data.json').model.groundMovement.profiles){
 const instant=M.simulate(p,{mode:'reverse',startPercent:100});
 for(const gap of [0,.03,.0305,.2,.3]){
  const run=M.simulate(p,{mode:'reverse',startPercent:100,neutralGap:gap});assert(run.completed!==null);assert(run.zero<=run.completed);assert(run.completed>=gap);assert.equal(run.samples.at(-1).v,-940);
  for(const sample of run.samples.filter(s=>s.t<=gap)){assert(sample.v>=0);assert(Math.abs(sample.v-M.sampleAt(M.simulate(p,{mode:'stop',startPercent:100}),sample.t).v)<1e-9);}
  const finer=M.simulate(p,{mode:'reverse',startPercent:100,neutralGap:gap,dt:.00025});assert(Math.abs(run.completed-finer.completed)<.004);
  if(gap===0)assert.deepEqual(run.samples,instant.samples);
  scenarios++;
 }
 assert.deepEqual(M.simulate(p,{mode:'accelerate',neutralGap:.03}),M.simulate(p,{mode:'accelerate'}));
 assert.deepEqual(M.simulate(p,{mode:'stop',startPercent:100,neutralGap:.03}),M.simulate(p,{mode:'stop',startPercent:100}));
}
const v20=require('./versions/2.0/comparison-data.json').model.groundMovement.profiles[2],v201=require('./versions/2.01/comparison-data.json').model.groundMovement.profiles[2];
assert(M.sampleAt(M.simulate(v20,{mode:'reverse',startPercent:100,neutralGap:.03}),.03).v<M.sampleAt(M.simulate(v201,{mode:'reverse',startPercent:100,neutralGap:.03}),.03).v);
console.log(JSON.stringify({passed:true,scenarios,zeroGapPreserved:true,neutralPhaseMatchesReleaseBraking:true,fractionalBoundary:true,bothVersions:true}));

