const sharedPlan=new URLSearchParams(location.search);
let savedPlan={};
try { savedPlan=JSON.parse(localStorage.getItem('zhongshan-plan-v1')||'{}')||{}; } catch {}
let routeChoice=RoutePlan.routes[sharedPlan.get('route')]?sharedPlan.get('route'):RoutePlan.routes[savedPlan.route]?savedPlan.route:'main';
let mode=routeChoice==='main'&&(sharedPlan.get('mode')||savedPlan.mode)==='summit'?'summit':'easy';
let startTime=RoutePlan.parseTime(sharedPlan.get('start'))!==null?sharedPlan.get('start'):RoutePlan.parseTime(savedPlan.start)!==null?savedPlan.start:'09:35';
let judgeTime=startTime,progressSpot='start';
const routeIds = Object.fromEntries(Object.entries(RoutePlan.routes).map(([id,r])=>[id,r.ids]));
const currentPlan=()=>RoutePlan.plan(routeChoice,mode,startTime);
const activeSpots = () => routeIds[routeChoice].map(id=>TRIP.spots.find(s=>s.id===id));
function spotTime(s) {
  const row=currentPlan().rows.find(r=>r.id===s.id);
  return row ? row.arriveText+'–'+row.leaveText : '当前路线外的备选';
}
const safeRead = key => { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } };
let visits = new Set(safeRead('zhongshan-visits-v1'));
let packed = new Set(safeRead('zhongshan-packed-v1'));
const save = (key, values) => { try { localStorage.setItem(key, JSON.stringify([...values])); } catch { toast('本次已勾选；当前浏览器无法保存到下次。'); } };
const $ = id => document.getElementById(id);
$('start-time').value=startTime;$('judge-time').value=judgeTime;
const assetUrl = file => window.LOCAL_ASSETS && window.LOCAL_ASSETS[file] || `assets/${file}`;
const photoUrl = s => s.photo.startsWith('data:') ? s.photo : assetUrl(s.photo);
let toastTimer;
function toast(text) { $('toast').textContent = text; $('toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 2600); }
async function copy(text) {
  try { await navigator.clipboard.writeText(text); toast('已复制，粘贴到微信或地图即可'); }
  catch { const box = document.createElement('textarea'); box.value = text; document.body.append(box); box.select(); const ok = document.execCommand('copy'); box.remove(); if (ok) toast('已复制'); else window.prompt('请长按复制以下内容', text); }
}
function progress() { $('progress').textContent = `${activeSpots().filter(s => visits.has(s.id)).length} / ${activeSpots().length} 组已打卡`; }
function renderMode() {
  try { localStorage.setItem('zhongshan-plan-v1',JSON.stringify({route:routeChoice,mode,start:startTime})); } catch {}
  const m = TRIP.modes.find(x => x.id === mode);
  $('mode-note').textContent=routeChoice==='main'?m.detail+' '+m.steps+'，不是实测里程。':routeChoice==='west'?'保留燕雀湖、鹿苑、石象路、北园；不再向东去三景。预计步行5–7公里，未实测。':'北园替换美龄宫，略过梧桐大道专门停拍，保留中山陵山脚与音乐台；向东接驳仍会费时，预计步行7–9公里，未实测。';
  document.querySelectorAll('[data-mode]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
  document.querySelector('[data-mode="summit"]').disabled=routeChoice!=='main';
  const p=currentPlan();
  $('metrics').innerHTML=`<div><strong>${p.startText} 开始</strong><small>景区开始游玩</small></div><div><strong>${p.finishText} 游完</strong><small>最后一站结束</small></div><div><strong>${p.departText} 到地铁</strong><small>全程预留${p.totalText}</small></div>`;
  renderSchedule();
  renderCards();
  $('travel-list').innerHTML=TRIP.transport.slice(0,4).map(t=>`<article class="travel"><h3>${t.title}</h3><p>${t.text}</p></article>`).join('')+p.rows.filter(r=>r.transfer>=40).map(r=>`<article class="travel"><h3>${r.transferStartText}–${r.arriveText} 转场至${r.name}</h3><p>${r.transferText}</p></article>`).join('')+`<article class="travel"><h3>${p.finishText}–${p.departText} 游完后离开</h3><p>${p.exitText} 周六另预留30–60分钟机动。</p></article>`;
  const tickets=routeChoice==='main'?TRIP.ticketTips:[routeChoice==='garden'?'本线取消美龄宫：普通成人明孝陵70＋音乐台10＝80元；中山陵另作免费实名预约。购买单票通常比100元钟山四景联票合适。':'西侧线普通成人明孝陵70元；取消美龄宫、中山陵、音乐台，无须为这条线购买100元四景联票。','植物园北园独立购票，不含在钟山联票内。旧笔记15元不代表2026当日价格，出发前在植物园官方渠道核对。',routeChoice==='garden'?'另预留北园到中山陵的打车／接驳费及音乐台离开景交费；周末管制可能增加步行，暂不承诺总预算。':'这条线不安排跨景区向东景交；离开西侧的市内交通、餐饮另计。',TRIP.ticketTips[3]];
  $('tickets').innerHTML=tickets.map(x=>`<li>${x}</li>`).join('');
}
function renderSchedule(){
  const p=currentPlan();
  if(progressSpot!=='start'&&!p.rows.some(r=>r.id===progressSpot))progressSpot='start';
  $('time-summary').innerHTML=`<div><small>开始游玩</small><strong>${p.startText}</strong></div><div><small>景点游玩结束</small><strong>${p.finishText}</strong></div><div><small>到${p.exitName}</small><strong>${p.departText}</strong></div><div><small>周六保守到地铁</small><strong>${p.bufferText}</strong></div><p>游览含转场${p.visitText}；加离开至地铁，全程${p.totalText}。机动30–60分钟是额外余量。</p>`;
  $('timeline').innerHTML=p.rows.map((r,i)=>`<article><div class="timeline-time">${r.arriveText}–${r.leaveText}<small>累计${r.elapsed}</small></div><div><button data-detail="${r.id}" class="timeline-place">${i+1}. ${r.name} ↗</button><p>${r.transfer?`上一站转场${r.transfer}分钟：${r.transferText}`:r.transferText}</p><span>游玩／拍照 ${r.play}分钟</span></div></article>`).join('')+`<article class="timeline-exit"><div class="timeline-time">${p.finishText}–${p.departText}</div><div><b>离开至${p.exitName} · ${p.exitMinutes}分钟</b><p>${p.exitText}</p></div></article>`;
  $('last-stop').innerHTML='<option value="start">尚未开始游玩</option>'+p.rows.map(r=>`<option value="${r.id}">${r.name} · 刚游完</option>`).join('');
  $('last-stop').value=progressSpot;renderJudgement();
}
function renderJudgement(){
  if(RoutePlan.parseTime(judgeTime)===null)return;
  const j=RoutePlan.judge(currentPlan(),progressSpot,judgeTime);
  $('judge-result').innerHTML=`<div class="decision"><b>${j.place} · 按${judgeTime}判断</b><p>${j.done?'本线景点已经游完，余下按计划用餐／离开。':`继续全线还需约${j.remainingText}（含到地铁）：预计${j.finishText}游完，${j.departText}到地铁。`}</p><p>继续全线，另加机动后到地铁：${j.bufferText}。</p></div><div class="decision exit-decision"><b>现在提前结束</b><p>${j.exitText}</p><p>至地铁预留${j.exitRange}，约${j.exitArrivalText}到达；不含额外午餐和返南京站。</p></div><ul>${j.warnings.map(t=>`<li>${t}</li>`).join('')}</ul>`;
}
$('start-time').addEventListener('change',e=>{if(RoutePlan.parseTime(e.target.value)===null)return;startTime=e.target.value;if(progressSpot==='start'){judgeTime=startTime;$('judge-time').value=judgeTime;}renderMode();renderRouteMap();});
$('judge-time').addEventListener('change',e=>{judgeTime=e.target.value;renderJudgement();});
$('last-stop').addEventListener('change',e=>{progressSpot=e.target.value;renderJudgement();});
$('use-now').addEventListener('click',()=>{const now=new Date();judgeTime=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');$('judge-time').value=judgeTime;renderJudgement();});
function renderCards() {
  const q = $('search').value.trim().toLowerCase();
  const spots = (q ? TRIP.spots : activeSpots()).filter(s => JSON.stringify(s).toLowerCase().includes(q));
  $('empty').hidden = spots.length !== 0;
  $('cards').innerHTML = spots.map(s => `<article class="card" id="spot-${s.id}">
    <button class="imagebtn" data-photo="${s.id}" aria-label="查看${s.name}照片"><img src="${photoUrl(s)}" alt="${s.alt}" loading="lazy"></button>
    <div class="image-caption">${s.caption}</div><div class="card-body"><div class="card-top"><span class="number">${activeSpots().findIndex(x=>x.id===s.id)>=0 ? String(activeSpots().findIndex(x=>x.id===s.id)+1).padStart(2,'0') : '备选'} / AUTUMN</span><span class="tag">${s.tag}</span></div><h3>${s.name}</h3><span class="time">${spotTime(s)} · 建议停留</span><button class="primary detail-button" data-detail="${s.id}">点进来看：上一站怎么来 · 地图机位 ↗</button><p class="walk">${s.walk}</p><div class="shots">${s.shots.map(x=>`<div class="shot"><h4>${x.name}</h4><p><b>怎么找</b> · ${x.find}</p><p><b>怎么拍</b> · ${x.how}</p></div>`).join('')}</div><p class="tip">${s.tip}</p><div class="card-actions"><a class="mapbtn" href="https://uri.amap.com/search?keyword=${encodeURIComponent(s.query)}&city=南京&view=map&src=zhongshan-autumn" target="_blank" rel="noopener">地图搜地点 ↗</a><button class="copybtn" data-copy="${s.id}">复制机位词</button><button class="checkin ${visits.has(s.id) ? 'done' : ''}" data-visit="${s.id}" aria-pressed="${visits.has(s.id)}">${visits.has(s.id) ? '✓ 已打卡' : '＋ 打卡'}</button></div><a class="source-link" href="${s.source}" target="_blank" rel="noopener">机位 / 实景来源 ↗</a></div></article>`).join('');
  progress();
}
$('cards').addEventListener('click', e => {
  const visit = e.target.closest('[data-visit]');
  if (visit) { const id=visit.dataset.visit; visits.has(id) ? visits.delete(id) : visits.add(id); save('zhongshan-visits-v1', visits); visit.classList.toggle('done',visits.has(id)); visit.setAttribute('aria-pressed',String(visits.has(id))); visit.textContent=visits.has(id)?'✓ 已打卡':'＋ 打卡'; progress(); return; }
  const cp = e.target.closest('[data-copy]'); if (cp) { const s=TRIP.spots.find(s=>s.id===cp.dataset.copy); copy(`${s.query}\n机位检索词：${s.shots.map(s=>s.name).join(' / ')}`); return; }
  const ph = e.target.closest('[data-photo]'); if (ph) { const s=TRIP.spots.find(s=>s.id===ph.dataset.photo); $('big-photo').src=photoUrl(s); $('big-photo').alt=s.alt; $('big-caption').textContent=s.caption; $('lightbox').showModal(); }
});
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.mode;renderMode();}));
$('search').addEventListener('input',renderCards);
$('clear-search').addEventListener('click',()=>{$('search').value='';renderCards();$('search').focus();});
$('weather').textContent=TRIP.weather;
$('tickets').innerHTML=TRIP.ticketTips.map(x=>`<li>${x}</li>`).join('');
$('notes').innerHTML=TRIP.notes.map(x=>`<li>${x}</li>`).join('');
$('checklist').innerHTML=TRIP.checklist.map((x,i)=>`<label class="checkitem"><input type="checkbox" data-pack="${i}" ${packed.has(i)?'checked':''}><span>${x}</span></label>`).join('');
$('checklist').addEventListener('change',e=>{const i=Number(e.target.dataset.pack);e.target.checked?packed.add(i):packed.delete(i);save('zhongshan-packed-v1',packed);});
$('source-list').innerHTML=TRIP.sources.map(x=>`<article class="source-row"><a href="${x.url}" target="_blank" rel="noopener">${x.title} ↗</a><small>${x.date}</small><p>${x.note}</p></article>`).join('');
$('official-copy').addEventListener('click',()=>copy('钟山风景区'));
$('share').addEventListener('click',()=>{
  const p=currentPlan();
  const text=`钟山赏秋手册 · ${p.name}\n${p.startText}开始，${p.finishText}游完，${p.departText}到地铁；周六另留30–60分钟。\n${activeSpots().map(s=>s.name).join(' → ')}`;
  if(location.protocol==='file:'){copy(text);return;}
  const url=new URL(location.href);url.search='';url.searchParams.set('route',routeChoice);url.searchParams.set('mode',mode);url.searchParams.set('start',startTime);url.hash='route';
  copy(text+'\n'+url.href);
});
$('close-photo').addEventListener('click',()=>$('lightbox').close());
$('lightbox').addEventListener('click',e=>{if(e.target===$('lightbox'))$('lightbox').close();});
$('print').addEventListener('click',()=>window.print());
renderMode();
