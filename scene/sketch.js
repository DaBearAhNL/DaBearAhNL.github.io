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
let groundState;

async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {

  
  moveAround();
  gravitySim();
  ifAir();
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

  dy = dy + 0.508;
  y = y + dy;
  console.log(dy);
}

function moveAround() {
  if (keyIsDown('a')) {
    x -= 5;
  }
  else if (keyIsDown('d')) {
    x += 5;
  }

  if (keyIsPressed && groundState) {
    if (key === ' ') {
      dy *= -1;
      console.log(y);
    }
  }
}

function ifAir() {
  if (y + size >= height) {
    groundState = true;
    console.log('ur ground');
  }
  else {
    groundState = false;
    console.log('ur air');
  }

}
