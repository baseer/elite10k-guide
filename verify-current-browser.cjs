const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('assert');
const url=process.argv[2]||'http://localhost:8000/';
(async()=>{const browser=await chromium.launch(process.env.BROWSER_PATH?{executablePath:process.env.BROWSER_PATH,headless:true}:process.platform==='win32'?{channel:'msedge',headless:true}:{headless:true});
try{const page=await browser.newPage(),errors=[],checks=[];page.on('pageerror',e=>errors.push(String(e)));
for(const width of [1440,390])for(const section of ['overview','flak','rocket','movement','splash']){
 await page.setViewportSize({width,height:1000});await page.goto(new URL(section+'/?version=2.04',url).href);await page.waitForFunction(()=>window.ELITE_GUIDE?.version==='2.04');
 await page.locator('#content').waitFor();const d=await page.evaluate(()=>JSON.parse(JSON.stringify(window.ELITE_GUIDE)));
 assert.equal(d.packageSha256,'31C8D6DE82A973A6D95926548458916F14A5A71F301C09DB3721831AFBE174EB');
 const text=await page.locator('main').innerText();if(section==='flak')assert(text.includes('3,087.5')&&text.includes('6,536'));
 if(section==='rocket')assert(text.includes('2,960 / 4,810'));if(section==='movement')assert(text.includes('10kMovementSettings'));
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),section+' horizontal overflow');checks.push({width,section});
 if(process.env.SCREENSHOT_DIR&&section==='flak')await page.screenshot({path:require('path').join(process.env.SCREENSHOT_DIR,`current-flak-${width}.png`),fullPage:true});
}
await page.goto(new URL('flak/?version=2.03',url).href);await page.waitForFunction(()=>window.ELITE_GUIDE?.version==='2.03');assert.equal(await page.evaluate(()=>window.ELITE_GUIDE.model.flakBall.percentB19),93.5);
assert.deepEqual(errors,[]);console.log(JSON.stringify({passed:true,url,checks,olderVersionVerified:'2.03',pageErrors:errors}));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1);});
