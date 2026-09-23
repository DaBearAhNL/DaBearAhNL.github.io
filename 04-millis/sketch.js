// Millis Demo

let waitTime = 2000;
let lastSwapTime = 0;
let state = 'red';

async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  switchState();
  displayColor();
  console.log(millis());
}

function switchState() {
  if (millis() > lastSwapTime + waitTime) {
    lastSwapTime = millis();
    if (state === 'red') {
      state = 'black';
    }
    else if (state === 'black') {
      state = 'red';
    }
  }
}

function displayColor() {
  if (state === 'black') {
    background('red');
    console.log('tada');
  }
  else if (state === 'red') {
    background('black');
    console.log('nada');
  }
}
