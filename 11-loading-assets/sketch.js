// Loading Images and Sounds

let zombieImg;
let zombieSFX;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  zombieImg = await loadImage("skeleton-move_8.png");
  zombieSFX = await loadSound("zombie-12.wav");
}

function draw() {
  background('black');

  image(zombieImg, width/2, height/2); 
}

function mousePressed() {
  zombieSFX.play();
}
