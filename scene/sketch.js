// Interactive Scene
// Newell Devera
// October 22, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let PlayerDy = 0.5;
let PlayerX, PlayerY;

let vertStates = [ "onGround", "midFall", "midJump"];
let PlrVertState;

const GRAVITY = 2.25;
const SIZE = 125;

let distance;
let projectilePosX = [];
let projectilePosY = [];


async function setup() {
  createCanvas(windowWidth, windowHeight);

  PlayerX = width/2;
  PlayerY = height - SIZE/2;

  rectMode(CENTER);
}

function draw() {

  background(220);

  square(PlayerX,PlayerY,SIZE);

  horizBorders();
  baseVertStateDetector();

  plrBaseHorizMovement();
  plrBaseVertMovements();

  let distance = dist(PlayerX, PlayerY, mouseX, mouseY);
  console.log(distance);
}


// Base Entity Horizontal Movements

function plrBaseHorizMovement() {
  if (keyIsDown('a')) {
    PlayerX -= 10;
  }
  if (keyIsDown('d')) {
    PlayerX += 10;
  }
}

function horizBorders() {
  if (PlayerX + SIZE/2 > width) { // Right Detection
    PlayerX = width - SIZE/2;
  }
  else if (PlayerX < 0 + SIZE/2) { // Left Detection
    PlayerX = 0 + SIZE/2;
  }
}


// Base Entity Vertical Movements

function plrBaseVertMovements() {
  if (PlrVertState === vertStates[0] && keyIsDown(' ')) {
    PlayerDy -= 12.5;
  }
  else if (PlrVertState === vertStates[2] && keyIsDown(' ')) {
    PlayerDy -= 0.75;
  }
  
  gravitySim();
}

function baseVertStateDetector() {
   if (PlayerY + SIZE/2 > height) {
    PlrVertState = vertStates[0];
    PlayerY = height - SIZE/2
    PlayerDy = 0;
  }
  else if (PlayerDy <= 0 && PlayerY + SIZE < height) {
    PlrVertState = vertStates[2];
  }
  else if (PlayerDy > 0 && PlayerY + SIZE < height) {
    PlrVertState = vertStates[1];
  }
}

function gravitySim() {
  PlayerDy += GRAVITY;
  PlayerY += PlayerDy;

  // DumDy += GRAVITY;
  // DumY += DumDy;
}


function mousePressed() {

}






