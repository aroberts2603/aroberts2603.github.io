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

function newCoord(minRadius, maxRadius, oldVal) {
	var neg = Math.floor(Math.random() - 0.5);
	var newVal = Math.floor(Math.random() * (maxRadius-minRadius)) + minRadius;
	if(neg < 0 && (newVal*-1)+oldVal >= 0) {
		return (newVal*-1)+oldVal;
	} else {
		return newVal+oldVal;
	}
}

function coolLines(ctx, vertices, minRadius, maxRadius) {
	ctx.lineWidth = 1;
	ctx.strokeStyle = "white";
	ctx.fillStyle = "white";
	var lastX, lastY, currX, currY;
	lastX = 50;
	lastY = 50;
	ctx.moveTo(lastX,lastY);
	for(var i = 0;i<vertices;i++) {
		currX = newCoord(minRadius, maxRadius, lastX);
		currY = newCoord(minRadius, maxRadius, lastY);
		ctx.lineTo(currX, currY);
		ctx.stroke();
		ctx.fillRect(currX-1,currY-1,3,3);
		lastX = currX;
		lastY = currY;
	}
}

class Grid {
	constructor(ctxObj, gap, left) {
		this.c = ctxObj.ctx;
		this.c.lineWidth = 1;
		this.c.strokeStyle = "#d1d1d1";
		this.c.fillStyle = "#d1d1d1";
		this.width = ctxObj.width;
		this.height = ctxObj.height;
		this.left = left;
		this.gap = gap;
		this.vertices;
		this.vertexCount = Math.floor(this.width*4/3/this.gap);
		this.rotation = 0;
	}

	generateVertices() {
		this.vertices = [];
		var vertex;
		for(var i = 0;i<=this.vertexCount;i++) {
			for(var j = 0;j<=this.vertexCount;j++) {
				vertex = [];
				vertex.push(Math.floor((this.width/-3)+this.left+(this.gap*i)));
				vertex.push(Math.floor((this.width/-3)+(this.gap*j)));
				this.vertices.push(vertex);
			}
		}
	}

	display() {
		for(var i = 0;i<this.vertices.length;i++) {
			this.c.fillRect(this.vertices[i][0],this.vertices[i][1],3,3);
		}
	}

	rotate(degree) {
		this.c.translate(Math.floor(this.width/3),Math.floor(this.width/3));
		this.c.clearRect(-this.width,-this.width,this.width*2,this.width*2);
		this.c.rotate((degree/180)*Math.PI);
		this.c.translate(Math.ceil(this.width/-3),Math.ceil(this.width/-3));
		this.display();
	}
}

// let grid = new Grid(setupCanvas("hero-canvas"), 15, 20);
// grid.generateVertices();
// grid.display();

// function updateLoop() {
	// grid.rotate(0.01);
// }

// var run = setInterval(updateLoop, 1000/40);
// coolLines(setupCanvas("hero-canvas"), 10, 50, 100);

// var ctxObj = setupCanvas("hero-canvas");
// var ctx = ctxObj.ctx;
// var middle = window.innerWidth/2;
// function draw() {
// 	ctx.translate(middle,window.innerHeight);
// 	ctx.rotate(0.5/180*Math.PI);
// 	ctx.translate(-middle,-window.innerHeight);
// 	ctx.fillStyle = "white";
// 	ctx.fillRect(middle,530,3,3);
// 	ctx.fillRect(middle-20,500,4,4);
// 	ctx.fillRect(middle+100,530,2,2);
// }


class Point {
	constructor(color, size, x, y, direction) {
		this.color = color;
		this.size = size;
		this.x = x;
		this.y = y;
		this.xdir = Math.cos(direction);
		this.ydir = Math.sin(direction);
	}

	display(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}

	update() {
		if(this.x <= 0 || this.x >= window.innerWidth) {
			this.xdir *= -1;
		}
		if(this.y <= 0 || this.y >= window.innerHeight) {
			this.ydir *= -1;
		}
		this.x += this.xdir/5;
		this.y += this.ydir/5;
	}
}

var points = [];
function makePoints(number) {
	for(var i = 0;i<number;i++) {
		let p = new Point("#efefef", 3, Math.floor(Math.random() * window.innerWidth/20)*20, Math.floor(Math.random() * window.innerHeight/20)*20, Math.floor(Math.random() * 360));
		points.push(p);
	}
}

var ctxObj = setupCanvas("hero-canvas");
var ctx = ctxObj.ctx;

function runPoints() {
	ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	for(var i = 0;i<points.length;i++) {
		points[i].display(ctx);
		points[i].update();
	}
}



makePoints(200);

var run = setInterval(runPoints, 1000/60);