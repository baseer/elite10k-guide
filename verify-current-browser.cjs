const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('assert');
const url=process.argv[2]||'http://localhost:8000/';
(async()=>{const browser=await chromium.launch(process.env.BROWSER_PATH?{executablePath:process.env.BROWSER_PATH,headless:true}:process.platform==='win32'?{channel:'msedge',headless:true}:{headless:true});
try{const page=await browser.newPage(),errors=[],checks=[];page.on('pageerror',e=>errors.push(String(e)));
for(const width of [1440,390])for(const section of ['overview','flak','rocket','sniper','visuals','foundation','movement','splash']){
 await page.setViewportSize({width,height:1000});await page.goto(new URL(section+'/?version=2.08',url).href);await page.waitForFunction(()=>window.ELITE_GUIDE?.version==='2.08');
 await page.locator('#content').waitFor();const d=await page.evaluate(()=>JSON.parse(JSON.stringify(window.ELITE_GUIDE)));
 assert.equal(d.model.rocketRingOpacity.default,.925);assert.equal(d.packageSha256,'E7D8F395D220786A34E43691B28556B56B45FCF65A29397FEE0507850EA1886D');
 const text=await page.locator('main').innerText();if(section==='flak')assert(text.includes('3,055')&&text.includes('6,467.2'));
 if(section==='sniper'){await page.locator('[data-rifle-mode=head]').click();assert.equal(await page.locator('#rifle-results tbody tr').first().locator('td').last().innerText(),'125');} if(section==='visuals')assert(text.includes('Shock 190°')&&text.includes('Stinger 237.5°')); if(section==='rocket')assert(text.includes('2,928 / 4,758'));if(section==='movement')assert(text.includes('10kMovementSettings'));
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),section+' horizontal overflow');checks.push({width,section});
 if(process.env.SCREENSHOT_DIR&&section==='sniper')await page.screenshot({path:require('path').join(process.env.SCREENSHOT_DIR,`current-sniper-${width}.png`),fullPage:true});
}
await page.goto(new URL('flak/?version=2.03',url).href);await page.waitForFunction(()=>window.ELITE_GUIDE?.version==='2.03');assert.equal(await page.evaluate(()=>window.ELITE_GUIDE.model.flakBall.percentB19),93.5);
await page.goto(new URL('sniper/?version=2.07',url).href);await page.waitForFunction(()=>window.ELITE_GUIDE?.version==='2.07');await page.locator('[data-rifle-mode=head]').click();assert.equal(await page.locator('#rifle-results tbody tr').first().locator('td').last().innerText(),'140');await page.goto(new URL('combo/',url).href);await page.waitForFunction(()=>window.ELITE_GUIDE?.version==='2.08');assert.equal(new URL(page.url()).searchParams.get('version'),null);assert.equal(await page.evaluate(()=>window.ELITE_GUIDE.model.rocketRingOpacity.default),.925);await page.goto(new URL('rocket/?version=2.04',url).href);await page.waitForFunction(()=>window.ELITE_GUIDE?.version==='2.04');assert.equal(await page.evaluate(()=>window.ELITE_GUIDE.model.rocketRingOpacity.default),.875);assert.deepEqual(errors,[]);console.log(JSON.stringify({passed:true,url,checks,olderVersionVerified:'2.03',pageErrors:errors}));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1);});
