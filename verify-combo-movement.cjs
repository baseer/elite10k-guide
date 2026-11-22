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
   const geometry=JSON.parse(await page.locator('#cm-scene-canvas').getAttribute('data-geometry'));
   assert.deepEqual(geometry.flight,[0,0,-1]);assert.deepEqual(geometry.sideways,[1,0,0]);
   const delta=geometry.core.map((v,i)=>v-geometry.player[i]),length=Math.hypot(...delta);
   assert(Math.abs(length-separation)<1e-9,'3D player-to-core separation matches dodge length input');
   assert(Math.abs(Math.acos(Math.max(-1,Math.min(1,-delta[2]/length)))*180/Math.PI-angle)<1e-6,'3D firing angle matches control');
   assert.equal(geometry.speed,speed);assert.equal(await page.locator('#cm-scene-angle').innerText(),angle+'°');
   assert(geometry.landmarks.every(([x,y])=>x>0&&x<1&&y>0&&y<1),'player, rifle and core are framed at input extremes');
   const share=page.url();await page.reload();assert.equal(await page.locator('#angle-number').inputValue(),String(angle));assert.equal(await page.locator('#old-result').innerText(),Number(score.toFixed(2)).toLocaleString('en-US'));
  }
  await page.locator('[data-speed="940"]').click();assert.equal(await page.locator('#side-speed-number').inputValue(),'940');assert.equal(await page.locator('[data-speed="940"]').getAttribute('aria-pressed'),'true');
  await page.locator('#angle-slider').focus();await page.locator('#angle-slider').press('ArrowRight');assert.equal(await page.locator('#angle-number').inputValue(),'30');
  const score=Number((await page.locator('#old-result').innerText()).replace(/,/g,''));await page.locator('#apply-movement-score').click();
  assert(Math.abs(Number(await page.locator('#score-number').inputValue())-score)<.051,'apply score to combo');assert.equal(await page.locator('#score-number').evaluate(e=>document.activeElement===e),true);
  await page.reload();assert(Math.abs(Number(await page.locator('#score-number').inputValue())-score)<.051,'applied score survives reload');
  await page.goto(new URL('combo/?version=1.57&angle=30&separation=1.5&side-speed=1000',base).href);assert.equal(await page.locator('#old-result').innerText(),'24.6');assert.equal(await page.locator('#new-result').innerText(),'Amazing');
  await page.goto(new URL('combo/',base).href);await page.locator('#movement-info>summary').click();assert.equal(await page.locator('.cm-card').count(),3);
  const scene=page.locator('#cm-scene-canvas');await scene.focus();await scene.press('ArrowRight');assert(JSON.parse(await scene.getAttribute('data-geometry')).view.yaw>0);
  await page.locator('.cm-reset-view').click();assert.equal(JSON.parse(await scene.getAttribute('data-geometry')).view.yaw,0);
  const bounds=await scene.boundingBox();await page.mouse.move(bounds.x+bounds.width/2,bounds.y+bounds.height/2);await page.mouse.down();await page.mouse.move(bounds.x+bounds.width/2+45,bounds.y+bounds.height/2+10);await page.mouse.up();assert(JSON.parse(await scene.getAttribute('data-geometry')).view.yaw>0);await page.locator('.cm-reset-view').click();
  if(screens){await page.setViewportSize({width:1440,height:1100});await page.locator('.cm-scene').screenshot({path:path.join(screens,'combo-scene-3d-desktop.png')});}
  await page.evaluate(()=>GuideURL.go('shock'));await page.evaluate(()=>GuideURL.go('combo'));await page.locator('#movement-info>summary').click();await scene.waitFor();assert.equal(await scene.count(),1,'scene reinitializes after navigation');
  assert.deepEqual(errors,[]);console.log(JSON.stringify({passed:true,layouts:checks,inputScenarios:5,shareReload:true,keyboard:true,presets:true,applyScore:true,historicalVersion:true,pageErrors:errors},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
