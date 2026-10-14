// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// ok the plan is that if u input a certain sequence of keys you do an action like in fighting games
// problem is its not a fighting game without hitting something
// a.


let attackInputStorage = [];
let allowedAttackInputs = ['k', 'l'];

let movementInputStorage = [];
let allowedMovementInputs = ['w', 'a', 's', 'd'];

let testingAThing = ' ';
let testingMThing = ' ';

let storageOfThings = [];

async function setup() {
  createCanvas(windowWidth, windowHeight);

  rectMode(CENTER);
  imageMode(CENTER);

}



function draw() {
  background(220);

}


function keyPressed() {
  if (allowedAttackInputs.includes(key)) {
    testingAThing = key;

    attackInputStorage.push(testingAThing);
    console.log(attackInputStorage);
  }

  if (allowedMovementInputs.includes(key)) {
    testingMThing = key;

    movementInputStorage.push(testingMThing);
    console.log(movementInputStorage);
  }

  if (key === ' ') {
    if (attackInputStorage.length >= 3) {
      storageOfThings.push(attackInputStorage.splice(0, 3));

      console.log(storageOfThings[0]);
      storageOfThings.splice(0,1);
    }
  }
}


