"use strict";
const PLAN=[
["Отжимания",2,15,null,"reps","свой вес"],["Обратные скручивания",2,15,null,"reps","без веса"],["Тяга гантели с опорой",3,10,16,"perSide","на руку"],["Мёртвый жук",2,15,null,"perSide","на сторону"],["Жим гантелей лёжа",2,15,14.5,"reps","кг/гантель"],["Жим гантелей узко лёжа",2,12,8,"reps","кг/гантель"],["Ягодичный мост",3,20,null,"reps","без веса"],["Жим гантелей вверх сидя",2,10,15,"reps","до 15 кг"],["Сгибания на бицепс сидя",2,10,15,"perSide","на руку"],["Молотковые сгибания",2,10,15,"perSide","на руку"],["Разгибание на трицепс лёжа",2,15,7,"reps","кг"],["Разведения в стороны сидя",2,12,4,"reps","4–5 кг"],["Обратные разведения сидя",2,12,3,"reps","3–4 кг"],["Шраги сидя",3,15,12,"reps","кг/гантель"],["Прямые скручивания",3,15,null,"reps","без веса"],["Планка",2,30,null,"seconds","секунды"]];
const KEY="food-diary-pwa-session-v1";
const fresh=()=>({schemaVersion:1,id:crypto.randomUUID(),date:"2026-11-15",source:"plans/workout-2026-11-15.md",status:"planned",startedAt:null,endedAt:null,sessionPausedAt:null,sessionPausedMs:0,activeSetStart:null,activeSetAccumMs:0,activeSetId:null,restDeadline:null,restRemainingMs:90000,restSeconds:90,activeRestSetId:null,restStartedAt:null,restAccumMs:0,exercises:PLAN.map((p,i)=>({id:"exercise-"+i,name:p[0],unit:p[4],sets:Array.from({length:p[1]},(_,j)=>({id:"set-"+i+"-"+j,plannedWeightKg:p[3],plannedValue:p[2],weightKg:p[3],value:p[2],completed:false,durationMs:null,restMs:null,restSeconds:90,completedAt:null}))}))});
let data;try{data=JSON.parse(localStorage.getItem(KEY))}catch{}if(!data||data.schemaVersion!==1)data=fresh();
if(data.activeRestSetId===undefined)data.activeRestSetId=null;
if(data.restStartedAt===undefined)data.restStartedAt=null;
if(data.restAccumMs===undefined)data.restAccumMs=0;
for(const ex of data.exercises)for(const set of ex.sets)if(set.restSeconds===undefined)set.restSeconds=data.restSeconds||90;
const $=id=>document.getElementById(id),fmt=ms=>{const s=Math.max(0,Math.floor(ms/1000));return (s>=3600?String(Math.floor(s/3600)).padStart(2,"0")+":":"")+String(Math.floor(s/60)%60).padStart(2,"0")+":"+String(s%60).padStart(2,"0")};
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(data));$("status").textContent="Локально сохранено"}catch(e){$("status").textContent="Ошибка сохранения: "+e.message}};
const esc=x=>String(x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function render(){
const opened=[...document.querySelectorAll("#exercises details")].map((e,i)=>e.open?i:-1).filter(i=>i>=0);
$("exercises").innerHTML=data.exercises.map((ex,i)=>'<details class="panel exercise" '+(i===0?'open':'')+'><summary>'+esc((i+1)+". "+ex.name)+' <small>'+ex.sets.filter(s=>s.completed).length+'/'+ex.sets.length+' подходов</small></summary><div class="set sethead"><span>№</span><span>Вес, кг</span><span>'+(ex.unit==="seconds"?"Секунды":"Повторы")+'</span><span>✓</span></div>'+ex.sets.map((s,j)=>'<div class="set"><span>'+(j+1)+'</span><input aria-label="Вес" type="number" min="0" step="0.5" data-i="'+i+'" data-j="'+j+'" data-field="weightKg" value="'+(s.weightKg??"")+'" placeholder="—"><input aria-label="Повторы или секунды" type="number" min="0" step="1" data-i="'+i+'" data-j="'+j+'" data-field="value" value="'+s.value+'"><input aria-label="Подход выполнен" type="checkbox" data-i="'+i+'" data-j="'+j+'" data-field="completed" '+(s.completed?"checked":"")+'></div><div class="flex" style="margin-top:8px;flex-wrap:wrap"><small class="muted">Подход: '+(s.durationMs===null?"—":fmt(s.durationMs))+'</small><button type="button" class="btn set-timer" data-timer-i="'+i+'" data-timer-j="'+j+'">▶ Подход</button><button type="button" class="btn set-done" data-done-i="'+i+'" data-done-j="'+j+'">✓ Завершить</button></div><div class="flex" style="margin-top:8px;gap:8px;flex-wrap:wrap"><label style="font-size:13px">Отдых, сек <input aria-label="Отдых после подхода, секунды" style="width:85px" type="number" min="0" max="3600" step="5" data-i="'+i+'" data-j="'+j+'" data-field="restSeconds" value="'+s.restSeconds+'"></label><button type="button" class="btn rest-set" data-rest-i="'+i+'" data-rest-j="'+j+'">▶ Отдых</button><small class="muted rest-value" data-rest-i="'+i+'" data-rest-j="'+j+'">'+(s.restMs===null?"Не начат":fmt(s.restMs))+'</small></div>').join("")+'</details>').join("");
if(opened.length)document.querySelectorAll("#exercises details").forEach((e,i)=>e.open=opened.includes(i));
$("restchoice").value=String(data.restSeconds);update();
}
function elapsed(){if(!data.startedAt)return 0;const end=data.endedAt||Date.now();return Math.max(0,end-data.startedAt-data.sessionPausedMs-(data.sessionPausedAt?end-data.sessionPausedAt:0))}
function update(){
updateTimedOverlay();
const n=data.exercises.reduce((sum,e)=>sum+e.sets.filter(s=>s.completed).length,0);$("count").textContent=n+" / 36";$("progress").style.width=(100*n/36)+"%";$("total").textContent=fmt(elapsed());
$("setclock").textContent=fmt(data.activeSetAccumMs+(data.activeSetStart?Date.now()-data.activeSetStart:0));
document.querySelectorAll(".set-timer").forEach(b=>{const x=data.exercises[+b.dataset.timerI].sets[+b.dataset.timerJ];const active=data.activeSetId===x.id;b.textContent=active?(data.activeSetStart?"⏸ "+fmt(data.activeSetAccumMs+Date.now()-data.activeSetStart):"▶ "+fmt(data.activeSetAccumMs)):"▶ Подход"});
document.querySelectorAll(".rest-set").forEach(b=>{const x=data.exercises[+b.dataset.restI].sets[+b.dataset.restJ];const active=data.activeRestSetId===x.id;b.textContent=active?(data.restStartedAt?"⏸ Отдых":"▶ Продолжить"):"▶ Отдых";const label=b.parentElement.querySelector(".rest-value");if(label){const passed=active?data.restAccumMs+(data.restStartedAt?Date.now()-data.restStartedAt:0):(x.restMs||0);label.textContent=active?fmt(Math.max(0,x.restSeconds*1000-passed))+" осталось":(x.restMs===null?"Не начат":fmt(x.restMs)+" факт")}}
);
const activeRest=data.exercises.flatMap(e=>e.sets).find(x=>x.id===data.activeRestSetId);const restPassed=data.restAccumMs+(data.restStartedAt?Date.now()-data.restStartedAt:0);
$("restclock").textContent=activeRest?fmt(Math.max(0,activeRest.restSeconds*1000-restPassed)):fmt(data.restSeconds*1000);$("restlabel").textContent=activeRest?activeRest.restSeconds:data.restSeconds;
$("session").textContent=!data.startedAt?"Начать тренировку":data.endedAt?"Завершена":data.sessionPausedAt?"Продолжить":"Пауза";
$("settoggle").textContent=data.activeSetStart?"Пауза текущего подхода":data.activeSetId?"Продолжить текущий":"Начать следующий";
$("resttoggle").textContent=activeRest?(data.restStartedAt?"Пауза отдыха":"Продолжить отдых"):"Начать отдых";
if(activeRest&&data.restStartedAt&&restPassed>=activeRest.restSeconds*1000){stopRest();save();update()}
}
function ensureSession(){if(!data.startedAt){data.startedAt=Date.now();data.status="in_progress"}}
function pauseActive(){if(data.activeSetStart){data.activeSetAccumMs+=Date.now()-data.activeSetStart;data.activeSetStart=null}}
function stopRest(){if(!data.activeRestSetId)return;const x=data.exercises.flatMap(e=>e.sets).find(v=>v.id===data.activeRestSetId);if(data.restStartedAt){data.restAccumMs+=Date.now()-data.restStartedAt;data.restStartedAt=null}if(x)x.restMs=(x.restMs||0)+data.restAccumMs;data.activeRestSetId=null;data.restAccumMs=0;data.restDeadline=null}
function restFor(i,j){if(data.endedAt)return;const x=data.exercises[i].sets[j];ensureSession();if(data.activeRestSetId===x.id){if(data.restStartedAt){data.restAccumMs+=Date.now()-data.restStartedAt;data.restStartedAt=null}else data.restStartedAt=Date.now()}else{stopRest();data.activeRestSetId=x.id;data.restAccumMs=0;data.restStartedAt=Date.now()}save();update()}
function timerFor(i,j){if(data.endedAt)return;const target=data.exercises[i].sets[j];if(target.completed)return;ensureSession();if(data.activeSetId===target.id){if(data.activeSetStart)pauseActive();else data.activeSetStart=Date.now()}else{if(data.activeSetId!==null){pauseActive();const previous=data.exercises.flatMap(e=>e.sets).find(x=>x.id===data.activeSetId);if(previous&&data.activeSetAccumMs)previous.durationMs=(previous.durationMs||0)+data.activeSetAccumMs}data.activeSetId=target.id;data.activeSetAccumMs=0;data.activeSetStart=Date.now()}stopRest();save();if(data.exercises[i].unit==="seconds"){openTimedOverlay(i,j);if(data.activeSetStart)startSound()}update()}
function completeSet(i,j,checked){const target=data.exercises[i].sets[j];target.completed=checked;target.completedAt=checked?new Date().toISOString():null;if(checked){ensureSession();if(data.activeSetId===target.id){pauseActive();target.durationMs=(target.durationMs||0)+data.activeSetAccumMs;data.activeSetId=null;data.activeSetAccumMs=0}stopRest();data.activeRestSetId=target.id;data.restAccumMs=0;data.restStartedAt=Date.now()}save();render()}

let audioContext=null, soundEnabled=localStorage.getItem("workout-sound-enabled")!=="false";
function audioReady(){if(!soundEnabled)return null;try{audioContext??=new (window.AudioContext||window.webkitAudioContext)();if(audioContext.state==="suspended")audioContext.resume().catch(()=>{});return audioContext}catch{return null}}
function tone(freq,at,duration,volume=0.13,type="sine"){const ctx=audioReady();if(!ctx)return;const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type=type;osc.frequency.setValueAtTime(freq,at);gain.gain.setValueAtTime(0.0001,at);gain.gain.exponentialRampToValueAtTime(volume,at+0.012);gain.gain.exponentialRampToValueAtTime(0.0001,at+duration);osc.connect(gain).connect(ctx.destination);osc.start(at);osc.stop(at+duration+0.02)}
function startSound(){const ctx=audioReady();if(!ctx)return;const t=ctx.currentTime+0.03;tone(740,t,0.12);tone(740,t+0.24,0.12);tone(1046,t+0.5,0.38,0.18)}
function gongSound(){const ctx=audioReady();if(!ctx)return;const t=ctx.currentTime+0.02;for(const [f,v,d] of [[392,.16,2.2],[587.3,.08,1.7],[784,.05,1.3],[1046.5,.025,.9]]){const osc=ctx.createOscillator(),g=ctx.createGain();osc.type="sine";osc.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.025);g.gain.exponentialRampToValueAtTime(.0001,t+d);osc.connect(g).connect(ctx.destination);osc.start(t);osc.stop(t+d+.03)}}
let timedGongSetId=null;
function refreshSoundButton(){$("timed-sound").textContent=soundEnabled?"🔊 Звук включён":"🔇 Без звука"}
$("timed-sound").onclick=()=>{soundEnabled=!soundEnabled;localStorage.setItem("workout-sound-enabled",String(soundEnabled));if(soundEnabled)audioReady();refreshSoundButton()};
let timedOverlay=null;
function openTimedOverlay(i,j){
 const set=data.exercises[i].sets[j],ex=data.exercises[i];
 if(ex.unit!=="seconds")return;
 timedOverlay={i,j};
 timedGongSetId=null;
 refreshSoundButton();
 $("timed-name").textContent=ex.name+" · подход "+(j+1);
 $("timed-overlay").hidden=false;
 document.body.classList.add("timed-open");
 updateTimedOverlay();
}
function closeTimedOverlay(){
 timedOverlay=null;$("timed-overlay").hidden=true;document.body.classList.remove("timed-open");
}
function updateTimedOverlay(){
 if(!timedOverlay)return;
 const {i,j}=timedOverlay,set=data.exercises[i].sets[j];
 const duration=Math.max(1,Number(set.value)||30)*1000;
 const active=data.activeSetId===set.id;
 const passed=active?data.activeSetAccumMs+(data.activeSetStart?Date.now()-data.activeSetStart:0):(set.durationMs||0);
 const remaining=Math.max(0,duration-passed);
 const progress=Math.max(0,Math.min(1,remaining/duration));
 const ring=$("timed-progress"),circumference=2*Math.PI*112;
 ring.style.strokeDasharray=String(circumference);
 ring.style.strokeDashoffset=String(circumference*(1-progress));
 $("timed-clock").textContent=String(Math.ceil(remaining/1000));
 $("timed-subtitle").textContent=remaining===0?"Время вышло":active&&data.activeSetStart?"Осталось секунд":active?"На паузе":"Подход завершён";
 $("timed-toggle").textContent=remaining===0?"Повторить":active&&data.activeSetStart?"⏸ Пауза":"▶ Продолжить";
 $("timed-done").textContent="✓ Завершить подход";
 if(active&&data.activeSetStart&&remaining===0){if(timedGongSetId!==set.id){timedGongSetId=set.id;gongSound()}pauseActive();save();}
}
$("timed-close").onclick=closeTimedOverlay;
$("timed-toggle").onclick=()=>{
 if(!timedOverlay)return;
 const {i,j}=timedOverlay,set=data.exercises[i].sets[j];
 const passed=data.activeSetId===set.id?data.activeSetAccumMs+(data.activeSetStart?Date.now()-data.activeSetStart:0):0;
 if(passed>=Math.max(1,Number(set.value)||30)*1000){
   if(data.activeSetId===set.id){data.activeSetAccumMs=0;data.activeSetStart=null;}
 }
 timerFor(i,j);
 if(data.activeSetStart){timedGongSetId=null;startSound()}
};
$("timed-done").onclick=()=>{if(!timedOverlay)return;const {i,j}=timedOverlay;completeSet(i,j,true);closeTimedOverlay()};

$("exercises").addEventListener("click",ev=>{const t=ev.target.closest("button");if(!t)return;if(t.classList.contains("set-timer"))timerFor(+t.dataset.timerI,+t.dataset.timerJ);if(t.classList.contains("set-done")){completeSet(+t.dataset.doneI,+t.dataset.doneJ,true);if(timedOverlay&&timedOverlay.i===+t.dataset.doneI&&timedOverlay.j===+t.dataset.doneJ)closeTimedOverlay()}if(t.classList.contains("rest-set"))restFor(+t.dataset.restI,+t.dataset.restJ)});
$("exercises").addEventListener("change",ev=>{const t=ev.target;if(!t.dataset.field)return;const s=data.exercises[+t.dataset.i].sets[+t.dataset.j];if(t.dataset.field==="completed"){completeSet(+t.dataset.i,+t.dataset.j,t.checked);return;}else{s[t.dataset.field]=t.value===""?null:Number(t.value)}save();update()});
$("session").onclick=()=>{if(data.endedAt)return;if(!data.startedAt){data.startedAt=Date.now();data.status="in_progress"}else if(data.sessionPausedAt){data.sessionPausedMs+=Date.now()-data.sessionPausedAt;data.sessionPausedAt=null}else data.sessionPausedAt=Date.now();save();update()};
$("finish").onclick=()=>{if(!data.startedAt||data.endedAt)return;if(!confirm("Завершить тренировку?"))return;data.endedAt=Date.now();if(data.sessionPausedAt){data.sessionPausedMs+=data.endedAt-data.sessionPausedAt;data.sessionPausedAt=null}data.status="completed";stopRest();pauseActive();if(data.activeSetId){const x=data.exercises.flatMap(e=>e.sets).find(v=>v.id===data.activeSetId);if(x)x.durationMs=(x.durationMs||0)+data.activeSetAccumMs}data.activeSetId=null;data.activeSetAccumMs=0;data.restDeadline=null;save();update()};
$("settoggle").onclick=()=>{if(data.endedAt)return;if(!data.startedAt){data.startedAt=Date.now();data.status="in_progress"}if(data.activeSetId===null){const first=data.exercises.flatMap(e=>e.sets).find(x=>!x.completed);if(!first)return;const indices=first.id.match(/^set-(\d+)-(\d+)$/);if(indices){timerFor(+indices[1],+indices[2]);return}}if(data.activeSetStart)pauseActive();else{data.activeSetStart=Date.now();data.restDeadline=null}save();update()};
$("resttoggle").onclick=()=>{if(data.activeRestSetId){const x=data.exercises.findIndex(e=>e.sets.some(s=>s.id===data.activeRestSetId));const j=data.exercises[x].sets.findIndex(s=>s.id===data.activeRestSetId);restFor(x,j)}else{const x=data.exercises.findIndex(e=>e.sets.some(s=>s.completed));if(x<0)return;const j=data.exercises[x].sets.findIndex(s=>s.completed);restFor(x,j)}};
$("restchoice").onchange=e=>{data.restSeconds=Number(e.target.value);data.restRemainingMs=data.restSeconds*1000;save();update()};
$("export").onclick=()=>{const file=new Blob([JSON.stringify({...data,exportedAt:new Date().toISOString()},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(file);a.download="workout-"+data.date+"-"+data.id.slice(0,8)+".json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),5000)};
$("importbtn").onclick=()=>$("importfile").click();
$("importfile").onchange=async e=>{const file=e.target.files[0];if(!file)return;try{const parsed=JSON.parse(await file.text());if(parsed.schemaVersion!==1||!Array.isArray(parsed.exercises)||parsed.exercises.length!==16)throw Error("Неверный формат");if(!confirm("Заменить текущую локальную тренировку импортированной?"))return;data=parsed;save();render()}catch(err){alert("Ошибка импорта: "+err.message)}};
$("reset").onclick=()=>{if(!confirm("Создать новую сессию? Текущая будет заменена. Сначала экспортируй JSON."))return;data=fresh();save();render()};
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")update()});
window.addEventListener("pagehide",save);setInterval(update,500);render();save();