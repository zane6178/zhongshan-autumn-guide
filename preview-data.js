// Shared experience-version additions; the builder also includes these in the mini-program.
const XHS = {
  autumn: 'https://www.xiaohongshu.com/explore/69203df3000000001f009276?xsec_token=ABFt1KNf0wLDTy3f1UHMElmnIadXVvK_VqLrXgD2D9ZIM=&xsec_source=pc_search',
  garden: 'https://www.xiaohongshu.com/explore/6932ee88000000000d03aa87?xsec_token=ABjLzWvJFEFod2OaN_9kG7zfKWjEfLG7gxjLncxPOYr7U=&xsec_source=pc_search',
  recent: 'https://www.xiaohongshu.com/explore/6aef1ac60000000003017242?xsec_token=ABpatIwdgBdw0SiLrRt8GA2VzJMVY3cPCnXKmvoYEtUiM=&xsec_source=pc_search',
  four: 'https://www.xiaohongshu.com/explore/6a1a6c79000000003501faab?xsec_token=ABQECUxLFbn_KQLHhpg3WjMfPL5vVIzxqx3727Z_a7MWg=&xsec_source=pc_search',
  avenue: 'https://www.xiaohongshu.com/explore/6ae93ae300000000150176e5?xsec_token=ABdQS-HiCqJxdvN4Bvm_dyD1AI7mEXSt-B4uHacebzj6o=&xsec_source=pc_search',
  tomb: 'https://www.xiaohongshu.com/explore/6ac11dcb00000000140381dd?xsec_token=AB4bVyoX59b_NVeJamZCuxu4LYuxL59cMviQynW4qI0CY=&xsec_source=pc_search'
};
const photoChanges = {
  lake: ['lake-xhs.webp','燕雀湖水上杉林和倒影','小红书 · 多米哆咪（养熊猫版）｜2025-11-21发布，历史秋景',XHS.autumn,'09:35–10:10'],
  stone: ['stone-xhs.webp','游客拍摄的石象路石象与彩叶','小红书 · 多米哆咪（养熊猫版）｜2025-11-21发布，历史秋景',XHS.autumn,'10:35–11:35'],
  palace: ['palace-xhs.webp','游客拍摄的美龄宫外立面与大树','小红书 · 林下朽生｜页面编辑于05-31，绿叶季机位参考',XHS.four,'11:50–12:35'],
  music: ['music-xhs.webp','游客拍摄的音乐台舞台及鸽群','小红书 · 林下朽生｜页面编辑于05-31，绿叶季机位参考',XHS.four,'14:30–15:10'],
  mausoleum: ['mausoleum-xhs.webp','博爱坊及其后的中山陵中轴线','小红书 · Echo.｜10-03发布，拍摄日期未标，建筑机位参考',XHS.tomb,'13:35–14:20'],
  avenue: ['avenue-xhs.webp','小红书梧桐大道树冠和道路纵深配图','小红书 · 青加三点水｜11-03发布，拍摄日期未标，不代表本周叶色',XHS.avenue,'11:35–11:50']
};
TRIP.spots.forEach(s => {
  const c = photoChanges[s.id];
  if(c) [s.photo,s.alt,s.caption,s.source,s.time] = c;
});
TRIP.spots.splice(1,0,{
  id:'deer',name:'长生鹿苑 · 草坪与小鹿',tag:'明孝陵内顺路',time:'10:10–10:35',photo:'deer-xhs.webp',alt:'长生鹿苑草坪上的小鹿',caption:'小红书 · 多米哆咪（养熊猫版）｜2025-11-21发布，历史实拍',source:XHS.autumn,query:'南京 明孝陵 长生鹿苑',search:'鹿苑 小鹿 长生鹿苑 草坪',
  walk:'燕雀湖附近按“长生鹿苑”导览牌进入鹿苑区域；随后朝石象路走。两段转场在时间表单列：湖至鹿苑5分钟，鹿苑至石象路15分钟，不计入看鹿20分钟。',
  shots:[{name:'围栏外 · 草坪鹿群',find:'先到长生鹿苑游客入口，沿开放围栏找能看见鹿群的位置。',how:'用2×或3×远拍，让鹿群、草坪和树木同框，拍完即可继续走。'},{name:'互动区 · 小鹿靠近的瞬间',find:'想进入互动区先核对当日规则与收费；仅围栏外观看更省时。',how:'同伴从侧面连拍自然互动，不追赶、不把鹿围住，不自行带食物投喂。'}],
  tip:'建议最多25分钟。互动排队超过15分钟就改为外围看鹿；互动区费用、草料价格与开放时间未获官方确认，不计入联票承诺。'
});
TRIP.spots.push({
  id:'garden',name:'中山植物园北园 · 红枫岗',tag:'可选替换 · 独立门票',time:'12:15–13:30',photo:'garden-xhs.webp',alt:'红枫岗红桥桥上与桥下的红叶',caption:'小红书 · 泡泡妈妈遛娃记🍃｜2025-12-05实拍，作者说明调过滤镜；非本周叶色',source:XHS.garden,query:'南京 中山植物园 北园 正门',search:'植物园 北园 红枫岗 红桥 枫叶 替换',
  walk:'在石象路后改向明孝陵1号门出（不是主线5号门），出园后用步行导航找“中山植物园北园正门”。这一段预留约25–40分钟含出园，不穿越南园。北园入园后只选红枫岗和红桥，停留约60–90分钟。',
  shots:[{name:'红枫岗 · 枫叶小径',find:'2025实拍笔记的走法：正门直行 → 雕像处左转 → 岔路右转 → 下一个岔路左转 → 沿台阶上到红枫林。配合详情里的原作者岔路照片找路。',how:'用红叶作前景，2×拍人物与弯曲小径；台阶附近有坡度，并非全程平路。'},{name:'红桥 · 桥上桥下两个视角',find:'到红枫林后继续向右走，跟“红枫岗”导览牌找红桥。具体岔口有变化时询问工作人员。',how:'桥下1×把红桥和枫叶框进画面；桥上侧拍半身或走路背影，不挡桥面和台阶通行。'}],
  tip:'北园不属于钟山四景联票。旧笔记提到15元及8:30–17:00，仅作历史参考；本轮未核实2026当日票价、入园时间。红桥图为12月浓秋，11月14日可能尚未同色。'
});
TRIP.spots.forEach((s,i)=>s.number=String(i+1).padStart(2,'0'));
TRIP.spots.find(s=>s.id==='mausoleum').time='13:35–14:20';
TRIP.spots.find(s=>s.id==='mausoleum').summitTime='13:35–15:20';
TRIP.spots.find(s=>s.id==='avenue').tag='顺路拍10分钟';
TRIP.spots.find(s=>s.id==='stone').walk='由燕雀湖、鹿苑往石象路，沿神道拍石兽。A四景主线从5号门出，接梧桐大道和美龄宫；B/C北园线改从1号门出。此站不绕方城明楼、紫霞湖，现场按导览牌走。';
TRIP.spots.find(s=>s.id==='mausoleum').walk='A线由美龄宫乘景交至中山陵南站；B线由北园正门附近可上车处向东接驳，须核对周末管制。下车仍要步行，车不直达祭堂；详见“上一站怎么来”。';
TRIP.spots.find(s=>s.id==='mausoleum').tip='中山陵免费，但须官方小程序实名预约。预约时段应覆盖上方时间表所示到达时间，另留延误余量。登顶有392级上行台阶，原路下山；B线只安排山脚版。';
TRIP.spots.find(s=>s.id==='music').summitTime='15:30–16:10';
TRIP.modes[0].duration='景区约6–6.5小时';TRIP.modes[0].finish='15:50左右到地铁';
TRIP.modes[1].duration='景区约7–7.5小时';TRIP.modes[1].finish='16:50左右到地铁';
TRIP.transport[4]={title:'12:35–13:35 主线：景交＋午餐',text:'美龄宫站乘往中山陵南站方向景交车，运行约10–20分钟、候车约10–20分钟；在中山陵服务区简餐、补水，约30分钟。B/C北园线的午餐和接驳改看上方所选路线时间表。'};
TRIP.transport[5].title='15:10–15:50 主线离开（登顶版顺延1小时）';
TRIP.sources=TRIP.sources.filter(s=>!['lake','lakevideo'].includes(s.id));
TRIP.sources.unshift(
  {title:'小红书｜Echo. · 中山陵·以博爱之名',url:XHS.tomb,date:'10-03发布，拍摄日期未标',note:'采用博爱坊、蓝瓦中轴线实拍；绿叶季照片仅用于识别建筑与取景。'},
  {title:'小红书｜多米哆咪（养熊猫版）· 明孝陵游玩拍照全攻略',url:XHS.autumn,date:'2025-11-21',note:'采用燕雀湖、鹿苑、石象路照片。已查看原帖与原图；是历史叶色，不采用清晨免票等未核实说法。'},
  {title:'小红书｜泡泡妈妈遛娃记🍃 · 一图看懂红枫岗怎么走',url:XHS.garden,date:'2025-12-05',note:'采用北园正门、岔路指引、红桥照片及入园走法；作者说明调滤镜。价格及时间为旧笔记信息。'},
  {title:'小红书｜heyhennng · 11.7中山植物园实拍',url:XHS.recent,date:'正文标注2026-11-07拍摄',note:'作者称园内已经出现红叶、不同区域进度不同；未据此认定红枫岗已全红。'},
  {title:'小红书｜林下朽生 · 一天玩转梧桐大道·美龄宫·音乐台·明孝陵',url:XHS.four,date:'页面编辑于05-31',note:'采用美龄宫、音乐台及拍摄的园区导览图。绿叶季照片只用于识别建筑、构图；未采用私人电瓶车交通建议。'},
  {title:'小红书｜青加三点水 · 梧桐大道秋天限定金色隧道',url:XHS.avenue,date:'11-03发布，拍摄时间未标',note:'配图只作天桥、树冠构图参考；未独立核实原创及拍摄日期，不作为本周叶色证据。'}
);
TRIP.notes[TRIP.notes.length-1]='本测试页图片来自已查看的小红书笔记，标注作者、日期与原文。历史秋色、绿叶季或调色照片均不代表11月14日实况；仅供本次个人行程参考。';
