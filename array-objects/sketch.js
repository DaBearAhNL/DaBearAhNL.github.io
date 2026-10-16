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
let testingAThing = ' ';
let attackSequenceStorage = [];
let isCurAtkInputting = false;
let lastAtkInpTime;

let movementInputStorage = [];
let allowedMovementInputs = ['w', 'a', 's', 'd'];
let testingMThing = ' ';
let movementSequenceStorage = [];
let isCurMoveInputting = false;
let lastMoveInpTime;

const NO_INPUTS_DETECTED = 250;
const TERMINATE_INPUT_STORAGE = 750;

c;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  rectMode(CENTER);
  imageMode(CENTER);

}



function draw() {
  background(220);

  processInputs();
  determineTimeSinceLastInput();
}



function processInputs() {
  if (attackInputStorage.length >= 3) {
    let getAtkFirstThreeInputs = attackInputStorage.splice(0,3);
    let firstAtkItemCollective = getAtkFirstThreeInputs.join('');
    attackSequenceStorage.push(firstAtkItemCollective);
  }
  let currentAtkSequence = attackSequenceStorage.splice(0,1);
  let atkActions = {
    'lkm' : 'basic',
    'kmk' : 'downslam',
    'klk' : 'uppercut',
    'kll' : 'uptilt',
    'kmm' : 'dropkick',
  } ; 
  console.log(atkActions[currentAtkSequence]);

  if (movementInputStorage.length >= 3) {
    let getMoveFirstThreeInputs = movementInputStorage.splice(0,3);
    let firstMoveItemCollective = getMoveFirstThreeInputs.join('');
    movementSequenceStorage.push(firstMoveItemCollective);
  }
  let currentMoveSequence = movementSequenceStorage.splice(0,1);
  let moveActions = {
    'asd' : 'right-lesser-dash',
    'awd' : 'right-greater-dash',
    'dsa' : 'left-lesser-dash',
    'dwa' : 'left-greater-dash',
  } ; 
  console.log(moveActions[currentMoveSequence]);
}


function determineTimeSinceLastInput() {
  if (isCurAtkInputting === true && millis() >= lastAtkInpTime + NO_INPUTS_DETECTED) {
    isCurAtkInputting = false;
  }
  else if (isCurAtkInputting === false && millis() >= lastAtkInpTime + TERMINATE_INPUT_STORAGE) {
    attackInputStorage = [];
  }

  if (isCurMoveInputting === true && millis() >= lastMoveInpTime + NO_INPUTS_DETECTED) {
    isCurMoveInputting = false;
  }
  else if (isCurMoveInputting === false && millis() >= lastMoveInpTime + TERMINATE_INPUT_STORAGE) {
    movementInputStorage = [];
  }
}

function keyPressed() {
  if (allowedAttackInputs.includes(key)) {
    testingAThing = key;
    isCurAtkInputting = true;
    lastAtkInpTime = millis();

    attackInputStorage.push(testingAThing);
  }

  if (allowedMovementInputs.includes(key)) {
    testingMThing = key;
    isCurMoveInputting = true;
    lastMoveInpTime = millis();

    movementInputStorage.push(testingMThing);
  }
}

