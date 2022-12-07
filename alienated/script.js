let inc = 0.007;
let start = 0;
let ss = 0;

function setup() {
  let cnv = createCanvas(windowWidth-100, windowHeight-100);
  cnv.parent("canvasContainer")
  flyingObject = new Plane(width - 1250, height - 500);
}

function draw() {
  background(127, 212, 224);
  // console.log(flyingObject.yspd)
  flyingObject.display();
  flyingObject.update();
  if (flyingObject.fall == true) {
    flyingObject.yspd = -0.5;
  }
  if (flyingObject.fall == false) {
    flyingObject.yspd = 0.25;
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
