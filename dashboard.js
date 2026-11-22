"use strict";
// This public dashboard loads ONLY sanitized numeric aggregates from stats/daily.json.
// No account credentials, private APIs, source rows or raw training details are used.
const GOALS={kcal:1800,protein:160,fat:60,carbs:155};
const $=id=>document.getElementById(id);
const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const num=n=>(n===null||n===undefined||String(n).trim()==="")?null:Number.isFinite(Number(n))?Number(n):null;
const fmt=(n,d=0)=>n==null||!Number.isFinite(n)?"—":n.toLocaleString("ru-RU",{maximumFractionDigits:d,minimumFractionDigits:d});
const today=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-")};
const shift=(s,n)=>{const d=new Date(s+"T12:00:00");d.setDate(d.getDate()+n);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-")};
const formatDate=d=>{const [y,m,day]=d.split("-");return day+"."+m+"."+y};
let datasets=null,mode="day";
async function loadData(){
 $("data-status").textContent="Обновляю публичную статистику…";
 const response=await fetch("./stats/daily.json",{cache:"no-store"});
 if(!response.ok)throw Error("Статистика пока не опубликована: HTTP "+response.status);
 const json=await response.json();
 if(json.schemaVersion!==1||!Array.isArray(json.days))throw Error("Неподдерживаемый формат статистики.");
 datasets=json;
 $("data-status").textContent="Обновлено "+(json.updatedAt?new Date(json.updatedAt).toLocaleString("ru-RU"):"недавно")+" · "+json.days.length+" дней в истории";
 render();
}
function dailyMap(){return datasets?datasets.days.slice().sort((a,b)=>a.date.localeCompare(b.date)):[]}
const avg=(rows,k)=>{const v=rows.map(x=>x[k]).filter(x=>x!=null&&Number.isFinite(x));return v.length?v.reduce((a,b)=>a+b,0)/v.length:null};
const recent=(rows,k)=>{const v=rows.filter(x=>x[k]!=null);return v.length?v.at(-1)[k]:null};
const count=(rows,k)=>rows.filter(x=>x[k]!=null).length;
function stat(icon,label,value,sub){return '<article class="card stat"><div class="icon">'+icon+'</div><div class="label">'+safe(label)+'</div><div class="number">'+safe(value)+'</div><div class="sub">'+safe(sub)+'</div></article>'}
function lineChart(id,rows,k,color,target){
 const valid=rows.filter(x=>x[k]!=null&&Number.isFinite(x[k]));const mount=$(id);if(!valid.length){mount.innerHTML='<div class="chart-empty">Нет измерений за выбранные даты</div>';return}
 const w=470,h=174,left=35,right=10,top=18,bottom=30,chartW=w-left-right,chartH=h-top-bottom;
 let low=Math.min(...valid.map(x=>x[k]),target??Infinity),high=Math.max(...valid.map(x=>x[k]),target??-Infinity);
 if(high===low){high+=1;low-=1}else{const pad=(high-low)*.15;high+=pad;low-=pad}
 const x=i=>left+chartW*(valid.length===1?.5:i/(valid.length-1));
 const y=v=>top+(high-v)/(high-low)*chartH;
 const pts=valid.map((r,i)=>[x(i),y(r[k])]);const poly=pts.map(p=>p.join(",")).join(" ");
 const lines=[0,.5,1].map(t=>{const yy=top+chartH*t,val=high-(high-low)*t;return '<line x1="'+left+'" y1="'+yy+'" x2="'+(w-right)+'" y2="'+yy+'" stroke="#e8eeee"/><text x="'+(left-7)+'" y="'+(yy+4)+'" font-size="10" text-anchor="end" fill="#89979b">'+fmt(val,0)+'</text>'}).join("");
 const guide=target!=null&&target>=low&&target<=high?'<line x1="'+left+'" y1="'+y(target)+'" x2="'+(w-right)+'" y2="'+y(target)+'" stroke="#ebaa7e" stroke-dasharray="4 5"/>':"";
 const dots=pts.map((p,i)=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3.2" fill="#fff" stroke="'+color+'" stroke-width="2"><title>'+safe(formatDate(valid[i].date))+' — '+safe(fmt(valid[i][k],1))+'</title></circle>').join("");
 const labels=valid.length===1?formatDate(valid[0].date):formatDate(valid[0].date)+' · '+formatDate(valid.at(-1).date);
 mount.innerHTML='<svg role="img" aria-label="'+safe(id)+' '+safe(labels)+'" viewBox="0 0 '+w+' '+h+'">'+lines+guide+(pts.length>1?'<polyline points="'+poly+'" stroke="'+color+'" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>':"")+dots+'<text x="'+left+'" y="'+(h-6)+'" font-size="11" fill="#829093">'+safe(formatDate(valid[0].date))+'</text><text x="'+(w-right)+'" y="'+(h-6)+'" text-anchor="end" font-size="11" fill="#829093">'+safe(formatDate(valid.at(-1).date))+'</text></svg>';
}
function renderBars(rows,dayMode){
 const configs=[["Калории","kcal",GOALS.kcal,"ккал"],["Белки","protein",GOALS.protein,"г"],["Жиры","fat",GOALS.fat,"г"],["Углеводы","carbs",GOALS.carbs,"г"]];
 $("nutrition-subtitle").textContent=dayMode?"За выбранный день":"Среднее по дням с записями";
 $("macro-bars").innerHTML=configs.map(([name,key,goal,unit])=>{
 const value=avg(rows,key),pct=value==null?0:value/goal*100;
 return '<div class="macro"><div class="macro-label"><span>'+name+'</span><strong>'+(value==null?"Нет данных":fmt(value,1)+" / "+goal+" "+unit)+'</strong></div><div class="track"><div class="fill '+(pct>100?"over":"")+'" style="width:'+Math.min(100,Math.max(0,pct))+'%"></div></div></div>'}).join("");
}
function workoutStats(rows){
 const totalWorkouts=rows.reduce((n,r)=>n+(r.workoutCount||0),0);
 const totalSets=rows.reduce((n,r)=>n+(r.completedSets||0),0);
 const totalExercises=rows.reduce((n,r)=>n+(r.exerciseCount||0),0);
 const minutes=rows.reduce((n,r)=>n+(r.workoutMinutes||0),0);
 $("training-info").innerHTML='<div class="train-big">'+totalWorkouts+' <span style="font-size:15px;font-weight:600">тренировок</span></div><p class="train-note">Выполненных подходов: <strong>'+totalSets+'</strong><br>Упражнений в выполненных сессиях: <strong>'+totalExercises+'</strong><br>Зафиксированная длительность: <strong>'+fmt(minutes,0)+' мин</strong></p>';
}
function renderTable(rows){
 if(!rows.length){$("daily-table").innerHTML='<p class="muted">За выбранный период записей нет.</p>';return}
 $("daily-table").innerHTML='<div class="diary-scroll"><table class="daily-table"><thead><tr><th>Дата</th><th>Ккал</th><th>Б, г</th><th>Ж, г</th><th>У, г</th><th>Вес, кг</th><th>Талия, см</th><th>Шаги</th><th>Подходы</th></tr></thead><tbody>'+[...rows].reverse().map(d=>'<tr><td>'+safe(formatDate(d.date))+'</td><td>'+fmt(d.kcal)+'</td><td>'+fmt(d.protein,1)+'</td><td>'+fmt(d.fat,1)+'</td><td>'+fmt(d.carbs,1)+'</td><td>'+fmt(d.weight,1)+'</td><td>'+fmt(d.waist,0)+'</td><td>'+fmt(d.steps)+'</td><td>'+((d.completedSets||0)?"<strong>"+d.completedSets+"</strong>":"—")+'</td></tr>').join("")+'</tbody></table></div>';
}
function render(){
 if(!datasets)return;
 const all=dailyMap(),start=mode==="day"?$("single-date").value:$("start-date").value,end=mode==="day"?$("single-date").value:$("end-date").value;
 if(!start||!end||start>end){$("period-title").textContent="Проверь диапазон дат";return}
 const rows=all.filter(d=>d.date>=start&&d.date<=end),isDay=mode==="day",periodDays=Math.round((new Date(end+"T12:00:00")-new Date(start+"T12:00:00"))/86400000)+1;
 $("period-title").textContent=isDay?formatDate(start):formatDate(start)+" — "+formatDate(end);
 $("coverage").textContent=rows.length+" дат с данными · "+periodDays+" календарных дней";
 const wt=isDay?recent(rows,"weight"):recent(rows,"weight");
 const weightRows=rows.filter(r=>r.weight!=null),weightDelta=weightRows.length>=2?weightRows.at(-1).weight-weightRows[0].weight:null;
 const waist=isDay?recent(rows,"waist"):recent(rows,"waist");
 const kcal=avg(rows,"kcal"),prot=avg(rows,"protein"),steps=avg(rows,"steps");
 $("stat-grid").innerHTML=[
 stat("⚖️","Вес",wt==null?"—":fmt(wt,1)+" кг",isDay?"Измерение за день":(weightDelta==null?"Недостаточно точек":"Изменение за период: "+(weightDelta>0?"+":"")+fmt(weightDelta,1)+" кг")),
 stat("📏","Талия",waist==null?"—":fmt(waist,0)+" см","Последнее измерение в выбранном периоде"),
 stat("🔥",isDay?"Калории":"Калории в среднем",kcal==null?"—":fmt(kcal)+" ккал",count(rows,"kcal")+" дней с учётом питания"),
 stat("🥚",isDay?"Белок":"Белок в среднем",prot==null?"—":fmt(prot,1)+" г",count(rows,"protein")+" дней с учётом питания"),
 stat("👟",isDay?"Шаги":"Шаги в среднем",steps==null?"—":fmt(steps)+"",count(rows,"steps")+" дней с данными активности"),
 stat("🥑",isDay?"Жиры":"Жиры в среднем",fmt(avg(rows,"fat"),1)+" г","Цель 60 г в сутки"),
 stat("🌾",isDay?"Углеводы":"Углеводы в среднем",fmt(avg(rows,"carbs"),1)+" г","Цель 155 г в сутки"),
 stat("🏋️","Тренировки",String(rows.reduce((n,r)=>n+(r.workoutCount||0),0)),"Завершённых за период")
 ].join("");
 $("weight-mean").textContent=wt==null?"—":fmt(wt,1)+" кг";
 $("kcal-mean").textContent=kcal==null?"—":fmt(kcal)+" ккал";
 $("protein-mean").textContent=prot==null?"—":fmt(prot,1)+" г";
 $("steps-mean").textContent=steps==null?"—":fmt(steps)+"";
 lineChart("weight-chart",rows,"weight","#1d9b85",null);
 lineChart("kcal-chart",rows,"kcal","#ed9859",GOALS.kcal);
 lineChart("protein-chart",rows,"protein","#6483e8",GOALS.protein);
 lineChart("steps-chart",rows,"steps","#c28e47",null);
 renderBars(rows,isDay);workoutStats(rows);renderTable(rows);
}
function setMode(next){
 mode=next;$("day-picker").hidden=next!=="day";$("range-picker").hidden=next!=="range";$("quick").hidden=next!=="range";
 document.querySelectorAll("[data-mode]").forEach(b=>b.classList.toggle("selected",b.dataset.mode===next));render();
}
document.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
for(const id of ["single-date","start-date","end-date"])$(id).onchange=render;
document.querySelectorAll("[data-days]").forEach(b=>b.onclick=()=>{const n=b.dataset.days;const all=dailyMap();const end=all.length?all.at(-1).date:today();$("end-date").value=end;$("start-date").value=n==="all"?(all[0]?.date??end):shift(end,1-Number(n));render()});
$("refresh").onclick=()=>loadData().catch(e=>$("data-status").textContent=e.message);
(function init(){
 const d=today();$("single-date").value=d;$("end-date").value=d;$("start-date").value=shift(d,-6);
 loadData().catch(e=>$("data-status").textContent="Не удалось загрузить статистику: "+e.message);
})();
