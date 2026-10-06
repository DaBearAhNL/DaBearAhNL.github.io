// Interactive Scene
// Newell Devera
// October 2, 2026
//
// Extra for Experts:
// - For the extras for experts, I was able to use the scroll wheel to shift states, used atan2 function to aim the projectile, learned how to rotate objects.

let PlayerDy = 0.5;
let PlayerX, PlayerY;
let PlayerSpeed = 10;

let vertStates = ["onGround", "midFall", "midJump"];
let PlrVertState;

const GRAVITY = 2.25;
const SIZE = 125;

let projSpeed = 10;

let handX,handY;
let gunX, gunY;
let genAngle, projAngle;

let gunColor;
let projectileColor;
let colorGunCounter = 0;
let colorProjectileCounter = 0;
let colorGunLerpDirection = 1;
let colorProjectileLerpDirection = 1;

let modeStates = ["pellets", "shotgun", "beam"];
let curModeState = modeStates[0];
let modeStateCount = 0;

let projectileStorage = [];

let storedTime = 0;
let shotgunAmnt = 8;
let isLaserOn = false;


// SETUP FUNCTION
async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  PlayerX = width/2;
  PlayerY = height - SIZE/2;

  rectMode(CENTER);
}


// DRAW LOOP
function draw() {

  background(220);

  displayInstructions();

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


// BASE PLAYER HORIZONTAL MOVEMENTS AND RESTRICTIONS
function plrBaseHorizMovement() {

  if (keyIsDown('a')) {
    PlayerX -= PlayerSpeed;
  }

  if (keyIsDown('d')) {
    PlayerX += PlayerSpeed;
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


// BASE PLAYER VERTICAL MOVEMENTS AND RESTRICTIONS
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


// SWITCHING GUN MODES
function mouseWheel() {

  modeStateCount += 1;
  modeStateCount = modeStateCount % (modeStates.length);
  curModeState = modeStates[modeStateCount]

  projectileStorage = [];
  isLaserOn = false;
}


// CHANGING GUN AND PELLET COLORS (why did the last part take longer than making the beam mode)
function changeGunColor() {

  if (curModeState === modeStates[0]) {
    gunColor = 'black';
  }

  else if (curModeState === modeStates[1]) {
    let interval = 100;
    if (millis() - storedTime >= interval) {
      gunColor = color(random(0,55),random(0,55),random(0,55)); 
      projectileColor = color(random(0,255),random(0,255),random(0,255)); 
      storedTime = millis();
    }
  }

  else if (curModeState === modeStates[2]) {
    let gunColor1 = color(34,39,43);
    let gunColor2 = color(28,55,77);
    let pelletColor1 = color(random(150,255),random(150,255),random(150,255));
    let pelletColor2 = color(random(100,205),random(100,205),random(100,205));

    projectileColor = lerpColor(pelletColor1,pelletColor2,colorProjectileCounter);
    gunColor = lerpColor(gunColor1,gunColor2,colorGunCounter);

    colorGunCounter += 0.005 * colorGunLerpDirection;
    colorProjectileCounter += 0.01 * colorGunLerpDirection;

    if (colorGunCounter <= 0 && colorGunCounter < 1 || colorGunCounter >= 1) {
      colorGunLerpDirection *= -1;
    }
    if (colorProjectileCounter <= 0 && colorProjectileCounter < 1 || colorProjectileCounter >= 1) {
      colorProjectileLerpDirection *= -1;
    }
  }
}


// CALCULATING PLACE TO AIM
function displayGunHand(x, y, handPlacement, gunPlacement) {

  genAngle = atan2(mouseY - y, mouseX - x);

  gunX = x + gunPlacement  * cos(genAngle);
  gunY = y + gunPlacement * sin(genAngle);

  push();
  translate(gunX,gunY);
  rotate(genAngle);
  fill(gunColor);
  rect(0,0,50,35);
  pop();

  handX = x + handPlacement  * cos(genAngle);
  handY = y + handPlacement * sin(genAngle);

  fill(gunColor);
  circle(handX,handY,SIZE/2);
}


// INITIATING PROJECTILES
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

      let angleVariation = genAngle;
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

  else if (curModeState === modeStates[2]) {
    isLaserOn = !isLaserOn;

    let projectile = {
      laserlength: 2000,
      laserwidth: 20,

      incrementsby: 1,
    }
    projectileStorage.push(projectile);
  
  }
}


// RENDERING PROJECTILE
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
      fill(projectileColor);
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

  else if (curModeState === modeStates[2]) {
    let beamCenterX = PlayerX + 1135 * cos(genAngle);
    let beamCenterY = PlayerY + 1135 * sin(genAngle);
    for (let i = projectileStorage.length - 1; i >= 0; i--) {

      push()
      translate(beamCenterX,beamCenterY);
      rotate(genAngle);
      fill(projectileColor)
      rect(0, 0, projectileStorage[i].laserlength, projectileStorage[i].laserwidth);
      pop();

      if (isLaserOn) {
        projectileStorage[i].laserwidth += projectileStorage[i].incrementsby
        projectileStorage[i].incrementsby *= 1.025

        if (projectileStorage[i].laserwidth > 125) {
          projectileStorage[i].laserwidth = 125
        }
      }

      else if (!isLaserOn) {
        projectileStorage[i].laserwidth -= projectileStorage[i].incrementsby
        projectileStorage[i].incrementsby *= 1.025

        if (projectileStorage[i].laserwidth < 0) {
          projectileStorage.splice(i, 1);
        }
      }
    }
  }
}


// MISCELLANOUS OR EXTRAS
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
}

function offscreenCheck(x, y) {
  return x < 0 || x > width || y < 0 || y > height;
}

function displayInstructions() {
  fill(0);
  text('Scroll to switch modes', 50, 50);
  text('Z or X to speed up or slow down bullets', 50, 60);
  text('Mouse click to fire', 50, 70);
  text('WASD to move around and SPACE to jump', 50, 80);
}

// mayafa ya huu huu (win them)