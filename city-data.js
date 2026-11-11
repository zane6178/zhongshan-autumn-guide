(function(root){
const tokens={
 '6aed629d0000000029013c9d':'ABh5bVs3R-0uFl5JBB0b_vNfKW2ru7tKK5Xp1IlPwNSBs=',
 '6aedc342000000000900c8f0':'ABh5bVs3R-0uFl5JBB0b_vNVZk5FBMG_qBY3k64YHCz1g=',
 '6acf8da6000000001c01da8d':'ABxKyP1eVpS9k6wpIaqjf4zV4_E12TOG4HxfWct2kwC20=',
 '6aa017510000000011036a83':'ABYFUKmFZpQ1uwSBWxba9wU3SX3mIMi4j5lmfBcQn1BSo=',
 '69f719100000000022028804':'ABySkBVdmlWz3f0PDCGE1Nkdsl-hyJTWQwayz2zb6lSqc=',
 '6a93fdd30000000026005b86':'ABXASSes840jWodApYPAKDorDMmf3KqpwgjjpBKM3pUcA=',
 '6ae6b69f0000000026000828':'ABSbEtv19NrBwt_GSShpAMDOMxydnGIQlRakO5UaI0sl4=',
 '6add781e00000000330197f8':'ABR_dl0Xc3vlRS9TBQopl7KNONqzq7H2o_pOhcQxiRAzA=',
 '6abe5c6c00000000020114d1':'ABAvwNo3jzMJG7Um_JJprClV5hVvfia4keCkj5ziqFPPM=',
 '6af4318c000000001f015c74':'ABQxlmgZPjOJrPPfA9oQ0sfIw3cv_DlcBHDpI0UcliXdE=',
 '6ad25fd1000000001b02f948':'ABss9vhnHtmNJbbjMjnS0zaTe9xvU5GfNyEHlJk6TdXEI=',
 '6ae1ccc2000000002203740c':'ABOKpMHJyNirmUBzIQAZlwqNW2r-4_ud_DVa_VJTXJx_M=',
 '6aeed7780000000018027c33':'ABErz9ZU-IeIacv9r2AePsqasM1cAUNnqhwsWSXOQkEXs=',
 '6aeef203000000001b01d45a':'ABErz9ZU-IeIacv9r2AePsqUarK_HzbG6xBZY6NQIFKDw=',
 '6aeacf1f000000000502df87':'ABdBCY6lUtuUOsn05M2wfJti9eEtjo2bOCSLUHQ3iO8TE=',
 '6aa60640000000000b000199':'AB2KJkrNaPycOgGc7uxCQLusWdwb9SJc2wuVtniyCgISQ=',
 '6a4e2694000000001503e7c4':'AB4EvZpbzSBYNDFphummbQ2auYDA4Qq15uQJU0xvWvx8g=',
 '6805f2f0000000001200e6fc':'ABVvLzp2Tkocax_DWoN8D3_SckoYC398L7uyPc8nCMhl8=',
 '6950b9b9000000002103d0de':'AB-XauS81xmxObAHl0jDKbpv9b_0pABVT-juclPMQipq4=',
 '684103d1000000002101bb67':'ABt_pamIFJDd4TYtwVi-xKtFC7Clx7JEcqIWytIURQItA=',
 '6a1feffe00000000350308e5':'ABpOd4irvKVfsT1Ve3BgBJkpYlUlbE4HyIitC2rS8Zm44=',
 '6a49c96b000000001702be99':'ABWQZ_BvypgQXf4z2_xvxotkr13GoTe8eQo2roSKodNUQ=',
 '68a872f0000000001d012f52':'ABwDZCU7JTE-V5Gj-qBhXPZmqXlk6Zt9Y7sllxTHMNXVA=',
 '69d0eca1000000001f001ef3':'ABH2J2OzrDtfciuVH4is6hwwpV52IT1ajDzG_74e8-ajE='
};
const note=id=>'https://www.xiaohongshu.com/explore/'+id+(tokens[id]?'?xsec_token='+encodeURIComponent(tokens[id])+'&xsec_source=pc_search':'');
const photos={
 pilusi:['鎏琉','2026-11-06','6aed629d0000000029013c9d','当日笔记称银杏微黄；叶色会继续变化。'],
 laomendong:['庄庄在金陵','2026-11-07','6aedc342000000000900c8f0','白墙、飞檐与乌桕的构图参考。'],
 xiaoxihu:['庄庄在金陵','2026-10-17','6acf8da6000000001c01da8d','街巷实拍，不代表本周秋叶进度。'],
 binjiang:['philotimo','2026-09-12','6aa017510000000011036a83','滨江落日参考；能否见晚霞取决于天气。'],
 ferry:['一只小露','2026-05-03','69f719100000000022028804','中山码头外观。'],
 jinghai:['Henry愛旅行','2026-08-30','6a93fdd30000000026005b86','静海寺游记中的建筑与周边视角，非秋叶实况。'],
 liuchao:['今天:-)','2026-11-01','6ae6b69f0000000026000828','原帖为同窗不同时节对照，不承诺当天满黄。'],
 xiuqiu:['金陵漫游集','2026-10-25','6add781e00000000330197f8','入口实景。'],
 changjiang:['慢了小半步','2026-10-02','6abe5c6c00000000020114d1','国庆街景；本周不承诺巡游、封路或活动。'],
 liangzhou:['见景知味','2026-11-11','6af4318c000000001f015c74','当日仍有绿黄交错，以现场叶色为准。'],
 qinhuai:['浩宁','2026-10-17','6ad25fd1000000001b02f948','秦淮夜景实拍。'],
 lakesouth:['浩朋的城','2026-10-28','6ae1ccc2000000002203740c','玄武湖湖内秋景构图参考。'],
 yihe:['是可乐吖','2026-11-07','6aeed7780000000018027c33','当日梧桐尚未全黄，避开商拍聚集。'],
 zhanyuan:['sunnyfrogggggg','2026-11-07','6aeef203000000001b01d45a','花窗与园林框景。'],
 temple:['别管我了','2026-11-05','6aeacf1f000000000502df87','古寺与银杏参考，不承诺满树金黄。'],
 street1912:['麻烦','2026-09-13','6aa60640000000000b000199','原帖拼图，含街区实景。'],
 xinjiekou:['路人甲先生','2026-07-08','6a4e2694000000001503e7c4','原片为高层远景，仅看城市氛围；本线只走公共街面，不寻找或进入楼顶。']
};
const spots={
 jinghai:{name:'静海寺纪念馆',xy:[32.0977,118.7383],minutes:40,photo:'jinghai',kind:'人文',early:960,entry:'建宁路288号入口',inside:'先看《南京条约》史料陈列，再看院落、碑刻；顺出口回建宁路。这里是纪念馆，并非烧香寺院。',shot:'院落门框与屋檐作前景；不对展柜使用闪光灯。',rule:'官方：免费、无需预约，周二至周日09:00–17:00，16:30止入。建议16:00前到。',official:'https://www.njjhs.cn/market.html'},
 xiuqiu:{name:'绣球公园',xy:[32.0942,118.7392],minutes:35,photo:'xiuqiu',kind:'公园',entry:'绣球公园南门',inside:'南门进，沿湖平路短走，拍湖岸树色后回南门；上午已爬山，不再爬山顶。',shot:'湖边树枝作前景，拍倒影和秋色。',rule:'开放公园候选；可一键替换静海寺，避免两处都加。',replaces:'jinghai'},
 ferry:{name:'中山码头 · 轮渡往返',xy:[32.0995,118.7303],minutes:90,photo:'ferry',kind:'轮渡',entry:'中山码头宁浦航线乘客入口',inside:'中山码头 → 宁浦航线 → 浦口码头 → 码头外公共江岸短逛20分钟 → 原航线回中山码头。旧火车站仅外观，不进轨道或封闭区；不去远端玻璃栈道。',shot:'船开后在允许区域拍船尾水纹与长江；大桥远景随方向、能见度变化。',rule:'官方2026冬令时：双向06:00–19:00，周末07:00后整点、半点发。表内按提前15分钟到候船、单程15分钟估算；天气或临时停航直接删掉整组。',official:'https://njgongjiao.com/tongzhi/9610'},
 binjiang:{name:'下关滨江 · 火车主题短走',xy:[32.0928,118.7274],minutes:45,photo:'binjiang',kind:'江景',daylight:true,entry:'下关西火车主题园附近公共步道',inside:'只截取下关西火车主题园附近的滨江段，沿江看铁路遗存与对岸，步行约0.8–1.2公里后在沿江公共道路离开。原帖整线2.2公里，本线不全走。',shot:'江岸栏杆引导线、铁路遗存、落日剪影；晴天尽量17:00前到。',rule:'免费公共滨江段；江边风大，不下滩、不越护栏。秋叶较少，主要看江。'},
 xiaoxihu:{name:'小西湖街巷',xy:[32.0175,118.7858],minutes:35,photo:'xiaoxihu',kind:'街巷',daylight:true,entry:'小西湖历史风貌区',inside:'从马道街／小西湖街口入，沿开放小巷慢逛，再向南接老门东；不把居民院落当开放景点。',shot:'门窗、屋檐与小巷纵深；屋顶绿植建筑只从公共街面拍。',rule:'街巷无需预约；居民生活区保持安静。'},
 zhanyuan:{name:'瞻园',xy:[32.0212,118.7784],minutes:65,photo:'zhanyuan',kind:'园林',early:930,entry:'瞻园路128号售票入口',inside:'入口 → 园林花窗、假山与水庭 → 回出口；留65分钟，不与小西湖默认叠加。',shot:'隔花窗拍水庭，人物站门洞侧边，给后面游客留通道。',rule:'日场通常至17:00，夜场另售票；2026资料日场30元供参考。是否需现场登记、当日售票以现场为准。',official:'https://nj.bendibao.com/xiuxian/2020115/96751.shtm',replaces:'xiaoxihu'},
 laomendong:{name:'老门东 · 乌桕白墙',xy:[32.0134,118.7833],minutes:45,photo:'laomendong',kind:'赏秋',daylight:true,entry:'老门东箍桶巷牌坊',inside:'箍桶巷牌坊 → 三条营、边营等公共街巷 → 找白墙“老门东”字样与乌桕同框 → 从北侧离开。机位在街巷片区，非精确单棵树坐标。',shot:'白墙上的“老门东”与飞檐放画面下方，乌桕枝叶留在上方；人多时拍局部。',rule:'街区免费，不预约。秋叶请留在日间拍；晚到只看灯光，不能复现白墙秋叶效果。'},
 qinhuai:{name:'夫子庙 · 秦淮夜色',xy:[32.0208,118.7838],minutes:65,photo:'qinhuai',kind:'夜景',night:true,entry:'夫子庙文德桥',inside:'文德桥看照壁 → 贡院西街 → 平江桥或东园桥择一看水面灯光。不把四座桥全刷一遍；灯光未亮可先吃饭。',shot:'桥栏作前景，拍河面倒影；桥上站侧边，不架三脚架堵路。',rule:'公共街巷免费；不含大成殿、科举博物馆和游船。无需为了夜景购买套票。'},
 pilusi:{name:'毗卢寺 · 银杏古寺',xy:[32.0436,118.8004],minutes:45,photo:'pilusi',kind:'赏秋',early:930,daylight:true,entry:'汉府街4号毗卢寺售票入口',inside:'入口 → 大殿外院落 → 银杏与红墙屋檐同框 → 原入口出。台阶慢走，殿内拍照听从提示。',shot:'站树冠侧下方，以红色殿门和屋檐压住画面，避开逆光脸黑。',rule:'历史资料支持现场购票，参考20元。11月当日闭门时刻未获官方确认，按15:30前抵达保守安排。',official:'https://nj.bendibao.com/tour/2023324/151024.shtm'},
 liuchao:{name:'六朝博物馆 · 金陵之窗',xy:[32.0447,118.7979],minutes:85,photo:'liuchao',kind:'博物馆',early:930,entry:'长江路302号六朝博物馆',inside:'先按展厅顺序看六朝遗迹和文物，最后到三楼“金陵之窗”；拍完再下楼，避免为了照片反复上下。',shot:'把整扇窗端正放入画面，室内人物作剪影。原帖有跨季节对照，非本周全黄保证。',rule:'支持现场购票／办理入馆手续，无需提前抢票；不等于免登记。预留85分钟，15:30前到较稳，周一常规闭馆。',official:'https://www.xhby.net/content/s669654dfe4b0ac1d26c1afae.html',replaces:'pilusi'},
 changjiang:{name:'长江路 · 总统府外观',xy:[32.0435,118.7934],minutes:25,photo:'changjiang',kind:'街巷',entry:'总统府长江路正门外人行道',inside:'长江路东侧向西步行 → 总统府正门外观 → 继续向西接太平北路1912。不进总统府，不需要预约总统府门票。',shot:'门楼与行道树同框；始终在人行道拍，不到车道中央。',rule:'本线只看公共街面，不含总统府园区。参考照片拍于国庆，不承诺活动。'},
 street1912:{name:'1912历史文化街区',xy:[32.0459,118.7908],minutes:30,photo:'street1912',kind:'夜景',night:true,entry:'太平北路1912街区',inside:'从太平北路侧进入开放街巷，围绕青砖建筑与灯光短逛；无需进酒吧消费，随后去晚饭。',shot:'用拱门框街灯，手机夜景模式靠稳拍；这里不是颐和路街区。',rule:'公共街区免费；店铺营业各异，不承诺市集、演出或统一点灯时间。'},
 xinjiekou:{name:'新街口 · 商圈夜游',xy:[32.0411,118.7790],minutes:50,photo:'xinjiekou',kind:'商圈',night:true,entry:'新街口德基广场／中央商场公共街面',inside:'选一家商场休息，再走公共街面拍城市灯光；过街用斑马线或地下通道，累了从新街口地铁站回南京站。',shot:'街面拍霓虹与车流。配图为作者高层城市远景，只作氛围参考，不提供楼顶机位。',rule:'免费街面，购物自选。长江路线的可删尾站；不为此横穿全城。'},
 yihe:{name:'颐和路 · 牯岭路梧桐',xy:[32.0668,118.7664],minutes:50,photo:'yihe',kind:'赏秋',daylight:true,entry:'颐和路与牯岭路交会附近',inside:'颐和路11号公共街面 → 牯岭路短走 → 回可上车的公共道路，打车接鸡鸣寺／玄武湖。不再去五台山，避免向南绕。',shot:'11号门外斜树与街道透视；更推荐牯岭路的树影和围墙，不在人行道长时间占位。',rule:'默认不加；可替鸡鸣寺，或早下山时增加。公馆多非开放景点，尊重商拍管理。',replaces:'temple'},
 temple:{name:'鸡鸣寺',xy:[32.0608,118.7905],minutes:40,photo:'temple',kind:'古寺',early:945,daylight:true,entry:'鸡鸣寺路古鸡鸣寺入口',inside:'入口购票后沿台阶上行 → 殿外屋檐、银杏与药师塔视角 → 原路下到鸡鸣寺路。上午栖霞爬山后，可删此站只走寺外。',shot:'墙边抬头拍塔与树冠；不在殿内随意拍摄、不要求满黄。',rule:'有现场纸票及当天网上购券方式；当日入寺规则以现场为准，建议15:45前到，不承诺无需任何登记。',official:'https://nj.bendibao.com/tour/2025318/171228.shtm'},
 lakesouth:{name:'解放门 · 入玄武湖',xy:[32.0637,118.7918],minutes:20,photo:'lakesouth',kind:'湖景',entry:'玄武湖解放门入口',inside:'沿鸡鸣寺路到解放门 → 从地面开放入口进玄武湖 → 跟湖内导览去梁洲或环洲。不购台城门票，不爬城墙。',shot:'树枝作上框，湖水和远处建筑留作背景；照片是湖内秋景参考。',rule:'玄武湖免费开放区，不用景区预约；入口管制以现场导览为准。'},
 liangzhou:{name:'梁洲 · 银杏与览胜楼',xy:[32.0710,118.7900],minutes:35,photo:'liangzhou',kind:'赏秋',daylight:true,entry:'玄武湖梁洲览胜楼附近',inside:'沿开放洲桥进梁洲 → 览胜楼附近看屋檐、银杏 → 沿导览返回环洲方向，最后去玄武门。',shot:'银杏枝叶与览胜楼飞檐同框；11月11日笔记仍有绿黄交错。',rule:'可删支线；天黑后秋叶效果减弱，不必为银杏绕岛。'},
 lakeend:{name:'玄武湖 · 环洲至玄武门收尾',xy:[32.0720,118.7800],minutes:35,photo:'lakesouth',kind:'终点',fixed:true,entry:'玄武湖玄武门外公共上落客点',inside:'沿环洲西侧湖岸向玄武门走，湖边坐一会儿结束。若不去梁洲，从解放门沿环洲步道直接接玄武门。最后游玩点保持在玄武湖。',shot:'湖面倒影、城墙与秋树；无需环湖一整圈。',rule:'游完从玄武门打车回南京站约15–25分钟，或地铁1号线；不强迫沿湖步行到南京站。'}
};
const foods={
 chuanliu:{name:'川流不息川菜馆（姜家园店）',xy:[32.0904,118.7417],minutes:70,kind:'川菜正餐',entry:'川流不息川菜馆 姜家园店 姜圩路160号',address:'姜圩路160号（360地图姜家园店记录）；地图标记为约位',menu:'水煮肉片、蒜泥白肉；宫保鸡丁有甜辣口，点单说明少糖／辣度。',reason:'选社区家常川菜而非景区套餐。原帖提到饭点拥挤、环境嘈杂；不为排队耗掉江边时间。',budget:'预算60–90元/人，估计值，菜单现场确认',source:note('6805f2f0000000001200e6fc'),credit:'就叫那达克 · 2025-04-21',note:'门店记录已核到姜圩路160号，仍需当天确认营业和实时等位。',addressSource:'https://map.360.cn/shenghuo/detail?src=pc_map&pguid=b6e0d8143d5c67d6'},
 chunyuan:{name:'春园小吃（热河南路）',xy:[32.0919,118.7405],minutes:20,kind:'本地小吃',entry:'南京热河南路37-9 春园小吃',address:'热河南路37-9',menu:'炒面两人分一小份；准备吃川菜就删掉，不必吃两顿正餐。',reason:'具体老下关复吃笔记推荐炒面，环境朴素；评论对油感评价不一，适合作可删小吃。',budget:'预算15–25元/人，估计值',source:note('6950b9b9000000002103d0de'),credit:'东奔南走 · 2025-12-28',note:'旧笔记写09:00–24:00，非当前营业保证；徐建萍汤包旧资料14:00收档，不硬排下午。'},
 lianhu:{name:'莲湖糕团店',xy:[32.0204,118.7828],minutes:20,kind:'传统甜品',entry:'南京莲湖糕团店 贡院西街24号',address:'贡院西街24号',menu:'赤豆元宵；糕团少量分食。',reason:'老店原址、南京传统甜食，接秦淮夜游顺路。游客也多，排队超过15分钟就跳过。',budget:'预算15–30元/人，估计值',source:note('684103d1000000002101bb67'),credit:'小叶叶要努力💪 · 2025-06-05',note:'不推荐笔记里的端午限定款；不承诺11月仍有售。'},
 shijing:{name:'市井川菜（南京总店）',xy:[32.0498,118.7898],minutes:70,kind:'川菜正餐',entry:'市井川菜 南京总店 双井巷沙塘园7-1号',address:'双井巷沙塘园7-1号（360地图门店页）；地图标记为约位',menu:'鱼香肉丝拌饭；水煮类按辣度少量点。',reason:'有跨年吃过后再次复吃的笔记，选家常川味。也有推广帖，不以“必吃榜”或流量排名作依据；不想排队就换老字号四川酒家。',budget:'预算60–90元/人，估计值',source:note('6a1feffe00000000350308e5'),credit:'林檎 · 2026-06-03',note:'餐馆在1912北侧，要专门走一段；去新街口可用车，不声称全程顺着步行。',addressSource:'https://map.360.cn/shenghuo/detail?src=pc_map&pguid=2fe1a2494e6211c8'},
 sichuan:{name:'四川酒家（太平南路店）',xy:[32.0369,118.7861],minutes:20,kind:'老字号小吃',entry:'四川酒家 太平南路171号',address:'太平南路171号（360地图门店页）',menu:'麻团／赤豆元宵，购买少量尝味；二楼正餐口味偏南京本地化，不必多吃一餐。',reason:'老字号日常外卖窗口与小吃，比专门追新店更合适；口味有南京本地化，别期待全是重辣川菜。',budget:'小吃预算10–25元/人，估计值',source:note('6a49c96b000000001702be99'),credit:'🌸MoMo🐾 · 2026-07-05',note:'位于1912与新街口之间偏南；不去新街口就可删，不单独绕过去。'},
 sichuanMeal:{name:'四川酒家（太平南路店）· 晚饭',xy:[32.0369,118.7861],minutes:70,kind:'老字号川菜',entry:'四川酒家 太平南路171号',address:'太平南路171号，一楼小吃、二楼饭菜',menu:'鱼香肉丝、酸汤鱼片，配蔬菜少量点；提前说明辣度。这家是南京本地化川菜，非重辣江湖菜。',reason:'有老南京日常吃饭和具体菜品优缺点的笔记，避开景区团购打卡店。作者赞肉菜、认为小笼包和油麦菜一般；评论也有对正餐不满意的意见，不写成闭眼必吃。',budget:'预算60–90元/人，估计值',source:note('68a872f0000000001d012f52'),credit:'咣的一下 · 2025-08-22',note:'安排在秦淮夜游之后向北返住处途中，打车一段，避免吃完又折回夫子庙。晚饭若排队超过20分钟就换店，先核实当晚厨房收餐。'},
 baiwei:{name:'古鸡鸣寺 · 百味斋素面馆',xy:[32.0604,118.7905],minutes:35,kind:'素面／小食',entry:'南京古鸡鸣寺百味斋素面馆',address:'鸡鸣寺路寺院出口附近，先确认外部入口及售餐',menu:'清淡素面；金元宝面包可作小食，吃饱就不买。',reason:'下山后给胃口换清淡，位置衔接入湖。原帖说配料多、口味清淡；不是为拍同款景观座位而排队。',budget:'预算25–45元/人，估计值',source:note('69d0eca1000000001f001ef3'),credit:'美少女的美食diary · 2026-04-04',note:'不保证下午持续供餐或景观座位；晚到先核实，未营业直接删，不为了面另买入寺票。'}
};
Object.values(foods).forEach(f=>{f.food=true;f.inside=f.menu;f.rule=f.note;});
const routes={
 river:{name:'周六 A · 轮渡与下关',short:'轮渡江景',day:'sat',cover:'binjiang',origin:'钟山景区允许上车点',start:'15:15',drive:55,returnMin:30,desc:'江景人文线：先看江岸日光，再坐轮渡往返，最后吃社区川菜。秋叶弱于另两线；15点后离山不默认叠加纪念馆，早下山再加静海寺／绣球公园。',pool:['jinghai','xiuqiu','binjiang','ferry','chunyuan','chuanliu'],defaults:['binjiang','ferry','chuanliu'],returnText:'晚饭后打车回南京站／玄武湖北侧，预留30–40分钟；滨江入夜偏静，想晚逛可改选另两线。'},
 south:{name:'周六 B · 城南秋色与秦淮夜游',short:'乌桕秦淮',day:'sat',cover:'laomendong',origin:'钟山景区允许上车点',start:'15:15',drive:50,returnMin:40,desc:'秋色与夜景衔接最自然。先老门东乌桕，再甜品与秦淮灯火，最后向北吃老字号川菜。小西湖／瞻园只选一个加：默认15:15离山，先保住白天秋色。',pool:['zhanyuan','xiaoxihu','laomendong','lianhu','qinhuai','sichuanMeal'],defaults:['laomendong','lianhu','qinhuai','sichuanMeal'],returnText:'秦淮夜游之后向北到太平南路吃晚饭，最后打车回南京站约25–40分钟；删掉晚饭时，从夫子庙直接打车回南京站预留35–50分钟。'},
 central:{name:'周六 C · 银杏古寺与长江路',short:'古寺与商圈',day:'sat',cover:'pilusi',origin:'钟山景区允许上车点',start:'14:30',drive:40,returnMin:30,desc:'要进寺／馆建议14:30前离山：毗卢寺和六朝博物馆二选一，之后向西看总统府外观、1912。完整钟山四景后可能应删寺馆；新街口是可删的晚逛尾站。',pool:['pilusi','liuchao','changjiang','street1912','shijing','sichuan','xinjiekou'],defaults:['pilusi','changjiang','street1912','shijing','sichuan','xinjiekou'],returnText:'新街口地铁1号线直达南京站，含步行候车约30–40分钟；不去新街口时从1912／晚饭处直接打车返住处。'},
 sunday:{name:'周日 · 栖霞下山后，玄武湖收尾',short:'古寺银杏入湖',day:'sun',cover:'liangzhou',origin:'栖霞山景区允许上车点',start:'13:00',drive:65,returnMin:25,desc:'栖霞山后打车进城：鸡鸣寺／颐和路可替换，最后进玄武湖。梁洲是赏秋支线，天晚或腿累就删。周六各线均不占用这些点。',pool:['yihe','temple','baiwei','lakesouth','liangzhou','lakeend'],defaults:['temple','baiwei','lakesouth','liangzhou','lakeend'],returnText:'最后游玩点在玄武湖玄武门湖岸。之后打车回南京站，预留15–25分钟，或地铁1号线；无需绕湖走到南京站。'}
};
root.CityData={photos,spots:{...spots,...foods},routes,note};
if(typeof module==='object'&&module.exports)module.exports=root.CityData;
})(typeof globalThis!=='undefined'?globalThis:this);
