const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('assert'),path=require('path');
const base=process.argv[2]||'http://127.0.0.1:8781/',screens=process.env.SCREENSHOT_DIR;
(async()=>{
 const browser=await chromium.launch(process.platform==='win32'?{channel:'msedge',headless:true}:{headless:true});
 const errors=[],checks=[];
 try{
  const page=await browser.newPage();page.on('pageerror',e=>errors.push(String(e)));
  const url=new URL('combo/?distance=253&score=0&health=100&angle=29&separation=3&side-speed=1066#section-calculate-your-movement-score',base).href;
  for(const width of [1440,1200,1024,768,390,320]){
   await page.setViewportSize({width,height:1100});await page.goto(url);await page.locator('.cm-lab').waitFor();
   assert.equal(await page.locator('#angle-number').inputValue(),'29');
   assert.equal(await page.locator('#side-speed-number').inputValue(),'1066');
   assert.equal(await page.locator('#separation-number').inputValue(),'3');
   assert.equal(await page.locator('#old-result').innerText(),Number(((100*(1-Math.cos(29*Math.PI/180))+3*1066/1000)*2).toFixed(2)).toLocaleString('en-US'));
   assert.equal(await page.locator('#cm-distance-detail').innerText(),'2× multiplier · ≈ 2,089.14 UU');
   const layout=await page.evaluate(()=>{
    const box=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom};};
    return{overflow:document.documentElement.scrollWidth>innerWidth+1,cards:[...document.querySelectorAll('.cm-card')].map(box),sliders:[...document.querySelectorAll('.cm-card input[type=range]')].map(box),buttons:[...document.querySelectorAll('.cm-card [data-speed]')].map(box),anchor:document.getElementById('section-calculate-your-movement-score').getBoundingClientRect().top,svgLabels:[...document.querySelectorAll('.cm-card svg text')].map(e=>({text:e.textContent,box:box(e),svg:box(e.closest('svg'))}))};
   });
   assert(!layout.overflow,`${width}: page overflow`);assert(layout.anchor>=0&&layout.anchor<60,`${width}: direct section anchor`);
   if(Math.max(...layout.cards.map(c=>c.y))-Math.min(...layout.cards.map(c=>c.y))<1){assert(Math.max(...layout.sliders.map(c=>c.y))-Math.min(...layout.sliders.map(c=>c.y))<1,'aligned sliders');}
   else for(let i=1;i<3;i++)assert(layout.cards[i].y>=layout.cards[i-1].bottom-1,'stacked cards');
   for(let i=1;i<layout.buttons.length;i++)if(Math.abs(layout.buttons[i].y-layout.buttons[i-1].y)<1)assert(layout.buttons[i].x>=layout.buttons[i-1].right-1,'speed preset overlap');
   for(const label of layout.svgLabels)assert(label.box.x>=label.svg.x-1&&label.box.right<=label.svg.right+1,`${width}: SVG label ${label.text} clipped`);
   if(screens)await page.locator('.cm-lab').screenshot({path:path.join(screens,`combo-movement-${width}.png`)});
   checks.push({width,aligned:true,noOverflow:true,anchor:true});
  }
  for(const [angle,speed,separation]of [[0,0,.5],[0,1500,1],[30,1000,1.5],[90,1500,3],[29,1066,3]]){
   for(const [id,value]of [['angle',angle],['side-speed',speed],['separation',separation]]){await page.locator('#'+id+'-number').fill(String(value));await page.locator('#'+id+'-number').press('Tab');}
   const score=(100*(1-Math.cos(angle*Math.PI/180))+3*speed/1000)*Math.max(1,Math.min(2,separation));
   assert.equal(await page.locator('#old-result').innerText(),Number(score.toFixed(2)).toLocaleString('en-US'));
   assert.equal(await page.locator('#new-result').innerText(),score>=32?'Spectacular':score>=20?'Amazing':score>=8?'Nice':'No tier');
   assert((await page.locator('#cm-angle-desc').textContent()).includes(`${angle} degree`));
   assert.equal(await page.locator('#cm-angle-core-path').getAttribute('d'),'M100 174V20','angle diagram core flies bottom to top');
   assert.equal(await page.locator('#cm-distance-core').getAttribute('transform'),`translate(140 ${165-45*separation})`,'distance core stays above the player');
   const graphicBounds=await page.locator('.cm-card svg').evaluateAll(svgs=>svgs.every(svg=>{const outer=svg.getBoundingClientRect();return [...svg.querySelectorAll('text')].every(t=>{const r=t.getBoundingClientRect();return r.left>=outer.left-1&&r.right<=outer.right+1&&r.top>=outer.top-1&&r.bottom<=outer.bottom+1;});}));
   assert(graphicBounds,'rotated labels remain inside each diagram at input extremes');
   assert.equal(await page.locator('#cm-speed-vector').evaluate(e=>Number(getComputedStyle(e).opacity)),speed?1:0);
   assert.equal(await page.locator('#cm-speed-vector').getAttribute('d'),`M${140-104*speed/1500} 150H${140+104*speed/1500}`,'player moves left/right across the vertical core path');
   assert.equal(await page.locator('#cm-speed-core-path').getAttribute('d'),'M140 133V22','core travels straight from bottom to top');
   const share=page.url();await page.reload();assert.equal(await page.locator('#angle-number').inputValue(),String(angle));assert.equal(await page.locator('#old-result').innerText(),Number(score.toFixed(2)).toLocaleString('en-US'));
  }
  await page.locator('[data-speed="940"]').click();assert.equal(await page.locator('#side-speed-number').inputValue(),'940');assert.equal(await page.locator('[data-speed="940"]').getAttribute('aria-pressed'),'true');
  await page.locator('#angle-slider').focus();await page.locator('#angle-slider').press('ArrowRight');assert.equal(await page.locator('#angle-number').inputValue(),'30');
  const score=Number((await page.locator('#old-result').innerText()).replace(/,/g,''));await page.locator('#apply-movement-score').click();
  assert(Math.abs(Number(await page.locator('#score-number').inputValue())-score)<.051,'apply score to combo');assert.equal(await page.locator('#score-number').evaluate(e=>document.activeElement===e),true);
  await page.reload();assert(Math.abs(Number(await page.locator('#score-number').inputValue())-score)<.051,'applied score survives reload');
  await page.goto(new URL('combo/?version=1.57&angle=30&separation=1.5&side-speed=1000',base).href);assert.equal(await page.locator('#old-result').innerText(),'24.6');assert.equal(await page.locator('#new-result').innerText(),'Amazing');
  await page.goto(new URL('combo/',base).href);await page.locator('#movement-info>summary').click();assert.equal(await page.locator('.cm-card').count(),3);
  assert.deepEqual(errors,[]);console.log(JSON.stringify({passed:true,layouts:checks,inputScenarios:5,shareReload:true,keyboard:true,presets:true,applyScore:true,historicalVersion:true,pageErrors:errors},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
