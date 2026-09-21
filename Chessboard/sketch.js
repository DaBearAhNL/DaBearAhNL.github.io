// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


async function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
}

function draw() {
  background(220);
  drawChess();
}

function drawChess() {
  let size = width/8;
  let value = true;
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if (value) {
        fill('white');
      }
      else {
        fill('black');
      }
      value = !value;
      rect(x*size, y*size, size);
    }
    value = !value;
  }
}