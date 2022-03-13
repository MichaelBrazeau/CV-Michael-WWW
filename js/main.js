// var canvas = document.getElementById("background");
// fitToContainer(canvas);

// function fitToContainer(canvas){
//   // Make it visually fill the positioned parent
//   canvas.style.width ='100%';
//   canvas.style.height='100%';
//   // ...then set the internal size to match
//   canvas.width  = canvas.offsetWidth;
//   canvas.height = canvas.offsetHeight;
// }

//gets the canvas so we can modidy it
var canvas = document.getElementById("bgd");
//how to actualy do graphics with the canvas
var amtballs = 10;
//ball props
var x = canvas.width/10;
var y = canvas.height-30;
var ballRadius = 2;

//ball object
function Ball(x, y){
    this.x = x;
    this.y = y;
    this.dx = Math.floor((Math.random()) + 1);
    this.dy = Math.floor((Math.random()) + 1);
    this.radius = ballRadius;
    this.ctx = canvas.getContext("2d");
    this.drawBall = function(){
        //deletes the rect before drawing it to prevent the lineness
        this.x += this.dx;
        this.y += this.dy;
        //makes a circle
        if(this.y + this.dy < this.radius || this.y + this.dy > canvas.height-this.radius) {
            this.dy = -this.dy;
            this.ctx.fillStyle = getRandomColor();
    
        }
        if(this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
            this.dx = -this.dx;
            this.ctx.fillStyle = getRandomColor();
        }
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        this.ctx.closePath();
        this.ctx.fill();
    };
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let balls = [];


for(var ball = 0; ball < amtballs; ++ball){
    balls.push(new Ball( Math.floor(Math.random() * canvas.width), 
                        Math.floor(Math.random() * canvas.height) ));

}

document.addEventListener("mousemove", mouseMoveHandler, false);

function distance(x1, x2, y1, y2){
    var a = x1 - x2;
    var b = y1 - y2;
    
    return Math.sqrt( a*a + b*b );
}

function mouseMoveHandler(e){
    var relativeX = e.clientX;
    var relativey = e.clientY;
    for(var i = 0; i <balls.length; ++i){
        if(distance(ball[i].x, relativeX, ball[i].y, relativey) > 
            distance(ball[i].x + ball[i].dx, relativeX, ball[i].y + ball[i].dy, relativey)){
                ball[i].dy = -ball[i].dy;
                ball[i].dx = -ball[i].dx;
        }
     }
}

var c = canvas.getContext("2d");

// function checkCollison()
//main event 
function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i <balls.length; ++i){
       balls[i].drawBall();
    }
    requestAnimationFrame(draw);
}

//event loop
//calls draw every 10 milliseconds
draw();
