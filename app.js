"use strict";
const PLAN=[
["Отжимания",2,15,null,"reps","свой вес"],["Обратные скручивания",2,15,null,"reps","без веса"],["Тяга гантели с опорой",3,10,16,"perSide","на руку"],["Мёртвый жук",2,15,null,"perSide","на сторону"],["Жим гантелей лёжа",2,15,14.5,"reps","кг/гантель"],["Жим гантелей узко лёжа",2,12,8,"reps","кг/гантель"],["Ягодичный мост",3,20,null,"reps","без веса"],["Жим гантелей вверх сидя",2,10,15,"reps","до 15 кг"],["Сгибания на бицепс сидя",2,10,15,"perSide","на руку"],["Молотковые сгибания",2,10,15,"perSide","на руку"],["Разгибание на трицепс лёжа",2,15,7,"reps","кг"],["Разведения в стороны сидя",2,12,4,"reps","4–5 кг"],["Обратные разведения сидя",2,12,3,"reps","3–4 кг"],["Шраги сидя",3,15,12,"reps","кг/гантель"],["Прямые скручивания",3,15,null,"reps","без веса"],["Планка",2,30,null,"seconds","секунды"]];
const KEY="food-diary-pwa-session-v1";
const HISTORY_KEY="workout-pwa-history-v2";
const PLAN_DATE="2026-11-17";
const PLAN17=[["Отжимания",2,15,null,"reps","свой вес"],["Обратные скручивания",2,20,null,"reps","без веса"],["Тяга гантели с опорой",3,10,16,"perSide","на руку"],["Мёртвый жук",2,18,null,"perSide","на сторону"],["Жим гантелей лёжа",2,15,14.5,"reps","кг/гантель"],["Жим гантелей узко лёжа",2,12,15,"reps","кг/гантель"],["Ягодичный мост",3,20,null,"reps","без веса"],["Жим гантелей вверх сидя",2,10,15,"reps","до 15 кг"],["Сгибания на бицепс сидя",2,10,15,"perSide","на руку"],["Молотковые сгибания",2,12,15,"perSide","на руку"],["Разгибание на трицепс лёжа",2,12,9,"reps","кг"],["Разведения в стороны сидя",2,12,5,"reps","4–5 кг"],["Обратные разведения сидя",2,12,3,"reps","3–4 кг"],["Шраги сидя",3,15,15,"reps","кг/гантель"],["Прямые скручивания",3,20,null,"reps","без веса"],["Планка",2,45,null,"seconds","секунды"]];
const PLAN16=[["Обратные скручивания",2,15,null,"reps","без веса"],["Мёртвый жук",2,12,null,"perSide","на сторону"],["Прямые скручивания",2,15,null,"reps","без веса"],["Планка",2,30,null,"seconds","секунды"]];
const PLAN20=[["Обратные скручивания",3,15,null,"reps","без веса"],["Мёртвый жук",3,12,null,"perSide","на сторону"],["Ягодичный мост",3,20,null,"reps","без веса"],["Планка",3,35,null,"seconds","секунды"]];
const PLAN21=[["Отжимания",2,15,null,"reps","свой вес"],["Обратные скручивания",2,20,null,"reps","без веса"],["Разгибание на трицепс лёжа",2,20,5,"reps","кг/гантель"],["Мёртвый жук",2,18,null,"perSide","на сторону"],["Разведения в стороны сидя",2,12,5,"reps","кг/гантель"],["Ягодичный мост",3,20,null,"reps","без веса"],["Обратные разведения сидя",2,12,5,"reps","кг/гантель"],["Сгибания на бицепс сидя",2,10,15,"perSide","на руку"],["Молотковые сгибания",2,12,15,"perSide","на руку"],["Тяга гантели с опорой",3,10,15,"perSide","на руку"],["Прямые скручивания",3,20,null,"reps","без веса"],["Жим гантелей лёжа",2,15,15,"reps","кг/гантель"],["Жим гантелей узко лёжа",2,12,15,"reps","кг/гантель"],["Жим гантелей вверх сидя",2,10,15,"reps","кг/гантель"],["Шраги сидя",3,15,15,"reps","кг/гантель"],["Планка",2,45,null,"seconds","секунды"]];
const PLAN22=[["Обратные скручивания",3,[20,15,15],null,"reps","без отягощения"],["Тяга двух гантелей в наклоне",2,10,5,"reps","кг на гантель; пробный вес; только при устойчивой опоре"],["Мёртвый жук",3,[15,12,12],null,"perSide","на сторону"],["Шраги стоя",3,15,15,"reps","кг на гантель; 3×15 по просьбе пользователя; только при устойчивости"],["Bird dog",2,8,null,"perSide","на сторону"],["Жим Арнольда",2,8,3,"reps","кг на гантель; пробный вес; сидя на устойчивом стуле"],["Планка",3,35,null,"seconds","секунды"],["Боковая планка",2,20,null,"seconds","секунд на каждую сторону"],["Ягодичный мост",3,20,null,"reps","без веса"],["Ягодичный мост с гантелью",1,12,5,"reps","одна гантель 5 кг на таз через подкладку"],["Отведение ноги лёжа на боку",2,12,null,"perSide","на сторону; без веса"],["Румынская тяга с гантелями (лёгкая)",1,8,5,"reps","кг на гантель; пробный вес; только при устойчивости без боли"],["Подъёмы на носки стоя с опорой",1,12,null,"reps","без отягощения, с опорой"]];
const PLAN23=[["Жим гантелей лёжа",2,12,15,"reps","кг/гантель"],["Обратные скручивания",2,15,null,"reps","без веса"],["Тяга гантели с опорой",2,10,15,"perSide","на сторону"],["Ягодичный мост с гантелью",2,12,5,"reps","гантель 5 кг на таз, только если комфортно"],["Сгибания на бицепс сидя",2,8,12,"perSide","кг/гантель; 2 повтора в запасе"],["Планка",2,40,null,"seconds","сек"],["Молотковые сгибания",2,8,12,"perSide","кг/гантель; 2 повтора в запасе"],["Шраги стоя",2,12,5,"reps","кг/гантель; устойчивое положение с коррекцией опоры"],["Отжимания",2,12,null,"reps","свой вес"],["Разгибание на трицепс лёжа",2,15,5,"reps","кг/гантель"],["Жим Арнольда",3,12,5,"reps","5 кг на гантель, сидя; после лёгких 2×10 повышаем повторения"],["Разведения в стороны сидя",2,12,5,"reps","кг/гантель"],["Румынская тяга с гантелями (лёгкая)",3,10,5,"reps","5 кг на гантель; 3×10 только при устойчивости и без боли"],["Подъёмы на носки стоя с опорой",3,15,null,"reps","3×15 с опорой, обе ноги на полу"]];
const PLAN24=[["Bird dog",2,8,null,"perSide","на сторону"],["Отведение ноги лёжа на боку",2,12,null,"perSide","на сторону"],["Боковая планка",2,30,null,"seconds","ВАЖНО: 2×30 сек на ПРАВОЙ и 2×30 сек на ЛЕВОЙ; всего 4 удержания"]];
const PLAN25=[["Тяга двух гантелей в наклоне",2,10,15,"reps","15 кг на каждую гантель; только при устойчивой опоре, без рывков"],["Прямые скручивания",2,15,null,"reps","без веса"],["Жим гантелей лёжа",2,12,15,"reps","кг/гантель"],["Ягодичный мост с гантелью",2,12,5,"reps","гантель 5 кг"],["Шраги стоя",2,12,5,"reps","кг/гантель; с опорой при необходимости"],["Мёртвый жук",2,12,null,"perSide","на сторону"],["Жим Арнольда",3,12,5,"reps","5 кг на гантель, сидя; после лёгких 2×10 повышаем повторения"],["Отжимания",2,12,null,"reps","свой вес"],["Разгибание на трицепс лёжа",2,15,5,"reps","кг/гантель"],["Румынская тяга с гантелями (лёгкая)",3,10,5,"reps","5 кг на гантель; 3×10 только при устойчивости и без боли"],["Подъёмы на носки стоя с опорой",3,15,null,"reps","3×15 с опорой, обе ноги на полу"],["Отведение ноги лёжа на боку",2,12,null,"perSide","на сторону"]];
const PLAN26=[["Мёртвый жук",2,12,null,"perSide","на сторону"],["Боковая планка",2,30,null,"seconds","ВАЖНО: 2×30 сек на ПРАВОЙ и 2×30 сек на ЛЕВОЙ; всего 4 удержания"],["Отведение ноги лёжа на боку",2,12,null,"perSide","на сторону"]];
const PLAN27=[["Жим гантелей лёжа",2,12,15,"reps","кг/гантель"],["Обратные скручивания",2,15,null,"reps","без веса"],["Тяга гантели с опорой",2,10,15,"perSide","на сторону"],["Ягодичный мост с гантелью",2,12,5,"reps","гантель 5 кг"],["Разведения в стороны сидя",2,12,5,"reps","кг/гантель"],["Bird dog",2,8,null,"perSide","на сторону"],["Шраги стоя",2,12,5,"reps","кг/гантель"],["Боковая планка",2,30,null,"seconds","ВАЖНО: 2×30 сек на ПРАВОЙ и 2×30 сек на ЛЕВОЙ; всего 4 удержания"],["Сгибания на бицепс сидя",2,8,12,"perSide","кг/гантель"],["Жим Арнольда",3,12,5,"reps","5 кг на гантель, сидя; после лёгких 2×10 повышаем повторения"],["Тяга двух гантелей в наклоне",2,10,15,"reps","15 кг на каждую гантель; только при устойчивой опоре, без рывков"],["Подъёмы на носки стоя с опорой",3,15,null,"reps","3×15 с опорой, обе ноги на полу"]];
const PLAN28=[["Bird dog",2,8,null,"perSide","на сторону"],["Боковая планка",2,30,null,"seconds","ВАЖНО: 2×30 сек на ПРАВОЙ и 2×30 сек на ЛЕВОЙ; всего 4 удержания"],["Отведение ноги лёжа на боку",2,12,null,"perSide","на сторону"]];
const plans={"2026-11-15":PLAN,"2026-11-16":PLAN16,"2026-11-17":PLAN17,"2026-11-20":PLAN20,"2026-11-21":PLAN21,"2026-11-22":PLAN22,"2026-11-23":PLAN23,"2026-11-24":PLAN24,"2026-11-25":PLAN25,"2026-11-26":PLAN26,"2026-11-27":PLAN27,"2026-11-28":PLAN28};
let history={};try{history=JSON.parse(localStorage.getItem(HISTORY_KEY))||{}}catch{history={}};
const makeBreak=(seconds=300)=>({id:"break-"+crypto.randomUUID(),name:"Перерыв",unit:"break",sets:[],durationSeconds:seconds,breakElapsedMs:0,breakStartedAt:null,completed:false});
const localDate=()=>{const d=new Date(),p=n=>String(n).padStart(2,"0");return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`};
const fresh=(date=localDate())=>({schemaVersion:1,id:crypto.randomUUID(),date,source:"plans/workout-"+date+".md",status:"planned",startedAt:null,endedAt:null,sessionPausedAt:null,sessionPausedMs:0,activeSetStart:null,activeSetAccumMs:0,activeSetId:null,restDeadline:null,restRemainingMs:90000,restSeconds:90,activeRestSetId:null,restStartedAt:null,restAccumMs:0,exercises:(plans[date]||PLAN17).map((p,i)=>({id:"exercise-"+i,name:p[0],unit:p[4],sets:Array.from({length:p[1]},(_,j)=>({id:"set-"+i+"-"+j,plannedWeightKg:p[3],plannedValue:Array.isArray(p[2])?p[2][j]:p[2],weightKg:p[3],value:Array.isArray(p[2])?p[2][j]:p[2],completed:false,durationMs:null,restMs:null,restSeconds:90,completedAt:null}))})).flatMap((ex,i)=>date==="2026-11-21"&&i===7?[ex,makeBreak(600)]:date==="2026-11-23"&&i===8?[ex,makeBreak(600)]:[ex])});
let data;try{data=JSON.parse(localStorage.getItem(KEY))}catch{}if(!data||data.schemaVersion!==1)data=fresh();
if(data&&data.date&&!history[data.date])history[data.date]=data;
// Repair the incorrectly generated 16 Nov session only if no sets or timers were used.
const wrong16=history["2026-11-16"];
if(wrong16&&wrong16.exercises?.length===16&&!wrong16.startedAt&&!wrong16.endedAt&&wrong16.exercises.every(e=>e.sets.every(s=>!s.completed&&s.durationMs===null))){const corrected=fresh("2026-11-16");history["2026-11-16"]=corrected;if(data.date==="2026-11-16")data=corrected;localStorage.setItem(HISTORY_KEY,JSON.stringify(history));}
// Repair untouched auto-generated fallback sessions after adding date-specific plans.
for(const day of ["2026-11-20","2026-11-21"]){const old=history[day],template=plans[day];if(old&&template&&old.exercises?.length!==template.length&&!old.startedAt&&!old.endedAt&&old.exercises.every(e=>e.sets.every(x=>!x.completed&&x.durationMs===null))){const fixed=fresh(day);history[day]=fixed;if(data.date===day)data=fixed;localStorage.setItem(HISTORY_KEY,JSON.stringify(history));}}
// Add a third set to the November 20 recovery session without losing recorded sets.
const session20=history["2026-11-20"];
if(session20&&session20.exercises?.length===PLAN20.length&&session20.exercises.every((e,i)=>e.name===PLAN20[i][0]&&e.sets.length===2)){
  session20.exercises.forEach((e,i)=>{const last=e.sets[1];e.sets.push({id:"set-"+i+"-2",plannedWeightKg:PLAN20[i][3],plannedValue:PLAN20[i][2],weightKg:PLAN20[i][3],value:PLAN20[i][2],completed:false,durationMs:null,restMs:null,restSeconds:last?.restSeconds||90,completedAt:null});});
  history["2026-11-20"]=session20;
  if(data.date==="2026-11-20")data=session20;
  localStorage.setItem(HISTORY_KEY,JSON.stringify(history));
  localStorage.setItem(KEY,JSON.stringify(data));
}
// Upgrade the current day plan by exercise name, preserving all recorded sets, timers, and completed work.
// Set IDs are never reused or renumbered, and completed workouts are not touched.
function upgradePlannedSession(date,template,breakAfter){
 const session=history[date];if(!session||session.endedAt||!Array.isArray(session.exercises))return;
 const muscles=session.exercises.filter(e=>e.unit!=="break");
 const isCurrent=muscles.some(e=>e.name==="Отжимания")&&muscles.length<16;
 if(!isCurrent)return;
 const used=new Set();
 const rebuilt=template.map((p,i)=>{
  const existing=muscles.find(e=>e.name===p[0]&&!used.has(e));
  if(existing){
   used.add(existing);
   // Bring back omitted approaches but keep all entries, including finished ones and edits.
   while(existing.sets.length<p[1]){
    const j=existing.sets.length;
    const seed=existing.sets[0];
    existing.sets.push({id:"set-"+crypto.randomUUID(),plannedWeightKg:p[3],plannedValue:p[2],weightKg:p[3],value:p[2],completed:false,durationMs:null,restMs:null,restSeconds:seed?.restSeconds||90,completedAt:null});
   }
   if(existing.sets.every(z=>!z.completed)&&!session.startedAt)existing.sets.forEach(z=>{z.plannedWeightKg=p[3];z.plannedValue=p[2];z.weightKg=p[3];z.value=p[2]});
   return existing;
  }
  return {id:"exercise-"+crypto.randomUUID(),name:p[0],unit:p[4],sets:Array.from({length:p[1]},()=>({id:"set-"+crypto.randomUUID(),plannedWeightKg:p[3],plannedValue:p[2],weightKg:p[3],value:p[2],completed:false,durationMs:null,restMs:null,restSeconds:90,completedAt:null}))};
 });
 // Preserve any additional user-defined exercises without discarding them.
 for(const extra of muscles)if(!used.has(extra))rebuilt.push(extra);
 const breaks=session.exercises.filter(e=>e.unit==="break");
 rebuilt.splice(breakAfter+1,0,...(breaks.length?breaks:[makeBreak()]));
 session.exercises=rebuilt;
 history[date]=session;if(data.date===date)data=session;
 localStorage.setItem(HISTORY_KEY,JSON.stringify(history));
 localStorage.setItem(KEY,JSON.stringify(data));
}
upgradePlannedSession("2026-11-21",PLAN21,6);
// Reorder today's existing session once without losing any sets, weights or results.
function applyAlternatingOrder(date,template,breakAfter){
 const session=history[date];
 if(!session||session.endedAt||session.orderingRevision>=(date==="2026-11-21"?3:2)||!Array.isArray(session.exercises))return;
 const remaining=session.exercises.filter(e=>e.unit!=="break");
 const breaks=session.exercises.filter(e=>e.unit==="break");
 const ordered=[];
 for(const item of template){
  const index=remaining.findIndex(e=>e.name===item[0]);
  if(index>=0)ordered.push(...remaining.splice(index,1));
 }
 ordered.push(...remaining);
 ordered.splice(Math.min(ordered.length,breakAfter+1),0,...(breaks.length?breaks:[makeBreak()]));
 session.exercises=ordered;
 session.orderingRevision=date==="2026-11-21"?3:2;
 history[date]=session;
 if(data.date===date)data=session;
 localStorage.setItem(HISTORY_KEY,JSON.stringify(history));
 localStorage.setItem(KEY,JSON.stringify(data));
}
applyAlternatingOrder("2026-11-21",PLAN21,6);
// New weekly plans replace untouched future sessions only. Never alter started/ended workouts.
function refreshUnstartedWeeklyPlans(){
 for(const date of ["2026-11-22","2026-11-23","2026-11-24","2026-11-25","2026-11-26","2026-11-27","2026-11-28"]){
  const existing=history[date];
  if(!existing||existing.endedAt||existing.startedAt||existing.weeklyRevision>=1)continue;
  if(existing.exercises?.some(e=>e.unit!=="break"&&e.sets?.some(set=>set.completed||set.durationMs!==null)))continue;
  const clean=fresh(date);clean.weeklyRevision=1;
  history[date]=clean;if(data.date===date)data=clean;
 }
 localStorage.setItem(HISTORY_KEY,JSON.stringify(history));
 if(data?.date)localStorage.setItem(KEY,JSON.stringify(data));
}
refreshUnstartedWeeklyPlans();
// Respect the user's exact Nov 21 arrangement from the in-app screenshots.
// Reuse exercise and set objects, retaining recorded repetitions and timings.
function applyScreenshotPlan21(){
 const session=history["2026-11-21"];
 if(!session||session.endedAt||session.screenshotOrderRevision>=1||!Array.isArray(session.exercises))return;
 const remaining=session.exercises.filter(e=>e.unit!=="break");
 const reordered=[];
 for(const item of PLAN21){
  const index=remaining.findIndex(ex=>ex.name===item[0]);
  if(index>=0)reordered.push(...remaining.splice(index,1));
 }
 reordered.push(...remaining);
 const existingBreaks=session.exercises.filter(e=>e.unit==="break");
 const mainBreak=existingBreaks.shift()||makeBreak(600);
 if(mainBreak.durationSeconds===300)mainBreak.durationSeconds=600;
 reordered.splice(8,0,mainBreak);
 // Preserve user-added break blocks rather than silently dropping them.
 reordered.push(...existingBreaks);
 session.exercises=reordered;
 session.screenshotOrderRevision=1;
 history[session.date]=session;
 if(data.date===session.date)data=session;
 localStorage.setItem(HISTORY_KEY,JSON.stringify(history));
 localStorage.setItem(KEY,JSON.stringify(data));
}
applyScreenshotPlan21();
// On launch select the device's current local date; previous dates remain in History.
const todaysDate=localDate();
if(data.date!==todaysDate){data=history[todaysDate]||fresh(todaysDate);}
const persistHistory=()=>{history[data.date]=data;localStorage.setItem(HISTORY_KEY,JSON.stringify(history))};
if(data.activeRestSetId===undefined)data.activeRestSetId=null;
if(data.restStartedAt===undefined)data.restStartedAt=null;
if(data.restAccumMs===undefined)data.restAccumMs=0;
for(const ex of data.exercises)for(const set of ex.sets)if(set.restSeconds===undefined)set.restSeconds=data.restSeconds||90;
const $=id=>document.getElementById(id),fmt=ms=>{const s=Math.max(0,Math.floor(ms/1000));return (s>=3600?String(Math.floor(s/3600)).padStart(2,"0")+":":"")+String(Math.floor(s/60)%60).padStart(2,"0")+":"+String(s%60).padStart(2,"0")};
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(data));persistHistory();$("status").textContent="Локально сохранено"}catch(e){$("status").textContent="Ошибка сохранения: "+e.message}};
const esc=x=>String(x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function guideHTML(name){
 const info=window.EXERCISE_GUIDES?.[name];
 if(!info)return '<div class="guide-unavailable">Описание пока не добавлено.</div>';
 const steps=(info.steps||[]).map(step=>'<li>'+esc(step)+'</li>').join("");
 const note=info.note?'<p class="guide-note">'+esc(info.note)+'</p>':"";
 const img=info.image?'<img class="guide-media" src="'+esc(info.image)+'" alt="Демонстрация техники: '+esc(name)+'" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><p class="guide-unavailable" hidden>Изображение не загрузилось. Открой ссылку на первоисточник.</p>':"";
 const link=info.page?'<a class="guide-source" href="'+esc(info.page)+'" target="_blank" rel="noopener noreferrer">Смотреть первоисточник и '+(info.animated?"анимацию":"демонстрацию")+' ↗</a>':"";
 return '<details class="exercise-guide"><summary>📖 Техника и '+(info.animated?"анимация":"изображение")+'</summary><div class="guide-body">'+img+'<ol class="guide-steps">'+steps+'</ol><p class="guide-mistake"><strong>Избегай:</strong> '+esc(info.mistake||"")+'</p>'+note+link+'</div></details>';
}
function render(){
const opened=[...document.querySelectorAll("#exercises details.exercise")].filter(e=>e.open).map(e=>e.dataset.exerciseId);
const openedGuides=[...document.querySelectorAll("#exercises details.exercise-guide")].filter(e=>e.open).map(e=>e.closest("details.exercise")?.dataset.exerciseId);
$("exercises").innerHTML=data.exercises.map((ex,i)=>ex.unit==="break"?'<section class="panel break-block" data-break-id="'+esc(ex.id)+'"><div class="flex"><strong>☕ Перерыв</strong><span class="clock break-clock">05:00</span></div><div class="break-controls"><label>Минуты<input class="break-duration" data-break-i="'+i+'" type="number" min="1" max="120" value="'+Math.round(ex.durationSeconds/60)+'"></label><button class="btn primary break-toggle" data-break-i="'+i+'">▶ Старт</button><button class="btn break-reset" data-break-i="'+i+'">Сбросить</button><button class="btn break-finish" data-break-i="'+i+'">✓ Завершить</button></div><div class="move-actions"><button class="btn move-exercise" data-move-i="'+i+'" data-move-dir="-1" '+(i===0?'disabled':'')+'>↑ Выше</button><button class="btn move-exercise" data-move-i="'+i+'" data-move-dir="1" '+(i===data.exercises.length-1?'disabled':'')+'>↓ Ниже</button><button class="btn remove-break" data-break-i="'+i+'">Удалить</button></div></section>':'<details class="panel exercise" data-exercise-id="'+esc(ex.id)+'" '+(i===0?'open':'')+'><summary>'+esc((i+1)+". "+ex.name)+' <small>'+ex.sets.filter(s=>s.completed).length+'/'+ex.sets.length+' подходов</small></summary>'+guideHTML(ex.name)+'<div class="set sethead"><span>№</span><span>Вес, кг</span><span>'+(ex.unit==="seconds"?"Секунды":"Повторы")+'</span><span>✓</span></div>'+ex.sets.map((s,j)=>'<div class="set"><span>'+(j+1)+'</span><input aria-label="Вес" type="number" min="0" step="0.5" data-i="'+i+'" data-j="'+j+'" data-field="weightKg" value="'+(s.weightKg??"")+'" placeholder="—"><input aria-label="Повторы или секунды" type="number" min="0" step="1" data-i="'+i+'" data-j="'+j+'" data-field="value" value="'+s.value+'"><input aria-label="Подход выполнен" type="checkbox" data-i="'+i+'" data-j="'+j+'" data-field="completed" '+(s.completed?"checked":"")+'></div><div class="flex" style="margin-top:8px;flex-wrap:wrap"><small class="muted">Подход: '+(s.durationMs===null?"—":fmt(s.durationMs))+'</small><button type="button" class="btn set-timer" data-timer-i="'+i+'" data-timer-j="'+j+'">▶ Подход</button><button type="button" class="btn set-done" data-done-i="'+i+'" data-done-j="'+j+'">✓ Завершить</button></div><div class="flex" style="margin-top:8px;gap:8px;flex-wrap:wrap"><label style="font-size:13px">Отдых, сек <input aria-label="Отдых после подхода, секунды" style="width:85px" type="number" min="0" max="3600" step="5" data-i="'+i+'" data-j="'+j+'" data-field="restSeconds" value="'+s.restSeconds+'"></label><button type="button" class="btn rest-set" data-rest-i="'+i+'" data-rest-j="'+j+'">▶ Отдых</button><small class="muted rest-value" data-rest-i="'+i+'" data-rest-j="'+j+'">'+(s.restMs===null?"Не начат":fmt(s.restMs))+'</small></div>').join("")+'<div class="move-actions"><button class="btn move-exercise" data-move-i="'+i+'" data-move-dir="-1" '+(i===0?'disabled':'')+'>↑ Выше</button><button class="btn move-exercise" data-move-i="'+i+'" data-move-dir="1" '+(i===data.exercises.length-1?'disabled':'')+'>↓ Ниже</button><button class="btn add-break-after" data-after-i="'+i+'">＋ Перерыв после</button></div></details>').join("");
if(opened.length)document.querySelectorAll("#exercises details.exercise").forEach(e=>e.open=opened.includes(e.dataset.exerciseId));
if(openedGuides.length)document.querySelectorAll("#exercises details.exercise-guide").forEach(e=>e.open=openedGuides.includes(e.closest("details.exercise")?.dataset.exerciseId));
$("restchoice").value=String(data.restSeconds);update();
}
function elapsed(){if(!data.startedAt)return 0;const end=data.endedAt||Date.now();return Math.max(0,end-data.startedAt-data.sessionPausedMs-(data.sessionPausedAt?end-data.sessionPausedAt:0))}
function update(){
updateTimedOverlay();
updateRestAudio();
const n=data.exercises.reduce((sum,e)=>sum+e.sets.filter(s=>s.completed).length,0),max=data.exercises.reduce((sum,e)=>sum+e.sets.length,0);$("count").textContent=n+" / "+max;$("progress").style.width=(100*n/Math.max(1,max))+"%";$("total").textContent=fmt(elapsed());
$("session-pause").textContent=data.sessionPausedAt?"▶ Продолжить":"⏸ Пауза";
$("session-pause").disabled=!data.startedAt||!!data.endedAt;
for(const card of document.querySelectorAll(".break-block")){
 const ex=data.exercises.find(e=>e.id===card.dataset.breakId);if(!ex)continue;
 const passed=ex.breakElapsedMs+(ex.breakStartedAt?Date.now()-ex.breakStartedAt:0),remaining=Math.max(0,ex.durationSeconds*1000-passed);
 card.querySelector(".break-clock").textContent=fmt(remaining);
 card.querySelector(".break-toggle").textContent=ex.breakStartedAt?"⏸ Перерыв на паузу":ex.completed?"▶ Повторить":"▶ Старт / продолжить";
 if(ex.breakStartedAt&&remaining===0){ex.breakElapsedMs=ex.durationSeconds*1000;ex.breakStartedAt=null;ex.completed=true;gongSound();save()}
}
$("setclock").textContent=fmt(data.activeSetAccumMs+(data.activeSetStart?Date.now()-data.activeSetStart:0));
document.querySelectorAll(".set-timer").forEach(b=>{const x=data.exercises[+b.dataset.timerI].sets[+b.dataset.timerJ];const active=data.activeSetId===x.id;b.textContent=active?(data.activeSetStart?"⏸ "+fmt(data.activeSetAccumMs+Date.now()-data.activeSetStart):"▶ "+fmt(data.activeSetAccumMs)):"▶ Подход"});
document.querySelectorAll(".rest-set").forEach(b=>{const x=data.exercises[+b.dataset.restI].sets[+b.dataset.restJ];const active=data.activeRestSetId===x.id;b.textContent=active?(data.restStartedAt?"⏸ Отдых":"▶ Продолжить"):"▶ Отдых";const label=b.parentElement.querySelector(".rest-value");if(label){const passed=active?data.restAccumMs+(data.restStartedAt?Date.now()-data.restStartedAt:0):(x.restMs||0);label.textContent=active?fmt(Math.max(0,x.restSeconds*1000-passed))+" осталось":(x.restMs===null?"Не начат":fmt(x.restMs)+" факт")}}
);
const activeRest=data.exercises.flatMap(e=>e.sets).find(x=>x.id===data.activeRestSetId);const restPassed=data.restAccumMs+(data.restStartedAt?Date.now()-data.restStartedAt:0);
$("restclock").textContent=activeRest?fmt(Math.max(0,activeRest.restSeconds*1000-restPassed)):fmt(data.restSeconds*1000);$("restlabel").textContent=activeRest?activeRest.restSeconds:data.restSeconds;
$("session").textContent=!data.startedAt?"Начать тренировку":data.endedAt?"Завершена":"Тренировка идёт";
$("session").disabled=!!data.startedAt;
$("settoggle").textContent=data.activeSetStart?"Пауза текущего подхода":data.activeSetId?"Продолжить текущий":"Начать следующий";
$("resttoggle").textContent=activeRest?(data.restStartedAt?"Пауза отдыха":"Продолжить отдых"):"Начать отдых";
if(activeRest&&data.restStartedAt&&restPassed>=activeRest.restSeconds*1000){stopRest();save();update()}
}
function pauseBreak(ex){if(ex.breakStartedAt){ex.breakElapsedMs+=Date.now()-ex.breakStartedAt;ex.breakStartedAt=null}}
function ensureSession(){if(!data.startedAt){data.startedAt=Date.now();data.status="in_progress"}}
function pauseActive(){if(data.activeSetStart){data.activeSetAccumMs+=Date.now()-data.activeSetStart;data.activeSetStart=null}}
let restAudioId=null,restLastBeepSecond=null,restGongPlayed=false;
function updateRestAudio(){
 if(!data.activeRestSetId||!data.restStartedAt)return;
 const set=data.exercises.flatMap(e=>e.sets).find(x=>x.id===data.activeRestSetId);if(!set)return;
 const remaining=Math.max(0,set.restSeconds*1000-data.restAccumMs-(Date.now()-data.restStartedAt));
 const sec=Math.ceil(remaining/1000);
 if(sec>=1&&sec<=5&&restLastBeepSecond!==sec){restLastBeepSecond=sec;countdownBeep(sec)}
 if(remaining<=0&&!restGongPlayed){restGongPlayed=true;gongSound()}
}
function beginRestAudio(id){restAudioId=id;restLastBeepSecond=null;restGongPlayed=false;startSound()}
function stopRest(){if(!data.activeRestSetId)return;const x=data.exercises.flatMap(e=>e.sets).find(v=>v.id===data.activeRestSetId);if(data.restStartedAt){data.restAccumMs+=Date.now()-data.restStartedAt;data.restStartedAt=null}if(x)x.restMs=(x.restMs||0)+data.restAccumMs;data.activeRestSetId=null;data.restAccumMs=0;data.restDeadline=null;restAudioId=null;restLastBeepSecond=null;restGongPlayed=false}
function restFor(i,j){if(data.endedAt||data.sessionPausedAt)return;const x=data.exercises[i].sets[j];ensureSession();if(data.activeRestSetId===x.id){if(data.restStartedAt){data.restAccumMs+=Date.now()-data.restStartedAt;data.restStartedAt=null}else {data.restStartedAt=Date.now();audioReady()}}else{stopRest();data.activeRestSetId=x.id;data.restAccumMs=0;data.restStartedAt=Date.now();beginRestAudio(x.id)}save();update()}
function timerFor(i,j){if(data.endedAt||data.sessionPausedAt)return;const target=data.exercises[i].sets[j];if(target.completed)return;ensureSession();if(data.activeSetId===target.id){if(data.activeSetStart)pauseActive();else data.activeSetStart=Date.now()}else{if(data.activeSetId!==null){pauseActive();const previous=data.exercises.flatMap(e=>e.sets).find(x=>x.id===data.activeSetId);if(previous&&data.activeSetAccumMs)previous.durationMs=(previous.durationMs||0)+data.activeSetAccumMs}data.activeSetId=target.id;data.activeSetAccumMs=0;data.activeSetStart=Date.now()}stopRest();save();if(data.exercises[i].unit==="seconds"){openTimedOverlay(i,j);if(data.activeSetStart)startSound()}update()}
function completeSet(i,j,checked){if(data.sessionPausedAt||data.endedAt)return;const target=data.exercises[i].sets[j];target.completed=checked;target.completedAt=checked?new Date().toISOString():null;if(checked){ensureSession();if(data.activeSetId===target.id){pauseActive();target.durationMs=(target.durationMs||0)+data.activeSetAccumMs;data.activeSetId=null;data.activeSetAccumMs=0}stopRest();data.activeRestSetId=target.id;data.restAccumMs=0;data.restStartedAt=Date.now();beginRestAudio(target.id)}save();render()}

let audioContext=null, soundEnabled=localStorage.getItem("workout-sound-enabled")!=="false";
let soundVolume=Math.min(100,Math.max(0,Number(localStorage.getItem("workout-sound-volume")??"100")));
const amplified=x=>Math.min(.88,x*soundVolume/100);
function audioReady(){if(!soundEnabled)return null;try{audioContext??=new (window.AudioContext||window.webkitAudioContext)();if(audioContext.state==="suspended")audioContext.resume().catch(()=>{});return audioContext}catch{return null}}
// Gentle bell: sine wave with a subtle harmonic and a smooth, decaying envelope.
function tone(freq,at,duration,volume=0.65){
 const ctx=audioReady();if(!ctx)return;
 const amp=Math.max(.0001,amplified(volume));
 const envelope=ctx.createGain();
 envelope.gain.setValueAtTime(.0001,at);
 envelope.gain.exponentialRampToValueAtTime(amp,at+.028);
 envelope.gain.exponentialRampToValueAtTime(.0001,at+duration);
 envelope.connect(ctx.destination);
 for(const [mult,level] of [[1,1],[2,.16]]){
  const osc=ctx.createOscillator(),partial=ctx.createGain();
  osc.type="sine";osc.frequency.setValueAtTime(freq*mult,at);
  partial.gain.value=level;osc.connect(partial).connect(envelope);
  osc.start(at);osc.stop(at+duration+.04);
 }
}
function startSound(){
 const ctx=audioReady();if(!ctx)return;
 const t=ctx.currentTime+.03;
 tone(523.25,t,.38,.35);tone(659.25,t+.18,.48,.32);
}
function gongSound(){
 const ctx=audioReady();if(!ctx)return;
 const t=ctx.currentTime+.03;
 tone(523.25,t,.56,.42);tone(659.25,t+.17,.61,.37);tone(783.99,t+.34,.90,.40);
}
let timedGongSetId=null,timedLastBeepSecond=null;
function countdownBeep(second){
 const ctx=audioReady();if(!ctx)return;
 tone(second===1?659.25:523.25,ctx.currentTime+.015,second===1?.31:.22,.28);
}
function refreshSoundButton(){
 $("timed-sound").textContent=soundEnabled?"🔊 Звук включён":"🔇 Без звука";
 $("sound-enabled").checked=soundEnabled;
 for(const slider of document.querySelectorAll(".sound-volume"))slider.value=String(soundVolume);
 for(const label of document.querySelectorAll(".sound-volume-value"))label.textContent=soundVolume+"%";
}
document.querySelectorAll(".sound-volume").forEach(slider=>slider.addEventListener("input",e=>{soundVolume=Number(e.target.value);localStorage.setItem("workout-sound-volume",String(soundVolume));refreshSoundButton()}));
$("sound-enabled").onchange=e=>{soundEnabled=e.target.checked;localStorage.setItem("workout-sound-enabled",String(soundEnabled));if(soundEnabled)audioReady();refreshSoundButton()};
$("sound-test").onclick=()=>{soundEnabled=true;localStorage.setItem("workout-sound-enabled","true");refreshSoundButton();gongSound()};
$("timed-sound").onclick=()=>{soundEnabled=!soundEnabled;localStorage.setItem("workout-sound-enabled",String(soundEnabled));if(soundEnabled)audioReady();refreshSoundButton()};
let timedOverlay=null;
function openTimedOverlay(i,j){
 const set=data.exercises[i].sets[j],ex=data.exercises[i];
 if(ex.unit!=="seconds")return;
 timedOverlay={i,j};
 timedGongSetId=null;
 timedLastBeepSecond=null;
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
 const remainingSeconds=Math.ceil(remaining/1000);
 if(active&&data.activeSetStart&&remainingSeconds>=1&&remainingSeconds<=5&&timedLastBeepSecond!==remainingSeconds){timedLastBeepSecond=remainingSeconds;countdownBeep(remainingSeconds)}
 if(remainingSeconds>5)timedLastBeepSecond=null;
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
 if(data.activeSetStart){timedGongSetId=null;timedLastBeepSecond=null;startSound()}
};
$("timed-done").onclick=()=>{if(!timedOverlay)return;const {i,j}=timedOverlay;completeSet(i,j,true);closeTimedOverlay()};

function reorderExercise(i,dir){if(data.endedAt)return;const j=i+dir;if(j<0||j>=data.exercises.length)return;if(timedOverlay)closeTimedOverlay();const [ex]=data.exercises.splice(i,1);data.exercises.splice(j,0,ex);save();render()}
function addBreakAfter(i){if(data.endedAt)return;data.exercises.splice(i+1,0,makeBreak());save();render();renderHistory()}
function breakControl(i,action){if(data.endedAt||data.sessionPausedAt)return;const ex=data.exercises[i];if(!ex||ex.unit!=="break")return;
 if(action==="toggle"){if(ex.breakStartedAt)pauseBreak(ex);else{ensureSession();stopRest();pauseActive();ex.completed=false;if(ex.breakElapsedMs>=ex.durationSeconds*1000)ex.breakElapsedMs=0;ex.breakStartedAt=Date.now();startSound()}}
 if(action==="reset"){pauseBreak(ex);ex.breakElapsedMs=0;ex.completed=false}
 if(action==="finish"){ensureSession();pauseBreak(ex);ex.completed=true}
 save();update();
}
$("exercises").addEventListener("click",ev=>{const t=ev.target.closest("button");if(!t)return;
 if(t.classList.contains("move-exercise")){reorderExercise(+t.dataset.moveI,+t.dataset.moveDir);return}
 if(t.classList.contains("add-break-after")){addBreakAfter(+t.dataset.afterI);return}
 if(t.classList.contains("remove-break")){if(data.endedAt)return;const i=+t.dataset.breakI,ex=data.exercises[i];if(ex?.unit==="break"){pauseBreak(ex);data.exercises.splice(i,1);save();render();renderHistory()}return}
 if(t.classList.contains("break-toggle")){breakControl(+t.dataset.breakI,"toggle");return}
 if(t.classList.contains("break-reset")){breakControl(+t.dataset.breakI,"reset");return}
 if(t.classList.contains("break-finish")){breakControl(+t.dataset.breakI,"finish");return}if(t.classList.contains("set-timer"))timerFor(+t.dataset.timerI,+t.dataset.timerJ);if(t.classList.contains("set-done")){completeSet(+t.dataset.doneI,+t.dataset.doneJ,true);if(timedOverlay&&timedOverlay.i===+t.dataset.doneI&&timedOverlay.j===+t.dataset.doneJ)closeTimedOverlay()}if(t.classList.contains("rest-set"))restFor(+t.dataset.restI,+t.dataset.restJ)});
$("exercises").addEventListener("change",ev=>{const t=ev.target;
 if(t.classList.contains("break-duration")){const ex=data.exercises[+t.dataset.breakI];if(ex?.unit==="break"){pauseBreak(ex);ex.durationSeconds=Math.max(60,Math.min(7200,Math.round(Number(t.value)||5)*60));ex.breakElapsedMs=0;ex.completed=false;save();update()}return}
 if(!t.dataset.field)return;const s=data.exercises[+t.dataset.i].sets[+t.dataset.j];if(t.dataset.field==="completed"){completeSet(+t.dataset.i,+t.dataset.j,t.checked);return;}else{s[t.dataset.field]=t.value===""?null:Number(t.value)}save();update()});
function toggleSessionPause(){if(!data.startedAt||data.endedAt)return;
 if(data.sessionPausedAt){data.sessionPausedMs+=Date.now()-data.sessionPausedAt;data.sessionPausedAt=null;const flags=data.pausedTimers||{};if(flags.set&&data.activeSetId)data.activeSetStart=Date.now();if(flags.rest&&data.activeRestSetId)data.restStartedAt=Date.now();if(flags.breakId){const ex=data.exercises.find(e=>e.id===flags.breakId);if(ex?.unit==="break")ex.breakStartedAt=Date.now()}data.pausedTimers=null}
 else{const b=data.exercises.find(e=>e.unit==="break"&&e.breakStartedAt);data.pausedTimers={set:!!data.activeSetStart,rest:!!data.restStartedAt,breakId:b?.id||null};pauseActive();if(data.restStartedAt){data.restAccumMs+=Date.now()-data.restStartedAt;data.restStartedAt=null}if(b)pauseBreak(b);data.sessionPausedAt=Date.now()}
 save();update();
}
$("session").onclick=()=>{if(data.endedAt||data.startedAt)return;ensureSession();save();update()};
$("session-pause").onclick=toggleSessionPause;
$("finish").onclick=()=>{if(!data.startedAt||data.endedAt)return;if(!confirm("Завершить тренировку?"))return;data.endedAt=Date.now();if(data.sessionPausedAt){data.sessionPausedMs+=data.endedAt-data.sessionPausedAt;data.sessionPausedAt=null}data.status="completed";data.exercises.filter(e=>e.unit==="break").forEach(pauseBreak);stopRest();pauseActive();if(data.activeSetId){const x=data.exercises.flatMap(e=>e.sets).find(v=>v.id===data.activeSetId);if(x)x.durationMs=(x.durationMs||0)+data.activeSetAccumMs}data.activeSetId=null;data.activeSetAccumMs=0;data.restDeadline=null;save();update()};
$("settoggle").onclick=()=>{if(data.endedAt)return;if(!data.startedAt){data.startedAt=Date.now();data.status="in_progress"}if(data.activeSetId===null){const first=data.exercises.flatMap(e=>e.sets).find(x=>!x.completed);if(!first)return;for(let i=0;i<data.exercises.length;i++){const j=data.exercises[i].sets.indexOf(first);if(j>=0){timerFor(i,j);return}}}if(data.activeSetStart)pauseActive();else{data.activeSetStart=Date.now();data.restDeadline=null}save();update()};
$("resttoggle").onclick=()=>{if(data.activeRestSetId){const x=data.exercises.findIndex(e=>e.sets.some(s=>s.id===data.activeRestSetId));const j=data.exercises[x].sets.findIndex(s=>s.id===data.activeRestSetId);restFor(x,j)}else{const x=data.exercises.findIndex(e=>e.sets.some(s=>s.completed));if(x<0)return;const j=data.exercises[x].sets.findIndex(s=>s.completed);restFor(x,j)}};
$("restchoice").onchange=e=>{data.restSeconds=Number(e.target.value);data.restRemainingMs=data.restSeconds*1000;save();update()};
function dateSelect(date){if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return;save();if(timedOverlay)closeTimedOverlay();data=history[date]||fresh(date);save();render();renderHistory()}
function renderHistory(){const dates=Object.keys(history).sort().reverse();$("history").innerHTML=dates.map(d=>{const x=history[d],done=x.exercises.reduce((n,e)=>n+e.sets.filter(s=>s.completed).length,0),all=x.exercises.reduce((n,e)=>n+e.sets.length,0);return '<button type="button" class="btn history-item" data-date="'+esc(d)+'">'+esc(d)+' · '+done+'/'+all+' · '+(x.endedAt?'завершена':'не завершена')+'</button>'}).join("");$("workout-date").value=data.date;$("workout-heading").textContent=data.date+" · силовая";$("plan-summary").textContent=data.exercises.filter(e=>e.unit!=="break").length+" упражнений · "+data.exercises.filter(e=>e.unit==="break").length+" перерывов · план "+(plans[data.date]?"на выбранную дату":"по шаблону 17 ноября")+" · веса на одну гантель";}
$("workout-date").onchange=e=>dateSelect(e.target.value);
$("history").onclick=e=>{const b=e.target.closest("[data-date]");if(b)dateSelect(b.dataset.date)};
const REPO="krlrussia456/workout-pwa";
let githubToken=sessionStorage.getItem("workout-github-token")||"";
$("github-token").value=githubToken;
$("github-token").onchange=e=>{githubToken=e.target.value.trim();if(githubToken)sessionStorage.setItem("workout-github-token",githubToken);else sessionStorage.removeItem("workout-github-token")};
$("github-forget").onclick=()=>{githubToken="";sessionStorage.removeItem("workout-github-token");$("github-token").value="";$("sync-status").textContent="Токен удалён из этой вкладки"};
const encode64=str=>btoa(Array.from(new TextEncoder().encode(str),b=>String.fromCharCode(b)).join(""));
const decode64=str=>new TextDecoder().decode(Uint8Array.from(atob(str.replace(/\s/g,"")),c=>c.charCodeAt(0)));
async function gh(path,method="GET",payload){const response=await fetch("https://api.github.com/repos/"+REPO+"/contents/"+path,{method,headers:{"Accept":"application/vnd.github+json","Authorization":"Bearer "+githubToken,"X-GitHub-Api-Version":"2022-11-28",...(payload?{"Content-Type":"application/json"}:{})},body:payload?JSON.stringify(payload):undefined});if(!response.ok){const body=await response.json().catch(()=>({}));if(response.status===404&&method==="GET")return null;throw Error(response.status+" "+(body.message||response.statusText))}return response.json()}
$("github-sync").onclick=async()=>{if(!githubToken){$("sync-status").textContent="Укажи fine-grained token с Contents: Read and write";return}if(!data.endedAt){$("sync-status").textContent="Сначала заверши тренировку";return}if(!confirm("Опубликовать результаты "+data.date+" в ПУБЛИЧНОМ репозитории "+REPO+"? Их смогут видеть все."))return;const b=$("github-sync");b.disabled=true;$("sync-status").textContent="Сохранение в GitHub…";try{const path="workouts/"+data.date+"-"+data.id.slice(0,8)+".json";const old=await gh(path);await gh(path,"PUT",{message:"Save completed workout "+data.date,content:encode64(JSON.stringify({...data,exportedAt:new Date().toISOString()},null,2)+"\n"),...(old?{sha:old.sha}:{})});$("sync-status").textContent="Сохранено: "+path}catch(e){$("sync-status").textContent="Ошибка GitHub: "+e.message}finally{b.disabled=false}};
$("github-load").onclick=async()=>{if(!githubToken){$("sync-status").textContent="Укажи токен GitHub";return}const b=$("github-load");b.disabled=true;$("sync-status").textContent="Загрузка истории…";try{const entries=await gh("workouts");let count=0;for(const entry of Array.isArray(entries)?entries:[]){if(!/^\d{4}-\d{2}-\d{2}-[a-f0-9]{8}\.json$/.test(entry.name))continue;const item=await gh(entry.path);if(!item?.content)continue;const x=JSON.parse(decode64(item.content));if(x.schemaVersion!==1||!x.date||!Array.isArray(x.exercises))continue;if(!history[x.date]||(!history[x.date].endedAt&&x.endedAt)){history[x.date]=x;count++}}localStorage.setItem(HISTORY_KEY,JSON.stringify(history));renderHistory();$("sync-status").textContent="Загружено тренировок: "+count+" (без замены завершённых локальных)"}catch(e){$("sync-status").textContent="Ошибка загрузки: "+e.message}finally{b.disabled=false}};
$("export").onclick=()=>{const file=new Blob([JSON.stringify({...data,exportedAt:new Date().toISOString()},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(file);a.download="workout-"+data.date+"-"+data.id.slice(0,8)+".json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),5000)};
$("importbtn").onclick=()=>$("importfile").click();
$("importfile").onchange=async e=>{const file=e.target.files[0];if(!file)return;try{const parsed=JSON.parse(await file.text());if(parsed.schemaVersion!==1||!Array.isArray(parsed.exercises)||!parsed.exercises.every(e=>e&&Array.isArray(e.sets)&&typeof e.name==="string"))throw Error("Неверный формат");if(!confirm("Заменить текущую локальную тренировку импортированной?"))return;data=parsed;save();render();renderHistory()}catch(err){alert("Ошибка импорта: "+err.message)}};
$("reset").onclick=()=>{if(!confirm("Создать новую сессию? Текущая будет заменена. Сначала экспортируй JSON."))return;if(!data.endedAt&&!confirm("Незавершённая тренировка останется в истории. Продолжить?"))return;data=fresh(data.date);save();render();renderHistory()};
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")update()});
window.addEventListener("pagehide",save);setInterval(update,500);render();refreshSoundButton();save();renderHistory();