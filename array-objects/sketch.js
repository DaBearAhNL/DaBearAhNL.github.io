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
let allowedAttackInputs = ['k', 'l','m'];

let movementInputStorage = [];
let allowedMovementInputs = ['w', 'a', 's', 'd'];

let testingAThing = ' ';
let testingMThing = ' ';

let attackSequenceStorage = [];
let movementSequenceStorage = [];

async function setup() {
  createCanvas(windowWidth, windowHeight);

  rectMode(CENTER);
  imageMode(CENTER);

}



function draw() {
  background(220);

  storeAllowedInputs();
  determineAction();
}


function action1() {
  console.log("OH MY GOD THIS WORKS");
}



function storeAllowedInputs() {
  if (attackInputStorage.length >= 3) {
    attackSequenceStorage.push(attackInputStorage.splice(0,3));
    console.log(attackSequenceStorage);
  }
}

function determineAction() {
  let currentAction = attackSequenceStorage[0].join("");

  let actions = {
    'lkm' : action1(),
  } ; 

  actions[currentAction];
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
}