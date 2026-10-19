// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// ok the plan is that if u input a certain sequence of keys you do an action like in fighting games
// problem is its not a fighting game without hitting something
// a.

const NO_INPUTS_DETECTED = 250;
const TERMINATE_INPUT_STORAGE = 750;
const SIZE = 75;
const GRAVITY = 2.25;
const KB_RESIST = null;


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
    hitbox_lifetime : 100,

    storedvx : 6,
    storedvy : -1,
    
    vx : 6,
    vy : -1,

    air_resist : 0

  } ,
  uppercut : {
    offset : 75,
    height : 50,
    width : 100,
    hitbox_lifetime : 100,

    storedvx : 35,
    storedvy : -70,

    vx : 6,
    vy : -1,

    air_resist : 0

  } , 
  downslam : {
    offset : 75,
    height : 50,
    width : 100,
    hitbox_lifetime : 100,

    storedvx : 35,
    storedvy : -70,

    vx : 6,
    vy : -1,

    air_resist : 0

  } ,
  uptilt : {
    offset : 75,
    height : 50,
    width : 100,
    hitbox_lifetime : 200,

    storedvx : 35,
    storedvy : -90,

    vx : 35,
    vy : -90,

    air_resist : 0.9


  } ,
  dropkick : {
    offset : 75,
    height : 50,
    width : 100,
    hitbox_lifetime : 100,

    storedvx : 35,
    storedvy : 70,

    vx : 35,
    vy : 70,

    air_resist :   1.5


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
      isattacking : false,

      vertstates : ['onGround', 'midFall', 'midJump'],
      curvertstate : null,

      facedir : 1,

      walkspeed : 10,

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

  processInputs();
  displayHitbox(inputtedHitbox);

  determineTimeSinceLastInput();

  spawnEntities();
  entitySettings();
  if (!entity.player.isattacking) {
    playerSettings();
    gravitySim();
    
  }
  
 

  console.log(attackInputStorage);

}







function spawnEntities() {
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
  }
  let currentAtkSequence = attackSequenceStorage.splice(0,1);
  let atkActions = {
    'lkm' : hitboxes.basic,
    'kmk' : hitboxes.downslam,
    'klk' : hitboxes.uppercut,
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



function displayHitbox(input) {
  if (input && millis() < hitboxBirthTime + input.hitbox_lifetime && entity.player.isattacking) {
    rect(input.offset * entity.player.facedir + entity.player.x, entity.player.y, input.width, input.height);
    console.log(input.vy);
  }
  else {
    inputtedHitbox = null;
    entity.player.isattacking = false;
  }
}

function affectDummy(input) {

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
  if (!entity.player.isattacking) { 
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

