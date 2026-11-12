// make smthn happen in a set amount of time

let message = "taipen chat";

async function setup() {
  createCanvas(windowWidth, windowHeight);

  textAlign(CENTER,CENTER);
  textSize(50);
}

function draw() {
  background(220);
  text(message, width/2, height/2);

  window.setTimeout(newMessage, 3000);
}

function newMessage() {
  message = "daemontide";
}