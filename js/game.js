// Main Game JS
/*
Jeffrey Stokes Google IO Challenge-Chrome

Much thanks goes out to
	Bill Mill for his awesome tutorials
	Daniel Moore for his tutorial on html5rocks.com
	Google for making such an awesome browswer
*/


/**
x: ball position on x-axis
y: ball position on y-axis
dx: delta x, how much the ball moves laterally
dy: delta y, how much the ball moves vertically
WIDTH: width of the canvas
HEIGHT: height of the canvas
ctx: the canvas object
FPS: how many frames per second
BALL_RADIUS: the radius of the ball
*/
var x = 150;
var y = 150;
var dx = 1;
var dy = 2;
var WIDTH;
var HEIGHT;
var ctx;
var FPS = 180;
var BALL_RADIUS = 7;

function init() {
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  return setInterval(function() {
	  update();
	  draw();
	  }, 1000/FPS);
}


/**
Check if the ball has hit a wall: If so reverse direction
Check if ball has gone past paddle: If so stop game and redraw all bricks
*/

function update() {
  if (x + dx + BALL_RADIUS > WIDTH || x + dx - BALL_RADIUS < 0)
    dx = -dx;
  if (y + dy - BALL_RADIUS < 0)
    dy = -dy;
  else if (y + dy + BALL_RADIUS > HEIGHT - paddle.height) {
    if (x > paddle.x && x < paddle.x + paddle.width) {
      //move the ball differently based on where it hit the paddle
      dx = 8 * ((x-(paddle.x+paddle.width/2))/paddle.width);
      dy = -dy;
    }
    else if (y + dy + BALL_RADIUS > HEIGHT) {
	  clearInterval(intervalID);
	  init_bricks();
	  drawBricks();
	}
  }
	paddle.x = paddle.x.clamp(0, WIDTH - paddle.width);
	if (keydown.left) {
		paddle.x -= 4;
	}
	if (keydown.right) {
		paddle.x += 4;
	}
}

/**
The awesome new chrome icon as the ball :)
*/

var chrome_ball = new Image();
chrome_ball.src = 'img/chrome_icon_small.png'
function drawBall() {                                                                             
    ctx.beginPath();
	ctx.drawImage(chrome_ball, x-10, y-10);
	ctx.closePath();
}

/*
Function to draw a rectangle
x: location on x axis
y: location on y axis
w: width of rectangle
h: height of rectangle
fill_style: the color of rectangle
*/
function rect(x,y,w,h,fill_style) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fillStyle = fill_style;
  ctx.fill();
}

/*
Clears the canvas
*/
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

/*
Moves ball
clears board
draws ball
draws bricks
checks for brick collision
draws paddle
*/
function draw() {
  x += dx;
  y += dy;
  clear();
  drawBall();
  drawBricks();
  brickHit();
  paddle.draw();
}

/*Paddle properties*/

var paddle = {
	color: "rgb(100,100,100)",
	x: 280, 
	y: 590,
	width: 100,
	height: 10,
	draw: function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
};

var intervalID = init();
init_bricks();