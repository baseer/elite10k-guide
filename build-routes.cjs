const fs=require('fs'),vm=require('vm'),path=require('path');
const root=__dirname,html=fs.readFileSync(path.join(root,'index.html'),'utf8');
if(!html.includes('<base href="./">'))throw Error('Root entry point must use a relative base');
const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'versions-data.js'),'utf8'),context);
const ids=new Set(['overview','switch-times','combo','weapon-interactions']);
for(const d of Object.values(context.window.ELITE_VERSIONS))for(const w of [...d.weapons,...d.shared])ids.add(w.id);
for(const id of ids){fs.mkdirSync(path.join(root,id),{recursive:true});fs.writeFileSync(path.join(root,id,'index.html'),html.replace('<base href="./">','<base href="../">'));}
console.log(`Generated ${ids.size} GitHub Pages section entry points.`);
