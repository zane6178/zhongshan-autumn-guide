(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./city-data.js'):root.CityData);if(typeof module==='object'&&module.exports)module.exports=api;else root.CityPlan=api;})(typeof globalThis!=='undefined'?globalThis:this,function(D){
 const parse=v=>{if(!/^\d{2}:\d{2}$/.test(v))return null;const [h,m]=v.split(':').map(Number);return h<24&&m<60?h*60+m:null;};
 const clock=m=>(m>=1440?'次日 ':'')+String(Math.floor(m/60)%24).padStart(2,'0')+':'+String(m%60).padStart(2,'0');
 const duration=m=>(Math.floor(m/60)?Math.floor(m/60)+'小时':'')+(m%60?m%60+'分钟':'')||'0分钟';
 const insideWalk={jinghai:.5,xiuqiu:.6,ferry:.5,binjiang:.9,xiaoxihu:.5,zhanyuan:.6,laomendong:.8,qinhuai:.9,pilusi:.4,liuchao:.6,changjiang:.3,street1912:.4,xinjiekou:.6,yihe:.8,temple:.5,lakesouth:.2,liangzhou:.5,lakeend:.6};
 function normalize(route,ids){const r=D.routes[route];if(!r)throw Error('无效路线');const chosen=new Set(Array.isArray(ids)?ids:r.defaults);r.pool.forEach(id=>{if(D.spots[id].fixed)chosen.add(id);});return r.pool.filter(id=>chosen.has(id));}
 function toggle(route,ids,id,on){const r=D.routes[route];if(!r.pool.includes(id))return normalize(route,ids);const s=new Set(normalize(route,ids));if(on){s.add(id);const other=D.spots[id].replaces;if(other)s.delete(other);r.pool.forEach(k=>{if(D.spots[k].replaces===id)s.delete(k);});}else if(!D.spots[id].fixed)s.delete(id);return normalize(route,[...s]);}
 function km(a,b){const rad=Math.PI/180,dy=(b[0]-a[0])*rad,dx=(b[1]-a[1])*rad;return 6371*2*Math.asin(Math.sqrt(Math.sin(dy/2)**2+Math.cos(a[0]*rad)*Math.cos(b[0]*rad)*Math.sin(dx/2)**2));}
 const pairs={
 'binjiang>ferry':[20,'walk','从火车主题园附近滨江段回江边路公共步道，向北走到中山码头乘客入口；先核实宁浦航线当日开航。'],
 'jinghai>ferry':[20,'walk','从纪念馆出入口回建宁路，沿公共人行道向中山码头，过路走斑马线。'],
 'xiuqiu>ferry':[25,'walk','从绣球公园南门离开，经建宁路、江边路接码头乘客入口。'],
 'ferry>binjiang':[20,'walk','确认已坐回中山码头，再沿江边路公共步道向南接火车主题园附近滨江段。'],
 'xiaoxihu>laomendong':[15,'walk','从小西湖南侧公共街巷往老门东方向，接箍桶巷牌坊；不穿封闭居民院落。'],
 'zhanyuan>laomendong':[20,'walk','出瞻园路售票入口，沿中华路人行道向南，再经马道街接老门东。'],
 'laomendong>qinhuai':[25,'walk','从老门东北侧出，经马道街、中华路向北，再接瞻园路／贡院西街到文德桥。'],
 'pilusi>changjiang':[18,'walk','从汉府街入口出，接长江路向西，抵总统府正门外。'],
 'liuchao>changjiang':[8,'walk','从长江路302号出口沿长江路向西，走到总统府门楼外。'],
 'changjiang>street1912':[10,'walk','继续沿长江路向西至太平北路路口，按人行过街设施进入1912。'],
 'street1912>shijing':[18,'walk','从太平北路侧出，向四牌楼／珠江路片区步行；先在高德确认总店再跟道路导航。'],
 'temple>baiwei':[5,'walk','从鸡鸣寺原入口下台阶，找出口附近百味斋外部入口，先问是否仍供餐。'],
 'temple>lakesouth':[12,'walk','沿鸡鸣寺路向北接解放门，走地面开放入湖口，不上台城。'],
 'baiwei>lakesouth':[12,'walk','从素面馆回鸡鸣寺路，向解放门走，按湖区标识从地面入湖。'],
 'lakesouth>liangzhou':[22,'walk','入湖后按“梁洲／览胜楼”导览经过洲桥，沿开放步道前进；地图线不表示能直穿湖面。'],
 'liangzhou>lakeend':[25,'walk','从梁洲沿洲桥回环洲方向，再跟“玄武门”导览走湖岸，不横穿水面。'],
 'lakesouth>lakeend':[30,'walk','不去梁洲：沿环洲开放步道向西接玄武门湖岸；不要沿图上直线穿湖。']
 };
 function leg(prev,id,r){const s=D.spots[id];if(!prev)return {minutes:r.drive,mode:'taxi',text:`从${r.origin}打车到「${s.entry}」，含找上车点与周末市区转场预留${r.drive}分钟。景区堵车再加20–30分钟。`,from:r.origin};const a=D.spots[prev],known=pairs[prev+'>'+id];let minutes,mode,text;if(known)[minutes,mode,text]=known;else{const distance=km(a.xy,s.xy)*1.4;mode=distance>1.3?'taxi':'walk';minutes=mode==='walk'?Math.max(8,Math.ceil(distance/3.4*60/5)*5):Math.max(15,Math.ceil((10+distance*4)/5)*5);text=mode==='walk'?`从「${a.name}」回公共街面，导航到「${s.entry}」；走人行道、洲桥与开放入口。`:`离开「${a.name}」到可上车的公共道路，打车到「${s.entry}」，下车后按入口指示走。`;}
 return {minutes,mode,text,from:a.name};}
 function ferry(at){const out=Math.ceil((at+15)/30)*30,arrive=out+15,back=Math.ceil((arrive+20+15)/30)*30;return {out,arrive,back,end:back+15,valid:out<=1140&&back<=1140,minutes:back+15-at};}
 function plan(route,ids,time,custom={},drive){const original=D.routes[route],r=original&&{...original,drive:Number.isInteger(drive)&&drive>=10&&drive<=180?drive:original.drive},start=parse(time);if(!r||start===null)throw Error('请选择有效路线与时间');const selected=normalize(route,ids);let cursor=start,prev=null;const warnings=[],rows=[];for(const id of selected){const s=D.spots[id],travel=leg(prev,id,r),depart=cursor;cursor+=travel.minutes;const arrive=cursor;let play=Number.isInteger(custom[id])&&custom[id]>=5&&custom[id]<=180?custom[id]:s.minutes;let boat=null;if(id==='ferry'){boat=ferry(arrive);play=boat.minutes;if(!boat.valid)warnings.push({id,text:'轮渡无法在19:00末班前完成往返：请删除整组轮渡，改走江南滨江。'});}if(s.early&&arrive>s.early)warnings.push({id,text:s.name+'预计'+clock(arrive)+'才到，晚于保守入场建议；请删掉或改室外，勿赶闭馆。'});if(s.daylight&&arrive>=1005)warnings.push({id,text:s.name+'抵达已近傍晚，秋叶／落日拍摄余量不足；想拍秋色需提前离山或删前站。'});if(s.night&&arrive<1050)warnings.push({id,text:s.name+'到得早，灯光未必开启；可多休息或将晚饭时间加长。'});cursor+=play;rows.push({id,number:rows.length+1,travel,depart,arrive,leave:cursor,play,boat});prev=id;}
 const walkKm=rows.reduce((sum,row)=>sum+(insideWalk[row.id]||0)+(row.travel.mode==='walk'?row.travel.minutes/60*2.7:0),0);
 return {route,start,selected,rows,finish:cursor,total:cursor-start,home:cursor+(rows.length?r.returnMin:0),walkKm,warnings,feasible:!rows.some(x=>x.boat&&!x.boat.valid)};}
 function readState(raw){try{const s=JSON.parse(raw);return s&&typeof s==='object'&&!Array.isArray(s)?s:{};}catch{return {};}}
 return {parse,clock,duration,normalize,toggle,leg,ferry,plan,readState};
});
