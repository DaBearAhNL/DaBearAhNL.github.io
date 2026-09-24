// Interactive Scene
// Newell Devera
// October 22, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let dy = 1;
let x = 50;
let y = 50;
let size = 100;

async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {

  gravitySim();
  console.log(key);

}


function gravitySim() {
  
  background(220);
  square(x,y,size);

  if (y + size > height) {
    dy = 0;
    y = height - size;
    console.log(y+size);
  }

  dy = dy + 0.598;
  y = y + dy;
  console.log(dy);
}
