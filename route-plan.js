(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.RoutePlan=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const routes={
    main:{name:'A · 四景主线',ids:['lake','deer','stone','avenue','palace','mausoleum','music'],exitMinutes:40,exitName:'钟灵街地铁站',exitText:'音乐台出口 → 孙中山纪念馆（音乐台）景交站 → 钟灵街方向，步行与候车、车程合计40分钟。'},
    garden:{name:'B · 北园替换美龄宫',ids:['lake','deer','stone','garden','mausoleum','music'],exitMinutes:40,exitName:'钟灵街地铁站',exitText:'音乐台出口 → 孙中山纪念馆（音乐台）景交站 → 钟灵街方向，步行与候车、车程合计40分钟。'},
    west:{name:'C · 西侧赏秋线',ids:['lake','deer','stone','garden'],exitMinutes:75,exitName:'苜蓿园地铁站',exitText:'北园回正门后简餐30分钟，再步行至苜蓿园地铁站，保守预留45分钟；如不吃午餐，可减30分钟。'}
  };
  const stops={
    lake:{name:'燕雀湖',play:30,transfer:0,transferText:'已到3号门附近湖区；开始拍照。',exit:[20,35,'从3号门附近开放步道返回苜蓿园地铁站。']},
    deer:{name:'长生鹿苑',play:20,transfer:5,transferText:'湖边至鹿苑步行、认入口预留5分钟；互动排队超15分钟改外围。',exit:[25,40,'回3号门出园，再步行到苜蓿园地铁站。']},
    stone:{name:'石象路',play:40,transfer:15,transferText:'鹿苑至石象路按导览牌步行，预留15分钟。',exit:[30,45,'从5号门出，沿陵园路人行步道回苜蓿园地铁站。']},
    avenue:{name:'梧桐大道',play:10,transfer:10,transferText:'石象路至5号门出园，再到附近人行步道，预留10分钟。',exit:[25,40,'沿陵园路人行步道返回苜蓿园地铁站。']},
    palace:{name:'美龄宫',play:35,transfer:10,transferText:'从陵园路继续走至美龄宫，预留10分钟。',exit:[35,50,'从美龄宫正门沿陵园路步行回苜蓿园地铁站；打车需先确认允许上车点。']},
    garden:{name:'植物园北园',play:80,transfer:40,transferText:'石象路 → 明孝陵1号门出 → 北园正门，出园与步行预留40分钟。',exit:[40,55,'回北园正门后步行至苜蓿园地铁站，含找出口；若先吃午餐再加30分钟。']},
    mausoleum:{name:'中山陵',play:40,transfer:80,transferText:'美龄宫景交候车20＋车程15＋午餐30＋南站至博爱坊步行15＝80分钟。',exit:[35,60,'先原路下到中山陵南站，询问现场开往地铁方向的景交线路；这里估算到地铁，不含再回南京站。']},
    music:{name:'音乐台',play:35,transfer:10,transferText:'从中山陵下行至博爱坊附近，按导览去音乐台，预留10分钟。',exit:[30,45,'从音乐台出，找孙中山纪念馆（音乐台）景交站，确认往钟灵街方向当日线路。']}
  };
  function parseTime(value){if(!/^\d{2}:\d{2}$/.test(value))return null;const [h,m]=value.split(':').map(Number);return h<24&&m<60?h*60+m:null;}
  function clock(minutes){const day=Math.floor(minutes/1440);const t=((minutes%1440)+1440)%1440;return (day>0?'次日 ':'')+String(Math.floor(t/60)).padStart(2,'0')+':'+String(t%60).padStart(2,'0');}
  function duration(minutes){const h=Math.floor(minutes/60),m=minutes%60;return (h?h+'小时':'')+(m?m+'分钟':'')||'0分钟';}
  function plan(routeId,mode,startTime){
    const route=routes[routeId],start=parseTime(startTime);
    if(!route||start===null)throw new Error('请选择有效路线和开始时间');
    let cursor=start;
    const rows=route.ids.map(id=>{
      const s=stops[id];let transfer=s.transfer,transferText=s.transferText;
      if(id==='mausoleum'&&routeId==='garden'){transfer=105;transferText='北园出园后简餐30＋向东接驳60＋南站步行15＝105分钟；无已核实直达景交，需确认周末上落客点。';}
      const transferStart=cursor;cursor+=transfer;const arrive=cursor,play=s.play+(id==='mausoleum'&&mode==='summit'&&routeId==='main'?60:0);cursor+=play;
      return {id,name:s.name,transfer,transferText,play,transferStart,arrive,leave:cursor,arriveText:clock(arrive),leaveText:clock(cursor),transferStartText:clock(transferStart),elapsed:duration(cursor-start)};
    });
    const finish=cursor,depart=finish+route.exitMinutes;
    return {routeId,mode:routeId==='main'?mode:'easy',name:route.name,start,rows,finish,depart,total:depart-start,visitTotal:finish-start,startText:clock(start),finishText:clock(finish),departText:clock(depart),totalText:duration(depart-start),visitText:duration(finish-start),bufferText:clock(depart+30)+'–'+clock(depart+60),exitName:route.exitName,exitMinutes:route.exitMinutes,exitText:route.exitText};
  }
  function judge(p,lastId,nowTime){
    const now=parseTime(nowTime);if(now===null)throw new Error('请选择有效的判断时刻');
    const index=lastId==='start'?-1:p.rows.findIndex(s=>s.id===lastId);
    if(lastId!=='start'&&index<0)throw new Error('当前进度不在这条路线里');
    const planned=index<0?p.start:p.rows[index].leave,shift=now-planned;
    const remaining=p.depart-planned,finish=p.finish+shift,depart=p.depart+shift;
    const current=index<0?stops.lake:stops[lastId];let exit=current.exit;
    if(lastId==='stone'&&p.routeId!=='main')exit=[35,50,'可从明孝陵1号门出，沿植物园路返回苜蓿园地铁站；若不再去北园，不必继续向北。'];
    const warnings=[];
    const future=p.rows.slice(index+1);
    const zsl=future.find(s=>s.id==='mausoleum'),garden=future.find(s=>s.id==='garden'),music=future.find(s=>s.id==='music');
    if(zsl&&zsl.arrive+shift>=16*60)warnings.push('中山陵预计16:00后才到：建议提前结束或取消这一站；陵门以上17:00结束开放，另需预约时段匹配。');
    if(garden&&garden.arrive+shift>=15*60+30)warnings.push('北园预计15:30后到：旧资料17:00关园，当前营业时间尚未核实，建议取消北园，避免赶场。');
    if(music&&music.leave+shift>=17*60)warnings.push('音乐台预计17:00后游完：秋季天色渐暗，建议压缩停留或提前结束，勿以售票截止时间当拍照余量。');
    if(p.routeId==='garden'&&future.some(s=>s.id==='mausoleum')&&lastId==='garden'&&now>=14*60+45)warnings.push('已过14:45还在北园：建议就在西侧结束，取消向东接中山陵和音乐台。');
    if(!warnings.length)warnings.push(index===p.rows.length-1?'本线景点已游完，按离开路线前往地铁；若临时用餐，再加相应用时。':'时间上可按这条线继续；遇排队仍建议留30–60分钟机动，不代表实时客流或开放保证。');
    return {remaining,remainingText:duration(remaining),finishText:clock(finish),departText:clock(depart),bufferText:clock(depart+30)+'–'+clock(depart+60),exitText:exit[2],exitRange:exit[0]+'–'+exit[1]+'分钟',exitArrivalText:clock(now+exit[0])+'–'+clock(now+exit[1]),warnings,done:index===p.rows.length-1,place:index<0?'开始游玩前':current.name+'游完后'};
  }
  return {routes,stops,parseTime,clock,duration,plan,judge};
});
