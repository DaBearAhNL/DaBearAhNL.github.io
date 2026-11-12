// window.setInterval demo

let theColor;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  changeColor();

  //call changeColor function once every half second
  window.setInterval(changeColor, 50);
}

function draw() {
  background(220);

  fill(theColor);
  circle(width/2, height/2, 400);

}

function changeColor() {
  theColor = color(random(255), random(255), random(255));
}
