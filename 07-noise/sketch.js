// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let time = 1;
let deltatime = 0.01;
const TIMEOFFSET = 100000;


async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  let x = noise(time) * width;
  let y = noise(time + TIMEOFFSET) * height;
  fill('black');
  circle(x,y,50);

  time += deltatime;
}
