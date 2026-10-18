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



let inputtedHitbox;
let hitboxBirthTime = 0;

let hitboxes = {
  basic : {
    offset : 75,
    height : 50,
    width : 100,
    hitbox_lifetime : 100

  } ,
  uppercut : {

  } , 
  downslam : {

  } ,
  uptilt : {

  } ,
  dropkick : {

  }
} ; 



let entity;

const NO_INPUTS_DETECTED = 250;
const TERMINATE_INPUT_STORAGE = 750;
const SIZE = 75;
const GRAVITY = 2.25;




async function setup() {
  rectMode(CENTER);
  createCanvas(windowWidth, windowHeight);

  entity  = {
    player : {
      x : width - (width/3)*2,
      y : 50,

      ismoving : false,
      isattacking : false,

      vertstates : ['onGround', 'midFall', 'midJump'],
      curvertstate : null,

      facedir : 1,

      walkspeed : 10,

      vx : 0,
      vy : 0,

    } ,
    dummy : {
      x : 0 + (width/3)*2,
      y : height - SIZE/2,

    }
}

  rectMode(CENTER);
  imageMode(CENTER);

}


function draw() {
  background(220);

  processInputs();
  displayHitbox(inputtedHitbox);

  determineTimeSinceLastInput();

  spawnEntities();
  playerSettings();
}




function spawnEntities() {
  square(entity.player.x, entity.player.y, SIZE);
  square(entity.dummy.x, entity.dummy.y, SIZE);
}

function playerSettings() {

  // collision restricitons
  if (entity.player.x + SIZE/2 > width) {
    entity.player.x = width - SIZE/2;
  }
  else if (entity.player.x - SIZE/2 < 0) {
    entity.player.x = 0 + SIZE/2;
  }

  if (entity.player.y + SIZE/2 > height) {
    entity.player.curvertstate = entity.player.vertstates[0],
    entity.player.y = height - SIZE/2;
    entity.player.vy = 0;
  }
  else if (entity.player.y - SIZE/2 < 0) {
    entity.player.y = 0 + SIZE/2;
    entity.player.vy = 0;
  }

  // detect vertstates
  if (entity.player.vy <= 0 && entity.player.y + SIZE < height) {
    entity.player.curvertstate = entity.player.vertstates[2];
  }
  else if (entity.player.vy > 0 && entity.player.y + SIZE < height) {
    entity.player.curvertstate = entity.player.vertstates[1];
  }

  // base horizontal movement settings
  if (keyIsDown('a')) {
    entity.player.x -= entity.player.walkspeed
    entity.player.facedir = -1
  }
  if (keyIsDown('d')) {
    entity.player.x += entity.player.walkspeed
    entity.player.facedir = 1
  }

  // base vertical movement settings
  if (entity.player.curvertstate === entity.player.vertstates[0] && keyIsDown(' ')) {
    entity.player.vy -= 15;
  }
  if (entity.player.curvertstate === entity.player.vertstates[2] && keyIsDown(' ')) {
    entity.player.vy -= 1;
  }

  // gravity sim
  entity.player.vy += GRAVITY;
  entity.player.y += entity.player.vy;
}




function processInputs() {
  if (attackInputStorage.length >= 3) {
    let getAtkFirstThreeInputs = attackInputStorage.splice(0,3);
    let firstAtkItemCollective = getAtkFirstThreeInputs.join('');
    attackSequenceStorage.push(firstAtkItemCollective);
  }
  let currentAtkSequence = attackSequenceStorage.splice(0,1);
  let atkActions = {
    'lkm' : hitboxes.basic,
    'kmk' : 'downslam',
    'klk' : 'uppercut',
    'kll' : 'uptilt',
    'kmm' : 'dropkick',
  } ; 

  if (currentAtkSequence && atkActions[currentAtkSequence]) {
    inputtedHitbox = atkActions[currentAtkSequence];
    hitboxBirthTime = millis();
    entity.player.isattacking = true;
  }



 
  





  if (movementInputStorage.length >= 3) {
    let getMoveFirstThreeInputs = movementInputStorage.splice(0,3);
    let firstMoveItemCollective = getMoveFirstThreeInputs.join('');
    movementSequenceStorage.push(firstMoveItemCollective);
  }
  let currentMoveSequence = movementSequenceStorage.splice(0,1)[0];
  let moveActions = {
    'asd' : 'somethingelse',
    'awd' : 'right-greater-dash',
    'dsa' : 'left-lesser-dash',
    'dwa' : 'left-greater-dash',
  } ; 
  

}



function displayHitbox(input) {
  if (input && millis() < hitboxBirthTime + input.hitbox_lifetime && entity.player.isattacking) {
    rect((input.offset * entity.player.facedir) + entity.player.x, entity.player.y, input.width, input.height);
  }
  else {
    inputtedHitbox = null;
    entity.player.isattacking = false;
  }
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

