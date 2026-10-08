/*=====================================================================================
  HOMOSAPIENT COLONIES  -  v3.0.0
  Colonies, diplomacy, a realm map, towns & cities, libraries.
  Self-contained: the icon sheet is drawn at load time, nothing is fetched from anywhere.
  =====================================================================================*/
(function()
{
//-------------------------------------------------------------------------------------
//ICON SHEET (drawn with canvas, 24x24 cells, 16 columns)
//-------------------------------------------------------------------------------------
var IC={
	egg:[0,0],spice:[1,0],herb:[2,0],torch:[3,0],avians:[4,0],library:[5,0],archive:[6,0],scribe:[7,0],town:[8,0],map:[9,0],
	forest:[10,0],mountain:[11,0],desert:[12,0],jungle:[13,0],swamp:[14,0],arctic:[15,0],
	envoy:[0,1],marriage:[1,1],alliance:[2,1],spy:[3,1],swapmaps:[4,1],culture:[5,1],caravan:[6,1],aid:[7,1],incite:[8,1],annex:[9,1],
	expedition:[10,1],walls:[11,1],market:[12,1],workshop:[13,1],temple:[14,1],harbor:[15,1],
	granary:[0,2],barracks:[1,2],city:[2,2],hamlet:[3,2],village:[4,2],boil:[5,2],compass:[6,2],charter:[7,2],tower:[8,2],sword:[9,2],coin:[10,2],
	ruins:[11,2],valley:[12,2],ore:[13,2],hunt:[14,2],grove:[15,2]
};
var SHEET=(function()
{
	try
	{
		var cv=document.createElement('canvas');cv.width=16*24;cv.height=4*24;
		var g=cv.getContext('2d');if (!g) return '';
		var R=function(c,x,y,w,h){g.fillStyle=c;g.fillRect(x,y,w,h);};
		var C=function(c,x,y,r){g.fillStyle=c;g.beginPath();g.arc(x,y,r,0,6.2832);g.fill();};
		var E=function(c,x,y,rx,ry){g.fillStyle=c;g.beginPath();g.ellipse(x,y,rx,ry,0,0,6.2832);g.fill();};
		var Po=function(c,p){g.fillStyle=c;g.beginPath();g.moveTo(p[0],p[1]);for (var k=2;k<p.length;k+=2) g.lineTo(p[k],p[k+1]);g.closePath();g.fill();};
		var Li=function(c,x1,y1,x2,y2,w){g.strokeStyle=c;g.lineWidth=w||2;g.lineCap='round';g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();};
		var Ring=function(c,x,y,r,w){g.strokeStyle=c;g.lineWidth=w||2;g.beginPath();g.arc(x,y,r,0,6.2832);g.stroke();};
		var draw=function(ic,fn)
		{
			g.save();g.translate(ic[0]*24,ic[1]*24);
			g.shadowColor='rgba(0,0,0,0.85)';g.shadowBlur=1.5;g.shadowOffsetX=0;g.shadowOffsetY=1;
			fn();g.restore();
		};
		var hut=function(x,y,s,roof,wall)
		{
			R(wall,x,y+s*0.45,s,s*0.55);Po(roof,[x-s*0.15,y+s*0.5,x+s*0.5,y,x+s*1.15,y+s*0.5]);R('#3a2414',x+s*0.38,y+s*0.65,s*0.24,s*0.35);
		};
		draw(IC.egg,function(){E('#f4ead2',12,13,6,8);E('#fff8e6',10,10,2,3);});
		draw(IC.spice,function(){Li('#7a3b12',5,19,12,6,2);Li('#b8451c',9,20,17,8,3);Li('#d9602a',14,19,19,10,3);C('#f2a33a',12,5,2);C('#f2c85a',18,8,1.5);});
		draw(IC.herb,function(){Po('#4fae52',[12,21,4,10,12,3,20,10]);Li('#2d7a34',12,21,12,6,1.5);R('#e8e8e8',10,10,4,8);R('#e8e8e8',8,12,8,4);R('#c93a3a',11,11,2,6);R('#c93a3a',9,13,6,2);});
		draw(IC.torch,function(){Li('#7a5230',12,21,12,12,3);Po('#f08a24',[12,2,18,10,16,14,8,14,6,10]);Po('#ffd75a',[12,6,15,11,13,13,10,13,9,10]);});
		draw(IC.avians,function(){E('#7aa7d6',11,14,7,5);C('#7aa7d6',17,9,3.5);Po('#f2b134',[20,8,23,9,20,11]);Po('#4f7fb0',[5,12,0,6,10,10]);Po('#4f7fb0',[4,15,1,20,8,17]);C('#111',18,8,0.8);});
		draw(IC.library,function(){Po('#c9b38a',[2,9,12,2,22,9]);R('#c9b38a',3,9,18,2);for (var i=0;i<4;i++) R('#efe4c8',4+i*5,11,3,9);R('#9d8a62',2,20,20,3);R('#7a4a2a',9,14,6,4);R('#d9a441',10,15,4,2);});
		draw(IC.archive,function(){R('#6d4a2b',3,3,18,19);R('#8a6238',4,4,16,5);R('#8a6238',4,10,16,5);R('#8a6238',4,16,16,5);var cs=['#c0392b','#2e86c1','#27ae60','#d4ac0d'];for (var r=0;r<3;r++) for (var i=0;i<5;i++) R(cs[(i+r)%4],5+i*3,5+r*6,2,4);});
		draw(IC.scribe,function(){Po('#efe4c8',[4,5,18,5,18,20,4,20]);Li('#8a7a58',7,9,15,9,1);Li('#8a7a58',7,12,15,12,1);Li('#8a7a58',7,15,12,15,1);Li('#3b6ea8',20,3,12,18,2.5);Po('#2b2b2b',[12,18,10,22,14,20]);});
		draw(IC.town,function(){hut(1,10,9,'#b4532a','#d8c3a0');hut(13,8,10,'#8a3d22','#cdb48a');hut(7,14,9,'#a24a28','#e0cda8');});
		draw(IC.map,function(){Po('#e8d8a8',[3,4,9,6,15,4,21,6,21,20,15,18,9,20,3,18]);Li('#b79d5f',9,6,9,20,1);Li('#b79d5f',15,4,15,18,1);Li('#c0392b',9,9,15,15,2);Li('#c0392b',15,9,9,15,2);});
		draw(IC.forest,function(){Po('#2f7a3a',[12,2,19,13,5,13]);Po('#3d9a49',[12,8,21,20,3,20]);R('#6b4423',10,20,4,3);});
		draw(IC.mountain,function(){Po('#7d848c',[1,21,10,4,15,13,17,10,23,21]);Po('#eef3f6',[10,4,13,9,10,8,8,9]);});
		draw(IC.desert,function(){R('#d9b86a',1,17,22,5);Po('#e6c777',[1,17,8,12,15,17]);R('#3d8f45',11,5,3,12);R('#3d8f45',7,8,4,2);R('#3d8f45',7,6,2,4);R('#3d8f45',14,10,4,2);R('#3d8f45',16,8,2,4);});
		draw(IC.jungle,function(){Li('#6b4423',12,22,12,10,3);Po('#2f9a47',[12,10,3,6,10,8]);Po('#2f9a47',[12,10,21,6,14,8]);Po('#3dbb58',[12,10,5,2,11,7]);Po('#3dbb58',[12,10,19,2,13,7]);C('#d94f4f',10,12,1.5);});
		draw(IC.swamp,function(){E('#4c6b3a',12,18,10,4);R('#7a8f3a',6,6,1.5,12);R('#7a8f3a',10,3,1.5,15);R('#7a8f3a',15,7,1.5,11);E('#5b3b24',6,6,1.4,2.4);E('#5b3b24',10.7,3,1.4,2.4);E('#5b3b24',15.7,7,1.4,2.4);});
		draw(IC.arctic,function(){var a=['#cfe9f7','#e8f6ff'];for (var i=0;i<3;i++){var an=i*Math.PI/3;Li(a[i%2],12+Math.cos(an)*9,12+Math.sin(an)*9,12-Math.cos(an)*9,12-Math.sin(an)*9,2);}C('#fff',12,12,2);});
		draw(IC.envoy,function(){Li('#7a5230',6,22,6,3,2.5);Po('#f4f4f4',[7,4,21,8,7,13]);Li('#bbb',7,4,7,13,0.8);});
		draw(IC.marriage,function(){Ring('#e5c04a',9,13,5,2.5);Ring('#f0d870',15,13,5,2.5);Po('#6ad0f0',[12,3,14,6,12,9,10,6]);});
		draw(IC.alliance,function(){Li('#c8ccd0',4,20,17,4,2);Li('#c8ccd0',20,20,7,4,2);Po('#2f5f9a',[12,9,18,11,17,18,12,22,7,18,6,11]);Po('#e5c04a',[12,12,15,13,14,17,12,19,10,17,9,13]);});
		draw(IC.spy,function(){E('#f2f2f2',12,12,10,6);C('#2f5f9a',12,12,4.5);C('#111',12,12,2.2);C('#fff',10.8,10.8,0.9);});
		draw(IC.swapmaps,function(){Po('#e8d8a8',[2,7,8,6,12,8,12,19,8,17,2,18]);Po('#d8c590',[12,5,17,4,22,6,22,17,17,16,12,18]);Li('#c0392b',4,10,9,14,1.5);Li('#c0392b',14,8,19,13,1.5);});
		draw(IC.culture,function(){E('#8a5a2e',12,14,8,6);E('#d9b878',12,10,8,3.5);Li('#5a3a1c',4,13,20,13,1);Li('#f08a24',19,3,15,9,2);Li('#f08a24',4,3,8,9,2);});
		draw(IC.caravan,function(){R('#9a6b3a',3,9,15,7);Po('#e8d8a8',[3,9,10,3,18,9]);C('#3a2a1a',7,18,3);C('#3a2a1a',15,18,3);Li('#7a5230',18,13,23,13,2);});
		draw(IC.aid,function(){E('#a6743a',12,16,9,5);Ring('#c79a5a',12,12,6,2);C('#d94f3a',9,13,2.2);C('#e8a82a',13,12,2.2);C('#6fbf4a',16,14,2);});
		draw(IC.incite,function(){Po('#e8532a',[12,2,19,12,17,20,12,22,7,20,5,12,9,8]);Po('#f9c74a',[12,9,16,15,14,20,10,20,8,15]);});
		draw(IC.annex,function(){Po('#e5c04a',[3,18,3,8,8,13,12,5,16,13,21,8,21,18]);R('#c9a43a',3,18,18,3);C('#d94f4f',12,13,1.7);C('#4fa0d9',6,15,1.3);C('#4fa0d9',18,15,1.3);});
		draw(IC.expedition,function(){Ring('#d9c89a',12,12,8,2);Po('#c0392b',[12,4,14.5,12,12,11,9.5,12]);Po('#eee',[12,20,14.5,12,12,13,9.5,12]);C('#222',12,12,1.4);});
		draw(IC.walls,function(){R('#8f949a',1,9,22,12);for (var i=0;i<5;i++) R('#8f949a',1+i*5,5,3,5);R('#6d7278',9,13,6,8);R('#3a3d42',10,14,4,7);});
		draw(IC.market,function(){Po('#c0392b',[2,9,6,4,18,4,22,9]);Po('#f0e0c0',[6,4,10,4,9,9,5,9]);Po('#f0e0c0',[14,4,18,4,19,9,15,9]);R('#7a5230',3,10,2,11);R('#7a5230',19,10,2,11);R('#a6743a',3,15,18,3);C('#d94f3a',8,13,2);C('#e8c040',13,13,2);C('#6fbf4a',17,13,2);});
		draw(IC.workshop,function(){R('#4a4f56',4,15,16,4);Po('#4a4f56',[8,15,9,11,17,11,20,15]);R('#3a3e44',9,19,6,3);Li('#a6743a',17,3,10,12,3);R('#9aa0a6',14,2,8,5);});
		draw(IC.temple,function(){Po('#d9cfb8',[2,9,12,2,22,9]);for (var i=0;i<4;i++) R('#efe7d2',4+i*5,10,3,9);R('#bdb298',2,19,20,3);C('#e5c04a',12,7,1.8);});
		draw(IC.harbor,function(){Ring('#8fb4d9',12,8,3,2);Li('#8fb4d9',12,11,12,21,2.5);Li('#8fb4d9',6,17,12,21,2.5);Li('#8fb4d9',18,17,12,21,2.5);Li('#8fb4d9',8,12,16,12,2.5);});
		draw(IC.granary,function(){E('#a6743a',12,12,7,9);Li('#5a3a1c',5,8,19,8,1.5);Li('#5a3a1c',5,16,19,16,1.5);Po('#c9a05a',[7,5,12,1,17,5]);});
		draw(IC.barracks,function(){Li('#d0d4d8',5,21,19,4,2.5);Li('#d0d4d8',19,21,5,4,2.5);Li('#7a5230',3,19,8,15,3);Li('#7a5230',21,19,16,15,3);});
		draw(IC.city,function(){R('#9aa0a8',2,10,6,12);R('#b3b9c1',9,5,6,17);R('#9aa0a8',16,9,6,13);Po('#c0392b',[1,10,5,5,9,10]);Po('#c0392b',[8,5,12,0,16,5]);Po('#c0392b',[15,9,19,4,23,9]);R('#2b2e33',11,15,2,4);R('#f4d35e',4,14,2,2);R('#f4d35e',18,13,2,2);});
		draw(IC.hamlet,function(){hut(6,8,12,'#b4532a','#d8c3a0');});
		draw(IC.village,function(){hut(2,10,8,'#b4532a','#d8c3a0');hut(13,9,9,'#8a3d22','#cdb48a');});
		draw(IC.boil,function(){E('#4f6f8f',12,17,8,4);R('#4f6f8f',4,11,16,6);Li('#e8f0f6',9,9,9,3,1.5);Li('#e8f0f6',14,8,14,2,1.5);E('#6fb0e0',12,11,8,2.2);});
		draw(IC.compass,function(){Ring('#d9c89a',12,12,9,2);Po('#d94f3a',[12,3,15,12,9,12]);Po('#e8e8e8',[12,21,15,12,9,12]);C('#222',12,12,1.4);});
		draw(IC.charter,function(){Po('#efe4c8',[3,4,19,4,19,18,3,18]);Li('#8a7a58',6,8,16,8,1);Li('#8a7a58',6,11,16,11,1);C('#c0392b',17,18,4);C('#e5c04a',17,18,2);});
		draw(IC.tower,function(){R('#aab0b8',8,7,8,15);for (var i=0;i<3;i++) R('#aab0b8',7+i*4,4,3,4);R('#2b2e33',11,11,2,5);Li('#6b4423',12,4,12,0,1.2);Po('#d94f3a',[12,0,18,2,12,4]);});
		draw(IC.sword,function(){Li('#d6dade',5,19,18,5,3);Li('#a6743a',4,20,7,17,3.5);Li('#a6743a',4,15,9,20,2);});
		draw(IC.coin,function(){C('#c9a43a',12,12,9);C('#f0d060',12,12,7);Ring('#c9a43a',12,12,4,1.5);});
		draw(IC.ruins,function(){R('#9b9486',3,10,4,12);R('#9b9486',10,6,4,16);R('#9b9486',17,13,4,9);R('#b7b0a0',2,8,6,3);R('#b7b0a0',9,4,6,3);R('#4a7a3a',2,21,20,2);});
		draw(IC.valley,function(){R('#6fbf4a',1,14,22,8);Po('#4f9a3a',[1,14,8,8,15,14]);Po('#5faa40',[8,14,16,6,23,14]);E('#4fa0d9',12,19,6,2);});
		draw(IC.ore,function(){Po('#7d848c',[3,21,6,9,13,6,20,11,21,21]);Po('#d9a441',[8,16,11,12,14,16]);Po('#d9a441',[14,19,17,15,19,19]);Po('#4fa0d9',[6,19,8,16,10,19]);});
		draw(IC.hunt,function(){Po('#a67c52',[4,17,7,9,10,9,10,13,15,13,15,9,19,9,20,17]);R('#a67c52',5,17,2,5);R('#a67c52',17,17,2,5);Li('#6b4423',15,9,18,3,1.5);Li('#6b4423',18,3,21,5,1.5);Li('#6b4423',18,3,20,1,1.5);});
		draw(IC.grove,function(){Po('#2f7a3a',[12,1,19,12,5,12]);Po('#3d9a49',[12,7,20,19,4,19]);R('#6b4423',10,19,4,4);C('#f4f08a',12,10,2);Ring('#f4f08a',12,10,4.5,0.8);});
		return cv.toDataURL('image/png');
	}
	catch(e){return '';}
})();
var ic=function(name){return IC[name]?[IC[name][0],IC[name][1],'colsheet']:[0,0];};

G.AddData({
name:'Homosapient Colonies',
author:'Elk',
desc:'v3.0.0 - Neighbouring colonies you can meet, barter with, marry into, ally with, spy on, tax, or fight; a realm map you explore and settle; towns and cities you manage; libraries that raise your wisdom cap. Also ports a handful of things from Homosapient Legacy (origins, eggs, spice, medical herbs, torches, boiling).',
engineVersion:1,
manifest:0,
requires:['Default dataset*'],
sheets:{'colsheet':SHEET},
func:function()
{
	/*=====================================================================================
	PART 1 : THINGS PORTED FROM HOMOSAPIENT LEGACY (icons are now drawn by this mod)
	=======================================================================================*/
	new G.Res({
		name:'egg',
		desc:'[egg]s can be eaten raw or cooked, and are pretty nutritious. Gathered from the nests of [avians].',
		icon:ic('egg'),
		turnToByContext:{'eat':{'health':0.01,'happiness':0},'decay':{'spoiled food':1}},
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'spice',
		desc:'Rare herbs that give flavor to [food]. Eating them is a real treat.//Slowly spoils.',
		icon:ic('spice'),
		turnToByContext:{'eat':{'health':0,'happiness':0.15},'decay':{'spoiled food':1}},
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'medical herb',
		desc:'[medical herb]s are used by [healer]s, who get much better results from them than from plain [herb]s.//Slowly spoils.',
		icon:ic('herb'),
		category:'misc',
		tick:function(me,tick){G.lose(me.name,randomFloor(me.amount*0.0025),'decay');},
	});
	new G.Res({
		name:'torch',
		desc:'Torches light up the night around your settlement; every 10 of them add 1 to your defense against raiders (up to a limit).//Burns out slowly.',
		icon:ic('torch'),
		category:'misc',
		tick:function(me,tick){G.lose(me.name,randomFloor(me.amount*0.005),'decay');},
	});

	new G.Goods({
		name:'avians',
		desc:'[avians] are birds of all kinds. Hunting them yields some [meat] and [bone]s, and their nests are a source of [egg]s.',
		icon:ic('avians'),
		res:{'gather':{'egg':0.5},'hunt':{'meat':2,'bone':0.1}},
		affectedBy:['over hunting'],
		mult:5,
	});
	var avianLands={'prairie':0.4,'shrubland':0.4,'forest':0.3,'boreal forest':0.2,'savanna':0.4,'jungle':0.4,'hills':0.2,'beach':0.4,'tundra':0.15};
	for (var i in avianLands)
	{
		if (G.landByName[i]) G.landByName[i].goods.push({type:'avians',chance:avianLands[i],amount:0.5});
	}
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

	if (G.unitByName['healer'])
	{
		G.unitByName['healer'].effects.push(
			{type:'convert',from:{'sick':1,'medical herb':1},into:{'adult':1},chance:2/3,every:3},
			{type:'convert',from:{'wounded':1,'medical herb':1},into:{'adult':1},chance:1/3,every:6}
		);
		G.unitByName['healer'].desc+='//With [medical herb]s, [healer]s heal faster.';
	}

	var fk=G.unitByName['firekeeper'];
	if (fk)
	{
		fk.modes['torches']={name:'Make torches',icon:ic('torch'),desc:'Craft [torch]es from 3 [stick]s each.',req:{'fire-making':true}};
		fk.effects.push({type:'convert',from:{'stick':3},into:{'torch':1},every:4,mode:'torches'});
		fk.modes['boil water']={name:'Boil water',icon:ic('boil'),desc:'Boil [muddy water] over [fire pit]s to turn it into clean [water].',req:{'boiling':true}};
		fk.effects.push({type:'convert',from:{'muddy water':5,'fire pit':0.01},into:{'water':5},every:2,mode:'boil water'});
	}
	new G.Tech({
		name:'boiling',
		desc:'@[firekeeper]s can boil [muddy water] into clean [water]<>Making a habit of drinking warm water is instrumental to good health.',
		icon:ic('boil'),
		cost:{'insight':25},
		req:{'fire-making':true,'pottery':true},
	});

	var originReq={'tribalism':false};
	new G.Tech({name:'forest origin',desc:'@[gatherer] efficiency +10%<>Your people came from the forests, which sharpened their eyes for gathering.',icon:ic('forest'),req:originReq});
	new G.Tech({name:'mountain origin',desc:'@[wanderer] and [scout] efficiency +10%<>Your people came from the mountains, and are tough enough to scour any terrain.',icon:ic('mountain'),req:originReq});
	new G.Tech({name:'desert origin',desc:'@[well]s produce 25% more [water]<>Your people came from the deserts, where every drop counts.',icon:ic('desert'),req:originReq});
	new G.Tech({name:'jungle origin',desc:'@[hunter] efficiency +15%<>Your people came from the jungle, with heightened senses for danger and prey.',icon:ic('jungle'),req:originReq});
	new G.Tech({
		name:'swamp origin',
		desc:'@eating [bugs] makes your people slightly happy instead of sad<>Your people came from the marsh, which gave them a... unique way of living.',
		icon:ic('swamp'),
		req:originReq,
		effects:[{type:'function',func:function(){if (G.resByName['bugs'] && G.resByName['bugs'].turnToByContext['eat']) G.resByName['bugs'].turnToByContext['eat']['happiness']=0.05;}}],
	});
	new G.Tech({name:'arctic origin',desc:'@[chieftain] and [clan leader] efficiency +10%<>Your people came from the arctic, with a determination to survive no matter the cost.',icon:ic('arctic'),req:originReq});
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
	PART 2 : LIBRARIES AND RESEARCH  (fixes: wisdom cap could never be raised)
	Insight is capped by wisdom, and in the base game only speech, language and oral tradition
	give wisdom (100 in total). Writing, libraries and scholarship now add more, and every one
	of them costs less insight than the cap you will have when you reach it.
	=======================================================================================*/
	new G.Tech({
		name:'writing',
		desc:'@provides 40 [wisdom]@unlocks [scribe]s<>Marks pressed into clay and scratched into bark let one generation talk to the next without a single word being spoken.',
		icon:ic('scribe'),
		cost:{'insight':30},
		req:{'language':true,'oral tradition':true},
		effects:[{type:'provide res',what:{'wisdom':40}}],
	});
	new G.Tech({
		name:'libraries',
		desc:'@provides 30 [wisdom]@unlocks [library,Libraries], each of which raises your [wisdom] cap<>Somewhere to keep everything worth knowing, and a good reason to keep learning more.',
		icon:ic('library'),
		cost:{'insight':45},
		req:{'writing':true,'building':true},
		effects:[{type:'provide res',what:{'wisdom':30}}],
	});
	new G.Tech({
		name:'scholarship',
		desc:'@provides 40 [wisdom]@unlocks [archive]s@[scribe]s produce 25% more [insight]<>Learning becomes a profession. Rules for thinking are written down, argued with, and written down again.',
		icon:ic('archive'),
		cost:{'insight':70},
		req:{'libraries':true,'cities':true},
		effects:[{type:'provide res',what:{'wisdom':40}}],
	});
	new G.Tech({
		name:'cartography',
		desc:'@expeditions on the [Colonies] map reveal a wider area and can reach further@[scout]s explore faster<>Drawing the world makes it feel smaller, and a lot less frightening.',
		icon:ic('compass'),
		cost:{'insight':35},
		req:{'writing':true,'scouting':true},
	});
	new G.Tech({
		name:'diplomacy',
		desc:'@unlocks envoys, cultural exchanges, marriage alliances and military alliances with colonies<>Words, gifts and a lot of patience can win what spears cannot.',
		icon:ic('envoy'),
		cost:{'insight':30},
		req:{'first contact':true,'language':true},
	});
	new G.Tech({
		name:'espionage',
		desc:'@unlocks spying, sabotage and inciting feuds between colonies<>The quiet art of knowing what your neighbours would rather you did not.',
		icon:ic('spy'),
		cost:{'insight':35},
		req:{'diplomacy':true,'writing':true},
	});
	new G.Tech({
		name:'trade routes',
		desc:'@trade pacts can be upgraded into roads and caravan routes that bring more goods and some [salt]<>Wheels, mules and a little paperwork turn a handshake into an economy.',
		icon:ic('caravan'),
		cost:{'insight':40},
		req:{'bartering':true,'building':true},
	});
	new G.Tech({
		name:'town charters',
		desc:'@lets you found towns on the realm map@towns grow, produce goods and pay taxes<>A scrap of writing that says "this place is ours", and a promise to defend it.',
		icon:ic('charter'),
		cost:{'insight':35},
		req:{'cities':true,'first contact':true},
	});
	new G.Tech({
		name:'municipal government',
		desc:'@towns can grow into cities@allows you to annex weakened tributary colonies as towns<>Councils, magistrates and ledgers: the machinery of keeping many people in one place.',
		icon:ic('tower'),
		cost:{'insight':60},
		req:{'town charters':true,'code of law':true},
	});

	new G.Unit({
		name:'scribe',
		desc:'@generates [insight]@work gets better with [libraries] and [scholarship]<>[scribe]s copy, record and compare what the tribe knows.',
		icon:ic('scribe'),
		cost:{},
		use:{'worker':1},
		upkeep:{'coin':0.2},
		effects:[
			{type:'gather',what:{'insight':0.15}},
			{type:'mult',value:1.25,req:{'libraries':true}},
			{type:'mult',value:1.25,req:{'scholarship':true}},
		],
		req:{'writing':true},
		category:'discovery',
	});
	new G.Unit({
		name:'library',
		desc:'@provides 40 [wisdom], raising the cap on your [insight]@slowly produces [insight]<>Shelves of tablets, scrolls and bundles of bark, and the people who know where everything is.',
		icon:ic('library'),
		cost:{'archaic building materials':100,'basic building materials':50},
		use:{'land':1},
		effects:[
			{type:'provide',what:{'wisdom':40}},
			{type:'gather',what:{'insight':0.05}},
			{type:'waste',chance:0.02/1000},
		],
		req:{'libraries':true},
		category:'discovery',
	});
	new G.Unit({
		name:'archive',
		desc:'@provides 150 [wisdom], raising the cap on your [insight]@produces [insight]<>A great hall of records, kept dry and cataloged, where the knowledge of a whole people sits.',
		icon:ic('archive'),
		cost:{'basic building materials':350},
		use:{'land':2},
		effects:[
			{type:'provide',what:{'wisdom':150}},
			{type:'gather',what:{'insight':0.15}},
			{type:'waste',chance:0.01/1000},
		],
		req:{'scholarship':true},
		category:'discovery',
	});

	/*=====================================================================================
	PART 3 : COLONIES - TECHS, UNIT
	=======================================================================================*/
	new G.Tech({
		name:'first contact',
		desc:'@your people can now meet neighbouring colonies, and the [Colonies] tab becomes useful<>Beyond the horizon, others have settled too. Some of them will want to talk. Some of them will not.',
		icon:[24,7],
		cost:{'insight':40},
		req:{'scouting':true,'language':true},
	});
	new G.Tech({
		name:'bartering',
		desc:'@barter deals with colonies give you 5% more@allows trade pacts with friendly colonies<>Trading goods for goods, with fairness enforced by a lot of shouting.',
		icon:[13,1],
		cost:{'insight':30},
		req:{'first contact':true},
	});
	new G.Tech({
		name:'warbands',
		desc:'@unlocks [warrior]s@allows you to declare war on colonies and send out raids<>Armed and organized, a group of fighters is more than the sum of its parts.',
		icon:[5,9],
		cost:{'insight':40},
		req:{'first contact':true,'spears':true},
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

	/*=====================================================================================
	PART 4 : STATE
	Everything that changes is stored in hidden resources, so the engine saves and loads it
	for free. What a colony IS (name, kind, goods, place on the map) is derived from the
	culture seed, so it never has to be stored.
	=======================================================================================*/
	var NCOL=8,NTOWN=6,MW=36,MH=24,NSITE=15,CAPX=18,CAPY=12;
	var STANCE={UNKNOWN:0,NEUTRAL:1,PACT:2,WAR:3,TRIBUTE:4,ANNEXED:5};
	var STANCE_NAMES=['Unknown','Neutral','Trade pact','At war','Tributary','Annexed'];
	var STANCE_COLORS=['#888','#d8d8d8','#6c6','#e54','#ec4','#6cf'];
	var CKEYS=['stance','relation','strength','wealth','base','intel','route','flags','feud','feudwith','cool'];
	var TKEYS=['level','x','y','pop','happy','spec','tax','blds','site','src'];
	var MBITS=Math.ceil(MW*MH/30);
	var FLAG={MARRIED:1,ALLIED:2};
	for (var c=0;c<NCOL;c++) for (var k=0;k<CKEYS.length;k++) new G.Res({name:'colony '+c+' '+CKEYS[k],hidden:true,fractional:true});
	for (var t=0;t<NTOWN;t++) for (var k=0;k<TKEYS.length;k++) new G.Res({name:'town '+t+' '+TKEYS[k],hidden:true,fractional:true});
	for (var k=0;k<MBITS;k++) new G.Res({name:'mapbits '+k,hidden:true,fractional:true});
	new G.Res({name:'site bits',hidden:true,fractional:true});
	new G.Res({name:'warband cooldown',hidden:true,fractional:true});
	new G.Res({name:'realm version',hidden:true,fractional:true});

	var gv=function(n){return G.getRawRes(n).amount;}
	var sv=function(n,v){G.getRawRes(n).amount=Math.round(v);}
	var S=function(c,key){return gv('colony '+c+' '+key);}
	var setS=function(c,key,v){sv('colony '+c+' '+key,v);}
	var addS=function(c,key,v,min,max){setS(c,key,Math.max(min,Math.min(max,S(c,key)+v)));}
	var TT=function(t,key){return gv('town '+t+' '+key);}
	var setT=function(t,key,v){sv('town '+t+' '+key,v);}
	var hasFlag=function(c,f){return (S(c,'flags')&f)!=0;}
	var setFlag=function(c,f,on){setS(c,'flags',on?(S(c,'flags')|f):(S(c,'flags')&~f));}

	var hasTech=function(name){return G.techByName[name] && G.has(name);}

	//barter values
	var VAL={
		'food':1,'herb':0.8,'fruit':1,'meat':1,'seafood':1,'cooked meat':1.5,'cooked seafood':1.5,'cured meat':2,'cured seafood':2,'bread':2,'egg':1.2,'spice':6,'medical herb':3,
		'stick':0.5,'stone':0.5,'mud':0.4,'sand':0.5,'log':1,'clay':1,'hide':1.2,'bone':1,'salt':3,'leather':2,'lumber':2,'brick':2,'cut stone':2,
		'copper ore':3,'tin ore':3,'iron ore':4,'gold ore':8,'gems':8,
		'knapped tools':3,'stone tools':5,'metal tools':12,'stone weapons':5,'bow':7,'basket':3,'pot':4,'torch':2
	};
	var val=function(name){return VAL[name]||1;}
	var marketCount=function(){var n=0;for (var t=0;t<NTOWN;t++) if (TT(t,'level')>0 && (TT(t,'blds')&2)) n++;return n;}
	//share of value you get back in a swap; always below 1 so goods can't be farmed by looping trades
	var barterRate=function(rel)
	{
		return Math.min(0.99,0.7+0.25*Math.min(200,rel)/200+(hasTech('bartering')?0.05:0)+Math.min(3,marketCount())*0.01);
	}

	var ARCH=[
		{kind:'hill clan',tag:'Hill clan',desc:'Proud highlanders who respect strength above all.',aggr:0.7,str:[70,110],wealth:[30,60],offers:['stone','copper ore'],wants:['cooked meat','hide'],late:['iron ore','bread'],spec:2},
		{kind:'river folk',tag:'River folk',desc:'Peaceful fishers and potters with little taste for fighting.',aggr:0.2,str:[35,60],wealth:[40,80],offers:['seafood','clay'],wants:['knapped tools','basket'],late:['pot','stone weapons'],spec:0},
		{kind:'forest tribe',tag:'Forest tribe',desc:'Hunters and woodcutters, wary of strangers.',aggr:0.45,str:[50,85],wealth:[30,60],offers:['log','hide'],wants:['stone tools','fruit'],late:['lumber','metal tools'],spec:1},
		{kind:'salt traders',tag:'Salt traders',desc:'Shrewd merchants who would rather bargain than bleed.',aggr:0.3,str:[40,70],wealth:[60,110],offers:['salt','bone'],wants:['hide','cooked seafood'],late:['gems','metal tools'],spec:3},
		{kind:'steppe riders',tag:'Steppe riders',desc:'Mounted herders who follow the grass and take what they like.',aggr:0.65,str:[80,120],wealth:[30,55],offers:['hide','bone'],wants:['bread','salt'],late:['leather','bow'],spec:5},
		{kind:'mountain miners',tag:'Mountain miners',desc:'Stubborn diggers who live inside the rock and trade what they find in it.',aggr:0.35,str:[55,90],wealth:[50,90],offers:['copper ore','tin ore'],wants:['cooked meat','leather'],late:['iron ore','torch'],spec:2},
		{kind:'priest-kings',tag:'Priest-kings',desc:'A temple state ruled by reading omens, and by whoever reads them to the king.',aggr:0.4,str:[45,80],wealth:[60,100],offers:['spice','medical herb'],wants:['pot','bread'],late:['gems','cut stone'],spec:4},
		{kind:'harbor guild',tag:'Harbor guild',desc:'Shipwrights and middlemen who will sell you anything, including your own goods back.',aggr:0.25,str:[40,75],wealth:[70,120],offers:['salt','seafood'],wants:['metal tools','spice'],late:['gems','lumber'],spec:3},
	];

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
	var makeName=function(rng)
	{
		var n=2+Math.floor(rng()*2),name='';
		for (var s=0;s<n;s++) name+=SYL[Math.floor(rng()*SYL.length)];
		return name.charAt(0).toUpperCase()+name.slice(1);
	}

	/*-------- the world: terrain, colony places and sites, all from the culture seed --------*/
	var TERR={SEA:0,PLAINS:1,FOREST:2,HILLS:3,MOUNT:4,DESERT:5,TUNDRA:6,MARSH:7};
	var TERR_NAMES=['Sea','Plains','Forest','Hills','Mountains','Desert','Tundra','Marsh'];
	var TERR_COLORS=['#2b4d73','#86a653','#3f7d42','#8f8c55','#7d7d86','#d0b66c','#cfdbe2','#587a58'];
	var SITE_TYPES=[
		{id:'ruins',name:'Ancient ruins',icon:'ruins',desc:'Crumbling walls of people long gone. Exploring them sparks ideas.',on:['plains','hills','forest','desert']},
		{id:'valley',name:'Fertile valley',icon:'valley',desc:'Rich soil and fresh water. A town here farms 35% better.',on:['plains','marsh']},
		{id:'ore',name:'Ore vein',icon:'ore',desc:'Veins of stone and metal. A town here quarries 35% better.',on:['hills','mountains']},
		{id:'hunt',name:'Hunting ground',icon:'hunt',desc:'Herds and game. A town here produces 35% more wood and game.',on:['forest','plains']},
		{id:'grove',name:'Sacred grove',icon:'grove',desc:'A quiet wood the old stories speak of. A town here earns 35% more culture and insight.',on:['forest','marsh','hills']}
	];
	var terrKey=['sea','plains','forest','hills','mountains','desert','tundra','marsh'];
	var vnoise=function(seed,x,y)
	{
		var xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi;
		var h=function(a,b){return hashStr(seed+':'+a+':'+b)/4294967296;}
		var sm=function(t){return t*t*(3-2*t);}
		var a=h(xi,yi),b=h(xi+1,yi),c=h(xi,yi+1),d=h(xi+1,yi+1);
		var u=sm(xf),v=sm(yf);
		return a*(1-u)*(1-v)+b*u*(1-v)+c*(1-u)*v+d*u*v;
	}
	var worldCache={seed:null,w:null};
	var world=function()
	{
		var seed=String(G.cultureSeed||'default');
		if (worldCache.seed==seed && worldCache.w) return worldCache.w;
		var w={terr:[],colPos:[],sites:[],byTile:{}};
		var rng=makeRng(hashStr('realm'+seed));
		for (var y=0;y<MH;y++)
		{
			for (var x=0;x<MW;x++)
			{
				var dx=(x-CAPX)/(MW/2),dy=(y-CAPY)/(MH/2);
				var d=Math.sqrt(dx*dx+dy*dy);
				var e=0.55*vnoise(seed+'e1',x/8,y/8)+0.3*vnoise(seed+'e2',x/4,y/4)+0.15*vnoise(seed+'e3',x/2,y/2);
				e+=0.18-d*d*0.38;
				var m=0.6*vnoise(seed+'m1',x/7,y/7)+0.4*vnoise(seed+'m2',x/3.5,y/3.5);
				var cold=y/MH+(vnoise(seed+'t',x/6,y/6)-0.5)*0.25;
				var tt;
				if (e<0.36) tt=TERR.SEA;
				else if (e>0.82) tt=TERR.MOUNT;
				else if (e>0.70) tt=TERR.HILLS;
				else if (cold<0.1) tt=TERR.TUNDRA;
				else if (m<0.3) tt=TERR.DESERT;
				else if (m>0.74) tt=(e<0.47?TERR.MARSH:TERR.FOREST);
				else if (m>0.56) tt=TERR.FOREST;
				else tt=TERR.PLAINS;
				if (Math.abs(x-CAPX)<=3 && Math.abs(y-CAPY)<=3 && Math.hypot(x-CAPX,y-CAPY)<=3.3) tt=(tt==TERR.SEA||tt==TERR.MOUNT||tt==TERR.DESERT||tt==TERR.TUNDRA)?TERR.PLAINS:tt;
				w.terr[y*MW+x]=tt;
			}
		}
		var land=function(x,y){return x>=0&&y>=0&&x<MW&&y<MH&&w.terr[y*MW+x]!=TERR.SEA&&w.terr[y*MW+x]!=TERR.MOUNT;}
		var taken={};
		//colonies
		var minD=6;
		for (var i=0;i<NCOL;i++)
		{
			var placed=false;
			for (var tries=0;tries<6000 && !placed;tries++)
			{
				if (tries==2500) minD=4.5;
				if (tries==4500) minD=3;
				var x=2+Math.floor(rng()*(MW-4)),y=2+Math.floor(rng()*(MH-4));
				var dc=Math.hypot(x-CAPX,y-CAPY);
				if (!land(x,y) || dc<7 || dc>17) continue;
				var ok=true;
				for (var j=0;j<w.colPos.length;j++) if (Math.hypot(w.colPos[j][0]-x,w.colPos[j][1]-y)<minD) ok=false;
				if (!ok) continue;
				w.colPos.push([x,y]);taken[x+','+y]=1;placed=true;
			}
			if (!placed){w.colPos.push([2+i,2]);taken[(2+i)+',2']=1;}
		}
		//sites
		for (var i=0;i<NSITE;i++)
		{
			var type=SITE_TYPES[i%SITE_TYPES.length];
			var placed=false;
			for (var tries=0;tries<3000 && !placed;tries++)
			{
				var x=1+Math.floor(rng()*(MW-2)),y=1+Math.floor(rng()*(MH-2));
				if (!land(x,y) || taken[x+','+y]) continue;
				if (type.on.indexOf(terrKey[w.terr[y*MW+x]])<0) continue;
				if (Math.hypot(x-CAPX,y-CAPY)<3) continue;
				var ok=true;
				for (var j=0;j<w.sites.length;j++) if (Math.hypot(w.sites[j].x-x,w.sites[j].y-y)<3) ok=false;
				if (!ok) continue;
				w.sites.push({id:i,type:type,x:x,y:y});taken[x+','+y]=1;placed=true;
			}
			if (!placed) w.sites.push({id:i,type:type,x:-1,y:-1});
		}
		for (var j=0;j<w.sites.length;j++) if (w.sites[j].x>=0) w.byTile[w.sites[j].x+','+w.sites[j].y]=w.sites[j];
		w.land=land;
		worldCache.seed=seed;worldCache.w=w;
		return w;
	}
	var terrAt=function(x,y){var w=world();return (x>=0&&y>=0&&x<MW&&y<MH)?w.terr[y*MW+x]:TERR.SEA;}
	var coastal=function(x,y)
	{
		for (var dy=-1;dy<=1;dy++) for (var dx=-1;dx<=1;dx++) if (terrAt(x+dx,y+dy)==TERR.SEA) return true;
		return false;
	}
	var siteAt=function(x,y){return world().byTile[x+','+y]||null;}
	var colonyAtTile=function(x,y){var w=world();for (var c=0;c<NCOL;c++) if (w.colPos[c][0]==x && w.colPos[c][1]==y) return c;return -1;}
	var townAtTile=function(x,y){for (var t=0;t<NTOWN;t++) if (TT(t,'level')>0 && TT(t,'x')==x && TT(t,'y')==y) return t;return -1;}

	/*-------- fog of war: one bit per tile, 30 per hidden resource --------*/
	var isRev=function(x,y)
	{
		if (x<0||y<0||x>=MW||y>=MH) return false;
		var i=y*MW+x;
		return ((gv('mapbits '+Math.floor(i/30))|0)>>(i%30)&1)==1;
	}
	var setRev=function(x,y)
	{
		if (x<0||y<0||x>=MW||y>=MH) return false;
		var i=y*MW+x,k='mapbits '+Math.floor(i/30),v=gv(k)|0;
		if ((v>>(i%30)&1)==1) return false;
		sv(k,v|(1<<(i%30)));return true;
	}
	var revealR=function(cx,cy,r)
	{
		var n=0;
		for (var y=cy-r;y<=cy+r;y++) for (var x=cx-r;x<=cx+r;x++) if (Math.hypot(x-cx,y-cy)<=r+0.3 && setRev(x,y)) n++;
		return n;
	}
	var revealedCount=function(){var n=0;for (var y=0;y<MH;y++) for (var x=0;x<MW;x++) if (isRev(x,y)) n++;return n;}
	var reachR=function(){return 4+(hasTech('scouting')?1:0)+(hasTech('cartography')?2:0)+Math.min(3,Math.floor(scoutCount()/3));}
	var scoutCount=function()
	{
		var n=0;
		for (var i=0;i<G.unitsOwned.length;i++){var u=G.unitsOwned[i];if (u.unit.name=='scout') n+=Math.max(0,u.amount-u.idle);}
		return n;
	}
	var inReach=function(x,y)
	{
		var R=reachR();
		for (var yy=y-R;yy<=y+R;yy++) for (var xx=x-R;xx<=x+R;xx++) if (isRev(xx,yy) && Math.hypot(xx-x,yy-y)<=R) return true;
		return false;
	}
	var siteFound=function(i){return ((gv('site bits')|0)>>i&1)==1;}
	var markSite=function(i){sv('site bits',(gv('site bits')|0)|(1<<i));}

	/*-------- colonies: what they are --------*/
	var eraLevel=function()
	{
		var list=['bows','smelting','bronze-working','iron-working','steel-making','masonry','code of law','writing','construction','cities'];
		var n=0;
		for (var i=0;i<list.length;i++) if (hasTech(list[i])) n++;
		return n;
	}
	var colCache={seed:null,list:[]};
	var colInfo=function(c)
	{
		var seed=String(G.cultureSeed||'default');
		if (colCache.seed!=seed)
		{
			colCache.seed=seed;
			colCache.list=[];
			//the first four are built exactly as in v2, so their names and kinds do not change
			var rng=makeRng(hashStr('colonies'+seed));
			var order=[0,1,2,3];
			for (var i=order.length-1;i>0;i--){var j=Math.floor(rng()*(i+1));var t=order[i];order[i]=order[j];order[j]=t;}
			var rng2=makeRng(hashStr('colonies2'+seed));
			var order2=[4,5,6,7];
			for (var i=order2.length-1;i>0;i--){var j=Math.floor(rng2()*(i+1));var t=order2[i];order2[i]=order2[j];order2[j]=t;}
			var w=world();
			for (var i=0;i<NCOL;i++)
			{
				var r=i<4?rng:rng2;
				var a=ARCH[i<4?order[i]:order2[i-4]];
				var name=makeName(r);
				colCache.list.push({
					id:i,name:name,arch:a,
					aggr:Math.max(0.05,Math.min(0.95,a.aggr+(r()-0.5)*0.2)),
					str:Math.round(a.str[0]+r()*(a.str[1]-a.str[0])),
					wealth:Math.round(a.wealth[0]+r()*(a.wealth[1]-a.wealth[0])),
					terrain:r(),
					offers:a.offers,wants:a.wants,
					x:w.colPos[i][0],y:w.colPos[i][1],
				});
			}
		}
		return colCache.list[c];
	}
	//what a colony will swap with you; a third pair opens up as the world moves on
	var tradeList=function(c)
	{
		var info=colInfo(c),l=[];
		for (var k=0;k<2;k++) l.push({give:info.wants[k],get:info.offers[k]});
		if (hasTech('smelting') || hasTech('bronze-working')) l.push({give:info.arch.late[1],get:info.arch.late[0]});
		return l;
	}
	var cstr=function(cost){return G.getCostString(cost,true,true);}

	var initColony=function(c)
	{
		var info=colInfo(c);
		setS(c,'stance',STANCE.UNKNOWN);
		setS(c,'relation',100);
		setS(c,'strength',info.str);
		setS(c,'base',info.str);
		setS(c,'wealth',info.wealth);
		setS(c,'intel',0);setS(c,'route',0);setS(c,'flags',0);setS(c,'feud',0);setS(c,'feudwith',0);setS(c,'cool',0);
	}
	var initRealm=function()
	{
		colCache.seed=null;worldCache.seed=null;
		for (var c=0;c<NCOL;c++) initColony(c);
		for (var t=0;t<NTOWN;t++) for (var k=0;k<TKEYS.length;k++) setT(t,TKEYS[k],0);
		for (var k=0;k<MBITS;k++) sv('mapbits '+k,0);
		sv('site bits',0);
		G.getRawRes('warband cooldown').amount=0;
		revealR(CAPX,CAPY,3);
		sv('realm version',3);
	}

	/*=====================================================================================
	PART 5 : MILITARY
	=======================================================================================*/
	var warriors=function()
	{
		var n=0;
		for (var i=0;i<G.unitsOwned.length;i++)
		{
			var u=G.unitsOwned[i];
			if (u.unit.name=='warrior') n+=Math.max(0,u.amount-u.idle);
		}
		return n;
	}
	var milMult=function()
	{
		var m=1;
		if (hasTech('bows') && G.resByName['bow'] && G.resByName['bow'].amount>=warriors()*0.5) m+=0.15;
		if (hasTech('bronze-working')) m+=0.25;
		if (hasTech('iron-working')) m+=0.3;
		if (hasTech('steel-making')) m+=0.2;
		return m;
	}
	var allySum=function()
	{
		var s=0;
		for (var c=0;c<NCOL;c++) if (S(c,'stance')==STANCE.PACT && hasFlag(c,FLAG.ALLIED)) s+=S(c,'strength');
		return s;
	}
	var townGarrison=function()
	{
		var s=0;
		for (var t=0;t<NTOWN;t++)
		{
			if (TT(t,'level')<1) continue;
			if (TT(t,'blds')&32) s+=10;
			if (TT(t,'spec')==5) s+=TT(t,'pop')*0.1;
		}
		return s;
	}
	var attackPower=function(){return warriors()*milMult()+allySum()*0.25;}
	var defensePower=function()
	{
		var d=warriors()*milMult()*1.25;
		d+=G.getRes('adult').amount*0.03;
		d+=Math.min(d*0.25,G.getRes('torch').amount/10);
		d+=allySum()*0.35+townGarrison();
		return d;
	}
	var casualties=function(n)
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
	PART 6 : DIPLOMACY ACTIONS
	=======================================================================================*/
	var note=function(text){G.middleText('<small>'+text+'</small>');}
	var refresh=function(){if (G.tab && G.tab.id=='colonies' && G.update['colonies']) G.update['colonies']();}
	var say=function(type,text,icon){G.Message({type:type,text:text.replace(/\[([^\]]*)\]/g,'$1'),icon:icon||[24,7]});}
	var pay=function(cost)
	{
		if (!G.testCost(cost,1)){note('You need: '+cstr(cost));return false;}
		G.doCost(cost,1);return true;
	}
	var ready=function(c)
	{
		if (S(c,'cool')>0){note('The '+colInfo(c).name+' are not ready for another delegation for '+Math.ceil(S(c,'cool'))+' more days.');return false;}
		return true;
	}
	var settle=function(c,days){setS(c,'cool',days);}
	var needTech=function(name,why){if (hasTech(name)) return true;note('You need the technology <b>'+name+'</b> '+(why||'first')+'.');return false;}

	var meet=function(c)
	{
		var info=colInfo(c);
		setS(c,'stance',STANCE.NEUTRAL);
		setS(c,'relation',90+Math.round(Math.random()*20));
		setS(c,'intel',10);
		revealR(info.x,info.y,2);
		say('important tall','Your explorers have met a new people: the <b>'+info.name+'</b>, '+info.arch.tag.toLowerCase()+'. '+info.arch.desc,ic('map'));
	}
	var barter=function(c,k,qty)
	{
		var info=colInfo(c);
		var p=tradeList(c)[k];if (!p) return;
		if (G.getAmount(p.give)<qty){note('You do not have '+qty+' '+p.give+'.');return;}
		var out=Math.floor(qty*val(p.give)*barterRate(S(c,'relation'))/val(p.get));
		if (out<1){note('That is not enough to interest them.');return;}
		G.lose(p.give,qty,'trade');
		G.gain(p.get,out,'trade');
		addS(c,'relation',1,0,200);
		addS(c,'wealth',qty*val(p.give)/10,0,800);
		say('good','Traded '+B(qty)+' ['+p.give+'] to the '+info.name+' for '+B(out)+' ['+p.get+'].',[13,1]);
		refresh();
	}
	var gift=function(c)
	{
		if (!pay({'food':30})) return;
		addS(c,'relation',8,0,200);
		refresh();
	}
	var proposePact=function(c)
	{
		var info=colInfo(c);
		if (!needTech('bartering')) return;
		if (S(c,'relation')<120){note('The '+info.name+' do not trust you enough yet (they need to like you more).');return;}
		if (!pay({'influence':1})) return;
		setS(c,'stance',STANCE.PACT);
		say('good','You have sealed a trade pact with the <b>'+info.name+'</b>. Caravans will now arrive every year.',[13,1]);
		refresh();
	}
	var endPact=function(c)
	{
		var info=colInfo(c);
		setS(c,'stance',STANCE.NEUTRAL);setS(c,'flags',0);setS(c,'route',0);
		addS(c,'relation',-25,0,200);
		say('',"You ended the trade pact with the "+info.name+".");
		refresh();
	}
	var declareWar=function(c)
	{
		var info=colInfo(c);
		if (!needTech('warbands')) return;
		setS(c,'stance',STANCE.WAR);setS(c,'flags',0);setS(c,'route',0);
		setS(c,'relation',Math.min(S(c,'relation'),40));
		say('bad','You have declared war on the <b>'+info.name+'</b>!',[5,9]);
		refresh();
	}
	var suePeace=function(c)
	{
		var info=colInfo(c);
		if (!pay({'food':50})) return;
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
		if (!needTech('warbands')) return;
		var P=attackPower();
		if (P<=0){note('You have no warriors to back up your demand.');return;}
		if (P>=S(c,'strength')*1.5)
		{
			setS(c,'stance',STANCE.TRIBUTE);setS(c,'relation',20);setS(c,'flags',0);
			say('important','The <b>'+info.name+'</b> bow to your demand. They will now send tribute every year.',[5,9]);
		}
		else
		{
			setS(c,'stance',STANCE.WAR);setS(c,'relation',10);setS(c,'flags',0);
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
			G.gain('meat',loot*2,'loot');
			setS(c,'strength',S(c,'strength')*(0.55+0.2*ratio));
			setS(c,'wealth',S(c,'wealth')*0.65);
			var text='Your warband defeated the <b>'+info.name+'</b>! You lost '+lost+' fighters and brought back loot.';
			if (S(c,'strength')<S(c,'base')*0.55 && Math.random()<0.7)
			{
				setS(c,'stance',STANCE.TRIBUTE);setS(c,'relation',20);setS(c,'flags',0);
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

	//---- new in v3 ----
	var sendEnvoy=function(c)
	{
		var info=colInfo(c);
		if (!needTech('diplomacy') || !ready(c)) return;
		if (!pay({'influence':1})) return;
		addS(c,'relation',15,0,200);addS(c,'intel',25,0,100);settle(c,30);
		say('good','Your envoy was received with ceremony by the <b>'+info.name+'</b>. They think better of you now, and you have learned something about them.',ic('envoy'));
		refresh();
	}
	var culturalExchange=function(c)
	{
		var info=colInfo(c);
		if (!needTech('diplomacy') || !ready(c)) return;
		if (!pay({'food':20})) return;
		var cul=Math.round(4+S(c,'relation')/25);
		G.gain('culture',cul,'exchange');
		if (hasTech('writing')) G.gain('insight',3,'exchange');
		addS(c,'relation',6,0,200);settle(c,60);
		say('good','Singers and storytellers travelled between your people and the <b>'+info.name+'</b>. You gained '+cul+' [culture].',ic('culture'));
		refresh();
	}
	var libraryCount=function(){return G.getUnitAmount('library')+G.getUnitAmount('archive')*3;}
	var exchangeScholars=function(c)
	{
		var info=colInfo(c);
		if (!needTech('writing') || !ready(c)) return;
		if (!pay({'food':30})) return;
		var ins=Math.min(40,6+libraryCount()*3);
		G.gain('insight',ins,'exchange');
		addS(c,'relation',4,0,200);settle(c,90);
		say('good','Scholars of the <b>'+info.name+'</b> compared notes with yours. You gained '+ins+' [insight].',ic('scribe'));
		refresh();
	}
	var swapMaps=function(c)
	{
		var info=colInfo(c);
		if (!needTech('writing','to draw maps') || !ready(c)) return;
		if (S(c,'relation')<100){note('The '+info.name+' do not trust you enough to share their maps.');return;}
		if (!pay({'food':25})) return;
		var n=revealR(info.x,info.y,5);
		var met=0;
		for (var d=0;d<NCOL;d++)
		{
			var di=colInfo(d);
			if (S(d,'stance')==STANCE.UNKNOWN && isRev(di.x,di.y) && hasTech('first contact')){meet(d);met++;}
		}
		settle(c,150);
		say('good','The <b>'+info.name+'</b> shared their maps. '+n+' new tiles are charted'+(met?(' and '+met+' other '+(met==1?'people':'peoples')+' revealed'):'')+'.',ic('swapmaps'));
		refresh();
	}
	var marry=function(c)
	{
		var info=colInfo(c);
		if (!needTech('diplomacy') || !ready(c)) return;
		if (S(c,'stance')!=STANCE.PACT){note('Marriage alliances need a trade pact first.');return;}
		if (S(c,'relation')<140){note('The '+info.name+' do not like you enough (they need to be friendly).');return;}
		if (!pay({'influence':2,'food':50})) return;
		setFlag(c,FLAG.MARRIED,true);addS(c,'relation',30,0,200);settle(c,60);
		say('important','A marriage binds your family to the <b>'+info.name+'</b>. They will never declare war on you, and their caravans grow 25% larger.',ic('marriage'));
		refresh();
	}
	var makeAlliance=function(c)
	{
		var info=colInfo(c);
		if (!needTech('diplomacy') || !needTech('warbands')) return;
		if (S(c,'stance')!=STANCE.PACT){note('Military alliances need a trade pact first.');return;}
		if (S(c,'relation')<150){note('The '+info.name+' do not trust you enough to fight beside you.');return;}
		if (!pay({'influence':2})) return;
		setFlag(c,FLAG.ALLIED,true);
		say('important','You and the <b>'+info.name+'</b> have sworn to defend each other. Their warriors add to your defense and your attack.',ic('alliance'));
		refresh();
	}
	var breakAlliance=function(c)
	{
		setFlag(c,FLAG.ALLIED,false);addS(c,'relation',-15,0,200);
		say('',"You dissolved your alliance with the "+colInfo(c).name+".");
		refresh();
	}
	var requestAid=function(c)
	{
		var info=colInfo(c);
		if (!ready(c)) return;
		if (S(c,'stance')!=STANCE.PACT){note('Only partners in a trade pact will help you.');return;}
		var n=Math.round(15+S(c,'wealth')*0.35);
		G.gain(info.offers[0],n,'aid');G.gain(info.offers[1],n,'aid');G.gain('meat',n,'aid');
		addS(c,'relation',-10,0,200);settle(c,200);
		say('good','The <b>'+info.name+'</b> sent aid: '+B(n)+' [' +info.offers[0]+'], '+B(n)+' ['+info.offers[1]+'] and '+B(n)+' [meat]. They will remember it.',ic('aid'));
		refresh();
	}
	var spyOn=function(c)
	{
		var info=colInfo(c);
		if (!needTech('espionage') || !ready(c)) return;
		if (!pay({'food':40})) return;
		settle(c,90);
		if (Math.random()<0.55+Math.min(0.3,S(c,'intel')/300))
		{
			setS(c,'intel',100);
			say('good','Your spies report on the <b>'+info.name+'</b>: military strength '+Math.round(S(c,'strength'))+', wealth '+Math.round(S(c,'wealth'))+', aggression '+Math.round(info.aggr*100)+'%.',ic('spy'));
		}
		else
		{
			addS(c,'relation',-18,0,200);
			say('bad','Your spies were caught in the lands of the <b>'+info.name+'</b>. They are furious.',ic('spy'));
			if (S(c,'relation')<30 && S(c,'stance')==STANCE.NEUTRAL) {setS(c,'stance',STANCE.WAR);say('bad','The <b>'+info.name+'</b> have declared war on you!',[5,9]);}
		}
		refresh();
	}
	var sabotage=function(c)
	{
		var info=colInfo(c);
		if (!needTech('espionage') || !ready(c)) return;
		if (S(c,'intel')<40){note('You do not know enough about the '+info.name+' yet. Send an envoy or spy on them first.');return;}
		if (!pay({'food':60,'influence':1})) return;
		settle(c,120);
		if (Math.random()<0.5+S(c,'intel')/250)
		{
			setS(c,'strength',S(c,'strength')*0.85);setS(c,'wealth',S(c,'wealth')*0.8);addS(c,'relation',-6,0,200);
			say('good','Granaries burned and wells fouled: the <b>'+info.name+'</b> have been weakened, and have no idea who did it.',ic('spy'));
		}
		else
		{
			setS(c,'relation',Math.min(S(c,'relation'),25));
			say('bad','Your saboteurs were caught in the <b>'+info.name+'</b> lands. They know exactly who sent them.',ic('spy'));
			if ((S(c,'stance')==STANCE.NEUTRAL||S(c,'stance')==STANCE.PACT) && Math.random()<0.4){setS(c,'stance',STANCE.WAR);setS(c,'flags',0);setS(c,'route',0);say('bad','The <b>'+info.name+'</b> have declared war on you!',[5,9]);}
		}
		refresh();
	}
	var incite=function(c)
	{
		var info=colInfo(c);
		if (!needTech('espionage') || !ready(c)) return;
		if (S(c,'feud')>0){note('The '+info.name+' are already feuding with someone.');return;}
		var opts=[];
		for (var d=0;d<NCOL;d++) if (d!=c && S(d,'stance')!=STANCE.UNKNOWN && S(d,'stance')!=STANCE.ANNEXED && S(d,'feud')==0 && !hasFlag(d,FLAG.ALLIED)) opts.push(d);
		if (!opts.length){note('There is nobody else known to turn them against.');return;}
		if (!pay({'influence':1,'food':60})) return;
		settle(c,120);
		var d=opts[Math.floor(Math.random()*opts.length)];
		if (Math.random()<0.7+S(c,'intel')/300)
		{
			setS(c,'feud',6);setS(c,'feudwith',d+1);setS(d,'feud',6);setS(d,'feudwith',c+1);
			say('good','Whispers and a few "lost" cattle have set the <b>'+info.name+'</b> against the <b>'+colInfo(d).name+'</b>. They will bleed each other for years.',ic('incite'));
		}
		else
		{
			addS(c,'relation',-25,0,200);
			say('bad','The <b>'+info.name+'</b> found out who was stirring up their neighbours.',ic('incite'));
		}
		refresh();
	}
	var upgradeRoute=function(c)
	{
		var info=colInfo(c),lvl=S(c,'route');
		if (!needTech('trade routes')) return;
		if (S(c,'stance')!=STANCE.PACT){note('You need a trade pact first.');return;}
		if (lvl>=3){note('That route cannot be improved any further.');return;}
		if (!pay({'basic building materials':60*(lvl+1),'food':40*(lvl+1)})) return;
		setS(c,'route',lvl+1);
		say('good','The road to the <b>'+info.name+'</b> has been improved. Caravans will be '+Math.round(35*(lvl+1))+'% larger than on a bare track, and will carry some [salt].',ic('caravan'));
		refresh();
	}
	var annexColony=function(c)
	{
		var info=colInfo(c);
		if (!needTech('municipal government','to annex')) return;
		if (S(c,'stance')!=STANCE.TRIBUTE){note('Only tributary colonies can be annexed.');return;}
		if (S(c,'strength')>=attackPower()*0.5){note('The '+info.name+' are still too strong for you to annex (they must be under half your attack power).');return;}
		var t=freeTownSlot();
		if (t<0){note('You cannot govern any more towns.');return;}
		if (!pay({'influence':1,'food':100})) return;
		setS(c,'stance',STANCE.ANNEXED);setS(c,'flags',0);setS(c,'route',0);
		var spec=info.arch.spec;
		if (spec==4 && !hasTech('writing')) spec=0;
		if (spec==5 && !hasTech('warbands')) spec=0;
		foundTown(t,info.x,info.y,{level:2,pop:Math.round(20+S(c,'strength')*0.3),spec:spec,src:c+1,name:info.name});
		say('important tall','The <b>'+info.name+'</b> have been brought under your rule as a town.',ic('annex'));
		refresh();
	}

	//raids on the player
	var raid=function(c)
	{
		var info=colInfo(c);
		var force=S(c,'strength')*(0.25+Math.random()*0.3);
		var targets=[];
		for (var t=0;t<NTOWN;t++) if (TT(t,'level')>0) targets.push(t);
		if (targets.length && Math.random()<targets.length/(targets.length+2))
		{
			raidTown(c,targets[Math.floor(Math.random()*targets.length)],force);
			return;
		}
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
			for (var i=0;i<pil.length;i++) G.lose(pil[i],G.getRes(pil[i]).amount*(0.03+0.15*sev),'raid');
			G.lose('happiness',pop*20*sev,'war');
			addS(c,'wealth',20*sev+5,0,800);
			say('bad important','Raiders from the <b>'+info.name+'</b> sacked your settlement! '+dead+' of your people were killed or wounded, and supplies were stolen.',[5,9]);
		}
		refresh();
	}

	/*=====================================================================================
	PART 7 : TOWNS AND CITIES
	=======================================================================================*/
	var BLD=[
		{id:'granary',name:'Granary',icon:'granary',req:'stockpiling',cost:{'archaic building materials':60,'basic building materials':20},desc:'+25% population capacity and famine proof for a year at a time.'},
		{id:'market',name:'Market',icon:'market',req:'bartering',cost:{'basic building materials':80},desc:'Taxes and trade bring in 50% more goods. Every market also improves your barter rates by 1% (up to 3%).'},
		{id:'workshop',name:'Workshop',icon:'workshop',req:'tool-making',cost:{'archaic building materials':60,'basic building materials':30},desc:'+30% to whatever the town produces.'},
		{id:'temple',name:'Temple',icon:'temple',req:'ritualism',cost:{'archaic building materials':80,'basic building materials':40},desc:'+15 happiness, and produces a little [culture].'},
		{id:'walls',name:'Walls',icon:'walls',req:'building',cost:{'basic building materials':120},desc:'More than doubles the town\'s defense against raiders.'},
		{id:'barracks',name:'Barracks',icon:'barracks',req:'warbands',cost:{'basic building materials':80,'stone weapons':10},desc:'A standing garrison: adds to the town\'s defense and to your realm\'s defense.'},
		{id:'library',name:'Library',icon:'library',req:'libraries',cost:{'basic building materials':100,'archaic building materials':50},desc:'Produces [insight] every year, more in bigger towns. +3 happiness.'},
		{id:'harbor',name:'Harbor',icon:'harbor',req:'boat building',cost:{'basic building materials':100},desc:'Coastal towns only. Produces [seafood] and boosts trade.'}
	];
	var SPEC=[
		{id:0,name:'Farming',icon:'granary',req:null,desc:'Produces [fruit].'},
		{id:1,name:'Forestry',icon:'forest',req:null,desc:'Produces [log]s and [stick]s.'},
		{id:2,name:'Quarrying',icon:'ore',req:null,desc:'Produces [stone]s, and [cut stone]s and [copper ore] with the right technology.'},
		{id:3,name:'Trade',icon:'coin',req:'bartering',desc:'Produces extra [hide]s and [salt] from trade.'},
		{id:4,name:'Scholarship',icon:'scribe',req:'writing',desc:'Produces [insight] and [culture].'},
		{id:5,name:'Garrison',icon:'sword',req:'warbands',desc:'Produces nothing, but drafts its people into a strong local defense and makes them content.'}
	];
	var LEVELS=['','Hamlet','Village','Town','City'];
	var LEVEL_ICON=['','hamlet','village','town','city'];
	var TAXES=['Low','Normal','High'];
	var UPG={
		1:{cost:{'basic building materials':120,'food':80}},
		2:{cost:{'basic building materials':350,'food':200}},
		3:{cost:{'basic building materials':900,'food':400},tech:'municipal government'}
	};
	var townName=function(t)
	{
		var src=TT(t,'src');
		if (src>0) return colInfo(src-1).name;
		return makeName(makeRng(hashStr('town'+t+String(G.cultureSeed||'default'))));
	}
	var freeTownSlot=function(){for (var t=0;t<NTOWN;t++) if (TT(t,'level')<1) return t;return -1;}
	var townCount=function(){var n=0;for (var t=0;t<NTOWN;t++) if (TT(t,'level')>0) n++;return n;}
	var foundCost=function(){var n=townCount();return {'food':120+60*n,'archaic building materials':80+40*n,'influence':1};}
	var canFoundHere=function(x,y)
	{
		if (!hasTech('town charters')) return 'You need the technology <b>town charters</b>.';
		if (freeTownSlot()<0) return 'You cannot govern more than '+NTOWN+' towns.';
		if (!isRev(x,y)) return 'You have not explored this tile.';
		var tt=terrAt(x,y);
		if (tt==TERR.SEA || tt==TERR.MOUNT) return 'Towns cannot be founded on the sea or on mountains.';
		var ci=colonyAtTile(x,y);
		for (var c=0;c<NCOL;c++){var i=colInfo(c);if (S(c,'stance')!=STANCE.ANNEXED && Math.hypot(i.x-x,i.y-y)<3) return 'Too close to the lands of the '+i.name+'.';}
		if (Math.hypot(x-CAPX,y-CAPY)<2.5) return 'Too close to your capital.';
		var near=Math.hypot(x-CAPX,y-CAPY)<=10;
		for (var t=0;t<NTOWN;t++)
		{
			if (TT(t,'level')<1) continue;
			var d=Math.hypot(x-TT(t,'x'),y-TT(t,'y'));
			if (d<3) return 'Too close to the town of '+townName(t)+'.';
			if (d<=10) near=true;
		}
		if (!near) return 'Too far from your lands. Found towns closer to your capital or to an existing town.';
		return '';
	}
	var defaultSpec=function(x,y)
	{
		var s=siteAt(x,y),tt=terrAt(x,y);
		if (s){
			if (s.type.id=='valley') return 0;
			if (s.type.id=='ore') return 2;
			if (s.type.id=='hunt') return 1;
			if (s.type.id=='grove') return hasTech('writing')?4:1;
		}
		if (tt==TERR.FOREST) return 1;
		if (tt==TERR.HILLS) return 2;
		return 0;
	}
	var foundTown=function(t,x,y,o)
	{
		o=o||{};
		var s=siteAt(x,y);
		setT(t,'level',o.level||1);setT(t,'x',x);setT(t,'y',y);
		setT(t,'pop',o.pop||12);setT(t,'happy',70);
		setT(t,'spec',typeof o.spec!=='undefined'?o.spec:defaultSpec(x,y));
		setT(t,'tax',1);setT(t,'blds',0);setT(t,'src',o.src||0);
		setT(t,'site',s?s.id+1:0);
		revealR(x,y,2);
		if (s && !siteFound(s.id)) discoverSite(s);
	}
	var townCap=function(t)
	{
		var L=Math.max(1,TT(t,'level'));
		var base=[30,80,180,400][L-1];
		var m=1+(TT(t,'blds')&1?0.25:0);
		var s=TT(t,'site')>0?world().sites[TT(t,'site')-1]:null;
		if (s && s.type.id=='valley') m*=1.2;
		return Math.round(base*m);
	}
	var townSlots=function(t){return TT(t,'level')+1;}
	var townBuildingCount=function(t){var n=0;for (var i=0;i<BLD.length;i++) if (TT(t,'blds')&(1<<i)) n++;return n;}
	var townMood=function(t){var h=TT(t,'happy');return h<25?0.3:0.6+0.4*Math.min(100,h)/100;}
	var townTarget=function(t)
	{
		var b=TT(t,'blds'),L=TT(t,'level');
		var x=62+(L-1);
		if (b&8) x+=15;
		if (b&2) x+=4;
		if (b&64) x+=3;
		if (TT(t,'spec')==5) x+=6;
		x+=[6,0,-12][TT(t,'tax')];
		if (TT(t,'pop')>townCap(t)*0.95) x-=10;
		for (var c=0;c<NCOL;c++) if (S(c,'stance')==STANCE.WAR){x-=4;break;}
		return x;
	}
	//what a town will give (or cost) in a year, so the tab can show it before it happens
	var townYield=function(t)
	{
		var pop=TT(t,'pop'),spec=TT(t,'spec'),b=TT(t,'blds'),L=TT(t,'level');
		var s=TT(t,'site')>0?world().sites[TT(t,'site')-1]:null;
		var m=townMood(t)*(b&4?1.3:1);
		var sid=s?s.type.id:'';
		var res={};
		var add=function(n,v){if (v>0) res[n]=(res[n]||0)+v;}
		if (spec==0) add('fruit',pop*0.7*m*(sid=='valley'?1.35:1));
		else if (spec==1){var k=m*(sid=='hunt'?1.35:1);add('log',pop*0.28*k);add('stick',pop*0.5*k);}
		else if (spec==2)
		{
			var k=m*(sid=='ore'?1.35:1);
			add('stone',pop*0.5*k);
			if (hasTech('masonry')) add('cut stone',pop*0.06*k);
			if (hasTech('prospecting')) add('copper ore',pop*0.05*k);
		}
		else if (spec==4){var k=m*(sid=='grove'?1.35:1);add('insight',pop*0.07*k);add('culture',pop*0.04*k);}
		var coin=pop*0.05*[0.4,1,1.8][TT(t,'tax')]*(b&2?1.5:1)*townMood(t);
		if (spec==3) coin+=pop*0.3*m;
		if (b&128 && coastal(TT(t,'x'),TT(t,'y'))){add('seafood',pop*0.3*m);coin+=pop*0.04*m;}
		if (b&64) add('insight',(1+pop*0.03)*(sid=='grove'?1.35:1)*townMood(t));
		if (b&8) add('culture',0.5+pop*0.02);
		if (spec==5 && hasTech('warbands')) add('stone weapons',pop*0.02);
		add('hide',coin*0.6);add('salt',coin*0.12);
		return {res:res,need:pop*0.25};
	}
	var fmt1=function(n){return n>=10?String(Math.round(n)):String(Math.round(n*10)/10);}
	var townYear=function()
	{
		for (var t=0;t<NTOWN;t++)
		{
			if (TT(t,'level')<1) continue;
			var name=townName(t),y=townYield(t),cap=townCap(t),pop=TT(t,'pop'),h=TT(t,'happy');
			var fed=G.getRes('food').amount>=y.need;
			if (fed || (TT(t,'blds')&1)) G.lose('food',Math.min(y.need,G.getRes('food').amount),'town');
			if (!fed && !(TT(t,'blds')&1))
			{
				h-=12;pop=Math.max(3,Math.round(pop*0.94));
				say('bad','Hunger in the town of <b>'+name+'</b>: there was not enough food to go around.',ic('town'));
			}
			else
			{
				for (var r in y.res) G.gain(r,y.res[r],'town');
				pop+=randomFloor(Math.max(0.3,pop*0.06*Math.max(0,1-pop/cap))*(h>=25?1:0));
			}
			if (pop>cap) pop=Math.max(cap,Math.round(pop*0.97));
			h+=Math.max(-4,Math.min(4,townTarget(t)-h));
			if (h<22)
			{
				pop=Math.max(3,Math.round(pop*0.97));
				if (h<12 && Math.random()<0.15)
				{
					setT(t,'level',0);
					say('bad important','The town of <b>'+name+'</b> has thrown off your rule!',ic('town'));
					continue;
				}
				else say('bad','Unrest in the town of <b>'+name+'</b>. Its people are unhappy and work half-heartedly.',ic('town'));
			}
			setT(t,'pop',pop);setT(t,'happy',Math.max(0,Math.min(100,h)));
		}
	}
	var townDefense=function(t)
	{
		var b=TT(t,'blds');
		return (TT(t,'pop')*0.06+TT(t,'level')*3)*(b&16?2.2:1)+(b&32?14:0)+(TT(t,'spec')==5?TT(t,'pop')*0.15:0)+defensePower()*0.25;
	}
	var raidTown=function(c,t,force)
	{
		var info=colInfo(c),name=townName(t);
		var def=townDefense(t)*(0.8+Math.random()*0.4);
		if (def>=force)
		{
			setS(c,'strength',S(c,'strength')*0.96);
			say('good','Raiders from the <b>'+info.name+'</b> were beaten back from the town of <b>'+name+'</b>.',ic('walls'));
		}
		else
		{
			var sev=Math.min(1,(force-def)/force);
			var pop=TT(t,'pop');
			var dead=Math.ceil(pop*(0.08+0.3*sev));
			pop-=dead;
			setT(t,'happy',Math.max(0,TT(t,'happy')-15));
			addS(c,'wealth',10*sev+3,0,800);
			if (pop<6 || (sev>0.85 && pop<12))
			{
				setT(t,'level',0);
				say('bad important','Raiders from the <b>'+info.name+'</b> burned the town of <b>'+name+'</b> to the ground.',ic('town'));
			}
			else
			{
				setT(t,'pop',pop);
				say('bad important','Raiders from the <b>'+info.name+'</b> sacked the town of <b>'+name+'</b>. '+dead+' of its people were killed or carried off.',ic('town'));
			}
		}
		refresh();
	}

	var foundHere=function(x,y)
	{
		var why=canFoundHere(x,y);
		if (why){note(why);return;}
		var cost=foundCost();
		if (!pay(cost)) return;
		var t=freeTownSlot();
		foundTown(t,x,y);
		say('important tall','You founded the town of <b>'+townName(t)+'</b>.',ic('town'));
		sel={kind:'town',t:t};
		refresh();
	}
	var buildIn=function(t,i)
	{
		var b=BLD[i];
		if (TT(t,'blds')&(1<<i)) return;
		if (b.req && !hasTech(b.req)){note('You need the technology <b>'+b.req+'</b>.');return;}
		if (townBuildingCount(t)>=townSlots(t)){note('This town has no free building slots. Upgrade it, or demolish something.');return;}
		if (b.id=='harbor' && !coastal(TT(t,'x'),TT(t,'y'))){note('A harbor needs a coastal town.');return;}
		if (!pay(b.cost)) return;
		setT(t,'blds',TT(t,'blds')|(1<<i));
		say('good','A '+b.name.toLowerCase()+' was built in the town of <b>'+townName(t)+'</b>.',ic(b.icon));
		refresh();
	}
	var demolishIn=function(t,i)
	{
		setT(t,'blds',TT(t,'blds')&~(1<<i));
		say('','The '+BLD[i].name.toLowerCase()+' in '+townName(t)+' was torn down.');
		refresh();
	}
	var setSpec=function(t,s)
	{
		var sp=SPEC[s];
		if (sp.req && !hasTech(sp.req)){note('You need the technology <b>'+sp.req+'</b>.');return;}
		setT(t,'spec',s);refresh();
	}
	var setTax=function(t,x){setT(t,'tax',x);refresh();}
	var upgradeTown=function(t)
	{
		var L=TT(t,'level'),u=UPG[L];
		if (!u){note('This is already as large as a settlement gets.');return;}
		if (u.tech && !hasTech(u.tech)){note('You need the technology <b>'+u.tech+'</b> to build a city.');return;}
		if (TT(t,'pop')<townCap(t)*0.8){note('The town needs to be nearly full ('+Math.round(townCap(t)*0.8)+' people) before it can grow.');return;}
		if (!pay(u.cost)) return;
		setT(t,'level',L+1);
		say('important','The '+LEVELS[L].toLowerCase()+' of <b>'+townName(t)+'</b> has grown into a '+LEVELS[L+1].toLowerCase()+'.',ic(LEVEL_ICON[L+1]));
		refresh();
	}
	var abandonTown=function(t)
	{
		var n=townName(t);
		for (var k=0;k<TKEYS.length;k++) setT(t,TKEYS[k],0);
		say('','You abandoned the town of '+n+'.');
		sel={kind:'none'};
		refresh();
	}

	/*=====================================================================================
	PART 8 : THE MAP - EXPEDITIONS AND SITES
	=======================================================================================*/
	var discoverSite=function(s)
	{
		markSite(s.id);
		var id=s.type.id;
		if (id=='ruins'){G.gain('insight',12,'ruins');G.gain('culture',6,'ruins');}
		else if (id=='valley'){G.gain('fruit',120,'valley');}
		else if (id=='ore'){G.gain('stone',80,'ore');if (hasTech('prospecting')) G.gain('copper ore',30,'ore');else G.gain('stick',30,'ore');}
		else if (id=='hunt'){G.gain('meat',60,'hunt');G.gain('bone',20,'hunt');G.gain('hide',10,'hunt');}
		else if (id=='grove'){G.gain('culture',10,'grove');G.gain('herb',40,'grove');}
		say('good tall','Your people found a <b>'+s.type.name.toLowerCase()+'</b>. '+s.type.desc,ic(s.type.icon));
	}
	var checkMeetings=function()
	{
		if (!hasTech('first contact')) return;
		for (var c=0;c<NCOL;c++)
		{
			var i=colInfo(c);
			if (S(c,'stance')==STANCE.UNKNOWN && isRev(i.x,i.y)) meet(c);
		}
	}
	var revealRadius=function(){return 2+(hasTech('cartography')?1:0);}
	var checkSites=function()
	{
		var w=world();
		for (var j=0;j<w.sites.length;j++){var s=w.sites[j];if (s.x>=0 && !siteFound(s.id) && isRev(s.x,s.y)) discoverSite(s);}
	}
	var expeditionCost=function(){return {'food':25};}
	var explore=function(x,y)
	{
		if (!hasTech('scouting')){note('You need the technology <b>scouting</b> to send expeditions.');return;}
		if (!inReach(x,y)){note('That is too far from the lands you know. Explore closer first (reach: '+reachR()+' tiles).');return;}
		if (!pay(expeditionCost())) return;
		var n=revealR(x,y,revealRadius());
		checkMeetings();checkSites();
		sel={kind:'tile',x:x,y:y};
		refresh();
	}
	//scouts quietly chart the edges of the known world
	var scoutYear=function()
	{
		var n=scoutCount();
		if (n<=0) return;
		var fr=[];
		for (var y=0;y<MH;y++) for (var x=0;x<MW;x++)
		{
			if (isRev(x,y)) continue;
			if (isRev(x+1,y)||isRev(x-1,y)||isRev(x,y+1)||isRev(x,y-1)) fr.push([x,y]);
		}
		var k=Math.min(fr.length,Math.min(8,Math.ceil(n/2)+(hasTech('cartography')?2:0)));
		for (var i=0;i<k;i++){var p=fr[Math.floor(Math.random()*fr.length)];revealR(p[0],p[1],1);}
		if (k>0){checkMeetings();checkSites();}
	}

	/*=====================================================================================
	PART 9 : TIME - HOOKS INTO THE ENGINE
	=======================================================================================*/
	var sel={kind:'none'};
	var view='overview';
	var colonyYear=function()
	{
		if (!G.on) return;
		var P=attackPower();
		var era=eraLevel();
		for (var c=0;c<NCOL;c++)
		{
			var info=colInfo(c);
			var stance=S(c,'stance');
			if (stance==STANCE.ANNEXED) continue;
			if (stance==STANCE.UNKNOWN)
			{
				if (hasTech('first contact'))
				{
					if (isRev(info.x,info.y)) meet(c);
					else if (Math.random()<0.1){revealR(info.x,info.y,2);meet(c);}
				}
				continue;
			}
			//colonies get better as the world around them advances
			var baseNow=Math.round(info.str*(1+0.06*era));
			setS(c,'base',baseNow);
			var str=S(c,'strength'),base=baseNow;
			str+=(Math.random()-0.42)*10-(str>base*1.6?3:0)+(str<base*0.6?2:0);
			setS(c,'strength',Math.max(10,Math.min(400+era*30,str)));
			addS(c,'wealth',3+Math.random()*6+era*0.5-(stance==STANCE.WAR?6:0),5,800);
			var target=(stance==STANCE.PACT?130:100);
			var rel=S(c,'relation');
			if (hasFlag(c,FLAG.MARRIED)) target=Math.max(target,150);
			if (stance!=STANCE.WAR && stance!=STANCE.TRIBUTE) setS(c,'relation',rel+Math.max(-2,Math.min(2,target-rel)));
			rel=S(c,'relation');
			addS(c,'intel',stance==STANCE.PACT?-1:-3,0,100);

			//feuds between colonies wear both down
			if (S(c,'feud')>0)
			{
				setS(c,'strength',S(c,'strength')*0.93);setS(c,'wealth',S(c,'wealth')*0.95);
				addS(c,'feud',-1,0,99);
				if (S(c,'feud')==0) setS(c,'feudwith',0);
			}

			//small events
			if (Math.random()<0.05)
			{
				var ev=Math.random();
				if (ev<0.3){addS(c,'wealth',18,0,800);say('','Good harvests in the lands of the <b>'+info.name+'</b>.',ic('map'));}
				else if (ev<0.55){addS(c,'wealth',-14,0,800);setS(c,'strength',S(c,'strength')*0.95);say('','Hard times for the <b>'+info.name+'</b>: famine in their fields.',ic('map'));}
				else if (ev<0.75){setS(c,'strength',S(c,'strength')*0.92);say('','A sickness is spreading through the <b>'+info.name+'</b>.',ic('map'));}
				else {addS(c,'relation',8,0,200);say('good','The <b>'+info.name+'</b> held a great festival and invited your people.',ic('culture'));}
			}

			if (stance==STANCE.NEUTRAL)
			{
				var safe=hasFlag(c,FLAG.MARRIED);
				if (!safe && info.aggr>0.4 && P<S(c,'strength')*0.6 && Math.random()<info.aggr*0.3)
				{
					setS(c,'stance',STANCE.WAR);setS(c,'relation',20);
					say('bad important','The <b>'+info.name+'</b> have declared war on you! They think you are weak.',[5,9]);
				}
				else if (!safe && Math.random()<info.aggr*0.15)
				{
					addS(c,'relation',-12,0,200);
					say('bad','A border incident with the <b>'+info.name+'</b> has soured relations.',[24,7]);
				}
			}
			else if (stance==STANCE.PACT)
			{
				var mult=(1+0.35*S(c,'route'))*(hasFlag(c,FLAG.MARRIED)?1.25:1);
				var n=Math.round((10+S(c,'wealth')*0.15)*mult);
				var tl=tradeList(c);
				G.gain(tl[0].get,n,'trade');
				G.gain(tl[1].get,n,'trade');
				var txt=B(n)+' ['+tl[0].get+'] and '+B(n)+' ['+tl[1].get+']';
				if (tl[2]){var n3=Math.round(n*0.5);G.gain(tl[2].get,n3,'trade');txt+=' and '+B(n3)+' ['+tl[2].get+']';}
				if (S(c,'route')>0){var cn=Math.round(S(c,'route')*(4+S(c,'wealth')/25));G.gain('salt',cn,'trade');txt+=', and '+cn+' [salt]';}
				addS(c,'relation',2,0,200);
				say('good','A caravan from the <b>'+info.name+'</b> arrived with '+txt+'.',ic('caravan'));
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
				var n=Math.round(15+S(c,'wealth')*0.2);
				G.gain(info.offers[0],n,'tribute');
				G.gain(info.offers[1],n,'tribute');
				if (G.getRes('influence').amount<G.getRes('authority').amount) G.gain('influence',1,'tribute');
				say('good','The <b>'+info.name+'</b> sent tribute: '+B(n)+' ['+info.offers[0]+'] and '+B(n)+' ['+info.offers[1]+'].',[5,9]);
				if (S(c,'strength')>P*0.9 && Math.random()<0.1)
				{
					setS(c,'stance',STANCE.WAR);setS(c,'relation',10);
					say('bad important','The <b>'+info.name+'</b> have thrown off your rule and declared war!',[5,9]);
				}
			}
		}
		scoutYear();
		townYear();
		refresh();
	}

	var colonyDay=function()
	{
		if (!G.on) return;
		var cd=G.getRawRes('warband cooldown');
		if (cd.amount>0) cd.amount=Math.max(0,cd.amount-1);
		for (var c=0;c<NCOL;c++)
		{
			if (S(c,'cool')>0) addS(c,'cool',-1,0,9999);
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
		G.tabs.splice(at,0,{name:'Colonies',id:'colonies',update:'colonies',desc:'Meet neighbouring colonies, explore the realm map, found and manage towns, trade, make pacts or go to war.'});
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
		var o=origins[Math.floor(Math.random()*origins.length)];
		if (G.techByName[o])
		{
			G.gainTech(G.techByName[o]);
			G.Message({type:'important',text:'Your people come from the <b>'+G.techByName[o].displayName.replace(' origin','')+'</b> lands: '+G.techByName[o].desc.split('<>')[0].replace('@',''),icon:G.techByName[o].icon});
		}
		initRealm();
		sel={kind:'none'};view='overview';
		ensureTab();
	}
	var oldLoaded=G.funcs['game loaded'];
	G.funcs['game loaded']=function()
	{
		if (oldLoaded) oldLoaded.apply(this,arguments);
		colCache.seed=null;worldCache.seed=null;
		if (gv('realm version')!=3) initRealm();
		sel={kind:'none'};view='overview';
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
	PART 10 : THE COLONIES TAB
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
	var wealthWord=function(w){return w<30?'poor':w<70?'modest':w<120?'prosperous':'rich';}
	var bar=function(pct,col,w)
	{
		pct=Math.max(0,Math.min(100,pct));
		return '<span style="display:inline-block;width:'+(w||100)+'px;height:6px;background:#222;vertical-align:middle;"><span style="display:block;width:'+pct+'%;height:6px;background:'+col+';"></span></span>';
	}
	var btn=function(text,tip,fn,cls)
	{
		return G.button({text:text,classes:cls||'',tooltip:tip||'',onclick:fn});
	}
	var small=function(text,tip,fn){return G.button({text:text,classes:'frameless',style:'display:block;font-size:12px;',tooltip:tip||'',onclick:fn});}
	var colonyGroup=function(title,body){return body?'<div style="font-size:11px;opacity:0.6;margin-top:4px;">'+title+'</div>'+body:'';}

	var colonyCard=function(c,wide)
	{
		var info=colInfo(c),stance=S(c,'stance'),rel=S(c,'relation'),intel=S(c,'intel'),P=attackPower();
		var fl=[];
		if (hasFlag(c,FLAG.MARRIED)) fl.push('married into your family');
		if (hasFlag(c,FLAG.ALLIED)) fl.push('military ally');
		if (S(c,'route')>0) fl.push('trade route level '+S(c,'route'));
		if (S(c,'feud')>0 && S(c,'feudwith')>0) fl.push('feuding with the '+colInfo(S(c,'feudwith')-1).name);
		var str='<div class="block framed bgMid" style="display:inline-block;vertical-align:top;width:'+(wide?'96%':'340px')+';margin:4px;padding:6px;">'+
			'<div class="fancyText" style="font-size:18px;">The '+info.name+' <span style="font-size:12px;color:'+STANCE_COLORS[stance]+';">['+STANCE_NAMES[stance]+']</span></div>'+
			'<div style="font-size:12px;opacity:0.8;">'+info.arch.tag+' - '+info.arch.desc+'</div>'+
			(fl.length?'<div style="font-size:12px;color:#fc6;">'+fl.join(', ')+'</div>':'')+
			'<div class="divider"></div>'+
			'<div>Attitude: <b>'+relWord(rel)+'</b> '+bar(rel/2,rel<70?'#e54':rel<115?'#ccc':'#6c6')+'</div>'+
			'<div>Military: <b>'+powerWord(S(c,'strength'),P)+'</b>'+(intel>=60?' <span style="opacity:0.7">('+Math.round(S(c,'strength'))+')</span>':'')+'</div>'+
			(intel>=30?'<div>Wealth: <b>'+wealthWord(S(c,'wealth'))+'</b>'+(intel>=60?' <span style="opacity:0.7">('+Math.round(S(c,'wealth'))+')</span>':'')+'</div>':'')+
			(intel>=60?'<div>Temperament: <b>'+(info.aggr>0.55?'warlike':info.aggr>0.3?'wary':'peaceful')+'</b></div>':'')+
			'<div style="font-size:12px;opacity:0.7;">Knowledge of them: '+bar(intel,'#6af',60)+'</div>';
		var tl=tradeList(c);
		var off=[],wan=[];
		for (var k=0;k<tl.length;k++){off.push('['+tl[k].get+']');wan.push('['+tl[k].give+']');}
		str+=G.parse('<div>Offers: '+off.join(', ')+'</div><div>Wants: '+wan.join(', ')+'</div>')+'<div class="divider"></div>';
		if (stance==STANCE.ANNEXED)
		{
			str+='<div>This people now live in your lands as a town.</div></div>';
			return str;
		}
		if (stance!=STANCE.WAR)
		{
			var f=barterRate(rel);
			var tr='';
			for (var k=0;k<tl.length;k++)
			{
				for (var q=0;q<2;q++)
				{
					var qty=q==0?10:50;
					var out=Math.floor(qty*val(tl[k].give)*f/val(tl[k].get));
					tr+=small('Barter '+qty+' '+tl[k].give+' for '+out+' '+tl[k].get,'Give '+qty+' '+tl[k].give+' and receive about '+out+' '+tl[k].get+'. Trading improves relations.',function(c,k,qty){return function(){barter(c,k,qty);};}(c,k,qty));
				}
			}
			str+=tr+btn('Send a gift (30 food)','Improve their attitude.',function(c){return function(){gift(c);};}(c));
		}
		var dip='',trade='',intr='',war='';
		if (stance!=STANCE.WAR && stance!=STANCE.TRIBUTE)
		{
			if (hasTech('diplomacy'))
			{
				dip+=btn('Send envoy','Costs 1 influence. +15 attitude and you learn more about them.',function(c){return function(){sendEnvoy(c);};}(c));
				dip+=btn('Cultural exchange','Costs 20 food. Gives some culture and a little attitude.',function(c){return function(){culturalExchange(c);};}(c));
			}
			if (hasTech('writing'))
			{
				dip+=btn('Exchange scholars','Costs 30 food. Gives insight; more with libraries and archives.',function(c){return function(){exchangeScholars(c);};}(c));
				dip+=btn('Exchange maps','Costs 25 food. Needs a friendly attitude. Charts the land around them and reveals their neighbours.',function(c){return function(){swapMaps(c);};}(c));
			}
			if (hasTech('diplomacy') && stance==STANCE.PACT)
			{
				if (!hasFlag(c,FLAG.MARRIED)) dip+=btn('Marriage alliance','Costs 2 influence and 50 food. They will never declare war on you and their caravans grow 25%.',function(c){return function(){marry(c);};}(c));
				if (hasTech('warbands'))
				{
					if (!hasFlag(c,FLAG.ALLIED)) dip+=btn('Military alliance','Costs 2 influence. Needs a devoted attitude. Their warriors add to your defense and attack.',function(c){return function(){makeAlliance(c);};}(c));
					else dip+=btn('Dissolve alliance','Costs some attitude.',function(c){return function(){breakAlliance(c);};}(c));
				}
			}
		}
		if (stance==STANCE.NEUTRAL)
		{
			trade+=btn('Propose trade pact','Costs 1 influence. Needs a friendly attitude and the bartering tech. Brings a caravan every year.',function(c){return function(){proposePact(c);};}(c));
			war+=btn('Demand tribute','Needs warriors. If you are at least 1.5 times as strong as them they will pay tribute every year; otherwise it is war.',function(c){return function(){demandTribute(c);};}(c));
			war+=btn('Declare war','Attack this colony.',function(c){return function(){declareWar(c);};}(c));
		}
		else if (stance==STANCE.PACT)
		{
			if (hasTech('trade routes') && S(c,'route')<3) trade+=btn('Improve trade route','Cost: '+cstr({'basic building materials':60*(S(c,'route')+1),'food':40*(S(c,'route')+1)})+'. Bigger caravans, and caravans start carrying salt.',function(c){return function(){upgradeRoute(c);};}(c));
			trade+=btn('Request aid','They send you goods; costs attitude and they need time to recover.',function(c){return function(){requestAid(c);};}(c));
			trade+=btn('End pact','Return to neutral relations, at a cost in attitude.',function(c){return function(){endPact(c);};}(c));
			war+=btn('Declare war','Betray your partner.',function(c){return function(){declareWar(c);};}(c));
		}
		else if (stance==STANCE.WAR)
		{
			war+=btn('Send warband','Attack with all your armed warriors. Needs at least 5. Win and you get loot and weaken them; lose and you suffer heavy casualties. Has a cooldown.',function(c){return function(){attack(c);};}(c));
			war+=btn('Sue for peace (50 food)','Offer food in exchange for peace. More likely to work if they are friendly or weakened.',function(c){return function(){suePeace(c);};}(c));
		}
		else if (stance==STANCE.TRIBUTE)
		{
			war+=btn('Release from tribute','Stop demanding tribute and return to neutral relations.',function(c){return function(){release(c);};}(c));
			if (hasTech('municipal government')) war+=btn('Annex as a town','Costs 1 influence and 100 food. Needs a free town slot and the colony to be under half your attack power.',function(c){return function(){annexColony(c);};}(c));
		}
		if (hasTech('espionage') && stance!=STANCE.ANNEXED)
		{
			intr+=btn('Spy','Costs 40 food. Reveals exact numbers on success; a failure makes them angry.',function(c){return function(){spyOn(c);};}(c));
			intr+=btn('Sabotage','Costs 60 food and 1 influence. Needs some knowledge of them. Weakens them if it works; a failure may start a war.',function(c){return function(){sabotage(c);};}(c));
			intr+=btn('Incite a feud','Costs 60 food and 1 influence. Sets them against another known colony; both lose strength every year for a while.',function(c){return function(){incite(c);};}(c));
		}
		str+=colonyGroup('Diplomacy',dip)+colonyGroup('Trade',trade)+colonyGroup('Intrigue',intr)+colonyGroup('Force',war);
		if (S(c,'cool')>0) str+='<div style="font-size:11px;opacity:0.6;margin-top:4px;">Delegations again in '+Math.ceil(S(c,'cool'))+' days.</div>';
		if (!hasTech('diplomacy')) str+='<div style="font-size:11px;opacity:0.6;margin-top:4px;">Research <b>diplomacy</b> for envoys, exchanges and alliances.</div>';
		return str+'</div>';
	}

	var townCard=function(t,wide)
	{
		var L=TT(t,'level'),pop=TT(t,'pop'),cap=townCap(t),h=TT(t,'happy'),spec=TT(t,'spec'),b=TT(t,'blds');
		var s=TT(t,'site')>0?world().sites[TT(t,'site')-1]:null;
		var y=townYield(t);
		var ys=[];
		for (var r in y.res) ys.push('+'+fmt1(y.res[r])+' ['+r+']');
		var str='<div class="block framed bgMid" style="display:inline-block;vertical-align:top;width:'+(wide?'96%':'340px')+';margin:4px;padding:6px;">'+
			'<div class="fancyText" style="font-size:18px;">'+LEVELS[L]+' of '+townName(t)+'</div>'+
			'<div style="font-size:12px;opacity:0.8;">'+(TT(t,'src')>0?'Once an independent people. ':'')+(s?'Founded at a '+s.type.name.toLowerCase()+'. ':'')+TERR_NAMES[terrAt(TT(t,'x'),TT(t,'y'))]+(coastal(TT(t,'x'),TT(t,'y'))?', coastal':'')+'</div>'+
			'<div class="divider"></div>'+
			'<div>People: <b>'+Math.round(pop)+'</b> / '+cap+' '+bar(pop/cap*100,'#6af')+'</div>'+
			'<div>Happiness: <b>'+Math.round(h)+'</b> '+bar(h,h<30?'#e54':h<60?'#ec4':'#6c6')+(h<25?' <span style="color:#e54">unrest</span>':'')+'</div>'+
			G.parse('<div style="font-size:12px;">Each year: '+ys.join(', ')+'; eats '+fmt1(y.need)+' [food].</div>');
		var sp='';
		for (var i=0;i<SPEC.length;i++)
		{
			var S_=SPEC[i],can=!S_.req||hasTech(S_.req);
			sp+=G.button({text:S_.name,classes:'frameless',style:'display:inline-block;font-size:12px;'+(spec==i?'box-shadow:0 0 3px 1px #cb9;':'')+(can?'':'opacity:0.4;'),tooltip:S_.desc+(can?'':'<br>Needs the technology '+S_.req+'.'),onclick:function(t,i){return function(){setSpec(t,i);};}(t,i)});
		}
		str+='<div style="font-size:11px;opacity:0.6;margin-top:4px;">Specialization</div>'+sp;
		var tx='';
		for (var i=0;i<3;i++)
			tx+=G.button({text:TAXES[i],classes:'frameless',style:'display:inline-block;font-size:12px;'+(TT(t,'tax')==i?'box-shadow:0 0 3px 1px #cb9;':''),tooltip:['Low taxes: few taxes, and the people are happier.','Normal taxes.','High taxes: many more taxes, but the people grow bitter.'][i],onclick:function(t,i){return function(){setTax(t,i);};}(t,i)});
		str+='<div style="font-size:11px;opacity:0.6;margin-top:4px;">Taxes</div>'+tx;
		var bl='';
		for (var i=0;i<BLD.length;i++)
		{
			var B_=BLD[i],built=(b&(1<<i))!=0,can=!B_.req||hasTech(B_.req);
			if (!built && !can) continue;
			bl+=G.button({
				text:(built?'* ':'')+B_.name,classes:'frameless',
				style:'display:inline-block;font-size:12px;'+(built?'box-shadow:0 0 3px 1px #6c6;':''),
				tooltip:'<b>'+B_.name+'</b><br>'+G.parse(B_.desc)+'<br>'+(built?'Built. Click to demolish.':'Cost: '+cstr(B_.cost)),
				onclick:function(t,i,built){return function(){if (built) demolishIn(t,i); else buildIn(t,i);};}(t,i,built)
			});
		}
		str+='<div style="font-size:11px;opacity:0.6;margin-top:4px;">Buildings ('+townBuildingCount(t)+' / '+townSlots(t)+' slots)</div>'+(bl||'<div style="font-size:12px;opacity:0.6;">Nothing to build yet.</div>');
		var u=UPG[L];
		str+='<div class="divider"></div>';
		if (u) str+=btn('Grow into a '+LEVELS[L+1].toLowerCase(),'Needs '+Math.round(cap*0.8)+' people. Cost: '+cstr(u.cost)+(u.tech?'. Needs the technology '+u.tech:''),function(t){return function(){upgradeTown(t);};}(t));
		str+=btn('Show on map','Select this town on the realm map.',function(t){return function(){sel={kind:'town',t:t};view='map';refresh();};}(t));
		str+=btn('Abandon','Give this town up for good.',function(t){return function(){abandonTown(t);};}(t),'frameless');
		return str+'</div>';
	}

	/*-------- the map --------*/
	var markerSvg=function(name,x,y,size)
	{
		if (!SHEET) return '<circle cx="'+(x+size/2)+'" cy="'+(y+size/2)+'" r="'+(size/2-1)+'" fill="#fc6" stroke="#000"/>';
		return '<svg x="'+x+'" y="'+y+'" width="'+size+'" height="'+size+'" viewBox="'+(IC[name][0]*24)+' '+(IC[name][1]*24)+' 24 24"><use href="#colsheet"/></svg>';
	}
	var drawMap=function()
	{
		var TS=20,w=world(),out=[];
		out.push('<svg id="colMap" viewBox="0 0 '+(MW*TS)+' '+(MH*TS)+'" style="width:100%;height:auto;display:block;cursor:pointer;background:#14110d;" xmlns="http://www.w3.org/2000/svg">');
		if (SHEET) out.push('<defs><image id="colsheet" width="384" height="96" href="'+SHEET+'" style="image-rendering:pixelated"/></defs>');
		var rv=[];
		for (var i=0;i<MW*MH;i++) rv.push(false);
		for (var y=0;y<MH;y++) for (var x=0;x<MW;x++) rv[y*MW+x]=isRev(x,y);
		//tiles within expedition reach
		var reach=[],R=reachR();
		if (hasTech('scouting'))
		{
			for (var y=0;y<MH;y++) for (var x=0;x<MW;x++)
			{
				if (!rv[y*MW+x]) continue;
				for (var yy=Math.max(0,y-R);yy<=Math.min(MH-1,y+R);yy++) for (var xx=Math.max(0,x-R);xx<=Math.min(MW-1,x+R);xx++)
					if (!rv[yy*MW+xx] && Math.hypot(xx-x,yy-y)<=R) reach[yy*MW+xx]=true;
			}
		}
		for (var y=0;y<MH;y++)
		{
			for (var x=0;x<MW;x++)
			{
				var i=y*MW+x;
				if (!rv[i])
				{
					if (reach[i]) out.push('<rect x="'+(x*TS)+'" y="'+(y*TS)+'" width="'+TS+'" height="'+TS+'" fill="#2b241a" stroke="#14110d" stroke-width="0.5"/>');
					continue;
				}
				var tt=w.terr[i];
				var shade=0.86+0.14*(hashStr(x+'/'+y)%100)/100;
				out.push('<rect x="'+(x*TS)+'" y="'+(y*TS)+'" width="'+TS+'" height="'+TS+'" fill="'+TERR_COLORS[tt]+'" fill-opacity="'+shade.toFixed(2)+'"/>');
				var px=x*TS,py=y*TS;
				if (tt==TERR.MOUNT) out.push('<path d="M'+(px+3)+','+(py+17)+' L'+(px+10)+','+(py+4)+' L'+(px+17)+','+(py+17)+'Z" fill="#a8a8b4" stroke="#55555e" stroke-width="1"/>');
				else if (tt==TERR.HILLS) out.push('<path d="M'+(px+3)+','+(py+15)+' Q'+(px+10)+','+(py+4)+' '+(px+17)+','+(py+15)+'Z" fill="#a9a468" stroke="#6b6738" stroke-width="1"/>');
				else if (tt==TERR.FOREST) out.push('<circle cx="'+(px+6)+'" cy="'+(py+12)+'" r="4" fill="#2d5f31"/><circle cx="'+(px+13)+'" cy="'+(py+8)+'" r="4.5" fill="#2d5f31"/>');
				else if (tt==TERR.MARSH) out.push('<path d="M'+(px+4)+','+(py+12)+' h5 M'+(px+10)+','+(py+8)+' h6 M'+(px+6)+','+(py+16)+' h6" stroke="#8fb08a" stroke-width="1.5"/>');
				else if (tt==TERR.DESERT) out.push('<circle cx="'+(px+6)+'" cy="'+(py+7)+'" r="1" fill="#a68f4a"/><circle cx="'+(px+14)+'" cy="'+(py+13)+'" r="1" fill="#a68f4a"/>');
				else if (tt==TERR.SEA && (x+y)%3==0) out.push('<path d="M'+(px+3)+','+(py+10)+' q3,-3 6,0 t6,0" stroke="#4a76a3" fill="none" stroke-width="1"/>');
			}
		}
		//territory
		var colr=function(col,r,cx,cy,op){return '<circle cx="'+((cx+0.5)*TS)+'" cy="'+((cy+0.5)*TS)+'" r="'+(r*TS)+'" fill="'+col+'" fill-opacity="0.13" stroke="'+col+'" stroke-opacity="'+(op||0.55)+'" stroke-width="1.5" stroke-dasharray="4 3"/>';}
		out.push(colr('#5cd6e8',3,CAPX,CAPY));
		for (var t=0;t<NTOWN;t++) if (TT(t,'level')>0) out.push(colr('#7cf07c',1.4+TT(t,'level')*0.4,TT(t,'x'),TT(t,'y')));
		for (var c=0;c<NCOL;c++)
		{
			var info=colInfo(c),st=S(c,'stance');
			if (st==STANCE.UNKNOWN || st==STANCE.ANNEXED) continue;
			out.push(colr(STANCE_COLORS[st],1.4+Math.min(250,S(c,'strength'))/160,info.x,info.y,0.7));
		}
		//roads and fronts
		var ln=function(x1,y1,x2,y2,col,wd,dash)
		{
			var mx=(x1+x2)/2+(y2-y1)*0.08,my=(y1+y2)/2-(x2-x1)*0.08;
			return '<path d="M'+((x1+0.5)*TS)+','+((y1+0.5)*TS)+' Q'+((mx+0.5)*TS)+','+((my+0.5)*TS)+' '+((x2+0.5)*TS)+','+((y2+0.5)*TS)+'" fill="none" stroke="'+col+'" stroke-width="'+wd+'"'+(dash?' stroke-dasharray="'+dash+'"':'')+' stroke-linecap="round" stroke-opacity="0.9"/>';
		};
		for (var t=0;t<NTOWN;t++) if (TT(t,'level')>0) out.push(ln(CAPX,CAPY,TT(t,'x'),TT(t,'y'),'#e8d49a',1.5,'2 4'));
		for (var c=0;c<NCOL;c++)
		{
			var info=colInfo(c),st=S(c,'stance');
			if (st==STANCE.PACT) out.push(ln(CAPX,CAPY,info.x,info.y,'#e8c46a',2+S(c,'route'),S(c,'route')>0?'':'5 4'));
			else if (st==STANCE.WAR) out.push(ln(CAPX,CAPY,info.x,info.y,'#e55',1.5,'3 5'));
			else if (st==STANCE.TRIBUTE) out.push(ln(CAPX,CAPY,info.x,info.y,'#ec4',1.5,'1 5'));
			if (S(c,'feud')>0 && S(c,'feudwith')>0 && S(c,'feudwith')-1>c)
			{
				var o=colInfo(S(c,'feudwith')-1);
				if (isRev(info.x,info.y) && isRev(o.x,o.y)) out.push(ln(info.x,info.y,o.x,o.y,'#f84',1.5,'2 3'));
			}
		}
		//sites
		for (var j=0;j<w.sites.length;j++)
		{
			var s=w.sites[j];
			if (s.x<0 || !rv[s.y*MW+s.x]) continue;
			var skip=(townAtTile(s.x,s.y)>=0);
			if (skip) continue;
			out.push('<g opacity="'+(siteFound(s.id)?'0.85':'1')+'">'+markerSvg(s.type.icon,s.x*TS+1,s.y*TS+1,18)+'</g>');
		}
		//capital
		out.push(markerSvg('city',CAPX*TS-2,CAPY*TS-2,24));
		out.push('<text x="'+((CAPX+0.5)*TS)+'" y="'+((CAPY+1.9)*TS)+'" text-anchor="middle" font-size="9" fill="#fff" stroke="#000" stroke-width="2.4" paint-order="stroke">Capital</text>');
		//towns
		for (var t=0;t<NTOWN;t++)
		{
			if (TT(t,'level')<1) continue;
			var x=TT(t,'x'),y=TT(t,'y');
			out.push(markerSvg(LEVEL_ICON[TT(t,'level')],x*TS-1,y*TS-1,22));
			out.push('<text x="'+((x+0.5)*TS)+'" y="'+((y+1.8)*TS)+'" text-anchor="middle" font-size="9" fill="#bfffbf" stroke="#000" stroke-width="2.4" paint-order="stroke">'+townName(t)+'</text>');
		}
		//colonies
		for (var c=0;c<NCOL;c++)
		{
			var info=colInfo(c),st=S(c,'stance');
			if (st==STANCE.ANNEXED || !rv[info.y*MW+info.x]) continue;
			if (st==STANCE.UNKNOWN)
			{
				out.push('<circle cx="'+((info.x+0.5)*TS)+'" cy="'+((info.y+0.5)*TS)+'" r="8" fill="#222" stroke="#999" stroke-width="1.5"/><text x="'+((info.x+0.5)*TS)+'" y="'+((info.y+0.5)*TS+4)+'" text-anchor="middle" font-size="12" fill="#ddd">?</text>');
			}
			else
			{
				out.push('<circle cx="'+((info.x+0.5)*TS)+'" cy="'+((info.y+0.5)*TS)+'" r="11" fill="#1a1a1a" fill-opacity="0.65" stroke="'+STANCE_COLORS[st]+'" stroke-width="2"/>');
				out.push(markerSvg('tower',info.x*TS+1,info.y*TS+1,18));
				out.push('<text x="'+((info.x+0.5)*TS)+'" y="'+((info.y+1.9)*TS)+'" text-anchor="middle" font-size="9" fill="'+STANCE_COLORS[st]+'" stroke="#000" stroke-width="2.4" paint-order="stroke">'+info.name+'</text>');
			}
		}
		//selection
		if (sel.kind=='tile') out.push('<rect x="'+(sel.x*TS)+'" y="'+(sel.y*TS)+'" width="'+TS+'" height="'+TS+'" fill="none" stroke="#fff" stroke-width="2"/>');
		else if (sel.kind=='town'){out.push('<rect x="'+(TT(sel.t,'x')*TS)+'" y="'+(TT(sel.t,'y')*TS)+'" width="'+TS+'" height="'+TS+'" fill="none" stroke="#fff" stroke-width="2"/>');}
		else if (sel.kind=='colony'){var ii=colInfo(sel.c);out.push('<rect x="'+(ii.x*TS)+'" y="'+(ii.y*TS)+'" width="'+TS+'" height="'+TS+'" fill="none" stroke="#fff" stroke-width="2"/>');}
		out.push('</svg>');
		return out.join('');
	}
	var selectTile=function(x,y)
	{
		if (x<0||y<0||x>=MW||y>=MH) return;
		if (x==CAPX && y==CAPY){sel={kind:'capital'};}
		else
		{
			var t=townAtTile(x,y);
			var c=colonyAtTile(x,y);
			if (t>=0) sel={kind:'town',t:t};
			else if (c>=0 && isRev(x,y) && S(c,'stance')!=STANCE.UNKNOWN && S(c,'stance')!=STANCE.ANNEXED) sel={kind:'colony',c:c};
			else sel={kind:'tile',x:x,y:y};
		}
		refresh();
	}
	var mapPanel=function()
	{
		var str='';
		if (sel.kind=='colony') return colonyCard(sel.c,true);
		if (sel.kind=='town' && TT(sel.t,'level')>0) return townCard(sel.t,true);
		str+='<div class="block framed bgMid" style="margin:4px;padding:6px;">';
		if (sel.kind=='capital')
		{
			str+='<div class="fancyText" style="font-size:16px;">Your capital</div><div style="font-size:12px;">Everything you build in the Production tab lives here. Towns you found on the map take their food from the same stockpile, and send goods and taxes back to it.</div>';
		}
		else if (sel.kind=='tile')
		{
			var x=sel.x,y=sel.y;
			if (!isRev(x,y))
			{
				str+='<div class="fancyText" style="font-size:16px;">Unexplored land</div>';
				if (!hasTech('scouting')) str+='<div style="font-size:12px;">Research <b>scouting</b> to send expeditions.</div>';
				else if (inReach(x,y)) str+='<div style="font-size:12px;">An expedition reveals a radius of '+revealRadius()+' tiles. Cost: '+cstr(expeditionCost())+'.</div>'+btn('Send expedition','Reveal the land around here.',function(x,y){return function(){explore(x,y);};}(x,y));
				else str+='<div style="font-size:12px;">Too far to reach. Your expeditions can go '+reachR()+' tiles past the land you know (more with [cartography] and [scout]s).</div>';
			}
			else
			{
				var tt=terrAt(x,y),s=siteAt(x,y);
				str+='<div class="fancyText" style="font-size:16px;">'+TERR_NAMES[tt]+' <span style="font-size:11px;opacity:0.6;">('+x+', '+y+')'+(coastal(x,y)?', coastal':'')+'</span></div>';
				if (s) str+=G.parse('<div style="font-size:12px;"><b>'+s.type.name+'</b> - '+s.type.desc+(siteFound(s.id)?' (already explored)':'')+'</div>');
				var ci=colonyAtTile(x,y);
				if (ci>=0 && S(ci,'stance')==STANCE.UNKNOWN) str+='<div style="font-size:12px;">A settlement of an unknown people.'+(hasTech('first contact')?'':' Research <b>first contact</b> to meet them.')+'</div>';
				var why=canFoundHere(x,y);
				if (!why) str+=btn('Found a town here','Cost: '+cstr(foundCost())+'. Towns grow, produce goods for you, and pay taxes.',function(x,y){return function(){foundHere(x,y);};}(x,y));
				else if (hasTech('town charters') || tt!=TERR.SEA) str+='<div style="font-size:12px;opacity:0.8;">'+why+'</div>';
			}
		}
		else
		{
			str+='<div style="font-size:12px;">Click a tile to inspect it. Dim tiles can be reached by an expedition. Click a settlement to deal with it.</div>';
		}
		return str+'</div>';
	}
	var mapLegend=function()
	{
		return '<div style="font-size:11px;opacity:0.75;padding:2px 8px;">'+
			'<span style="color:#5cd6e8">cyan</span> your lands, <span style="color:#7cf07c">green</span> your towns; '+
			'<span style="color:#d8d8d8">neutral</span>, <span style="color:#6c6">pact</span>, <span style="color:#e54">war</span>, <span style="color:#ec4">tribute</span> colonies. '+
			'Gold roads are trade pacts (solid = improved), red dashes are wars, orange dashes are feuds. Explored sites keep their icon.</div>';
	}

	/*-------- the views --------*/
	var overview=function()
	{
		var W=warriors(),P=attackPower(),cd=G.getRawRes('warband cooldown').amount;
		var met=0,pacts=0,wars=0,trib=0;
		for (var c=0;c<NCOL;c++){var st=S(c,'stance');if (st==STANCE.UNKNOWN) continue;met++;if (st==STANCE.PACT) pacts++;if (st==STANCE.WAR) wars++;if (st==STANCE.TRIBUTE) trib++;}
		var tp=0,tc=0,tr={};
		for (var t=0;t<NTOWN;t++)
		{
			if (TT(t,'level')<1) continue;
			tc++;tp+=TT(t,'pop');
			var y=townYield(t);
			for (var r in y.res) tr[r]=(tr[r]||0)+y.res[r];
			tr['food']=(tr['food']||0)-y.need;
		}
		var ts=[];
		for (var r in tr) ts.push((tr[r]>=0?'+':'')+fmt1(tr[r])+' ['+r+']');
		var str='<div class="block framed bgMid" style="margin:4px;padding:6px;"><div class="fancyText">Your forces</div>'+
			G.parse('Armed warriors: <b>'+B(W)+'</b>//Attack power: <b>'+B(P)+'</b> / Defense: <b>'+B(defensePower())+'</b>'+(hasTech('warbands')?'':'//Research [warbands] to train [warrior]s.')+(cd>0?'//Warband recovering for <b>'+Math.ceil(cd)+'</b> more days.':''))+'</div>';
		//research guide : the wisdom cap
		var wis=G.getRes('wisdom').amount,libs=G.getUnitAmount('library'),arch=G.getUnitAmount('archive');
		var tip='';
		if (!hasTech('writing')) tip='Research <b>writing</b> (30 insight) to raise your wisdom cap, then <b>libraries</b>.';
		else if (!hasTech('libraries')) tip='Research <b>libraries</b> (45 insight; needs <b>building</b>) to unlock the [library] building.';
		else if (!hasTech('scholarship')) tip='Build [library,Libraries] on the Production tab to raise your cap by 40 each. <b>Scholarship</b> unlocks [archive]s (+150).';
		else tip='Build [library,Libraries] (+40 each) and [archive]s (+150 each) to keep raising your cap.';
		str+='<div class="block framed bgMid" style="margin:4px;padding:6px;"><div class="fancyText">Learning</div>'+
			G.parse('Your [insight] is capped by your [wisdom]: <b>'+B(wis)+'</b>.//Libraries: <b>'+libs+'</b>, archives: <b>'+arch+'</b>.//'+tip)+'</div>';
		str+='<div class="block framed bgMid" style="margin:4px;padding:6px;"><div class="fancyText">Your realm</div>'+
			'<div>Peoples met: <b>'+met+' / '+NCOL+'</b> (pacts '+pacts+', wars '+wars+', tributaries '+trib+')</div>'+
			'<div>Land explored: <b>'+Math.round(revealedCount()/(MW*MH)*100)+'%</b></div>'+
			'<div>Towns: <b>'+tc+' / '+NTOWN+'</b>, '+Math.round(tp)+' people</div>'+
			(ts.length?G.parse('<div style="font-size:12px;">Towns yearly: '+ts.join(', ')+'</div>'):'')+'</div>';
		if (!hasTech('first contact')) str+='<div class="par" style="padding:8px 16px;">Research <b>first contact</b> (requires scouting and language) to start meeting your neighbours. The map and towns open up with <b>scouting</b> and <b>town charters</b>.</div>';
		return str;
	}

	var VIEWS=[['overview','Overview','The state of your realm.'],['map','Map','Explore the land, found towns, and deal with settlements.'],['colonies','Diplomacy','Every people you have met.'],['towns','Towns','Manage your towns and cities.']];
	G.update['colonies']=function()
	{
		var div=l('coloniesDiv');
		if (!div) return;
		if (!G.tab || G.tab.id!='colonies') return;
		if (!G.resByName['colony 0 stance'])
		{
			div.innerHTML='<div class="regularWrapper"><div class="par">The Colonies mod is not active in this game.</div></div>';
			return;
		}
		var scroll=div.scrollTop;
		var str='<div class="regularWrapper">';
		str+='<div style="padding:2px 4px;">';
		for (var i=0;i<VIEWS.length;i++)
			str+=G.button({text:VIEWS[i][1],classes:'frameless',style:'display:inline-block;'+(view==VIEWS[i][0]?'box-shadow:0 0 4px 1px #cb9;font-weight:bold;':''),tooltip:VIEWS[i][2],onclick:function(v){return function(){view=v;G.update['colonies']();};}(VIEWS[i][0])});
		str+='</div>';
		if (view=='overview') str+=overview();
		else if (view=='map')
		{
			if (!hasTech('scouting')) str+='<div class="par" style="padding:8px 16px;">Research <b>scouting</b> to start exploring beyond your borders. Your capital sits at the centre of the map.</div>';
			str+=drawMap()+mapLegend()+mapPanel();
		}
		else if (view=='colonies')
		{
			if (!hasTech('first contact')) str+='<div class="fancyText bitBiggerText" style="padding:16px;">Your people have not yet met anyone beyond their own borders.</div><div class="par" style="padding:0px 16px;">Research <b>first contact</b> (requires scouting and language) to start meeting your neighbours.</div>';
			else
			{
				var met=0;
				for (var c=0;c<NCOL;c++)
				{
					if (S(c,'stance')==STANCE.UNKNOWN) continue;
					met++;str+=colonyCard(c,false);
				}
				if (met<NCOL) str+='<div class="par" style="padding:8px 16px;opacity:0.7;">'+(NCOL-met)+' other '+((NCOL-met)==1?'people remains':'peoples remain')+' undiscovered. Explore the map to find them.</div>';
			}
		}
		else if (view=='towns')
		{
			var n=0;
			for (var t=0;t<NTOWN;t++) if (TT(t,'level')>0){n++;str+=townCard(t,false);}
			if (!n) str+='<div class="par" style="padding:12px 16px;">'+(hasTech('town charters')?'You have no towns yet. Open the <b>Map</b> view, pick a tile close to your capital and found one (cost: '+cstr(foundCost())+').':'Research <b>town charters</b> (requires cities and first contact) to found towns on the map.')+'</div>';
			else str+='<div class="par" style="padding:8px 16px;opacity:0.7;">'+n+' / '+NTOWN+' towns. Found more on the Map view'+(hasTech('town charters')?' (next one costs '+cstr(foundCost())+')':'')+'.</div>';
		}
		str+='</div>';
		div.innerHTML=str;
		G.addCallbacks();
		var svg=l('colMap');
		if (svg) svg.addEventListener('click',function(e)
		{
			var r=svg.getBoundingClientRect();
			selectTile(Math.floor((e.clientX-r.left)/r.width*MW),Math.floor((e.clientY-r.top)/r.height*MH));
		});
		div.scrollTop=scroll;
	}
	G.draw['colonies']=function(){}
	ensureTab();
}
});
})();
