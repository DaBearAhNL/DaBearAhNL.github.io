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





function storeAllowedInputs() {
  if (attackInputStorage.length >= 3) {

    let getFirstThreeInputs = attackInputStorage.splice(0,3)
    let firstItemCollective = getFirstThreeInputs.join('');

    attackSequenceStorage.push(firstItemCollective);

    
  }
}

function determineAction() {
  let currentSequence = attackSequenceStorage.splice(0,1);

  let actions = {
    'kmk' : 'basic',
    'lkm' : 'downslam',
    'mkl' : 'uppercut',
  } ; 

  console.log(actions[currentSequence]);
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