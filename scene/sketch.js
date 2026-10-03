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

let projSpeed = 10;

let handX,handY;
let gunX, gunY;
let genAngle, angleGun, angleHand, projAngle;
let gunColor;

let modeStates = ["pellets", "shotgun", "beam"];
let curModeState = modeStates[0];
let modeStateCount = 0;

let projectileStorage = [];

let storedTime = 0;
let shotgunAmnt = 8;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  PlayerX = width/2;
  PlayerY = height - SIZE/2;

  rectMode(CENTER);
}



function draw() {

  background(220);

  changeSpeed();
  changeGunColor();

  horizBorders();
  baseVertStateDetector();

  plrBaseHorizMovement();
  plrBaseVertMovements();

  displayGunHand(PlayerX, PlayerY, 65, 115, 50);
  castProjectile();

  fill('white');
  square(PlayerX,PlayerY,SIZE);
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
    PlayerY = height - SIZE/2;
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
}



// Shifting Gun Modes
function mouseWheel() {
  modeStateCount += 1;
  modeStateCount = modeStateCount % (modeStates.length);
  curModeState = modeStates[modeStateCount]

  console.log(curModeState);
}

function changeGunColor() {
  if (curModeState === modeStates[0]) {
    gunColor = 'black'
  }
  else if (curModeState === modeStates[1]) {
    let interval = 100;
    if (millis() - storedTime >= interval) {
     gunColor = color(random(0,255),random(0,255),random(0,255)); 
     storedTime = millis();
    }
  }
}

function displayGunHand(x, y, handPlacement, gunPlacement) {
  genAngle = atan2(mouseY - y, mouseX - x);
  angleGun = genAngle;
  angleHand = genAngle;

  gunX = x + gunPlacement  * cos(angleGun);
  gunY = y + gunPlacement * sin(angleGun);

  push();
  translate(gunX,gunY);
  rotate(angleGun);
  fill(gunColor);
  rect(0,0,50,35);
  pop();

  handX = x + handPlacement  * cos(angleHand);
  handY = y + handPlacement * sin(angleHand);

  fill(gunColor);
  circle(handX,handY,SIZE/2);
}



// Casting projectiles
function mousePressed() {

  if (curModeState === modeStates[0]) {
    let projectile = {
      x: gunX,
      y: gunY,

      vx: cos(genAngle) * projSpeed,
      vy: sin(genAngle) * projSpeed,
    }

    projectileStorage.push(projectile);
  }
  else if (curModeState === modeStates[1]) {
    for (let i = 0; i < shotgunAmnt; i++) {

      let angleVariation = angleGun;
      angleVariation += random(-0.2, 0.2);

      let speedVariation = projSpeed;
      speedVariation += random(-2, 2);

      let projectile = {
        x: gunX,
        y: gunY,

        vx: cos(angleVariation) * speedVariation,
        vy: sin(angleVariation) * speedVariation,

        lifetime: millis(),
    }

      projectileStorage.push(projectile);
    }
  }
}

function castProjectile() {
  if (curModeState === modeStates[0]) {
    let bulletSize = 25;
    for (let i = projectileStorage.length - 1; i >= 0; i--) {
    
    circle(projectileStorage[i].x, projectileStorage[i].y, bulletSize);

    projectileStorage[i].x += projectileStorage[i].vx;
    projectileStorage[i].y += projectileStorage[i].vy;
    
    projectileStorage[i].vy += 0.75;

    if (offscreenCheck(projectileStorage[i].x,  projectileStorage[i].y)) {
      projectileStorage.splice(i,1);
      }
    }
  }
  else if (curModeState === modeStates[1]) {
    let bulletLife = 3000;
    let bulletSize = 15;
    for (let i = projectileStorage.length - 1; i >= 0; i--) {
    
      circle(projectileStorage[i].x, projectileStorage[i].y, bulletSize);

      projectileStorage[i].x += projectileStorage[i].vx;
      projectileStorage[i].y += projectileStorage[i].vy;
    
      projectileStorage[i].vy += 0.75;

      if (projectileStorage[i].y <= 0 - bulletSize/2 || projectileStorage[i].y >= height + bulletSize/2) {
        projectileStorage[i].vy *= -1;
      }
      else if (projectileStorage[i].x <= 0 - bulletSize/2 || projectileStorage[i].x >= width + bulletSize/2) {
        projectileStorage[i].vx *= -1;
      }
    

      if (millis() - projectileStorage[i].lifetime >= bulletLife) {
        projectileStorage.splice(i,1);
      }

    }
  }
}



// Miscellaenous or Extras

function changeSpeed() {
  if (keyIsDown('z')) {
    projSpeed++;
    if (projSpeed > 50) {
      projSpeed = 50;
    }
  }
  else if (keyIsDown('x')) {
    projSpeed--;
    if (projSpeed < 10) {
      projSpeed = 10;
    }
  }

  console.log(projSpeed);
}


function offscreenCheck(x, y) {
  return x < 0 || x > width || y < 0 || y > height;
}



