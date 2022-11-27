let balls = [];
let particles = [];
let totalNum = 10;
let Pattern1called = false;
let xpos, ypos;
function setup() {
  let cnv = createCanvas(600, 600);
  cnv.parent("canvasContainer")
  character = new Monster(width / 2, height / 2);
  rain = new Particle();
}
function draw() {
  background(220);
  character.display();
  for (var x = 0; x < width; x += 300) {
    for (var y = 0; y < height; y += 300) {
      line(x, y, x, y + 300);
      line(x, y, x + 300, y);
    }
    for (let i = 0; i < balls.length; i++) {
      balls[i].update();
      balls[i].display();
      if (balls[i].reachedGoal) {
        balls.splice(i, 1);
      }
    }
  }
  push();
  if (Pattern1called == true) {
    push();
    scale(1 / 1.5);
    for (let i = 0; i < 1; i++) {
      translate(xpos, ypos);
      Pattern1(random(0, width / 2), random(0, height / 2));
    }
    pop();
  }
  pop();
}
class Monster {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.dia = random(2, 50);
  }
  update() {
    this.x += random(-4, 4);
  }
  display() {
    push();
    scale(0.5);
    translate(this.x * 2, this.y * 2);
    fill(0);
    circle(0, 0, 70);
    fill(0);
    beginShape();
    vertex(-28, 20);
    vertex(28, 20);
    vertex(48, 99);
    vertex(24, 79);
    vertex(0, 99);
    vertex(-24, 79);
    vertex(-48, 99);
    endShape();
    pop();
  }
}
class Ball {
  constructor(goalX, goalY) {
    this.x = width / 2;
    this.y = height / 2;
    this.goalX = goalX;
    this.goalY = goalY;
    this.distanceToGoal = dist(this.x, this.y, this.goalX, this.goalY);
    this.pixelsPerFrame = 4;
    this.stepNum = this.distanceToGoal / this.pixelsPerFrame;
    this.xDist = this.goalX - this.x;
    this.yDist = this.goalY - this.y;
    this.stepX = this.xDist / this.stepNum;
    this.stepY = this.yDist / this.stepNum;

    this.reachedGoal = false;
  }
  update() {
    if (this.reachedGoal == false) {
      this.x += this.stepX;
      this.y += this.stepY;
      this.distanceToGoal = dist(this.x, this.y, this.goalX, this.goalY);
      if (this.distanceToGoal > this.pixelsPerFrame) {
      } else {
        this.stepX = this.goalX - this.x;
        this.stepY = this.goalY - this.y;
      }
    }
    if (this.x == this.goalX && this.y == this.goalY) {
      this.reachedGoal = true;
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    if (this.reachedGoal == false) {
      fill(255);
    } else {
      fill(0, 100);
    }
    fill(random(255), random(255), random(255));
    circle(0, 0, 50);

    pop();
  }
}
function mousePressed() {
  balls.push(new Ball(mouseX, mouseY));
  if (mouseX < width / 2 && mouseY < height / 2) {
    // console.log("square01");
    xpos = 0;
    ypos = 0;
  } else if (mouseX > width / 2 && mouseY < height / 2) {
    // console.log("square02");
    xpos = width / 2 + width / 4;
    ypos = 0;
  } else if (mouseX < width / 2 && mouseY > height / 2) {
    // console.log("square03");
    xpos = 0;
    ypos = height / 2 + height / 4;
  } else if (mouseX > width / 2 && mouseY > height / 2) {
    // console.log("square04");
    xpos = width / 2 + width / 4;
    ypos = height / 2 + height / 4;
  }
}
//keyCode 65 = key A
function keyPressed() {
  if (keyCode == 65 && balls.length != 0) {
    Pattern1called = true;
  }
}
function Pattern1(a, b) {
  // scale(1 / 2);
  for (let i = 0; i < 2; i++) {
    p = new Particle(a, b);
    particles.push(p);
  }
  for (let i = 0; i < particles.length; i++) {
    particles[i].move();
    particles[i].display();
    if (particles[i].y > height / 2 || particles[i].x > width / 2) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dia = 30;
    this.xSpd = 0;
    this.ySpd = 2;
    this.color1 = random(255);
    this.color2 = random(255);
    this.color3 = random(255);
    this.length = 100;
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  display() {
    push();
    translate(this.x / 2, this.y / 2);
    stroke(this.color1, this.color2, this.color3);
    strokeWeight(2);
    line(this.x, this.y, this.length, 30);
    pop();
  }
}





