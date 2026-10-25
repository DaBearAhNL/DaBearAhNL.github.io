// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// ok the plan is that if u input a certain sequence of keys you do an action like in fighting games
// problem is its not a fighting game without hitting something
// a.

const NO_INPUTS_DETECTED = 100;
const TERMINATE_INPUT_STORAGE = 500;
const SIZE = 75;
const GRAVITY = 2.25;
const KB_RESIST = null;
const INSURANCE = 1500;

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
    offsetx : SIZE+SIZE/1.95,
    offsety : 0,
    height : SIZE,
    width : SIZE*2,
    atkspan : [35, 100, 50],
    statesvx : [1,1,1],
    statesvy : [0, 0, 0],
    vx : null,
    vy : null,
    air_resist : .5

  } ,
  uppercut : {
    offsetx : SIZE-SIZE/3,
    offsety : -SIZE/2,
    height : SIZE*2.25,
    width : SIZE,
    atkspan : [250,150,100],
    statesvx : [7.5,2.5,2.5],
    statesvy : [0, 0, 0],
    vx : null,
    vy : null,
    air_resist : 0.95

  } , 
  downslam : {
    offsetx : SIZE-SIZE/3,
    offsety : SIZE/2,
    height : SIZE*2.25,
    width : SIZE,
    atkspan : [250,300,200],
    statesvx : [7.5,2.5,2.5],
    statesvy : [0, 0, 0],
    vx : null,
    vy : null,
    air_resist : 0.95

  } ,
  uptilt : {
    offsetx : SIZE/1.5,
    offsety : -SIZE/1.5,
    height : SIZE*1.25,
    width : SIZE*1.25,
    atkspan : [0, 150, 0],
    statesvx : [20, 20, 20],
    statesvy : [-40, -40, -40],
    vx : null,
    vy : null,
    air_resist : 0.85


  } ,
  dropkick : {
    offsetx : SIZE/1.5,
    offsety : SIZE/1.5,
    height : SIZE*1.25,
    width : SIZE*1.25,
    atkspan : [0, 150, 0],
    statesvx : [20, 20, 20],
    statesvy : [40, 40, 40],
    vx : null,
    vy : null,
    air_resist : 0.85

  }
} ; 

let inputtedMovementTech;
let mtechBirthTime = 0;

let movementtech = {
  greatdashr : {
    vx : 0,
    vy : 0
  },
  greatdashl : {
    vx : 0,
    vy : 0
  },
  lesserdashr : {
    vx : 0,
    vy : 0
  },
  lesserdashr : {
    vx : 0,
    vy : 0
  }
} ;

let entity;


async function setup() {
  rectMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  entity  = {
    player : {
      x : width - width/3*2,
      y : 50,
      ismovingtech : false,
      movementstates : ['easein', 'easeout'],
      isattacking : false,
      atkstates : ['startup', 'activeframes', 'endlag'],
      curvertstate : false,
      vertstates : ['onGround', 'midFall', 'midJump'],
      facedir : 1,
      walkspeed : 7.5,
      vx : 0,
      vy : 0,
    } ,

    dummy : {
      x : 0 + width/3*2,
      y : height - SIZE/2,
      isonkb : false,
      vertstates : ['onGround', 'midFall', 'midJump'],
      curvertstate : null,
      vx : 0,
      vy : 0,
    } 
  } ;
  rectMode(CENTER);
  imageMode(CENTER);
}


function draw() {
  background(220);
  spawnEntities();
  determineTimeSinceLastInput();
  processInputs();
  determinePlrActionStates(inputtedHitbox); // gona have to group this cuz idk how to make movement abilities and atk actions into one function. meh
  displayHitbox(inputtedHitbox);
  plrMovementOnAtk(inputtedHitbox);
  hitboxCollide(inputtedHitbox);
  if (!entity.player.isattacking) {
    playerSettings();
    gravitySim();
  }
  entitySettings();
}







function spawnEntities() {
  fill('white');
  square(entity.player.x, entity.player.y, SIZE);
  square(entity.dummy.x, entity.dummy.y, SIZE);
}

function entitySettings() {
  let entities = [entity.player, entity.dummy];
  for (let objects of entities) {
    if (objects.x + SIZE/2 > width) {
      objects.x = width - SIZE/2;
    }
    else if (objects.x - SIZE/2 < 0) {
      objects.x = 0 + SIZE/2;
    }
    if (objects.y + SIZE/2 > height) {
      objects.curvertstate = objects.vertstates[0],
      objects.y = height - SIZE/2;
      objects.vy = 0;
    }
    else if (objects.y - SIZE/2 < 0) {
      objects.y = 0 + SIZE/2;
      objects.vy = 0;
    }

    if (objects.vy <= 0 && objects.y + SIZE < height) {
      objects.curvertstate = objects.vertstates[2];
    }
    else if (objects.vy > 0 && objects.y + SIZE < height) {
      objects.curvertstate = objects.vertstates[1];
    }
  }
}
  
function playerSettings() {
  // base horizontal movement settings

  if (keyIsDown('a')) {
    entity.player.x -= entity.player.walkspeed;
    entity.player.facedir = -1;
  }
  if (keyIsDown('d')) {
    entity.player.x += entity.player.walkspeed;
    entity.player.facedir = 1;
  }

  // base vertical movement settings
  if (entity.player.curvertstate === entity.player.vertstates[0] && keyIsDown(' ')) {
    entity.player.vy -= 15;
  }
  if (entity.player.curvertstate === entity.player.vertstates[2] && keyIsDown(' ')) {
    entity.player.vy -= 1;
  }
}

function gravitySim() {
  entity.player.vy += GRAVITY;
  entity.player.y += entity.player.vy;

  entity.dummy.vy += GRAVITY;
  entity.dummy.y += entity.dummy.vy;
}




function processInputs() {
  if (attackInputStorage.length >= 3) {
    let getAtkFirstThreeInputs = attackInputStorage.splice(0,3);
    let firstAtkItemCollective = getAtkFirstThreeInputs.join('');
    attackSequenceStorage.push(firstAtkItemCollective);

    let currentAtkSequence = attackSequenceStorage.splice(0,1);
    let atkActions = {
      'lkm' : hitboxes.basic,
      'kmk' : hitboxes.downslam,
      'lkl' : hitboxes.uppercut,
      'kll' : hitboxes.uptilt,
      'kmm' : hitboxes.dropkick,
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
    if (currentMoveSequence && moveActions[currentMoveSequence]) {
      inputtedMovementTech = moveActions[currentMoveSequence];
      mtechBirthTime = millis();
      entity.player.ismovingtech = true;
    }
  }
}


// I SO NEED TO FIX THIS AREA WHEN I GET TO SPRITES AND STUFF OH GOD

function determinePlrActionStates(input) {
  if (input) {

    let windup = input.atkspan[0];
    let activeframes = input.atkspan[0] + input.atkspan[1];
    let endlag = input.atkspan[0] + input.atkspan[1] + input.atkspan[2];

    if (millis() <= hitboxBirthTime + windup) {
      entity.player.isattacking = entity.player.atkstates[0];
      console.log('a');
    }
    else if (millis() <= hitboxBirthTime + activeframes) {
      entity.player.isattacking = entity.player.atkstates[1];
      console.log('b');
    }
    else if (millis() <= hitboxBirthTime + endlag) {
      entity.player.isattacking = entity.player.atkstates[2];
      console.log('c');
    }
    else {
      entity.player.isattacking = false;
      if (millis() >= hitboxBirthTime + endlag + INSURANCE) {
        inputtedHitbox = false;
      }
    
    }
  }
}

function displayHitbox(input) {
  if (input) {
    if (entity.player.isattacking === entity.player.atkstates[0]) {
      fill('blue');
      rect(input.offsetx * entity.player.facedir + entity.player.x, input.offsety + entity.player.y, input.width, input.height);
    }
    else if (entity.player.isattacking === entity.player.atkstates[1]) {
      fill('red');
      rect(input.offsetx * entity.player.facedir + entity.player.x, input.offsety + entity.player.y, input.width, input.height);
    }
    
  }
}

function plrMovementOnAtk(input) {
  let identifier = entity.player.atkstates.indexOf(entity.player.isattacking);
  console.log(identifier);
  if (input) {
    if (entity.player.isattacking) {
      entity.player.vy = 0;
      input.vx = input.statesvx[identifier];
      input.vy = input.statesvy[identifier];
      entity.player.x += input.vx * entity.player.facedir;
      entity.player.y += input.vy;
    }
    else if(!entity.player.isattacking) {
      entity.player.y += input.vy;
      entity.player.x += input.vx * entity.player.facedir;
      input.vy *= input.air_resist;
      input.vx *= input.air_resist;

      if (input.vy > 0 && entity.player.y >= height - SIZE/2 || entity.player.y <= 0 + SIZE/2) {
        input.vy = 0;
      }

      console.log(input.vy)
    }
  }
}

function hitboxCollide(input) {
  if (input) {
    let hitValid = collideRectRect(
      input.offsetx * entity.player.facedir + entity.player.x, input.offsety + entity.player.y, input.width, input.height,
      entity.dummy.x, entity.dummy.y, SIZE, SIZE
    );

    if (hitValid) {
      console.log('GHARHAHRHARHA ITS WORKING');
    }
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
  if (!entity.player.isattacking || entity.player.isattacking === entity.player.atkstates[2]) { 
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
 
}

