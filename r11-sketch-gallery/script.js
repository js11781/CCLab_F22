// CCLab Mini Project - 7.R Particles Template
// Instruction:
// press on canvas to change color of the raindrops
// press "x" to change size of the raindrops

let particles = [];
let totalNum = 10; // Decide the number of particles here.

function setup() {
  //  Generate Particles
  for (let i = 0; i < totalNum; i++) {
    particles[i] = new Particle(random(-width, width), random(height));
  }
  let cnv = createCanvas(600, 600);
  cnv.parent("canvasContainer")
}

function draw() {
  background(50);
  //  Particles update and display
  for (let i = 0; i < 2; i++) {
    p = new Particle(random(width), random(height));
    particles.push(p);
  }
  for (let i = 0; i < particles.length; i++) {
    particles[i].move();
    particles[i].display();
    if (particles[i].check()) {
      particles.splice(i, 1);
    }
  }
}

//  Design interactions by using Mouse or Keyboard
function mousePressed() {
  //..generate an object when mousePressed at the location of  mouseX,mouseY
  particles.push(new Particle(mouseX, mouseY));
}

//----------------------------------OOP:Class
class Particle {
  //  Constructor Function:properties
  constructor(x, y) {
    this.x = random(-width, width);
    this.y = random(0, height);
    this.dia = 30;
    this.xSpd = 0;
    this.ySpd = 2;
    this.color1 = 20;
    this.color2 = 20;
    this.color3 = 30;
    this.length = 100;
  }

  // methods
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }

  //  Particle's appearance
  display() {
    push();
    translate(this.x, this.y);

    // Design the particle's appearance here.
    // YOUR CODE GOES HERE:
    stroke(this.color1, this.color2, this.color3);
    strokeWeight(2);
    line(this.x, this.y, this.length, 30);

    pop();
  }
  // Implement (at least three) more methods(functions) for the particle's behaviors

  // Design the 1st behavior/method for your Particle
  // YOUR CODE GOES HERE:
  changecolor() {
    this.color1 = random(0, 255);
    this.color2 = random(0, 255);
    this.color3 = random(0, 255);
  }
  // Design the 2nd behavior/method for your Particle
  // YOUR CODE GOES HERE:
  check() {
    return this.y > height;
  }
  // Design the 3rd behavior/method for your Particle
  // YOUR CODE GOES HERE:
  sizechange() {
    this.length = 50;
  }


  // *Design more behavior/method for your Particle* [optional]
  // YOUR CODE GOES HERE:
}

function mousePressed() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].changecolor();
  }
}

function keyPressed() {
  if (key == "x") {
    for (let i = 0; i < particles.length; i++) {
      particles[i].sizechange();
    }
  }
}
