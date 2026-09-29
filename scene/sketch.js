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
let vertStates = [ "onGround", "midFall", "midJump"];
let curVerState;

async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {

  background(220);
  square(x,y,size);

  setBorders();
  moveAround();
  gravitySim();
  verticalStateSims();


  console.log(curVerState);
}


function gravitySim() {

  dy = dy + 0.508;
  y = y + dy;
  console.log(dy);
}

function moveAround() {
  if (keyIsDown('a')) {
    x -= 10;
  }
  else if (keyIsDown('d')) {
    x += 10;
  }
  else if (keyIsDown('s')) {
    y += 10;
  }
  else if (keyIsDown('w') && curVerState === vertStates[0]) {
    y -= 1000;
  }
}

function setBorders() {

  // Horizontal Detection
  if (x + size > width) {
    x = width - size;
  }
  else if (x < 0) {
    x = 0;
  }

  // Vertical Detection
  if (y + size > height) {
    dy = 0;
    y = height - size;
    curVerState = vertStates[0];
  }
}

function verticalStateSims() {
  if (y + size < height) {
    curVerState = vertStates[2];
  }
}