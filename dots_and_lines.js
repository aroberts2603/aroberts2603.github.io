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

var canvas = setupCanvas("hero-canvas");
var ctx = r.ctx;

var cw = canvas.width;
var ch = canvas.height;

class Point {
	constructor() {
		//essential variables
		this.x = Math.floor(Math.random() * (cw-0)) + 0;
		this.y = Math.floor(Math.random() * (ch-0)) + 0;
		this.velX = ((Math.random() * 3)-1.5)/2.0;
		this.velY = ((Math.random() * 3)-1.5)/2.0;
		
		//push method
		this.pushX = 0;
		this.pushY = 0;
		this.targetPushX = 0;
		this.targetPushY = 0;

		//style
		this.style = "255, 255, 255";
		this.opacity = "1";
	}

	update() {
		if(this.x >= cw) {
			this.x = cw;
			if(this.velX > 0) {
				this.velX *= -1;
			}
		} else if(this.x <= 0) {
			this.x = 0;
			if(this.velX < 0) {
				this.velX *= -1;
			}
		}

		if(this.y >= ch) {;
			this.y = ch
			if(this.velY > 0) {
				this.velY *= -1;
			}
		} else if(this.y <= 0) {
			this.y = 0;
			if(this.velY < 0) {
				this.velY *= -1;
			}
		}

		if(this.pushX < this.targetPushX) {
			this.pushX += 0.05;
		} else if(this.pushX > this.targetPushX) {
			this.pushX -= 0.05;
		}
		if(this.pushY < this.targetPushY) {
			this.pushY += 0.05;
		} else if(this.pushY > this.targetPushY) {
			this.pushY -= 0.05;
		}

		this.x += this.velX + this.pushX;
		this.y += this.velY + this.pushY;
	}

	display(ctx) {
		ctx.beginPath();
		ctx.fillStyle = "rgba("+this.style+", "+this.opacity+")";
		ctx.fillRect(this.x-2,this.y-2,4,4);
		ctx.fill();
	}

	lineTo(p,ctx,dist) {
		ctx.beginPath();
		ctx.lineWidth = 0.5;
		ctx.strokeStyle = "rgba("+this.style+", "+((dist-110)/-20)+")";
		ctx.moveTo(this.x,this.y);
		ctx.lineTo(p.x,p.y);
		ctx.stroke();
	}

	push(mx, my) {
		this.targetPushX = ((this.x - mx)/20.0).toFixed(1);
		this.targetPushY = ((this.y - my)/20.0).toFixed(1);
	}
}

var mx = 0;
var my = 0;

var points = [];
for(var i = 0;i<110;i++) {
	points.push(new Point());
}

function linesForPoints(points) {
	var dist;
	for(var i = 0;i<points.length;i++) {
		for(var j = 0;j<points.length;j++) {
			if(i != j) {
				dist = Math.sqrt((points[i].x - points[j].x)**2 + (points[i].y - points[j].y)**2)
				if(dist <= 110) {
					points[i].lineTo(points[j],ctx,dist);
				}
			}
		}
	}
}

var timeUntilDeath;
function run() {
	ctx.clearRect(0,0,cw,ch);
	points.forEach(function(p) {
		p.display(ctx);
		p.update();
		if(Math.sqrt((p.x-mx)**2 + (p.y-my)**2) <= 75) {
			p.push(mx, my);
		} else {
			p.targetPushX = 0;
			p.targetPushY = 0;
		}
	})
	linesForPoints(points);
}

var start = setInterval(run, 1000/60);

document.addEventListener("mousemove", function(e) {
	mx = e.clientX;
	my = e.clientY;
})

// document.addEventListener("mousemove", function(e) {
// 	var angle = Math.atan((e.clientY-(canvas.height/2))/(e.clientX-(canvas.width/2)));
// 	angle = angle/Math.PI*180;
// 	angle -= 90
// 	document.getElementById("hero-container").style.backgroundImage = "linear-gradient("+angle+"deg, #ff0550, #ff562c)";
// 	console.log("oof");
// })