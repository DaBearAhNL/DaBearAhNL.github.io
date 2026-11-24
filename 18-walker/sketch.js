// Walker OOP Demo

class Walker {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.diameter = 10;
    this.color = color;
  }

  display() {
    fill(this.color);
    circle(this.x, this.y, this.diameter);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      this.y -= this.speed;
    }
    else if(choice < 50) {
      this.y += this.speed;
    }
    else if (choice < 75) {
      this.x -= this.speed;
    }
    else {
      this.x += this.speed;
    }
  }
}

let newell; 
let walkerStorage = [];

async function setup() {
  
  createCanvas(windowWidth, windowHeight);
  newell = new Walker(width/2, height/2);
  noStroke();
}

function draw() {

  newWalker();
  walkerBehaviour();
}

function newWalker() {
  let newColor = color(random(255), random(255), random(255));
  let walker = new Walker(random(0, width), random(0, height), newColor);

  walkerStorage.push(walker);
}

function walkerBehaviour() {
  for (let walker of walkerStorage) {
    walker.move();
    walker.display();
  }
}
