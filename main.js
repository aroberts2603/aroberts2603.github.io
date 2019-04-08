function setupCanvas(htmlCanvasId) {
	var canvas = document.getElementById(htmlCanvasId);
	var dpr = window.devicePixelRatio;
	canvas.width = window.innerWidth * dpr;
	canvas.height = window.innerHeight * dpr;
	var ctx = canvas.getContext("2d");
	ctx.scale(dpr, dpr);
	r = {
		ctx: ctx,
		width: window.innerWidth,
		height: window.innerHeight
	}
	return r;
}
//#region moving points js
// class Point {
// 	constructor(color, size, x, y, direction) {
// 		this.color = color;
// 		this.size = size;
// 		this.x = x;
// 		this.y = y;
// 		this.xdir = Math.cos(direction);
// 		this.ydir = Math.sin(direction);
// 	}

// 	display(ctx) {
// 		ctx.fillStyle = this.color;
// 		ctx.fillRect(this.x, this.y, this.size, this.size);
// 	}

// 	update() {
// 		if(this.x <= 0 || this.x >= window.innerWidth) {
// 			this.xdir *= -1;
// 		}
// 		if(this.y <= 0 || this.y >= window.innerHeight) {
// 			this.ydir *= -1;
// 		}
// 		this.x += this.xdir/1.5;
// 		this.y += this.ydir/1.5;
// 	}
// }

// var points = [];
// function makePoints(number) {
// 	for(var i = 0;i<number;i++) {
// 		let p = new Point("#efefef", 2, Math.floor(Math.random() * window.innerWidth/20)*20, Math.floor(Math.random() * window.innerHeight/20)*20, Math.floor(Math.random() * 360));
// 		points.push(p);
// 	}
// }

// function runPoints() {
// 	ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
// 	for(var i = 0;i<points.length;i++) {
// 		points[i].display(ctx);
// 		points[i].update();
// 	}
// }

// makePoints(100);

// var run = setInterval(runPoints, 1000/60);

//#endregion

class Planet {
	constructor(orbitRadius,speed,angle,radius,color,imageUrl = null) {
		this.orbitRadius = orbitRadius;
		this.rotSpeed = speed;
		this.currentAngle = angle;
		this.radius = radius;
		this.color = color;
		this.x = Math.cos(this.currentAngle-this.rotSpeed)*this.orbitRadius;
		this.y = Math.sin(this.currentAngle-this.rotSpeed)*this.orbitRadius;
		this.imageUrl = imageUrl;
		this.rotation = 0;
	}

	move() {
		if(this.currentAngle < 5*Math.PI/12 && this.orbitRadius < 800) {
			this.currentAngle = 13*Math.PI/12;
		} else if(this.currentAngle < Math.PI/2) {
			this.currentAngle = Math.PI;
		}
		this.x = Math.cos(this.currentAngle-this.rotSpeed)*this.orbitRadius;
		this.y = Math.sin(this.currentAngle-this.rotSpeed)*this.orbitRadius;
		this.currentAngle -= this.rotSpeed;
	}

	display(ctx) {
		if(this.imageUrl == null) {
			ctx.beginPath();
			ctx.fillStyle = this.color;
			ctx.arc(document.body.clientWidth+this.x+125,this.y-125,this.radius,0,2*Math.PI);
			ctx.fill();
		} else {
			var img = document.getElementById(this.imageUrl);
			var x = document.body.clientWidth+this.x+125;
			var y =this.y-125;
			ctx.save();
			ctx.translate(x,y);
			this.rotation += -1*Math.PI/90;
			ctx.rotate(this.rotation);
			ctx.drawImage(img,-this.radius,-this.radius,this.radius*2,this.radius*2);
			ctx.restore();
		}
	}
}

//#region solar system
// function SolarSystem(ctx) {
// 	ctx.fillStyle = "#ffe016";
// 	ctx.strokeStyle = "#ffe016";
// 	ctx.beginPath();
// 	ctx.arc(document.body.clientWidth+125,-125,320,0,2*Math.PI);
// 	ctx.fill();
// 	ctx.stroke();
// 	ctx.beginPath();
// 	ctx.strokeStyle = "#eaeaea";
// 	ctx.arc(document.body.clientWidth+125,-125,380,0,2*Math.PI);
// 	ctx.arc(document.body.clientWidth+125,-125,445,0,2*Math.PI);
// 	ctx.arc(document.body.clientWidth+125,-125,525,0,2*Math.PI);
// 	ctx.arc(document.body.clientWidth+125,-125,625,0,2*Math.PI);
// 	ctx.arc(document.body.clientWidth+125,-125,870,0,2*Math.PI);
// 	ctx.arc(document.body.clientWidth+125,-125,1050,0,2*Math.PI);
// 	ctx.arc(document.body.clientWidth+125,-125,1230,0,2*Math.PI);
// 	ctx.arc(document.body.clientWidth+125,-125,1400,0,2*Math.PI);
// 	ctx.stroke();
// }

// var planets = [];
// let mercury = new Planet(380,Math.PI/1000,14*Math.PI/12,10,"#bababa");
// let venus = new Planet(445,Math.PI/1350,8*Math.PI/12,18,"#f7cc0e")
// let earth = new Planet(525,Math.PI/1600,11*Math.PI/12,30,"#1975ff",imageUrl = "earth");
// let mars = new Planet(625,Math.PI/2200,10*Math.PI/12,25,"#ff401e");

// let jupiter = new Planet(870,Math.PI/3000,10*Math.PI/12,85,"#ffd27f");
// let saturn = new Planet(1050,Math.PI/3300,11.5*Math.PI/12,70,"#ffdfa5");
// let uranus = new Planet(1230,Math.PI/3600,10*Math.PI/12,45,"#66d3ff");
// let neptune = new Planet(1400,Math.PI/4000,12*Math.PI/12,30,"#3586ff");

// planets.push(mercury);
// planets.push(venus);
// planets.push(earth);
// planets.push(mars);

// planets.push(jupiter);
// planets.push(saturn);
// planets.push(uranus);
// planets.push(neptune);

// function run() {
// 	ctx.clearRect(0,0,document.body.clientWidth+60,document.body.clientHeight);
// 	SolarSystem(ctx);
// 	planets.forEach(function(element){
// 		element.display(ctx);
// 		element.move();
// 	})
// }
//#endregion

var ctxObj = setupCanvas("hero-canvas");
var ctx = ctxObj.ctx;

class Pointer {
	constructor(x,y,l,w,color){
		this.x = x;
		this.y = y;
		this.l = l;
		this.w = w;
		this.color = color;
		this.angle = Math.random() * Math.PI * 2;
		this.velocity = 0;
		this.targetVel = 0;
		this.distx = 0;
		this.disty = 0;
	}

	repulse() {
		this.x -= this.velocity;
		this.y -= this.velocity;
	}

	calcVel() {
		this.distx = mx - this.x;
		this.disty = my - this.y;
		var sqrt = Math.sqrt((this.distx**2)+(this.disty**2));
		console.log(this.targetVel, this.velocity);
		this.targetVel = 75-sqrt;
		this.angle = Math.atan(this.disty/this.distx)+(Math.PI/2);
	}

	point(mouseX, mouseY) {
		if(this.y-mouseY)
		var ang = Math.atan((this.y-mouseY)/(this.x-mouseX));
		this.angle = ang;
	}

	display(ctx) {
		ctx.save();
		ctx.translate(this.x,this.y);
		ctx.rotate(this.angle);
		ctx.fillStyle = this.color;
		ctx.fillRect(0-(this.l/2),0-(this.w/2),this.l,this.w);
		ctx.restore();
	}

	update(ctx) {
		this.angle += this.velocity;
		if(this.velocity > this.targetVel) {
			this.velocity -= 0.01;
		} else if(this.velocity < this.targetVel) {
			this.velocity += 0.07;
		}
		if(this.velocity <= 0.07 && this.velocity >= -0.01 && this.targetVel == 0) {
			this.velocity = 0;
		}
		this.display(ctx);
		this.targetVel = 0;
	}

	spin() {
		this.targetVel += Math.random()/10 + (Math.PI/8) - 0.1;
	}
}

//#region Setup for interactive JS
var coords = [[972,119],[1114,256],[1006,423],[664,510],[414,57],[755,306],[175,161],[160,469],[400,400],[629,146],
	[621,294],[414,231],[266,61],[59,45],[98,282],[356,535],[793,429],[943,265],[1097,62],[1175,492],[495,158],[417,115],
	[354,176],[280,129],[181,74],[103,98],[53,188],[136,221],[203,284],[300,254],[459,264],[492,342],[333,328],[220,334],
	[287,425],[61,523],[68,379],[469,540],[498,432],[626,432],[574,537],[846,344],[720,458],[687,278],[562,201],[636,58],
	[734,70],[737,177],[798,229],[865,206],[846,152],[896,76],[980,184],[1051,150],[998,32],[1180,61],[1161,170],[1222,92],
	[1226,238],[1171,306],[187,199],[152,276],[122,158],[75,234],[40,103],[116,44],[222,110],[261,296],[156,310],[132,346],
	[113,400],[69,428],[120,454],[93,481],[113,537],[164,506],[189,537],[259,519],[220,468],[300,460],[298,521],[399,544],
	[445,495],[450,460],[386,440],[372,491],[335,406],[328,462],[466,394],[524,398],[562,422],[550,471],[517,476],[526,503],
	[510,534],[644,536],[598,482],[664,468],[680,404],[633,387],[571,382],[623,335],[690,350],[734,354],[731,386],[793,383],
	[792,272],[841,272],[878,248],[883,298],[702,226],[666,190],[640,225],[576,240],[526,262],[499,220],[452,185],[416,170],
	[473,93],[568,132],[566,66],[494,49],[150,420],[188,456],[259,468],[209,501],[328,499],[482,496],[422,417],[424,373],
	[248,250],[188,238],[252,207],[226,167],[144,116],[74,144],[171,44],[232,30],[310,36],[362,32],[357,86],[298,86],[323,136],
	[379,151],[450,131],[515,104],[518,178],[602,194],[679,125],[642,90],[694,34],[754,101],[762,155],[813,195],[738,230],
	[720,276],[647,262],[806,305],[775,335],[742,419],[739,455],[724,490],[707,536],[763,534],[796,488],[829,528],[894,557],
	[917,518],[902,472],[853,426],[890,371],[940,428],[934,318],[983,378],[1038,367],[1002,286],[1055,261],[1080,198],
	[1011,220],[925,200],[914,152],[848,100],[970,61],[1064,92],[1062,142],[1137,109],[1189,157],[1175,210],[1170,282],
	[1212,302],[1202,359],[1223,398],[1213,450],[1220,517],[165,382],[199,412],[245,429],[279,380],[221,387],[260,342],
	[361,372],[398,487],[584,274],[550,308],[485,298],[421,298],[397,320],[348,288],[320,281],[363,234],[309,196],[274,171],
	[818,458],[854,506],[890,414],[926,374],[826,384],[984,336],[1044,309],[1096,302],[1134,346],[1154,383],[1148,427],[1072,404],
	[1032,441],[976,468],[950,475],[944,522],[956,555],[1017,559],[1020,500],[1076,542],[1109,511],[1152,529],[1198,560],
	[1083,116],[1099,161],[1116,199],[1143,232],[1185,261],[1174,115],[880,39],[808,66],[766,30],[792,122],[752,254],[552,156],
	[444,40],[1032,516],[1058,482],[1082,444],[1089,395],[1064,354],[1123,298],[968,520],[794,562],[670,562],[424,564],[292,554],
	[240,556],[39,481],[54,334],[44,264],[95,189],[689,162],[707,120],[675,78],[584,96],[1036,204],[1009,84],[1000,131],[1080,31],
	[1125,67],[1228,28],[1216,164]];

var pointers = [];
coords.forEach(function(element) {
	pointers.push(new Pointer(element[0],element[1],14,1,"black"));
})

var mx = 0;
var my = 0;
var oldScroll = 0;

document.onscroll = function() {
	my -= oldScroll;
	my += window.scrollY;
	oldScroll = window.scrollY;
	console.log(my);
}

document.addEventListener("mousemove",function(e) {
	mx = e.clientX;
	my = e.clientY + window.scrollY;
});
//#endregion

function sp() {
	ctx.clearRect(0,0,ctxObj.width,ctxObj.height);
	pointers.forEach(function(element) {
		// element.update(ctx);
		element.display(ctx);
	});
	pointers.forEach(function(element) {
		if(Math.sqrt((element.x-mx)**2 + (element.y-my)**2) <= 75) {
			element.calcVel();
			// element.spin();
		}
		element.repulse();
	});
}

var run = window.setInterval(sp, 1000/60);
