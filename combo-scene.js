'use strict';
// Dependency-free 3D geometry, projected into an antialiased canvas.
window.ComboScene=(()=>{
 const C={angle:'#b49aff',speed:'#9fe2b6',distance:'#83cde8',ink:'#eeeaf7',muted:'#aaa6ba'};
 function mount(canvas){
  const ctx=canvas.getContext('2d'),host=canvas.parentElement;
  let state={angle:30,speed:1000,separation:1.5},yaw=0,pitch=.67,width=900,height=470,scale=150,center=[0,0],items=[],drag=null,disposed=false;
  const project=([x,y,z])=>{const rx=x*Math.cos(yaw)-z*Math.sin(yaw),rz=x*Math.sin(yaw)+z*Math.cos(yaw);return{x:width/2+scale*rx-center[0],y:height/2+scale*(rz*Math.sin(pitch)-y*Math.cos(pitch))-center[1],depth:rz*Math.cos(pitch)+y*Math.sin(pitch)};};
  const line=(points,color,size=1.5,dash=[],arrow=false)=>{const p=points.map(project);items.push({depth:p.reduce((s,v)=>s+v.depth,0)/p.length,draw(){ctx.beginPath();p.forEach((v,i)=>i?ctx.lineTo(v.x,v.y):ctx.moveTo(v.x,v.y));ctx.strokeStyle=color;ctx.lineWidth=size;ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([]);if(arrow&&p.length>1){const b=p.at(-1),a=p.at(-2),t=Math.atan2(b.y-a.y,b.x-a.x);ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.lineTo(b.x-10*Math.cos(t-.4),b.y-10*Math.sin(t-.4));ctx.lineTo(b.x-10*Math.cos(t+.4),b.y-10*Math.sin(t+.4));ctx.closePath();ctx.fillStyle=color;ctx.fill();}}});};
  const shade=(hex,light)=>{const n=parseInt(hex.slice(1),16);return`rgb(${Math.round((n>>16)*light)},${Math.round(((n>>8)&255)*light)},${Math.round((n&255)*light)})`;};
  function box(at,size,color,transform=p=>p){
   const [x,y,z]=at,[w,h,d]=size;
   const corners=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]].map(([i,j,k])=>project(transform([x+i*w/2,y+j*h/2,z+k*d/2])));
   for(const [indices,light]of [[[0,1,2,3],.7],[[4,7,6,5],.9],[[0,4,5,1],.55],[[3,2,6,7],1.2],[[0,3,7,4],.8],[[1,5,6,2],1]]){
    const p=indices.map(i=>corners[i]);items.push({depth:p.reduce((s,v)=>s+v.depth,0)/4,draw(){ctx.beginPath();p.forEach((v,i)=>i?ctx.lineTo(v.x,v.y):ctx.moveTo(v.x,v.y));ctx.closePath();ctx.fillStyle=shade(color,light);ctx.fill();ctx.strokeStyle='#d9d1ff19';ctx.lineWidth=.7;ctx.stroke();}});
   }
  }
  function orb(at,r,color,glow=false){const p=project(at),radius=Math.max(2,r*scale);items.push({depth:p.depth+.01,draw(){if(glow){const g=ctx.createRadialGradient(p.x,p.y,1,p.x,p.y,radius*3.2);g.addColorStop(0,color+'88');g.addColorStop(1,color+'00');ctx.fillStyle=g;ctx.fillRect(p.x-radius*3.2,p.y-radius*3.2,radius*6.4,radius*6.4);}const g=ctx.createRadialGradient(p.x-radius*.3,p.y-radius*.4,0,p.x,p.y,radius);g.addColorStop(0,'#fff7ff');g.addColorStop(.32,'#e3c6ff');g.addColorStop(.8,color);g.addColorStop(1,'#644288');ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,radius,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#eee0ffb0';ctx.lineWidth=1;ctx.stroke();}});}
  function rounded(at,size,color,transform){
   const vertex=(t,p)=>project(transform([at[0]+size[0]*Math.sin(t)*Math.cos(p),at[1]+size[1]*Math.cos(t),at[2]+size[2]*Math.sin(t)*Math.sin(p)]));
   for(let j=0;j<6;j++)for(let i=0;i<12;i++){const t=j*Math.PI/6,t1=(j+1)*Math.PI/6,p=i*Math.PI/6,p1=(i+1)*Math.PI/6,points=[vertex(t,p),vertex(t1,p),vertex(t1,p1),vertex(t,p1)],light=.72+.28*Math.cos((t+t1)/2)+.15*Math.sin((p+p1)/2);items.push({depth:points.reduce((s,p)=>s+p.depth,0)/4,draw(){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.fillStyle=shade(color,light);ctx.fill();}});}
  }
  const text=(s,point,color=C.ink,dx=0,dy=0,align='left')=>{const p=project(point);ctx.font='500 14px Segoe UI, Arial, sans-serif';const w=ctx.measureText(s).width;let x=p.x+dx,y=p.y+dy;if(align==='center')x-=w/2;if(align==='right')x-=w;x=Math.max(12,Math.min(width-w-12,x));y=Math.max(22,Math.min(height-12,y));ctx.fillStyle='#13131de8';ctx.fillRect(x-5,y-17,w+10,24);ctx.fillStyle=color;ctx.fillText(s,x,y);return{x,y,w};};
  function render(){
   if(disposed)return;
   const dpr=Math.min(devicePixelRatio||1,2),rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;
   if(!width||!height)return;canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
   const a=state.angle*Math.PI/180,D=state.separation,px=D*Math.sin(a),pz=D*Math.cos(a),forward=[-Math.sin(a),0,-Math.cos(a)],right=[Math.cos(a),0,-Math.sin(a)];
   const local=([x,y,z])=>[px+x*right[0]+z*forward[0],y,pz+x*right[2]+z*forward[2]],player=[px,0,pz],core=[0,.43,0];
   // Orthographic framing preserves proportions; one world unit is one reference dodge length.
   scale=1;center=[0,0];
   const bounds=[];for(const x of [-.25,.25])for(const y of [0,.74])for(const z of [-.12,.44])bounds.push(local([x,y,z]));
   for(const x of [-.15,.15])for(const y of [.25,.6])for(const z of [-.15,.15])bounds.push([x,y,z]);
   bounds.push([0,.43,Math.max(pz+.4,.9)],[0,.43,-.65],[px-.65,0,pz],[px+.65,0,pz],[-.3,0,0]);
   const extent=bounds.map(project);
   const minX=Math.min(...extent.map(p=>p.x-width/2)),maxX=Math.max(...extent.map(p=>p.x-width/2)),minY=Math.min(...extent.map(p=>p.y-height/2)),maxY=Math.max(...extent.map(p=>p.y-height/2));
   scale=Math.min((width-100)/(maxX-minX),(height-90)/(maxY-minY));center=[scale*(minX+maxX)/2,scale*(minY+maxY)/2];
   const bg=ctx.createLinearGradient(0,0,0,height);bg.addColorStop(0,'#14141f');bg.addColorStop(1,'#1e1c29');ctx.fillStyle=bg;ctx.fillRect(0,0,width,height);items=[];
   const maxXGrid=Math.ceil((px+.6)*2)/2,maxZGrid=Math.ceil((pz+.6)*2)/2;
   for(let x=-.5;x<=maxXGrid;x+=.5)line([[x,0,-.5],[x,0,maxZGrid]],'#b9abdf14',1);
   for(let z=-.5;z<=maxZGrid;z+=.5)line([[-.5,0,z],[maxXGrid,0,z]],'#b9abdf14',1);
   // Flight stays straight along the forward axis, never following the shooter.
   const flightStart=[0,.43,Math.max(pz+.4,.9)],flightEnd=[0,.43,-.65];
   line([flightStart,core],C.angle+'65',1.6,[5,6]);line([core,flightEnd],C.angle,2.3,[],true);
   line([[0,0,0],core],C.angle+'50',1,[3,4]);
   const muzzle=local([0,.43,.38]);line([muzzle,core],C.angle,2,[7,5]);
   const r=Math.min(.4,D*.5),arc=[];for(let i=0;i<=30;i++){const t=a*i/30;arc.push([r*Math.sin(t),.43,r*Math.cos(t)]);}if(state.angle>0)line(arc,C.angle,2.8);
   // A separate ground-level ruler measures player-to-core separation.
   const offset=.22,side=[Math.cos(a),0,-Math.sin(a)],r0=[-side[0]*offset,.025,-side[2]*offset],r1=[px-side[0]*offset,.025,pz-side[2]*offset];
   line([r0,r1],C.distance,2);for(const base of [r0,r1])line([[base[0]-.065*side[0],.025,base[2]-.065*side[2]],[base[0]+.065*side[0],.025,base[2]+.065*side[2]]],C.distance,2);
   for(let tick=1;tick<D;tick++){const v=[r0[0]+tick*Math.sin(a),.025,r0[2]+tick*Math.cos(a)];line([[v[0]-.04*side[0],.025,v[2]-.04*side[2]],[v[0]+.04*side[0],.025,v[2]+.04*side[2]]],C.distance,1.5);}
   if(state.speed>0){const length=.15+.35*state.speed/1500;line([[px-.12,.055,pz],[px-.12-length,.055,pz]],C.speed,3,[],true);line([[px+.12,.055,pz],[px+.12+length,.055,pz]],C.speed,3,[],true);}
   // Armored player and stylized Shock Rifle are solid 3D meshes, not billboards.
   for(const x of [-.065,.065]){box([x,.04,0],[.09,.08,.17],'#33343e',local);box([x,.16,0],[.075,.21,.08],'#6b657b',local);box([x,.24,.005],[.085,.07,.1],'#9290a1',local);}
   box([0,.29,0],[.18,.08,.11],'#454253',local);box([0,.4,0],[.23,.2,.13],'#6e608f',local);box([0,.43,.075],[.14,.13,.03],'#a79bbf',local);box([0,.43,.096],[.075,.028,.012],'#a78cfa',local);
   rounded([0,.575,0],[.073,.088,.073],'#aaa2b5',local);box([0,.593,.067],[.115,.034,.025],'#70c3de',local);box([0,.655,0],[.035,.018,.09],'#534b64',local);
   for(const x of [-.145,.145]){rounded([x,.43,.015],[.06,.077,.065],'#998aaf',local);box([x*.7,.38,.11],[.075,.07,.18],'#aca2b7',local);}
   box([0,.425,.12],[.08,.08,.24],'#393644',local);box([0,.44,.21],[.1,.085,.14],'#a9a2b9',local);box([0,.435,.33],[.035,.042,.19],'#c4bdcf',local);box([-.045,.445,.3],[.02,.025,.13],'#786487',local);box([.045,.445,.3],[.02,.025,.13],'#786487',local);box([0,.5,.16],[.035,.035,.095],'#40394c',local);orb(local([0,.443,.215]),.036,C.angle,true);
   orb(core,.068,C.angle,true);const ring=[];for(let i=0;i<=50;i++){const t=i*Math.PI*2/50;ring.push([Math.cos(t)*.1,.43+Math.sin(t)*.07,Math.sin(t)*.045]);}line(ring,C.angle+'b0',1.3);
   items.sort((a,b)=>a.depth-b.depth);for(const item of items)item.draw();
   text('Shock core',core,C.angle,-15,-30,'right');text('Core flight',flightEnd,C.angle,12,0);
   const playerTop=local([0,.66,0]);text('Player + Shock Rifle',playerTop,C.ink,25,-12);
   if(width>540){text(`${state.angle}° angle`,[r*Math.sin(a/2),.43,r*Math.cos(a/2)],C.angle,24,14);text(`${D} dodge lengths`,[(r0[0]+r1[0])/2,.025,(r0[2]+r1[2])/2],C.distance,-18,5,'right');text('Sideways speed',[px,.02,pz],C.speed,0,38,'center');}
   const landmarks=[core,playerTop,player,muzzle,flightEnd].map(project);
   const snapshot={angle:state.angle,speed:state.speed,separation:D,player:[px,.43,pz],core,flight:[0,0,-1],sideways:[1,0,0],muzzle,view:{yaw,pitch},landmarks:landmarks.map(p=>[p.x/width,p.y/height])};canvas.dataset.geometry=JSON.stringify(snapshot);
   canvas.setAttribute('aria-label',`3D scene. Player holding a Shock Rifle, ${D} reference dodge lengths from the core. Core flies straight forward. Firing angle ${state.angle} degrees; sideways speed ${state.speed} UU per second. Drag or use arrow keys to turn the view.`);
  }
  function resize(){render();}
  const observer=new ResizeObserver(resize);observer.observe(canvas);
  const down=e=>{drag={x:e.clientX,y:e.clientY,yaw,pitch};canvas.setPointerCapture(e.pointerId);};
  const move=e=>{if(!drag)return;yaw=Math.max(-1.05,Math.min(1.05,drag.yaw+(e.clientX-drag.x)*.007));pitch=Math.max(.3,Math.min(1.18,drag.pitch+(e.clientY-drag.y)*.005));render();};
  const up=()=>{drag=null;};
  const key=e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key))return;e.preventDefault();if(e.key==='Home'){yaw=0;pitch=.67;}else if(e.key==='ArrowLeft')yaw=Math.max(-1.05,yaw-.1);else if(e.key==='ArrowRight')yaw=Math.min(1.05,yaw+.1);else pitch=Math.max(.3,Math.min(1.18,pitch+(e.key==='ArrowUp'?.08:-.08)));render();};
  const reset=()=>{yaw=0;pitch=.67;render();};
  canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);canvas.addEventListener('keydown',key);host.querySelector('.cm-reset-view').addEventListener('click',reset);
  return{update(next){state={...next};render();},dispose(){disposed=true;observer.disconnect();canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',up);canvas.removeEventListener('keydown',key);}};
 }
 return{mount};
})();
