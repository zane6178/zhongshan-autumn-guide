const {points:P,routeCopy,extraPhotos,walks}=GUIDE;
function baseMap(id) {
  const map=L.map(id,{scrollWheelZoom:false,attributionControl:true,zoomSnap:.25}).setView([32.051,118.838],15);
  // Local OpenStreetMap geometry keeps the preview independent of online tile services.
  L.geoJSON(MAP_BASE,{interactive:false,style:f=>f.properties.natural==='water'?{color:'#91b9bd',weight:1,fillColor:'#b7d1ce',fillOpacity:.85}:{color:['primary','tertiary'].includes(f.properties.highway)?'#c5b79b':'#d8d5c3',weight:['primary','tertiary'].includes(f.properties.highway)?5:2,opacity:.85}}).addTo(map);
  map.attributionControl.addAttribution('道路／湖岸 © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>');
  L.control.scale({imperial:false,position:'bottomleft'}).addTo(map);
  return map;
}
const routeMap=baseMap('route-map');
let layer=L.layerGroup().addTo(routeMap), detailMap;
function marker(map,latlng,label,title,click,color='#354e3e') {
  const gate=String(label).endsWith('门'),size=gate?18:26;
  const m=L.marker(latlng,{title,keyboard:!!click,icon:L.divIcon({className:'route-pin'+(gate?' gate-pin':''),html:`<button style="--pin:${color}" aria-label="${title}">${label}</button>`,iconSize:[size,size],iconAnchor:[size/2,size/2]})}).addTo(map);
  m.bindTooltip(title,{direction:'top',offset:[0,-12]});
  if(click) m.on('click',click);
  return m;
}
function connector(map,a,b,color,car=false) {
  L.polyline([a,b],{color,weight:car?4:3,dashArray:car?'10 8':'3 6',opacity:.9,interactive:false}).addTo(map);
  const dx=(b[1]-a[1])*Math.cos(a[0]*Math.PI/180),dy=b[0]-a[0],angle=Math.atan2(dx,dy)*180/Math.PI;
  L.marker([(a[0]+b[0])/2,(a[1]+b[1])/2],{interactive:false,icon:L.divIcon({className:'route-arrow',html:`<span style="color:${color};transform:rotate(${angle}deg)">▲</span>`,iconSize:[20,20],iconAnchor:[10,10]})}).addTo(map);
}
function label(map,id,text) { L.marker(P[id],{interactive:false,icon:L.divIcon({className:'map-label',html:`<span>${text}</span>`,iconSize:[110,22],iconAnchor:[55,-16]})}).addTo(map); }
function renderRouteMap() {
  layer.clearLayers();
  const ids=routeIds[routeChoice];const color=routeChoice==='main'?'#354e3e':'#b16b32';
  marker(layer,P.metro,'M','苜蓿园1号口',null,'#61796b');label(layer,'metro','苜蓿园1号口');
  const points=[P.metro]; let previous=P.metro;
  ids.forEach((id,i)=>{
    const s=TRIP.spots.find(s=>s.id===id);
    if(id==='mausoleum') {
      if(routeChoice==='main') {connector(layer,previous,P.bus,color);marker(layer,P.bus,'车','美龄宫景交站',()=>openSpot('mausoleum'),'#51778a');}
      connector(layer,routeChoice==='main'?P.bus:previous,P.south,'#51778a',true);previous=P.south;
      marker(layer,P.south,'车','中山陵南站',()=>openSpot('mausoleum'),'#51778a');label(layer,'south','中山陵南站');
    }
    if(id==='garden') {connector(layer,previous,P.gate1,color);marker(layer,P.gate1,'1门','明孝陵1号门',()=>openSpot('garden'),color);label(layer,'gate1','1号门 · 北园分流');previous=P.gate1;}
    if(id==='avenue') {connector(layer,previous,P.gate5,color);marker(layer,P.gate5,'5门','明孝陵5号门',()=>openSpot('avenue'));label(layer,'gate5','5号门 · 主线向东');previous=P.gate5;}
    connector(layer,previous,P[id],color);
    const names={stone:'石象路',deer:'鹿苑（约）',garden:'北园入口（约）',lake:'燕雀湖（区域）'};
    marker(layer,P[id],i+1,s.name,()=>openSpot(id),color);label(layer,id,names[id]||s.name.split(' · ')[0]);
    if(['deer','garden','lake'].includes(id)) L.circle(P[id],{radius:id==='garden'?130:85,color,weight:1,fillOpacity:.08,interactive:false}).addTo(layer);
    previous=P[id];points.push(P[id]);
  });
  // Always show the western alternative so its distance from the eastern sights is clear.
  if(routeChoice==='main') {marker(layer,P.garden,'B','北园备选（入口一带约位）',()=>{setRoute('garden');},'#b16b32');label(layer,'garden','北园备选 · 在西侧');}
  const timing=currentPlan();
  $('route-summary').innerHTML=`<h3>${routeCopy[routeChoice].title}</h3><p>${routeCopy[routeChoice].text}</p><p class="route-end">${timing.startText}开始 → ${timing.finishText}游完 → ${timing.departText}到${timing.exitName}；全程${timing.totalText}，周六另加30–60分钟机动。</p>`;
  $('route-stops').innerHTML=activeSpots().map((s,i)=>`<button data-detail="${s.id}"><b>${i+1}</b><span>${s.name}<small>${spotTime(s)}</small></span><i>看走法 ↗</i></button>`).join('');
  routeMap.fitBounds(L.latLngBounds([...points,P.garden]),{padding:[48,48],maxZoom:16});
  document.querySelectorAll('[data-route]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.route===routeChoice)));
}
function setRoute(value){routeChoice=value;progressSpot='start';judgeTime=startTime;$('judge-time').value=judgeTime;if(value!=='main') mode='easy';renderMode();renderRouteMap();}
document.querySelectorAll('[data-route]').forEach(b=>b.addEventListener('click',()=>setRoute(b.dataset.route)));
$('reset-map').addEventListener('click',renderRouteMap);
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',renderRouteMap));
function openSpot(id) {
  const s=TRIP.spots.find(x=>x.id===id), index=routeIds[routeChoice].indexOf(id);
  const prev=index>0?TRIP.spots.find(x=>x.id===routeIds[routeChoice][index-1]):null;
  let instructions=[...walks[id]];
  if(id==='mausoleum' && routeChoice==='garden') instructions[0]='北园正门出来后，先问当日允许上车的位置，优先地图叫车到“中山陵南站”允许落客点，按管制范围下车后步行；无直达景交线的核实依据。含等车、步行与交通预留45–60分钟，14:45仍未出发则取消中山陵，避免赶闭园。';
  const pictures=[[s.photo,s.caption],...(extraPhotos[id]||[])];
  $('detail-body').innerHTML=`<p class="eyebrow green">${index>=0?'本路线第 '+(index+1)+' 站':'可选地点'}</p><h2 id="detail-title">${s.name}</h2><p class="time">${spotTime(s)} · ${s.tag}</p><h3>从${prev?prev.name:'上一段交通'}怎么来</h3><ol class="direction-list">${instructions.map(t=>`<li>${t}</li>`).join('')}</ol><div id="detail-map" class="detail-map" aria-label="${s.name}与前一站位置图"></div><p class="fine">编号为游览站点；📷圆圈表示拍摄范围，不是精确树木或桥位。彩色连接表示顺序；实际走园内开放道路。</p><h3>看图认路、找机位</h3><div class="detail-gallery">${pictures.map(([photo,cap])=>`<figure><button data-detail-photo="${photo}" data-caption="${cap}"><img src="${assetUrl(photo)}" alt="${cap}" loading="lazy"></button><figcaption>${cap} · 点图放大</figcaption></figure>`).join('')}</div><div class="shots">${s.shots.map((x,i)=>`<div class="shot"><h4>📷 ${i+1} · ${x.name}</h4><p>怎么找：${x.find}</p><p>怎么拍：${x.how}</p></div>`).join('')}</div><p class="tip">${s.tip}</p><a class="primary" href="https://uri.amap.com/search?keyword=${encodeURIComponent(s.query)}&city=南京&view=map" target="_blank" rel="noopener">打开地图搜此入口 ↗</a> <a class="source-link" href="${s.source}" target="_blank" rel="noopener">看小红书原帖 ↗</a><div class="detail-next">${index>=0 && index<routeIds[routeChoice].length-1?`<button class="copybtn" data-detail="${routeIds[routeChoice][index+1]}">下一站：${activeSpots()[index+1].name} →</button>`:currentPlan().exitText}</div>`;
  if(detailMap) detailMap.remove();
  const row=currentPlan().rows.find(r=>r.id===id);
  if(row)$('detail-body').querySelector('.time').insertAdjacentHTML('afterend',`<div class="detail-timing">${row.transferStartText}开始转场 · 预留${row.transfer}分钟<br>${row.arriveText}–${row.leaveText}游玩／拍照 · ${row.play}分钟<br>至此累计${row.elapsed}。想现在结束，可关闭详情到“时间判断”选择这一站。</div>`);
  if(!$('spot-detail').open) $('spot-detail').showModal();
  detailMap=baseMap('detail-map');
  const previous=prev?P[prev.id]:P.metro, current=P[id],bounds=[previous,current];
  marker(detailMap,previous,'前',prev?prev.name:'苜蓿园1号口');marker(detailMap,current,index>=0?index+1:'选',s.name);
  if(id==='garden') {connector(detailMap,previous,P.gate1,'#b16b32');connector(detailMap,P.gate1,current,'#b16b32');}
  else if(id==='mausoleum') {connector(detailMap,previous,P.south,'#51778a',true);connector(detailMap,P.south,current,'#b16b32');}
  else connector(detailMap,previous,current,'#b16b32');
  const near=id==='stone'?[['gate1','1号门 · 北园线'],['gate5','5号门 · 主线']]:id==='garden'?[['gate1','1号门出 → 北园']]:id==='mausoleum'?[['south','中山陵南站']]:[];
  near.forEach(([key,name])=>{marker(detailMap,P[key],key==='south'?'车':key==='gate1'?'1门':'5门',name);label(detailMap,key,name);bounds.push(P[key]);});
  // Only verified anchors/areas are shown; internal red bridge coordinates are not known.
  L.circle(current,{radius:['garden','deer','lake'].includes(id)?130:65,color:'#b16b32',weight:1,fillOpacity:.13}).addTo(detailMap).bindTooltip(id==='garden'?'北园入口一带；红桥见实拍指引':'📷 拍摄区域（约）');
  if(id!=='garden')marker(detailMap,[current[0]+.00018,current[1]+.00035],'📷','机位范围，见下方图文');
  detailMap.fitBounds(bounds,{padding:[55,40],maxZoom:17});detailMap.invalidateSize();$('spot-detail').scrollTop=0;
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-detail]');if(b)openSpot(b.dataset.detail);const ph=e.target.closest('[data-detail-photo]');if(ph){$('big-photo').src=assetUrl(ph.dataset.detailPhoto);$('big-photo').alt=ph.dataset.caption;$('big-caption').textContent=ph.dataset.caption;$('lightbox').showModal();}});
$('close-detail').addEventListener('click',()=>$('spot-detail').close());
$('spot-detail').addEventListener('click',e=>{if(e.target===$('spot-detail'))$('spot-detail').close();});
renderRouteMap();
