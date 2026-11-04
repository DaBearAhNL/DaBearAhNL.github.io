// Grid Game
// Newell Devera
// November 4, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let testing;
class entity {
  createThing(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.h = height;
    this.w = width;

    rect(this.x, this.y, this.h, this.w);
  }
  
}

async function setup() {
  createCanvas(windowWidth, windowHeight);

  testing = new entity;
}

function draw() {
  background(220);

  testing.createThing(500, 200, 60, 100);

}

