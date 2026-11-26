// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let newParticles = [];
let amntOfParticles = 100;
let newId = 0;

class Particle {
  constructor(settings){
    this.x = settings.x;
    this.y = settings.y;
    this.dx = settings.dx;
    this.dy = settings.dy;
    this.diameter = settings.diameter;
    this.r = settings.r;
    this.g = settings.g;
    this.b = settings.b;
    this.opacity = settings.opacity;
    this.fadeBy = settings.fadeBy;
    this.id = settings.id;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.diameter);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.opacity -= this.fadeBy;

    if (this.opacity < 5) {
      let particleLocation = newParticles.findIndex(particle => particle.id === this.id);
      newParticles.splice(particleLocation, 1);
    }
  }
}

async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  for (let particle of newParticles) {
    particle.display();
    particle.update();
  }

  console.log(newParticles);
}

function mousePressed() {
  for (let i = 0; i < amntOfParticles; i++) {
    let particleSettings = {
      x : mouseX,
      y : mouseY,
      dx : random(-5,5),
      dy : random(-5,5),
      diameter : Math.floor(random(0,5)),
      r : random(0, 255),
      g : random(0, 255),
      b : random(0, 255),
      opacity : 255,
      fadeBy : 5,
      id : newId
    } ;

    let particle = new Particle(particleSettings);
    newParticles.push(particle);
    newId++;
  }
  
}
