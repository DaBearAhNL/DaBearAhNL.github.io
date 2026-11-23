// Walker OOP Demo

class Walker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 50;
    this.diameter = 50;
    this.color = "red";
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
let theo;
let thing; 
let thiny;

async function setup() {
  
  createCanvas(windowWidth, windowHeight);
  newell = new Walker(width/2, height/2);
  theo = new Walker(300, 400);
  thing = new Walker(800, 200,);
  thiny = new Walker(600, 750);
  theo.color = "blue";
  thing.color = "green";
  thiny.color = "yellow";
  noStroke();
}

function draw() {
  newell.display();
  theo.display();
  thing.display();
  thiny.display();

  newell.move();
  theo.move();
  thing.move();
  thiny.move();
}
