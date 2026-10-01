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

let mode = true;
let squareColor;

const GRAVITY = 2.5;

async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {

  background(220);
  fill(squareColor);
  square(x,y,size);

  
  setBorders();
  moveAround();
  
  verticalStateSims();

  switchTools();
  switchColors();


  console.log(curVerState);
}


function moveAround() {
  if (keyIsDown('a')) {
    x -= 10;
  }
  if (keyIsDown('d')) {
    x += 10;
  }
  
  if (keyIsDown(' ') && curVerState === vertStates[0]) {
    dy -= 17.5;
  }
  else if (keyIsDown(' ') && curVerState === vertStates[2] && dy < 0) {
    dy -= 1.58;
  }

}

function setBorders() {

  // Horizontal Detection
  if (x + size > width) { // Right Detection
    x = width - size;
  }
  else if (x < 0) { // Left Detection
    x = 0;
  }

  // Vertical Detection
  if (y + size > height) { // Ground Detection
    dy = 0;
    y = height - size;
    curVerState = vertStates[0];
  }
  if (y - size < 0) { // Ceiling Detection
    y = 0 + size;
  }
} 

function verticalStateSims() {
  if (y + size < height && curVerState !== vertStates[1]) {
    curVerState = vertStates[2];
  }

  if (dy > 0) {
    curVerState = vertStates[1];
  }
  
  dy = dy + GRAVITY;
  y = y + dy;
  console.log(dy);
}

function switchTools() {
  if (key === 'q') {
    mode = true;
  }
  if(key ==='e') {
    mode = false;
  }
}


function switchColors() {
  if (mode) {
    squareColor = 'red';
  }
  else if (!mode) {
    squareColor = 'white';
  }
}