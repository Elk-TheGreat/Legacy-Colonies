G.AddData({
name:'Homosapient Colonies',
author:'Elk',
desc:'v0.3 - Adds neighbouring colonies that grow stronger as you advance. Meet them with scouts, barter, make trade pacts, open embassies, demand tribute or go to war. Includes builders, buildings from early to late game (trade, defense, housing) and a few things ported from Homosapient Legacy (origins, eggs, spice, medical herbs, torches, boiling).',
engineVersion:1,
manifest:0,
requires:['Default dataset*'],
sheets:{'H1sheet':'https://raw.githubusercontent.com/Stake2/NeverEnding_Legacy/refs/heads/main/Mods/Chenxing61/Homosapient%20Legacy/Files/img/H1sheet.png'},
func:function()
{
	/*=====================================================================================
	PART 1 : THINGS PORTED FROM HOMOSAPIENT LEGACY
	Homosapient Legacy is a full overhaul that replaces data.js, so only the pieces that
	stand on their own on top of the default dataset are brought over here.
	=======================================================================================*/

	//resources
	new G.Res({
		name:'egg',
		desc:'[egg]s can be eaten raw or cooked, and are pretty nutritious. Gathered from the nests of [avians].',
		icon:[13,6,'H1sheet'],
		turnToByContext:{'eat':{'health':0.01,'happiness':0},'decay':{'spoiled food':1}},
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'spice',
		desc:'Rare herbs that give flavor to [food]. Eating them is a real treat.//Slowly spoils.',
		icon:[15,6,'H1sheet'],
		turnToByContext:{'eat':{'health':0,'happiness':0.15},'decay':{'spoiled food':1}},
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'medical herb',
		desc:'[medical herb]s are used by [healer]s, who get much better results from them than from plain [herb]s.//Slowly spoils.',
		icon:[14,6,'H1sheet'],
		category:'misc',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.0025;
			G.lose(me.name,randomFloor(toSpoil),'decay');
		},
	});
	new G.Res({
		name:'torch',
		desc:'Torches light up the night around your settlement; every 10 of them add 1 to your defense against raiders (up to a limit).//Burns out slowly.',
		icon:[17,7,'H1sheet'],
		category:'misc',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.005;
			G.lose(me.name,randomFloor(toSpoil),'decay');
		},
	});

	//goods : avians nest in many places and give eggs
	new G.Goods({
		name:'avians',
		desc:'[avians] are birds of all kinds. Hunting them yields some [meat] and [bone]s, and their nests are a source of [egg]s.',
		icon:[17,11,'H1sheet'],
		res:{
			'gather':{'egg':0.5},
			'hunt':{'meat':2,'bone':0.1},
		},
		affectedBy:['over hunting'],
		mult:5,
	});
	var avianLands={'prairie':0.4,'shrubland':0.4,'forest':0.3,'boreal forest':0.2,'savanna':0.4,'jungle':0.4,'hills':0.2,'beach':0.4,'tundra':0.15};
	for (var i in avianLands)
	{
		if (G.landByName[i]) G.landByName[i].goods.push({type:'avians',chance:avianLands[i],amount:0.5});
	}

	//spices and medical herbs can be found while gathering
	var addGather=function(goodsName,resName,amount)
	{
		var g=G.goodsByName[goodsName];
		if (g && g.res && g.res['gather']) g.res['gather'][resName]=amount;
	}
	addGather('grass','medical herb',0.2);
	addGather('berry bush','spice',0.1);
	addGather('succulents','spice',0.1);
	addGather('jungle fruits','spice',0.2);
	addGather('forest mushrooms','medical herb',0.1);

	//healers get much better results with medical herbs
	if (G.unitByName['healer'])
	{
		G.unitByName['healer'].effects.push(
			{type:'convert',from:{'sick':1,'medical herb':1},into:{'adult':1},chance:2/3,every:3},
			{type:'convert',from:{'wounded':1,'medical herb':1},into:{'adult':1},chance:1/3,every:6}
		);
		G.unitByName['healer'].desc+='//With [medical herb]s, [healer]s heal faster.';
	}

	//firekeepers : torches and boiling water
	var fk=G.unitByName['firekeeper'];
	if (fk)
	{
		fk.modes['torches']={name:'Make torches',icon:[0,6,17,7],desc:'Craft [torch]es from 3 [stick]s each.',req:{'fire-making':true}};
		fk.effects.push({type:'convert',from:{'stick':3},into:{'torch':1},every:4,mode:'torches'});
		fk.modes['boil water']={name:'Boil water',icon:[6,7,13,7],desc:'Boil [muddy water] over [fire pit]s to turn it into clean [water].',req:{'boiling':true}};
		fk.effects.push({type:'convert',from:{'muddy water':5,'fire pit':0.01},into:{'water':5},every:2,mode:'boil water'});
	}
	new G.Tech({
		name:'boiling',
		desc:'@[firekeeper]s can boil [muddy water] into clean [water]<>Making a habit of drinking warm water is instrumental to good health.',
		icon:[17,1],
		cost:{'insight':25},
		req:{'fire-making':true,'pottery':true},
		chance:3,
	});

	//origins : one is picked at random at the start of a new game
	var originReq={'tribalism':false};//can never be researched; granted at start
	new G.Tech({name:'forest origin',desc:'@[gatherer] efficiency +10%<>Your people came from the forests, which sharpened their eyes for gathering.',icon:[4,6,'H1sheet'],req:originReq});
	new G.Tech({name:'mountain origin',desc:'@[wanderer] and [scout] efficiency +10%<>Your people came from the mountains, and are tough enough to scour any terrain.',icon:[2,6,'H1sheet'],req:originReq});
	new G.Tech({name:'desert origin',desc:'@[well]s produce 25% more [water]<>Your people came from the deserts, where every drop counts.',icon:[4,9,'H1sheet'],req:originReq});
	new G.Tech({name:'jungle origin',desc:'@[hunter] efficiency +15%<>Your people came from the jungle, with heightened senses for danger and prey.',icon:[4,7,'H1sheet'],req:originReq});
	new G.Tech({
		name:'swamp origin',
		desc:'@eating [bugs] makes your people slightly happy instead of sad<>Your people came from the marsh, which gave them a... unique way of living.',
		icon:[14,6,'H1sheet'],
		req:originReq,
		effects:[{type:'function',func:function(){if (G.resByName['bugs'] && G.resByName['bugs'].turnToByContext['eat']) G.resByName['bugs'].turnToByContext['eat']['happiness']=0.05;}}],
	});
	new G.Tech({name:'arctic origin',desc:'@[chieftain] and [clan leader] efficiency +10%<>Your people came from the arctic, with a determination to survive no matter the cost.',icon:[12,7,'H1sheet'],req:originReq});

	var addMult=function(unitName,value,origin)
	{
		var u=G.unitByName[unitName];
		if (!u) return;
		var req={};req[origin]=true;
		u.effects.push({type:'mult',value:value,req:req});
	}
	addMult('gatherer',1.1,'forest origin');
	addMult('wanderer',1.1,'mountain origin');
	addMult('scout',1.1,'mountain origin');
	addMult('hunter',1.15,'jungle origin');
	addMult('chieftain',1.1,'arctic origin');
	addMult('clan leader',1.1,'arctic origin');
	addMult('well',1.25,'desert origin');
	var origins=['forest origin','mountain origin','desert origin','jungle origin','swamp origin','arctic origin'];

	/*=====================================================================================
	PART 2 : COLONIES - TECHS, UNIT
	=======================================================================================*/

	new G.Tech({
		name:'first contact',
		desc:'@your people can now meet neighbouring colonies, and the [Colonies] tab becomes useful<>Beyond the horizon, others have settled too. Some of them will want to talk. Some of them will not.',
		icon:[24,7],
		cost:{'insight':40},
		req:{'scouting':true,'language':true},
		chance:3,
	});
	new G.Tech({
		name:'bartering',
		desc:'@barter deals with colonies give you 5% more@allows trade pacts with friendly colonies<>Trading goods for goods, with fairness enforced by a lot of shouting.',
		icon:[13,1],
		cost:{'insight':30},
		req:{'first contact':true},
		chance:3,
	});
	new G.Tech({
		name:'warbands',
		desc:'@unlocks [warrior]s@allows you to declare war on colonies and send out raids<>Armed and organized, a group of fighters is more than the sum of its parts.',
		icon:[5,9],
		cost:{'insight':40},
		req:{'first contact':true,'spears':true},
		chance:3,
	});

	G.unitCategories.push({id:'military',name:'Military'});
	new G.Unit({
		name:'warrior',
		desc:'@defends your people against raiders and forms the core of any attack on a colony@needs a [stone weapons,weapon] to be effective; those without one stand idle<>[warrior]s do no gathering or crafting, but they let you answer threats with force.',
		icon:[5,9],
		cost:{'food':20},
		use:{'worker':1},
		staff:{'stone weapons':1},
		upkeep:{'coin':0.3},
		effects:[],
		req:{'warbands':true},
		category:'military',
		priority:2,
	});

	new G.Tech({
		name:'cartography',
		desc:'@scouts bring back news that lasts longer and fails less often@+10% chance to meet new colonies each year<>Putting the world on a hide, one hill at a time.',
		icon:[24,7],
		cost:{'insight':35},
		req:{'first contact':true,'scouting':true},
		chance:3,
	});
	new G.Tech({
		name:'fortification',
		desc:'@unlocks the [fortress] and [city wall]<>Strong walls make good neighbours.',
		icon:[5,9],
		cost:{'insight':60},
		req:{'warbands':true,'masonry':true},
		chance:3,
	});
	new G.Tech({
		name:'mercantilism',
		desc:'@unlocks the [market] and [grand bazaar]<>Wealth is no longer what you hold, but what moves.',
		icon:[13,1],
		cost:{'insight':60},
		req:{'bartering':true,'cities':true},
		chance:3,
	});
	new G.Tech({
		name:'diplomacy',
		desc:'@unlocks the [embassy]<>Words last longer than spears, if you pick them well.',
		icon:[24,7],
		cost:{'insight':60},
		req:{'first contact':true,'code of law':true},
		chance:3,
	});

	G.unitCategories.push({id:'trade',name:'Trade & diplomacy'});

	//-------- builders --------
	new G.Unit({
		name:'builder',
		desc:'@automatically builds structures for your people, depending on its mode@each builder starts one building at a time<>[builder]s turn idle hands into walls and roofs, so you do not have to click for every hut.',
		icon:[26,4],
		cost:{'food':20},
		use:{'worker':1},
		staff:{'stone tools':1},
		upkeep:{'coin':0.3},
		gizmos:true,
		modes:{
			'off':G.MODE_OFF,
			'huts':{name:'Build huts',icon:[11,2],desc:'Build [hut]s while people are homeless.',req:{'building':true}},
			'houses':{name:'Build homes',icon:[21,3],desc:'Build the best available homes ([tenement]s, then [house]s) while people are homeless.',req:{'construction':true}},
			'storage':{name:'Build storage',icon:[25,4],desc:'Build storage buildings when your food or material stores are nearly full.',req:{'stockpiling':true}},
			'defenses':{name:'Build defenses',icon:[17,3],desc:'Build [watchtower]s, [palisade]s, [city wall]s and [fortress]es while your defense is far below what hostile colonies could send.',req:{'warbands':true}},
		},
		effects:[
			{type:'function',func:function(me){builderWork(me,'huts');},mode:'huts'},
			{type:'function',func:function(me){builderWork(me,'houses');},mode:'houses'},
			{type:'function',func:function(me){builderWork(me,'storage');},mode:'storage'},
			{type:'function',func:function(me){builderWork(me,'defenses');},mode:'defenses'},
		],
		req:{'building':true},
		category:'production',
	});

	//-------- early buildings --------
	new G.Unit({
		name:'longhouse',
		desc:'@provides 12 [housing]<>A long shared dwelling for a whole extended family.',
		icon:[11,2],
		cost:{'archaic building materials':160},
		use:{'land':2},
		effects:[{type:'provide',what:{'housing':12}},{type:'waste',chance:0.08/1000}],
		req:{'building':true,'sedentism':true},
		category:'housing',
	});
	new G.Unit({
		name:'watchtower',
		desc:'@adds 2 defense@staffed by 1 worker@spots strangers: raises the chance of meeting colonies and of catching their scouts<>A tall lookout of lashed poles.',
		icon:[24,3],
		cost:{'archaic building materials':60},
		use:{'land':1},
		staff:{'worker':1},
		effects:[{type:'waste',chance:0.3/1000}],
		req:{'building':true,'scouting':true},
		category:'military',
	});
	new G.Unit({
		name:'palisade',
		desc:'@adds 4 defense<>A ring of sharpened stakes around the settlement.',
		icon:[17,3],
		cost:{'archaic building materials':120},
		use:{'land':2},
		effects:[{type:'waste',chance:0.5/1000}],
		req:{'building':true,'warbands':true},
		category:'military',
	});
	new G.Unit({
		name:'trading post',
		desc:'@improves barter rates and caravan sizes slightly@yields a little [coin] (or [food] before currency) each year@staffed by 1 worker<>A fenced yard where strangers are allowed to haggle.',
		icon:[13,1],
		cost:{'archaic building materials':80},
		use:{'land':1},
		staff:{'worker':1},
		effects:[{type:'waste',chance:0.2/1000}],
		req:{'building':true,'bartering':true},
		category:'trade',
	});
	new G.Unit({
		name:'training ground',
		desc:'@raises the strength of your [warrior]s by 4% (up to 40%)@staffed by 2 workers<>Sparring pits, straw dummies and a lot of bruises.',
		icon:[5,9],
		cost:{'archaic building materials':100},
		use:{'land':2},
		staff:{'worker':2},
		effects:[{type:'waste',chance:0.2/1000}],
		req:{'building':true,'warbands':true},
		category:'military',
	});
	new G.Unit({
		name:'merchant',
		desc:'@improves barter rates and caravan sizes slightly<>Knows what everything is worth, and says so.',
		icon:[13,1],
		cost:{'food':30},
		use:{'worker':1},
		upkeep:{'coin':0.2},
		effects:[],
		req:{'bartering':true},
		category:'trade',
	});

	//-------- mid and late buildings --------
	new G.Unit({
		name:'barracks',
		desc:'@provides 8 [housing]@adds 3 defense<>Bunks for those who watch while the rest sleep.',
		icon:[20,3],
		cost:{'basic building materials':150},
		use:{'land':2},
		effects:[{type:'provide',what:{'housing':8}},{type:'waste',chance:0.03/1000}],
		req:{'warbands':true,'construction':true},
		category:'military',
	});
	new G.Unit({
		name:'armory',
		desc:'@raises the strength of your [warrior]s by 3% (up to 24%)@staffed by 1 worker<>Racks of well-kept metal.',
		icon:[26,2,25,2],
		cost:{'basic building materials':120},
		use:{'land':1},
		staff:{'worker':1},
		effects:[{type:'waste',chance:0.03/1000}],
		req:{'warbands':true,'bronze-working':true},
		category:'military',
	});
	new G.Unit({
		name:'market',
		desc:'@improves barter rates and caravan sizes@yields some [coin] (or [food] before currency) each year@staffed by 2 workers<>Stalls, scales and shouting.',
		icon:[13,1,25,4],
		cost:{'basic building materials':150},
		use:{'land':2},
		staff:{'worker':2},
		effects:[{type:'waste',chance:0.03/1000}],
		req:{'mercantilism':true},
		category:'trade',
	});
	new G.Unit({
		name:'tenement',
		desc:'@provides 30 [housing]<>Several families stacked high, with a shared well.',
		icon:[21,3],
		cost:{'basic building materials':280},
		use:{'land':2},
		effects:[{type:'provide',what:{'housing':30}},{type:'waste',chance:0.05/1000}],
		req:{'city planning':true},
		category:'housing',
	});
	new G.Unit({
		name:'city wall',
		desc:'@adds 12 defense@each wall also weakens enemy raids@staffed by 2 workers<>Cut stone, mortar, and a reason to knock first.',
		icon:[22,4],
		cost:{'basic building materials':450},
		use:{'land':3},
		staff:{'worker':2},
		effects:[{type:'waste',chance:0.005/1000}],
		req:{'fortification':true,'city planning':true},
		category:'military',
	});
	new G.Unit({
		name:'fortress',
		desc:'@adds 20 defense and weakens enemy raids@provides 20 [housing]@staffed by 3 workers<>A stronghold that dominates the horizon.',
		icon:[22,3],
		cost:{'basic building materials':900},
		use:{'land':4},
		staff:{'worker':3},
		effects:[{type:'provide',what:{'housing':20}},{type:'waste',chance:0.003/1000}],
		req:{'fortification':true,'iron-working':true},
		category:'military',
	});
	new G.Unit({
		name:'grand bazaar',
		desc:'@greatly improves barter rates and caravan sizes@yields a good amount of [coin] (or [food] before currency) each year@staffed by 4 workers<>Everything is for sale, including the shade.',
		icon:[13,1,23,4],
		cost:{'basic building materials':500},
		use:{'land':4},
		staff:{'worker':4},
		effects:[{type:'waste',chance:0.01/1000}],
		req:{'mercantilism':true,'code of law':true},
		category:'trade',
	});
	new G.Unit({
		name:'embassy',
		desc:'@colonies like you more, and are less likely to declare war@staffed by 2 workers<>A guest house for foreign envoys, with excellent food and thin walls.',
		icon:[26,4],
		cost:{'basic building materials':300},
		use:{'land':2},
		staff:{'worker':2},
		effects:[{type:'waste',chance:0.01/1000}],
		req:{'diplomacy':true},
		category:'trade',
	});

	/*=====================================================================================
	PART 3 : COLONIES - STATE
	Everything that changes is stored in hidden resources, so the engine saves and loads it
	for free. What a colony IS (name, kind, goods) is derived from the culture seed.
	=======================================================================================*/

	var NCOL=4;
	var STANCE={UNKNOWN:0,NEUTRAL:1,PACT:2,WAR:3,TRIBUTE:4};
	var STANCE_NAMES=['Unknown','Neutral','Trade pact','At war','Tributary'];
	var STANCE_COLORS=['#888','#ccc','#6c6','#e54','#ec4'];
	var KEYS=['stance','relation','strength','wealth','base','intel'];
	for (var c=0;c<NCOL;c++)
	{
		for (var k=0;k<KEYS.length;k++)
		{
			new G.Res({name:'colony '+c+' '+KEYS[k],hidden:true,fractional:true});
		}
	}
	new G.Res({name:'warband cooldown',hidden:true,fractional:true});
	new G.Res({name:'colony era',hidden:true,fractional:true});

	var S=function(c,key){return G.getRawRes('colony '+c+' '+key).amount;}
	var setS=function(c,key,v){G.getRawRes('colony '+c+' '+key).amount=Math.round(v);}
	var addS=function(c,key,v,min,max){setS(c,key,Math.max(min,Math.min(max,S(c,key)+v)));}

	//barter values
	var VAL={
		'food':1,'herb':0.8,'fruit':1,'meat':1,'seafood':1,'cooked meat':1.5,'cooked seafood':1.5,'cured meat':2,'cured seafood':2,'bread':2,'egg':1.2,'spice':6,'medical herb':3,
		'stick':0.5,'stone':0.5,'mud':0.4,'sand':0.5,'log':1,'clay':1,'hide':1.2,'bone':1,'salt':3,'leather':2,'lumber':2,'brick':2,'cut stone':2,
		'copper ore':3,'tin ore':3,'iron ore':4,'gold ore':8,'gems':8,
		'knapped tools':3,'stone tools':5,'metal tools':12,'stone weapons':5,'bow':7,'basket':3,'pot':4,'torch':2
	};
	var val=function(name){return VAL[name]||1;}
	//share of value you get back in a swap; always below 1 so goods can't be farmed by looping trades
	var tradeBonus=function()
	{
		var b=active('trading post')*0.02+active('market')*0.04+active('grand bazaar')*0.1+active('merchant')*0.005;
		b=Math.min(0.4,b);
		if (G.techByName['bartering'] && G.has('bartering')) b+=0.05;
		return b;
	}
	//stays below 1 so that swapping goods back and forth can never create value
	var barterRate=function(rel)
	{
		return Math.min(0.97,0.55+0.2*Math.min(200,rel)/200+tradeBonus());
	}
	var caravanMult=function()
	{
		return 1+Math.min(1.5,active('trading post')*0.05+active('market')*0.1+active('grand bazaar')*0.25+active('merchant')*0.03);
	}

	//trade: one list per era; each entry is [what they offer, what they want]
	var ARCH=[
		{kind:'hill clan',tag:'Hill clan',desc:'Proud highlanders who respect strength above all.',aggr:0.7,str:[70,110],wealth:[30,60],
			trade:[[['stone','cooked meat'],['copper ore','hide']],[['tin ore','pot']],[['iron ore','stone weapons']],[['gems','metal tools']]]},
		{kind:'river folk',tag:'River folk',desc:'Peaceful fishers and potters with little taste for fighting.',aggr:0.2,str:[35,60],wealth:[40,80],
			trade:[[['seafood','knapped tools'],['clay','basket']],[['sand','pot']],[['brick','leather']],[['cooked seafood','metal tools']]]},
		{kind:'forest tribe',tag:'Forest tribe',desc:'Hunters and woodcutters, wary of strangers.',aggr:0.45,str:[50,85],wealth:[30,60],
			trade:[[['log','stone tools'],['hide','fruit']],[['lumber','pot']],[['leather','cooked meat']],[['bow','metal tools']]]},
		{kind:'salt traders',tag:'Salt traders',desc:'Shrewd merchants who would rather bargain than bleed.',aggr:0.3,str:[40,70],wealth:[60,110],
			trade:[[['salt','hide'],['bone','cooked seafood']],[['herb','basket']],[['cut stone','stone tools']],[['gold ore','metal tools']]]},
	];
	var ERA_NAMES=['Tribal','Early','Developed','Advanced'];
	var progress=function(){return G.techsOwned?G.techsOwned.length:0;}
	var tier=function(){return Math.min(3,Math.floor(progress()/12));}
	//colonies grow with you
	var scale=function(){return 1+0.045*progress();}
	var tradePairs=function(info)
	{
		var out=[];
		for (var t=0;t<=tier();t++) for (var i=0;i<info.trade[t].length;i++) out.push(info.trade[t][i]);
		return out;
	}

	var hashStr=function(s)
	{
		var h=2166136261;
		for (var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}
		return h>>>0;
	}
	var makeRng=function(seed)
	{
		var a=seed;
		return function()
		{
			a|=0;a=a+0x6D2B79F5|0;
			var t=Math.imul(a^a>>>15,1|a);
			t=t+Math.imul(t^t>>>7,61|t)^t;
			return ((t^t>>>14)>>>0)/4294967296;
		}
	}
	var SYL=['ka','ro','ni','tu','sa','vel','mor','dan','ish','ul','bra','tek','ona','zi','har','pe','lu','gor','mi','aza'];
	var colCache={seed:null,list:[]};
	var colInfo=function(c)
	{
		var seed=String(G.cultureSeed||'default');
		if (colCache.seed!=seed)
		{
			colCache.seed=seed;
			colCache.g=false;
			colCache.list=[];
			var rng=makeRng(hashStr('colonies'+seed));
			var order=[];for (var i=0;i<ARCH.length;i++) order.push(i);
			for (var i=order.length-1;i>0;i--){var j=Math.floor(rng()*(i+1));var t=order[i];order[i]=order[j];order[j]=t;}
			for (var i=0;i<NCOL;i++)
			{
				var a=ARCH[order[i%ARCH.length]];
				var n=2+Math.floor(rng()*2),name='';
				for (var s=0;s<n;s++) name+=SYL[Math.floor(rng()*SYL.length)];
				name=name.charAt(0).toUpperCase()+name.slice(1);
				colCache.list.push({
					id:i,name:name,arch:a,
					aggr:Math.max(0.05,Math.min(0.95,a.aggr+(rng()-0.5)*0.2)),
					str:Math.round(a.str[0]+rng()*(a.str[1]-a.str[0])),
					wealth:Math.round(a.wealth[0]+rng()*(a.wealth[1]-a.wealth[0])),
					terrain:rng(),
					trade:a.trade,
				});
			}
		}
		if (!colCache.g)
		{
			colCache.g=true;
			for (var i=0;i<colCache.list.length;i++)
			{
				Object.defineProperty(colCache.list[i],'offers',{get:function(){var p=tradePairs(this).slice(-2);return p.map(function(x){return x[0];});}});
				Object.defineProperty(colCache.list[i],'wants',{get:function(){var p=tradePairs(this).slice(-2);return p.map(function(x){return x[1];});}});
			}
		}
		return colCache.list[c];
	}

	var initColonies=function()
	{
		colCache.seed=null;
		for (var c=0;c<NCOL;c++)
		{
			var info=colInfo(c);
			setS(c,'stance',STANCE.UNKNOWN);
			setS(c,'relation',100);
			setS(c,'strength',info.str);
			setS(c,'base',info.str);
			setS(c,'wealth',info.wealth);
			setS(c,'intel',0);
		}
		G.getRawRes('warband cooldown').amount=0;
		G.getRawRes('colony era').amount=0;
	}

	/*=====================================================================================
	PART 4 : MILITARY
	=======================================================================================*/

	var hasTech=function(name){return G.techByName[name] && G.has(name);}
	var active=function(name)
	{
		var n=0;
		for (var i=0;i<G.unitsOwned.length;i++)
		{
			var u=G.unitsOwned[i];
			if (u.unit.name==name) n+=Math.max(0,u.amount-u.idle);
		}
		return n;
	}
	var warriors=function(){return active('warrior');}
	var milMult=function()
	{
		var m=1;
		if (hasTech('bows') && G.resByName['bow'] && G.resByName['bow'].amount>=warriors()*0.5) m+=0.15;
		if (hasTech('bronze-working')) m+=0.25;
		if (hasTech('iron-working')) m+=0.3;
		if (hasTech('steel-making')) m+=0.2;
		m+=Math.min(0.4,active('training ground')*0.04);
		m+=Math.min(0.24,active('armory')*0.03);
		return m;
	}
	var attackPower=function(){return warriors()*milMult();}
	var defensePower=function()
	{
		var d=warriors()*milMult()*1.25;
		d+=G.getRes('adult').amount*0.03;
		d+=active('watchtower')*2+active('palisade')*4+active('barracks')*3+active('city wall')*12+active('fortress')*20;
		d+=Math.min(d*0.25,G.getRes('torch').amount/10);
		return d;
	}

	var casualties=function(n,verb)
	{
		n=Math.max(0,Math.round(n));
		if (n<=0) return 0;
		var dead=Math.round(n*0.6),hurt=n-dead;
		var adults=Math.floor(G.getRes('adult').amount);
		dead=Math.min(dead,adults);
		hurt=Math.min(hurt,adults-dead);
		G.lose('adult',dead+hurt,'war');
		G.gain('corpse',dead,'war');
		G.gain('wounded',hurt,'war');
		G.gain('died this year',dead,'-');
		return dead+hurt;
	}

	/*=====================================================================================
	PART 5 : DIPLOMACY ACTIONS
	=======================================================================================*/

	var note=function(text){G.middleText('<small>'+text+'</small>');}
	var refresh=function(){if (G.tab && G.tab.id=='colonies') G.update['colonies']();}
	var say=function(type,text,icon){G.Message({type:type,text:text.replace(/\[([^\]]*)\]/g,'$1'),icon:icon||[24,7]});}

	var meet=function(c)
	{
		var info=colInfo(c);
		setS(c,'stance',STANCE.NEUTRAL);
		setS(c,'relation',90+Math.round(Math.random()*20));
		say('important tall','Your explorers have met a new people: the <b>'+info.name+'</b>, '+info.arch.tag.toLowerCase()+'. '+info.arch.desc,[24,7]);
		refresh();
	}

	var barter=function(c,k,qty)
	{
		var info=colInfo(c);
		var pr=tradePairs(info)[k];if (!pr) return;
		var give=pr[1],get=pr[0];
		if (G.getAmount(give)<qty){note('You do not have '+qty+' '+give+'.');return;}
		var out=Math.floor(qty*val(give)*barterRate(S(c,'relation'))/val(get));
		if (out<1){note('That is not enough to interest them.');return;}
		G.lose(give,qty,'trade');
		G.gain(get,out,'trade');
		addS(c,'relation',1,0,200);
		addS(c,'wealth',qty*val(give)/10,0,500);
		say('good','Traded '+B(qty)+' [' +give+'] to the '+info.name+' for '+B(out)+' [' +get+'].',[13,1]);
		refresh();
	}

	var gift=function(c)
	{
		if (!G.testCost({'food':30},1)){note('A gift costs 30 food.');return;}
		G.doCost({'food':30},1);
		addS(c,'relation',8,0,200);
		refresh();
	}

	var proposePact=function(c)
	{
		var info=colInfo(c);
		if (!hasTech('bartering')){note('You need the technology <b>bartering</b> first.');return;}
		if (S(c,'relation')<120){note('The '+info.name+' do not trust you enough yet (they need to like you more).');return;}
		if (!G.testCost({'influence':1},1)){note('A pact costs 1 influence.');return;}
		G.doCost({'influence':1},1);
		setS(c,'stance',STANCE.PACT);
		say('good','You have sealed a trade pact with the <b>'+info.name+'</b>. Caravans will now arrive every year.',[13,1]);
		refresh();
	}

	var endPact=function(c)
	{
		var info=colInfo(c);
		setS(c,'stance',STANCE.NEUTRAL);
		addS(c,'relation',-25,0,200);
		say('',"You ended the trade pact with the "+info.name+".");
		refresh();
	}

	var declareWar=function(c)
	{
		var info=colInfo(c);
		if (!hasTech('warbands')){note('You need the technology <b>warbands</b> first.');return;}
		setS(c,'stance',STANCE.WAR);
		setS(c,'relation',Math.min(S(c,'relation'),40));
		say('bad','You have declared war on the <b>'+info.name+'</b>!',[5,9]);
		refresh();
	}

	var suePeace=function(c)
	{
		var info=colInfo(c);
		if (!G.testCost({'food':50},1)){note('Peace offerings cost 50 food.');return;}
		G.doCost({'food':50},1);
		var chance=0.25+S(c,'relation')/300;
		if (S(c,'strength')<S(c,'base')*0.6) chance+=0.25;
		if (Math.random()<chance)
		{
			setS(c,'stance',STANCE.NEUTRAL);setS(c,'relation',90);
			say('good','The <b>'+info.name+'</b> accept your offering. There is peace again.',[24,7]);
		}
		else say('bad','The <b>'+info.name+'</b> reject your offering with scorn.',[24,7]);
		refresh();
	}

	var demandTribute=function(c)
	{
		var info=colInfo(c);
		if (!hasTech('warbands')){note('You need the technology <b>warbands</b> first.');return;}
		var P=attackPower();
		if (P<=0){note('You have no warriors to back up your demand.');return;}
		if (P>=S(c,'strength')*1.5)
		{
			setS(c,'stance',STANCE.TRIBUTE);setS(c,'relation',20);
			say('important','The <b>'+info.name+'</b> bow to your demand. They will now send tribute every year.',[5,9]);
		}
		else
		{
			setS(c,'stance',STANCE.WAR);setS(c,'relation',10);
			say('bad','The <b>'+info.name+'</b> laugh at your demand, and take up arms.',[5,9]);
		}
		refresh();
	}

	var release=function(c)
	{
		var info=colInfo(c);
		setS(c,'stance',STANCE.NEUTRAL);setS(c,'relation',110);
		say('',"You released the "+info.name+" from tribute.");
		refresh();
	}

	var attack=function(c)
	{
		var info=colInfo(c);
		var W=warriors();
		if (W<5){note('You need at least 5 armed warriors to send a warband.');return;}
		if (G.getRawRes('warband cooldown').amount>0){note('Your warband is still recovering.');return;}
		var A=attackPower()*(0.8+Math.random()*0.4);
		var D=S(c,'strength')*(0.85+info.terrain*0.3)*(0.8+Math.random()*0.4);
		G.getRawRes('warband cooldown').amount=120;
		if (A>D)
		{
			var ratio=D/A;
			var lost=casualties(W*(0.04+0.2*ratio)*(0.6+Math.random()*0.8));
			var loot=Math.round(8+S(c,'wealth')*0.3*(1-ratio*0.5));
			G.gain(info.offers[0],loot,'loot');
			G.gain(info.offers[1],loot,'loot');
			G.gain('food',loot*2,'loot');
			setS(c,'strength',S(c,'strength')*(0.55+0.2*ratio));
			setS(c,'wealth',S(c,'wealth')*0.65);
			var text='Your warband defeated the <b>'+info.name+'</b>! You lost '+lost+' fighters and brought back loot.';
			if (S(c,'strength')<S(c,'base')*0.55 && Math.random()<0.7)
			{
				setS(c,'stance',STANCE.TRIBUTE);setS(c,'relation',20);
				text+=' Broken, they agree to pay you tribute.';
			}
			say('good important',text,[5,9]);
		}
		else
		{
			var lost=casualties(W*(0.25+0.3*Math.min(1,1-A/D))*(0.7+Math.random()*0.6));
			setS(c,'strength',S(c,'strength')*1.03);
			say('bad important','Your warband was beaten back by the <b>'+info.name+'</b>. You lost '+lost+' fighters.',[5,9]);
		}
		refresh();
	}

	//raids on the player
	var raid=function(c)
	{
		var info=colInfo(c);
		var force=S(c,'strength')*(0.25+Math.random()*0.3)*Math.max(0.45,Math.pow(0.93,active('city wall')+active('fortress')));
		var def=defensePower()*(0.8+Math.random()*0.4);
		if (def>=force)
		{
			var lost=casualties(warriors()*0.04*Math.random());
			setS(c,'strength',S(c,'strength')*0.95);
			say('good','Raiders from the <b>'+info.name+'</b> were driven off.'+(lost?' You lost '+lost+' fighters.':''),[5,9]);
		}
		else
		{
			var sev=Math.min(1,(force-def)/force);
			var pop=G.getRes('population').amount;
			var dead=casualties(Math.ceil(G.getRes('adult').amount*(0.01+0.04*sev)));
			var pil=['food','archaic building materials','basic building materials'];
			for (var i=0;i<pil.length;i++)
			{
				G.lose(pil[i],G.getRes(pil[i]).amount*(0.03+0.15*sev),'raid');
			}
			G.lose('happiness',pop*20*sev,'war');
			addS(c,'wealth',20*sev+5,0,500);
			say('bad important','Raiders from the <b>'+info.name+'</b> sacked your settlement! '+dead+' of your people were killed or wounded, and supplies were stolen.',[5,9]);
		}
		refresh();
	}

	/*=====================================================================================
	PART 5b : SCOUTS AND BUILDERS
	=======================================================================================*/

	var contactChance=function()
	{
		var c=0.25+0.04*Math.min(15,active('scout'))+0.03*Math.min(5,active('watchtower'));
		if (hasTech('cartography')) c+=0.1;
		return Math.min(0.9,c);
	}

	var scoutColony=function(c)
	{
		var info=colInfo(c);
		var sc=active('scout');
		if (sc<1){note('You need at least one working scout.');return;}
		var chance=Math.min(0.95,0.5+0.05*sc+(hasTech('cartography')?0.15:0));
		if (Math.random()<chance)
		{
			setS(c,'intel',hasTech('cartography')?5:3);
			say('good','Your scouts brought back detailed news about the <b>'+info.name+'</b>.',[24,3]);
		}
		else
		{
			addS(c,'relation',-4,0,200);
			say('bad','Your scouts were chased off by the <b>'+info.name+'</b>.',[24,3]);
		}
		refresh();
	}

	var pending=function(name)
	{
		var u=G.getUnitByName(name);
		return !!(u && u.targetAmount>u.amount);
	}
	var totalOf=function(names)
	{
		var n=0;
		for (var i=0;i<names.length;i++) n+=G.getUnitAmount(names[i]);
		return n;
	}
	var tryBuild=function(names,n)
	{
		for (var i=0;i<names.length;i++)
		{
			var nm=names[i];
			if (pending(nm)) return false;
			if (G.canBuyUnitByName(nm,n)){G.buyUnitByName(nm,n,true);return true;}
		}
		return false;
	}
	var builderWork=function(me,mode)
	{
		var able=Math.max(0,me.amount-me.idle);
		if (able<=0) return;
		var pop=G.getRes('population').amount;
		var homeless=Math.max(0,(pop+10)-G.getRes('housing').amount);
		if (mode=='huts')
		{
			if (homeless>0) tryBuild(['hut'],Math.min(able,Math.ceil(homeless/5)));
		}
		else if (mode=='houses')
		{
			if (homeless>0) tryBuild(['tenement','house'],Math.min(able,Math.ceil(homeless/10)));
		}
		else if (mode=='storage')
		{
			var cap=2+Math.floor(pop/25);
			if (totalOf(['granary','storage pit','warehouse','stockpile'])>=cap) return;
			var fs=G.getRes('food storage');
			var ms=G.getRes('material storage');
			if (G.getRes('food').amount>Math.max(200,fs.amount*0.95)) tryBuild(['granary','storage pit'],1);
			else if (ms.used>Math.max(200,ms.amount*0.95)) tryBuild(['warehouse','stockpile','storage pit'],1);
		}
		else if (mode=='defenses')
		{
			var cap=3+Math.floor(pop/20);
			if (totalOf(['watchtower','palisade','city wall','fortress'])>=cap) return;
			var threat=0;
			for (var c=0;c<NCOL;c++)
			{
				var st=S(c,'stance'),info=colInfo(c);
				if (st==STANCE.WAR || (st==STANCE.NEUTRAL && info.aggr>0.5)) threat=Math.max(threat,S(c,'strength'));
			}
			if (defensePower()<threat*0.35) tryBuild(['fortress','city wall','palisade','watchtower'],1);
		}
	}

	/*=====================================================================================
	PART 6 : TIME - HOOKS INTO THE ENGINE
	=======================================================================================*/

	var colonyYear=function()
	{
		if (!G.on) return;
		var P=attackPower();
		//the colonies advance as your own people do
		var eraNow=tier(),eraRes=G.getRawRes('colony era');
		if (eraNow>eraRes.amount)
		{
			eraRes.amount=eraNow;
			var anyMet=false;
			for (var c=0;c<NCOL;c++) if (S(c,'stance')!=STANCE.UNKNOWN) anyMet=true;
			if (anyMet) say('important','The colonies have entered a new age: <b>'+ERA_NAMES[eraNow]+'</b>. Their warriors are stronger, and they now offer and want new goods.',[24,7]);
		}
		//trade buildings pay a little every year
		var inc=active('trading post')*1+active('market')*4+active('grand bazaar')*15;
		if (inc>0)
		{
			if (G.getRes('coin').replacement) G.gain('food',inc*5,'trade'); else G.gain('coin',inc,'trade');
		}
		var calm=Math.max(0.2,1-0.2*active('embassy'));
		for (var c=0;c<NCOL;c++)
		{
			var info=colInfo(c);
			var stance=S(c,'stance');
			if (S(c,'intel')>0) addS(c,'intel',-1,0,10);
			if (stance==STANCE.UNKNOWN)
			{
				if (hasTech('first contact') && Math.random()<contactChance()) meet(c);
				continue;
			}
			//colonies grow as your own people do
			var sc=scale();
			var base=Math.round(info.str*sc);
			setS(c,'base',base);
			var str=S(c,'strength');
			str+=(base-str)*0.12+(Math.random()-0.5)*0.08*base;
			setS(c,'strength',Math.max(10,Math.min(2000,str)));
			addS(c,'wealth',(3+Math.random()*6)*(1+progress()*0.03)-(stance==STANCE.WAR?6*sc:0),5,3000);
			var target=(stance==STANCE.PACT?130:100)+Math.min(40,active('embassy')*8);
			var rel=S(c,'relation');
			if (stance!=STANCE.WAR && stance!=STANCE.TRIBUTE) setS(c,'relation',rel+Math.max(-2,Math.min(2,target-rel)));
			rel=S(c,'relation');

			if (stance==STANCE.NEUTRAL)
			{
				//aggressive neighbours can get ideas if you look weak
				if (info.aggr>0.4 && P<S(c,'strength')*0.6 && Math.random()<info.aggr*0.3*calm)
				{
					setS(c,'stance',STANCE.WAR);setS(c,'relation',20);
					say('bad important','The <b>'+info.name+'</b> have declared war on you! They think you are weak.',[5,9]);
				}
				else if (info.aggr>0.4 && Math.random()<0.12)
				{
					if (active('watchtower')>0 && Math.random()<0.6)
					{
						setS(c,'intel',Math.max(S(c,'intel'),2));
						say('good','Your watchtowers spotted scouts from the <b>'+info.name+'</b> and drove them off. Following them taught you about their forces.',[24,3]);
					}
					else say('','Strangers from the <b>'+info.name+'</b> were seen scouting your lands.',[24,3]);
				}
				else if (Math.random()<info.aggr*0.15*calm)
				{
					addS(c,'relation',-12,0,200);
					say('bad','A border incident with the <b>'+info.name+'</b> has soured relations.',[24,7]);
				}
			}
			else if (stance==STANCE.PACT)
			{
				var n=Math.round((10+S(c,'wealth')*0.15)*caravanMult());
				G.gain(info.offers[0],n,'trade');
				G.gain(info.offers[1],n,'trade');
				addS(c,'relation',2,0,200);
				say('good','A caravan from the <b>'+info.name+'</b> arrived with '+B(n)+' [' +info.offers[0]+'] and '+B(n)+' [' +info.offers[1]+'].',[13,1]);
			}
			else if (stance==STANCE.WAR)
			{
				if (rel>=100 && Math.random()<0.3)
				{
					setS(c,'stance',STANCE.NEUTRAL);
					say('good','The <b>'+info.name+'</b> have grown tired of fighting and made peace with you.',[24,7]);
				}
				else addS(c,'relation',3,0,200);
			}
			else if (stance==STANCE.TRIBUTE)
			{
				var n=Math.round((15+S(c,'wealth')*0.2)*caravanMult());
				G.gain(info.offers[0],n,'tribute');
				G.gain(info.offers[1],n,'tribute');
				if (G.getRes('influence').amount<G.getRes('authority').amount) G.gain('influence',1,'tribute');
				say('good','The <b>'+info.name+'</b> sent tribute: '+B(n)+' [' +info.offers[0]+'] and '+B(n)+' [' +info.offers[1]+'].',[5,9]);
				if (S(c,'strength')>P*0.9 && Math.random()<0.1)
				{
					setS(c,'stance',STANCE.WAR);setS(c,'relation',10);
					say('bad important','The <b>'+info.name+'</b> have thrown off your rule and declared war!',[5,9]);
				}
			}
		}
		refresh();
	}

	var colonyDay=function()
	{
		if (!G.on) return;
		var cd=G.getRawRes('warband cooldown');
		if (cd.amount>0) cd.amount=Math.max(0,cd.amount-1);
		for (var c=0;c<NCOL;c++)
		{
			if (S(c,'stance')==STANCE.WAR && Math.random()<1/150) raid(c);
		}
	}

	//the tab must exist in the list before the first game starts
	var present=false;
	for (var i=0;i<G.tabs.length;i++) if (G.tabs[i].id=='colonies') present=true;
	if (!present)
	{
		var at=G.tabs.length;
		for (var i=0;i<G.tabs.length;i++) if (G.tabs[i].id=='settings') {at=i;break;}
		G.tabs.splice(at,0,{name:'Colonies',id:'colonies',update:'colonies',desc:'Meet neighbouring colonies; trade, make pacts, demand tribute or go to war.'});
		for (var i=0;i<G.tabs.length;i++) G.tabs[i].I=i;
	}

	//The engine builds the tab DOM before mods run, so add just our own tab element
	//(never call G.buildTabs() again: it rebuilds the map display and freezes the Territory tab)
	var ensureTab=function()
	{
		var tab=null;
		for (var i=0;i<G.tabs.length;i++) if (G.tabs[i].id=='colonies') tab=G.tabs[i];
		if (!tab) return;
		var sections=l('sections'),tabList=l('sectionTabs');
		if (!sections || !tabList) return;
		tab.div='coloniesDiv';
		if (!l('coloniesDiv'))
		{
			var d=document.createElement('div');
			d.id='coloniesDiv';d.className='subsection';d.style.display='none';
			sections.appendChild(d);
		}
		if (!l('tab-colonies'))
		{
			var t=document.createElement('div');
			t.id='tab-colonies';t.className='tab bgMid';t.innerHTML=tab.name;
			var before=l('tab-settings');
			if (before && before.parentNode==tabList) tabList.insertBefore(t,before); else tabList.appendChild(t);
			tab.l=t;
			t.onclick=function(){G.setTab(tab);};
			if (tab.desc) G.addTooltip(t,function(){return tab.desc;},{offY:-8});
		}
		else if (tab.l!=l('tab-colonies')) tab.l=l('tab-colonies');
	}

	var oldNewGame=G.funcs['new game'];
	G.funcs['new game']=function()
	{
		if (oldNewGame) oldNewGame.apply(this,arguments);
		//pick an origin
		var o=origins[Math.floor(Math.random()*origins.length)];
		if (G.techByName[o])
		{
			G.gainTech(G.techByName[o]);
			G.Message({type:'important',text:'Your people come from the <b>'+G.techByName[o].displayName.replace(' origin','')+'</b> lands: '+G.techByName[o].desc.split('<>')[0].replace('@',''),icon:G.techByName[o].icon});
		}
		initColonies();
		ensureTab();
	}
	var oldLoaded=G.funcs['game loaded'];
	G.funcs['game loaded']=function()
	{
		if (oldLoaded) oldLoaded.apply(this,arguments);
		colCache.seed=null;
		ensureTab();
	}
	var oldYear=G.funcs['new year'];
	G.funcs['new year']=function()
	{
		if (oldYear) oldYear.apply(this,arguments);
		colonyYear();
	}
	var oldDay=G.funcs['new day'];
	G.funcs['new day']=function()
	{
		if (oldDay) oldDay.apply(this,arguments);
		colonyDay();
	}

	/*=====================================================================================
	PART 7 : THE COLONIES TAB
	=======================================================================================*/

	var powerWord=function(str,P)
	{
		if (P<=0) return 'unknown';
		var r=str/P;
		if (r<0.5) return 'weak';
		if (r<0.9) return 'weaker than you';
		if (r<1.3) return 'comparable to you';
		if (r<2) return 'stronger than you';
		return 'overwhelming';
	}
	var relWord=function(r)
	{
		if (r<30) return 'hostile';
		if (r<70) return 'cold';
		if (r<115) return 'neutral';
		if (r<150) return 'friendly';
		return 'devoted';
	}

	G.update['colonies']=function()
	{
		var div=l('coloniesDiv');
		if (!div) return;
		if (!G.resByName['colony 0 stance'])
		{
			div.innerHTML='<div class="regularWrapper"><div class="par">The Colonies mod is not active in this game.</div></div>';
			return;
		}
		var str='<div class="regularWrapper">';
		if (!hasTech('first contact'))
		{
			str+='<div class="fancyText bitBiggerText" style="padding:16px;">Your people have not yet met anyone beyond their own borders.</div>'+
			'<div class="par" style="padding:0px 16px;">Research <b>first contact</b> (requires scouting and language) to start meeting your neighbours.</div>';
			div.innerHTML=str+'</div>';
			return;
		}
		var W=warriors();
		var P=attackPower();
		var cd=G.getRawRes('warband cooldown').amount;
		str+='<div class="block framed bgMid" style="margin:4px;padding:6px;"><div class="fancyText">Your forces</div>'+
			G.parse('Era of the colonies: <b>'+ERA_NAMES[tier()]+'</b>//Armed warriors: <b>'+B(W)+'</b>//Attack power: <b>'+B(P)+'</b> / Defense: <b>'+B(defensePower())+'</b>//Trade bonus: <b>+'+Math.round(tradeBonus()*100)+'%</b> / Caravans: <b>x'+(Math.round(caravanMult()*100)/100)+'</b> / Scouts: <b>'+active('scout')+'</b>'+(hasTech('warbands')?'':'//Research [warbands] to train [warrior]s.')+(cd>0?'//Warband recovering for <b>'+Math.ceil(cd)+'</b> more days.':''))+
			'</div>';
		var met=0;
		for (var c=0;c<NCOL;c++)
		{
			var stance=S(c,'stance');
			if (stance==STANCE.UNKNOWN) continue;
			met++;
			var info=colInfo(c);
			var rel=S(c,'relation');
			str+='<div class="block framed bgMid" style="display:inline-block;vertical-align:top;width:340px;margin:4px;padding:6px;">'+
				'<div class="fancyText" style="font-size:18px;">The '+info.name+' <span style="font-size:12px;color:'+STANCE_COLORS[stance]+';">['+STANCE_NAMES[stance]+']</span></div>'+
				'<div style="font-size:12px;opacity:0.8;">'+info.arch.tag+' - '+info.arch.desc+'</div>'+
				'<div class="divider"></div>'+
				'<div>Attitude: <b>'+relWord(rel)+'</b> <span style="display:inline-block;width:100px;height:6px;background:#222;vertical-align:middle;"><span style="display:block;width:'+Math.round(rel/2)+'%;height:6px;background:'+(rel<70?'#e54':rel<115?'#ccc':'#6c6')+';"></span></span></div>'+
				'<div>Military: <b>'+powerWord(S(c,'strength'),P)+'</b>'+(S(c,'intel')>0?' <small>(scouted: '+B(S(c,'strength'))+' vs your '+B(P)+', wealth '+B(S(c,'wealth'))+')</small>':'')+'</div>'+
				G.parse('<div>Offers: '+tradePairs(info).map(function(x){return '['+x[0]+']';}).join(', ')+'</div><div>Wants: '+tradePairs(info).map(function(x){return '['+x[1]+']';}).join(', ')+'</div>')+
				'<div class="divider"></div>';
			//trade
			if (stance!=STANCE.WAR)
			{
				var f=barterRate(rel);
				var prs=tradePairs(info);
				for (var k=0;k<prs.length;k++)
				{
					var give=prs[k][1],get=prs[k][0];
					for (var q=0;q<2;q++)
					{
						var qty=q==0?10:50;
						var out=Math.floor(qty*val(give)*f/val(get));
						str+=G.button({text:qty+' '+give+' for '+out+' '+get,classes:'frameless',style:'display:inline-block;font-size:11px;',tooltip:'Give '+qty+' '+give+' and receive about '+out+' '+get+'. Trading improves relations.',onclick:function(c,k,qty){return function(){barter(c,k,qty);};}(c,k,qty)});
					}
				}
				str+=G.button({text:'Send a gift (30 food)',tooltip:'Improve their attitude.',onclick:function(c){return function(){gift(c);};}(c)});
				str+=G.button({text:'Send scouts',tooltip:'Needs at least one [scout]. Learn their exact strength and wealth for a few years. More scouts mean better odds.',onclick:function(c){return function(){scoutColony(c);};}(c)});
			}
			//diplomacy
			if (stance==STANCE.NEUTRAL)
			{
				str+=G.button({text:'Propose trade pact',tooltip:'Costs 1 influence. Needs a friendly attitude and the bartering tech. Brings a caravan every year.',onclick:function(c){return function(){proposePact(c);};}(c)});
				str+=G.button({text:'Demand tribute',tooltip:'Needs warriors. If you are at least 1.5 times as strong as them they will pay tribute every year; otherwise it is war.',onclick:function(c){return function(){demandTribute(c);};}(c)});
				str+=G.button({text:'Declare war',tooltip:'Attack this colony.',onclick:function(c){return function(){declareWar(c);};}(c)});
			}
			else if (stance==STANCE.PACT)
			{
				str+=G.button({text:'End pact',tooltip:'Return to neutral relations, at a cost in attitude.',onclick:function(c){return function(){endPact(c);};}(c)});
				str+=G.button({text:'Declare war',tooltip:'Betray your partner.',onclick:function(c){return function(){declareWar(c);};}(c)});
			}
			else if (stance==STANCE.WAR)
			{
				str+=G.button({text:'Send warband',tooltip:'Attack with all your armed warriors. Needs at least 5. Win and you get loot and weaken them; lose and you suffer heavy casualties. Has a cooldown.',onclick:function(c){return function(){attack(c);};}(c)});
				str+=G.button({text:'Sue for peace (50 food)',tooltip:'Offer food in exchange for peace. More likely to work if they are friendly or weakened.',onclick:function(c){return function(){suePeace(c);};}(c)});
			}
			else if (stance==STANCE.TRIBUTE)
			{
				str+=G.button({text:'Release from tribute',tooltip:'Stop demanding tribute and return to neutral relations.',onclick:function(c){return function(){release(c);};}(c)});
			}
			str+='</div>';
		}
		if (met<NCOL) str+='<div class="par" style="padding:8px 16px;opacity:0.7;">'+(NCOL-met)+' other '+((NCOL-met)==1?'people remains':'peoples remain')+' undiscovered.</div>';
		str+='</div>';
		div.innerHTML=str;
		G.addCallbacks();
	}
	G.draw['colonies']=function(){}
	ensureTab();
}
});
