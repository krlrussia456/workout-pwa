"use strict";
const REPO="krlrussia456/food-diary",API="https://api.github.com/repos/"+REPO+"/contents/";
const GOALS={kcal:1800,protein:160,fat:60,carbs:155};
const $=id=>document.getElementById(id);
const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const num=n=>(n===null||n===undefined||String(n).trim()==="")?null:Number.isFinite(Number(n))?Number(n):null,fmt=(n,d=0)=>n==null||!Number.isFinite(n)?"—":n.toLocaleString("ru-RU",{maximumFractionDigits:d,minimumFractionDigits:d});
const today=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-")};
const shift=(s,n)=>{const d=new Date(s+"T12:00:00");d.setDate(d.getDate()+n);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-")};
const formatDate=d=>{const [y,m,day]=d.split("-");return day+"."+m+"."+y};
let token="",username="",datasets=null,mode="day",workouts=[];
function decode(b64){return new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\s/g,"")),c=>c.charCodeAt(0)))}
async function gh(path){
 const url=API+path;
 const res=await fetch(url,{headers:{"Accept":"application/vnd.github+json","Authorization":"Bearer "+token,"X-GitHub-Api-Version":"2022-11-28"},cache:"no-store"});
 if(!res.ok){if(res.status===401||res.status===403)throw Error("Доступ отклонён. Проверь токен и право чтения репозитория.");if(res.status===404)throw Error("Файл или приватный репозиторий не найден: "+path);throw Error("Ошибка GitHub API: "+res.status)}
 const data=await res.json();return Array.isArray(data)?data:decode(data.content||"");
}
function csvParse(src){
 const res=[];let row=[],cell="",q=false;
 for(let i=0;i<src.length;i++){const c=src[i];if(c==='"'){if(q&&src[i+1]==='"'){cell+='"';i++}else q=!q}else if(c===","&&!q){row.push(cell);cell=""}else if((c==="\n"||c==="\r")&&!q){if(c==="\r"&&src[i+1]==="\n")i++;row.push(cell);cell="";if(row.some(v=>v!==""))res.push(row);row=[]}else cell+=c}
 if(cell||row.length){row.push(cell);res.push(row)}
 const headers=res.shift()||[];return res.map(row=>Object.fromEntries(headers.map((k,i)=>[k,row[i]??""])));
}
async function loadData(){
 $("data-status").textContent="Загружаю данные из приватного дневника…";
 const [meals,weights,waist,activity,dir]=await Promise.all([
  gh("data/meals.csv"),gh("data/weight.csv"),gh("data/body-measurements.csv").catch(()=>null),gh("data/activity.csv"),gh("data/workouts").catch(()=>[])
 ]);
 datasets={meals:csvParse(meals),weights:csvParse(weights),waist:waist?csvParse(waist):[],activity:csvParse(activity)};
 const files=(Array.isArray(dir)?dir:[]).filter(x=>x.name&&/^\d{4}-\d{2}-\d{2}\.json$/.test(x.name));
 workouts=(await Promise.all(files.map(f=>gh("data/workouts/"+encodeURIComponent(f.name)).then(s=>JSON.parse(s)).catch(()=>null)))).filter(Boolean);
 $("data-status").textContent="Данные обновлены · "+datasets.meals.length+" записей о продуктах · "+workouts.length+" тренировок";
 render();
}
function dailyMap(){
 const days=new Map();
 const get=date=>{if(!date||!/^\d{4}-\d\d-\d\d$/.test(date))return null;if(!days.has(date))days.set(date,{date,meals:[],kcal:null,protein:null,fat:null,carbs:null,weight:null,waist:null,steps:null,distance:null,workouts:[]});return days.get(date)};
 for(const r of datasets.meals){const d=get(r.date);if(!d)continue;d.meals.push(r);for(const [k,field] of [["kcal","kcal"],["protein","protein_g"],["fat","fat_g"],["carbs","carbs_g"]])d[k]=(d[k]??0)+(num(r[field])??0)}
 for(const r of datasets.weights){const d=get(r.date);if(d)d.weight=num(r.weight_kg)}
 for(const r of datasets.waist){const d=get(r.date);if(d)d.waist=num(r.waist_cm)}
 for(const r of datasets.activity){const d=get(r.date);if(d){d.steps=num(r.steps);d.distance=num(r.distance_km)}}
 for(const w of workouts){const d=get(w.date);if(d)d.workouts.push(w)}
 return [...days.values()].sort((a,b)=>a.date.localeCompare(b.date));
}
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
 const records=rows.flatMap(r=>r.workouts).filter(w=>w.status==="completed"||w.exercises?.some(e=>e.sets?.some(s=>s.completed)));
 const totalSets=records.reduce((n,w)=>n+(w.exercises||[]).reduce((m,e)=>m+(e.sets||[]).filter(s=>s.completed).length,0),0);
 const totalExercises=records.reduce((n,w)=>n+(w.exercises||[]).filter(e=>(e.sets||[]).some(s=>s.completed)).length,0);
 const minutes=records.reduce((n,w)=>n+(w.startedAt&&w.endedAt?Math.max(0,w.endedAt-w.startedAt-(w.sessionPausedMs||0))/60000:0),0);
 $("training-info").innerHTML='<div class="train-big">'+records.length+' <span style="font-size:15px;font-weight:600">тренировок</span></div><p class="train-note">Выполненных подходов: <strong>'+totalSets+'</strong><br>Упражнений в выполненных сессиях: <strong>'+totalExercises+'</strong><br>Зафиксированная длительность: <strong>'+fmt(minutes,0)+' мин</strong></p>';
}
function renderTable(rows){
 if(!rows.length){$("daily-table").innerHTML='<p class="muted">За выбранный период записей нет.</p>';return}
 $("daily-table").innerHTML='<div class="diary-scroll"><table class="daily-table"><thead><tr><th>Дата</th><th>Ккал</th><th>Б, г</th><th>Ж, г</th><th>У, г</th><th>Вес</th><th>Шаги</th></tr></thead><tbody>'+[...rows].reverse().map(d=>'<tr><td><button class="open-day" data-date="'+safe(d.date)+'">'+safe(formatDate(d.date))+' ▾</button></td><td>'+fmt(d.kcal)+'</td><td>'+fmt(d.protein,1)+'</td><td>'+fmt(d.fat,1)+'</td><td>'+fmt(d.carbs,1)+'</td><td>'+fmt(d.weight,1)+'</td><td>'+fmt(d.steps)+'</td></tr><tr id="day-'+safe(d.date)+'" hidden><td colspan="7"><div class="day-foods">'+(d.meals.length?d.meals.map(m=>'<div><span>'+safe(m.food)+'</span><strong>'+fmt(num(m.kcal))+' ккал</strong></div>').join(""):'<span class="noentry">Записей о питании нет</span>')+'</div></td></tr>').join("")+'</tbody></table></div>';
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
 stat("🏋️","Тренировки",String(rows.reduce((n,r)=>n+r.workouts.filter(w=>w.status==="completed").length,0)),"Завершённых за период")
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
$("daily-table").onclick=e=>{const btn=e.target.closest(".open-day");if(!btn)return;const target=$("day-"+btn.dataset.date);if(target)target.hidden=!target.hidden};
$("logout").onclick=()=>{sessionStorage.removeItem("health-dashboard-token");sessionStorage.removeItem("health-dashboard-user");token="";datasets=null;workouts=[];$("dashboard-view").hidden=true;$("login-view").hidden=false;$("logout").hidden=true;$("token").value=""};
$("refresh").onclick=()=>loadData().catch(e=>$("data-status").textContent=e.message);
$("login-form").onsubmit=async e=>{
 e.preventDefault();username=$("username").value.trim();token=$("token").value.trim();
 if(!username||!token)return;
 const btn=$("login-submit");btn.disabled=true;btn.textContent="Проверяю доступ…";$("login-error").hidden=true;
 try{
  if(username.toLowerCase()!=="krlrussia456")throw Error("Укажи владельца подключённого личного дневника: krlrussia456.");
  await gh("data/weight.csv");
  sessionStorage.setItem("health-dashboard-token",token);sessionStorage.setItem("health-dashboard-user",username);
  $("login-view").hidden=true;$("dashboard-view").hidden=false;$("logout").hidden=false;
  const d=today();$("single-date").value=d;$("end-date").value=d;$("start-date").value=shift(d,-6);
  await loadData();
 }catch(err){$("login-error").textContent=err.message;$("login-error").hidden=false;$("dashboard-view").hidden=true;$("login-view").hidden=false}
 finally{btn.disabled=false;btn.textContent="Открыть дашборд"}
};
(async()=>{
 const saved=sessionStorage.getItem("health-dashboard-token");if(!saved)return;
 token=saved;username=sessionStorage.getItem("health-dashboard-user")||"krlrussia456";
 $("username").value=username;$("login-view").hidden=true;$("dashboard-view").hidden=false;$("logout").hidden=false;
 const d=today();$("single-date").value=d;$("end-date").value=d;$("start-date").value=shift(d,-6);
 try{await loadData()}catch(e){$("data-status").textContent="Не удалось обновить: "+e.message}
})();
