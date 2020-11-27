var c = document.querySelector("canvas");
c.width = 500;
c.height = c.width;
var width=c.width;
var height=c.height;
var ctx = c.getContext("2d");





function dist(x1,y1,x2,y2){
  return Math.floor(Math.sqrt((x1-x2)**2+(y1-y2)**2));
};

function map(n, start1, stop1, start2, stop2) {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};




document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37  && pressed) { //left arrow
      if (!(snake.dx == 1)) {
        snake.dx = -1;
        snake.dy =  0;
    }}
    else if(event.keyCode == 39 && pressed) { //right arrow
      if (!(snake.dx == -1)) {
        snake.dx = 1;
        snake.dy = 0;
    }}
    else if(event.keyCode == 40 && pressed) { //up arrow
      if (!(snake.dy == -1)) {      
        snake.dx = 0;
        snake.dy = 1;
    }}
    else if(event.keyCode == 38 && pressed) { //down arrow
      if (!(snake.dy == 1)) {
        snake.dx =  0;
        snake.dy = -1;
    }}
    pressed = false
});






var corps = [];
function Snake() {
  this.corps = [];
  this.x = width/2;
  this.y = height/2;
  this.size = width/50
  this.corps.push({x:this.x,y:this.y});
  this.dx = 0;
  this.dy = 0;
  this.len = 1;
  this.ded = false;
  this.draw = function() {
    for (var i = 0; i < this.corps.length; i++) {
      c = dist(this.corps[i].x,this.corps[i].y,f.x,f.y);
      c = map(c,0,50,200,50)
      ctx.fillStyle = 'rgb('+(255-c)+',50,'+c+')'
      ctx.fillRect(this.corps[i].x,this.corps[i].y,this.size,this.size);
    }
  }

  this.update = function() {
    this.x += (this.size * this.dx);
    this.y += (this.size * this.dy);
    if (this.x > width-1){
            this.x = 0; 
          } else if (this.x < 0){
            this.x = width;
          } else if (this.y > height-1){
              this.y = 0;
          } else if (this.y < 0){
            this.y = height;
          }
    if (this.corps.length === this.len) {
        for (var i = 0; i < this.corps.length; i++) {
          this.corps[i] = this.corps[i+1];
        };
        this.corps.pop(0);
      }
    this.corps.push({x:this.x, y:this.y});

    if (this.len > 3){
      for (var i = 0; i < this.corps.length-1; i++) {
              if (this.corps[i].x === this.x && this.corps[i].y === this.y){
                this.ded = true
              }
            };}
  }

}


function food() {
  this.x = Math.floor(Math.random()*width/10)*10
  this.y = Math.floor(Math.random()*height/10)*10
  this.update = function() {
    ctx.fillStyle = 'rgb(50,210,60)'
    if (snake.x === this.x && snake.y === this.y) {
      snake.len += 1;
      this.x = Math.floor(Math.random()*width/10)*10
      this.y = Math.floor(Math.random()*height/10)*10
    } else {
    ctx.fillRect(this.x,this.y,snake.size,snake.size)
    ctx.strokeStyle = 'rgb(0,0,0)'
    ctx.stroke();
    }
  }
}




snake = new Snake()
f = new food()



function animate() {
    if (snake.ded) {
          return false;
        }
    
  setTimeout(function() {
  		pressed = true
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgb(100,100,150)'
        ctx.fillRect(0,0,width,height)
        
        snake.update()
        snake.draw()
        f.update()
        if (snake.ded) {
          snake = new Snake();
        }


    }, 1000 / map(snake.len,1,30,15,40));
	}
if (!snake.ded){animate()}