// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

const GREEN = 'green';
const YELLOW = 'yellow';
const RED = 'red';
let state = GREEN;

let switchTime = 0;
let greenLightDur = 3000;
let yellowLightDur = 1000;
let redLightDur = 3000;

async function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  chooseCorrectLight();
  drawOutlineOfLights();
  displayCorrectLight();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);
}

function displayCorrectLight() {
  if (state === GREEN) {
    fill('green');
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }
  if (state === YELLOW) {
    fill('yellow');
    ellipse(width/2, height/2, 50, 50); //middle
  }
  if (state === RED) {
    fill('red');
    ellipse(width/2, height/2 - 65, 50, 50); //top
  }
}

function chooseCorrectLight() {
  if (state === GREEN && millis() >= switchTime + greenLightDur) {
    state = YELLOW;
    switchTime = millis();
  }
  if (state === YELLOW && millis() >= switchTime + yellowLightDur) {
    state = RED;
    switchTime = millis();
  }
  if (state === RED && millis() >= switchTime + redLightDur) {
    state = GREEN;
    switchTime = millis();
  }
}