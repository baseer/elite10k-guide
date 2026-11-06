'use strict';
function createRocketLoadingDemo({ring,button,slow,status,raf=requestAnimationFrame,caf=cancelAnimationFrame,now=()=>performance.now()}){
 let state='empty',busy=false,quarter=false,frame=0,disposed=false;
 // Loading grows clockwise; firing grows the cleared gray sweep clockwise from twelve o’clock.
 const progress=v=>{const n=Math.max(0,Math.min(1,v));ring.style.setProperty('--load-progress',`${n*100}%`);ring.style.setProperty('--clear-progress',`${(1-n)*100}%`);};
 function pulse(v){ring.classList.toggle('flashing',v>0);ring.style.setProperty('--pulse-strength',v);ring.style.setProperty('--pulse-scale',1+.04*v);ring.style.setProperty('--glow',`${24*v}px`);ring.style.setProperty('--spread',`${3*v}px`);}
 function controls(){button.disabled=busy;slow.disabled=busy;button.textContent=busy?(state==='firing'?'Firing rocket…':'Loading rocket…'):state==='loaded'?'Preview firing rocket':'Preview loading rocket';}
 function animate(duration,update,done){const start=now();const tick=t=>{if(disposed)return;const p=Math.min(1,(t-start)/duration);update(p);if(p<1)frame=raf(tick);else done();};frame=raf(tick);}
 function act(){
  if(busy||disposed)return;busy=true;const scale=quarter?4:1;
  if(state==='empty'){
   state='loading';controls();status.textContent='Loading: the ring fills while the center stays empty.';
   animate(1000*scale,progress,()=>{state='loaded';ring.classList.add('loaded');progress(1);status.textContent='Loaded: the center fills and the completion pulse flashes.';
    animate(150*scale,p=>pulse(Math.sin(p*Math.PI)),()=>{pulse(0);busy=false;controls();status.textContent='Rocket loaded. Preview firing to deplete the ring.';});});
  }else if(state==='loaded'){
   state='firing';ring.classList.add('firing');ring.classList.remove('loaded');controls();status.textContent='Firing: the center clears and the red ring clears clockwise over its dark gray backing.';
   animate(350*scale,p=>progress(1-p),()=>{state='empty';ring.classList.remove('firing');busy=false;progress(0);controls();status.textContent='Empty. Load another rocket to repeat.';});
  }
 }
 function toggle(){quarter=!quarter;slow.setAttribute('aria-pressed',String(quarter));slow.textContent=quarter?'¼ speed: on':'¼ speed: off';}
 progress(0);pulse(0);ring.classList.remove('loaded');controls();status.textContent='Empty. The center fills only when a rocket finishes loading.';
 button.addEventListener('click',act);slow.addEventListener('click',toggle);
 return {getState:()=>({state,busy,quarter}),dispose(){disposed=true;caf(frame);button.removeEventListener('click',act);slow.removeEventListener('click',toggle);}};
}
if(typeof module!=='undefined')module.exports={createRocketLoadingDemo};
if(typeof window!=='undefined')window.createRocketLoadingDemo=createRocketLoadingDemo;
