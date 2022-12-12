let inc = 0.007;
let start = 0;
let ss = 0;

function setup() {
  let cnv = createCanvas(windowWidth-150, windowHeight-150);
  cnv.parent("canvasContainer")
  flyingObject = new Plane(width - 1250, height - 500);
  sky1 = new Cloud(width/2, height/9+100);
  sky2 = new Cloud(0, height/9);


}

function sun(){
  push()
  stroke(225);
  fill(225,225,0)
  
  beginShape()
  for(var i=0;i<TWO_PI;i+=0.02){
    let r=80+random(5,-5)
    let x=r*cos(i)
  
    let y=r*sin(i)
  
    vertex(x,y)
    }
  endShape(CLOSE)
  pop()
}



function draw() {
  
  background(127, 212, 224);
  sun()
  flyingObject.display();
  flyingObject.update();
  sky1.display();
  sky1.update();
  sky2.display();
  sky2.update();
  
  if (flyingObject.fall == true) {
    flyingObject.yspd = -1;
  }
  if (flyingObject.fall == false) {
    flyingObject.yspd = 1;
  }

  push();
  stroke(255);
  fill(139, 128, 153);
  beginShape();
  let xoff = start;
  for (let x = 0; x < width; x++) {
    stroke(0);
    let y = noise(xoff) * height + 100;
    vertex(x, y);

    xoff += inc;
  }
  vertex(width, height);
  vertex(0, height);

  endShape();

  start += inc;
  pop();

  push();
  stroke(255);
  fill(71, 52, 55);
  beginShape();
  for (let x = 0; x < width; x++) {
    stroke(0);
    let y = noise(xoff) * height + 100;
    vertex(x, y);

    xoff += inc;
  }
  vertex(width, height);
  vertex(0, height);

  endShape();

  start += inc;
  pop();

  if (flyingObject.x > width + 100) {
    flyingObject.x = -100;
    flyingObject.y=random(height-300,0)
  }
  
  
  if(sky1.x>width+100){
    sky1.x=-10
    sky1.xspd=random(0.5,3)
  }
  if(sky2.x>width+100){
    sky2.x=-10
    sky2.xspd=random(0.5,3)
  }
}

class Plane {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.yspd = 0;
    this.fall = false;
  }
  update() {
    this.x += 0.5;
    this.y += this.yspd;
  }
  display() {
    fill(255, 250, 250);
    ellipse(this.x, this.y, 170, 40);
    arc(this.x - 55, this.y - 12, 25, 70, PI, 0);

    fill(220, 220, 220);
    arc(this.x - 10, this.y - 20, 25, 70, PI, 0);
    arc(this.x - 9, this.y, 25, 100, 0, PI);

    fill(0, 0, 128);
    square(this.x - 40, this.y - 5, 7, 2);
    square(this.x - 30, this.y - 5, 7, 2);
    square(this.x + 10, this.y - 5, 7, 2);
    square(this.x + 20, this.y - 5, 7, 2);
    square(this.x + 30, this.y - 5, 7, 2);
    square(this.x + 40, this.y - 5, 7, 2);
    square(this.x + 50, this.y - 5, 7, 2);

    push();
    translate(this.x, this.y);
    beginShape();
    vertex(83, -4);
    vertex(85, -2);
    vertex(84, 1);
    vertex(76, 2);
    vertex(68, -5);
    endShape();
    pop();
  }
}
class Cloud{
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.yspd = 0;
    this.xspd=0.5

  }
  update() {
    this.x += this.xspd;
   
}
  display() {
  push()
  translate(this.x, this.y);
  // scale(0.6)
  fill(255)
  noStroke()
  ellipse(0,0,100,60)
  ellipse(30,0,80,60)
  ellipse(10,-20,80,40)
  pop()
  }
  
}

  
function mousePressed() {
  ss += 1;

  // console.log(mouseX - flyingObject.x, mouseY - flyingObject.y);
  if (ss % 2 == 0) {
    flyingObject.fall = true;
  }
  if (ss % 2 != 0) {
    flyingObject.fall = false;
  }
}
