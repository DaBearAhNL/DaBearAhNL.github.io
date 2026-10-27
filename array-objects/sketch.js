// Project Title
// Your Name
// Date
//
// Extra for Experts:
// In this project, I learned how to use the class functions and sprite cycling with the help of this tutorial : https://www.youtube.com/watch?v=eE65ody9MdI&t=202s.
// I also do hope you consider the complexity of my code as an extra for experts.

// sir this comment is from 10:16 pm on the due date im currently fighting against time to get the sound effects in and making it look clean.
// this project has gotta be the one to make my heart race the most.

const NO_INPUTS_DETECTED = 100;
const TERMINATE_INPUT_STORAGE = 500;
const SIZE = 75;
const GRAVITY = 0.75;
const KB_RESIST = 0.9;
const INSURANCE = 1500;
const REDUCE_SCREEN_SHAKE = 0.85;

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

let hitboxKbStorageX;
let hitboxKbStorageY;
let hitboxDirStorage;
let hitboxDissonancePrevention = false;

let screenShakeIntensity;
let screenShakeAmount;
let shakeX;
let shakeY;
let hitstopAmount;

let hitboxes = {
  basic : {
    sizes : [SIZE+SIZE/1.95, 0, SIZE*2, SIZE],
    span : [35, 100, 50],
    statesvx : [1,1,1],
    statesvy : [0, 0, 0],
    plrvx : null,
    plrvy : null,
    plrdrag : 0.5,

    kbx : 10,
    kby : -5,

    amountss : 20,
    intensityss : 2.5,
    hsamount : 5,

    anim : null,
    yfaceanim : 1,
    framesby : 0.75,
    animoffsetx : SIZE+SIZE/1.95,
    animoffsety : 0,
    xscale : 2,
    yscale : 2.5,
  } ,
  uppercut : {
    sizes : [SIZE-SIZE/3, -SIZE/2, SIZE, SIZE*2.5],
    span : [250,150,100],
    statesvx : [7.5,2.5,2.5],
    statesvy : [0, 0, 0],
    plrvx : null,
    plrvy : null,
    plrdrag : 0.95,

    kbx : 10,
    kby : -95,

    amountss : 15,
    intensityss : 5,
    hsamount : 35,

    anim : null,
    yfaceanim : 1,
    framesby : 0.35,
    animoffsetx : 10,
    animoffsety : 0,
    xscale : 2,
    yscale : 4,
  } , 
  downslam : {
    sizes : [SIZE-SIZE/3, SIZE/2, SIZE, SIZE*2.5],
    span : [250,300,200],
    statesvx : [7.5,2.5,2.5],
    statesvy : [0, 0, 0],
    plrvx : null,
    plrvy : null,
    plrdrag : 0.95,

    kbx : 10,
    kby : 95,

    amountss : 15,
    intensityss : 5,
    hsamount : 35,

    anim : null,
    yfaceanim : -1,
    framesby : 0.35,
    animoffsetx : 10,
    animoffsety : 0,
    xscale : 2,
    yscale : 4,
  } ,
  uptilt : {
    sizes : [SIZE/1.5, -SIZE/1.5, SIZE*1.25, SIZE*1.25],
    span : [0, 150, 0],
    statesvx : [20, 20, 20],
    statesvy : [-40, -40, -40],
    plrvx : null,
    plrvy : null,
    plrdrag : 0.85,

    kbx : 30,
    kby : -50,

    amountss : 15,
    intensityss : 5,
    hsamount : 20,

    anim : null,
    yfaceanim : -1,
    framesby : 1,
    animoffsetx : 0,
    animoffsety : 0,
    xscale : 2,
    yscale : 1.5,
  } ,
  dropkick : {
    sizes : [SIZE/1.5, SIZE/1.5, SIZE*1.25, SIZE*1.25],
    span : [0, 150, 0],
    statesvx : [20, 20, 20],
    statesvy : [40, 40, 40],
    plrvx : null,
    plrvy : null,
    plrdrag : 0.85,

    kbx : 30,
    kby : -45,

    amountss : 15,
    intensityss : 5,
    hsamount : 20,

    anim : null,
    yfaceanim : 1,
    framesby : 1,
    animoffsetx : 0,
    animoffsety : 0,
    xscale : 2,
    yscale : 1.5,
  }
} ; 

let inputtedMovementTech;
let mtechBirthTime = 0;

let movementtech = {
  greatdashr : {
    span : [100, 100],
    statesvx : [50, 20],
    statesvy : [0, 0],
    plrvx : null,
    plrvy : null,
    plrdrag : 0.85
  },
  greatdashl : {
    span : [100, 100],
    statesvx : [-50, -20],
    statesvy : [0, 0],
    plrvx : null,
    plrvy : null,
    plrdrag : 0.85
  },
  lesserdashr : {
    span : [50, 100],
    statesvx : [20, 10],
    statesvy : [0, 0],
    plrvx : null,
    plrvy : null,
    plrdrag : 0.85
  },
  lesserdashl : {
    span : [50, 100],
    statesvx : [-20, -10],
    statesvy : [0, 0],
    plrvx : null,
    plrvy : null,
    plrdrag : 0.85
  }
} ;

let entity;

let animations;
let heavyAttackSprites;
let lightAttackSprites;
let dashAttackSprites;


function AnimSprite(spriteSheet, yface, framesby, offsetx, offsety, xscale, yscale) {
  this.sheet = spriteSheet;
  this.x = entity.player.x;
  this.y = entity.player.y;
  this.h = spriteSheet.height;
  this.curframe = 0;
  this.totalframes = spriteSheet.width / spriteSheet.height;
  this.yface = yface;
  this.framesby = framesby;
  this.offsetx = offsetx;
  this.offsety = offsety;
  this.xscale = xscale;
  this.yscale = yscale;

  this.draw = function() {
    
    this.x = entity.player.x + offsetx * entity.player.facedir;
    this.y = entity.player.y + offsety;

    push();
    translate(this.x, this.y);
    scale(entity.player.facedir, this.yface);

    image(this.sheet, 0, 0, this.h*xscale, this.h*yscale,
      this.h*floor(this.curframe), 0, this.h, this.h
    )

    pop();

    if (!hitstopAmount) {
      this.curframe += this.framesby;
    }
    
  }
}


async function setup() {
  rectMode(CENTER);
  createCanvas(windowWidth, windowHeight);

  heavyAttackSprites = await loadImage("heavyattack.png");
  lightAttackSprites = await loadImage("lightattack.png")
  dashAttackSprites = await loadImage("dashattack.png")

 
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
      kbcurvalue : null,
      kbstates : ['light', 'heavy'],
      curvertstate : false,
      vertstates : ['onGround', 'midFall', 'midJump'],
      vx : 0,
      vy : 0,
    }
  } ;

  hitboxes.basic.anim = new AnimSprite(lightAttackSprites, hitboxes.basic.yfaceanim, hitboxes.basic.framesby,
    hitboxes.basic.animoffsetx, hitboxes.basic.animoffsety, hitboxes.basic.xscale, hitboxes.basic.yscale
  );
  hitboxes.downslam.anim = new AnimSprite(heavyAttackSprites, hitboxes.downslam.yfaceanim, hitboxes.downslam.framesby,
    hitboxes.downslam.animoffsetx, hitboxes.downslam.animoffsety, hitboxes.downslam.xscale, hitboxes.downslam.yscale
  );
  hitboxes.uppercut.anim = new AnimSprite(heavyAttackSprites, hitboxes.uppercut.yfaceanim, hitboxes.uppercut.framesby,
    hitboxes.uppercut.animoffsetx, hitboxes.uppercut.animoffsety, hitboxes.uppercut.xscale, hitboxes.uppercut.yscale
  );
  hitboxes.uptilt.anim = new AnimSprite(dashAttackSprites, hitboxes.uptilt.yfaceanim, hitboxes.uptilt.framesby,
    hitboxes.uptilt.animoffsetx, hitboxes.uptilt.animoffsety, hitboxes.uptilt.xscale, hitboxes.uptilt.yscale
  );
  hitboxes.dropkick.anim = new AnimSprite(dashAttackSprites, hitboxes.dropkick.yfaceanim, hitboxes.dropkick.framesby,
    hitboxes.dropkick.animoffsetx, hitboxes.dropkick.animoffsety, hitboxes.dropkick.xscale, hitboxes.dropkick.yscale
  );

  rectMode(CENTER);
  imageMode(CENTER);

  



  
}


function draw() {
  background(220);

  screenShake();
  spawnEntities();
  

  if (hitstopAmount) {
    hitstopAmount--;
  }
  else {
    determineTimeSinceLastInput();
    processInputs();
    attackFunctionGrouper(inputtedHitbox);
    movementTechFunctionGrouper(inputtedMovementTech);
    dummyOnKb();
    if (!entity.player.isattacking) {
      playerSettings();
      PlrGravitySim();
    }
    DummyGravitySim();
  }

  
  entitySettings();
  displayHitbox(inputtedHitbox);
  displaySprite(inputtedHitbox);

  
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
    entity.player.vy -= 5;
  }
  if (entity.player.curvertstate === entity.player.vertstates[2] && keyIsDown(' ')) {
    entity.player.vy -= 0.01;
  }
}

function PlrGravitySim() {
  entity.player.vy += GRAVITY;
  entity.player.y += entity.player.vy;
}

function DummyGravitySim() {
  entity.dummy.vy += GRAVITY;
  entity.dummy.y += entity.dummy.vy;
}
  









function movementTechFunctionGrouper(input) {
  determinePlrMTechStates(input);
  plrMovementOnMTech(input);

}

function determinePlrMTechStates(input) {
  if (input) {

    let easeinFrames = input.span[0];
    let easeoutFrames = input.span[0] + input.span[1];

    if (millis() <= mtechBirthTime + easeinFrames) {
      entity.player.ismovingtech = entity.player.movementstates[0];

    }
    else if (millis() <= mtechBirthTime + easeoutFrames) {
      entity.player.ismovingtech = entity.player.movementstates[1];
 
    }
    else {
      entity.player.ismovingtech = false;
      if (millis() >= mtechBirthTime + easeoutFrames + INSURANCE) {

        inputtedMovementTech = false;
      }
    }
  }
}
function plrMovementOnMTech(input) {
  if (input) {
    let identifier = entity.player.movementstates.indexOf(entity.player.ismovingtech);
    if (entity.player.ismovingtech) {
      entity.player.vy = 0;
      input.plrvx = input.statesvx[identifier];
      input.plrvy = input.statesvy[identifier];
      entity.player.x += input.plrvx;
      entity.player.y += input.plrvy;
    }
    else if(!entity.player.ismovingtech) {
      entity.player.y += input.plrvy;
      entity.player.x += input.plrvx;
      input.plrvy *= input.plrdrag;
      input.plrvx *= input.plrdrag;

      console.log(input.plrvx);

      if (input.plrvy > 0 && entity.player.y >= height - SIZE/2 || entity.player.y <= 0 + SIZE/2) {
        input.plrvy = 0;
      }
    }
  }
}








function attackFunctionGrouper(input) {
  determinePlrAttackStates(input);
  plrMovementOnAtk(input);
  hitboxCollide(input);
}

function determinePlrAttackStates(input) {
  if (input) {

    let windup = input.span[0];
    let activeframes = input.span[0] + input.span[1];
    let endlag = input.span[0] + input.span[1] + input.span[2];

    if (millis() <= hitboxBirthTime + windup) {
      entity.player.isattacking = entity.player.atkstates[0];
    }
    else if (millis() <= hitboxBirthTime + activeframes) {
      entity.player.isattacking = entity.player.atkstates[1];
    }
    else if (millis() <= hitboxBirthTime + endlag) {
      entity.player.isattacking = entity.player.atkstates[2];
    }
    else {
      entity.player.isattacking = false;
      hitboxDissonancePrevention = false;
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
      rect(input.sizes[0] * entity.player.facedir + entity.player.x, input.sizes[1] + entity.player.y, input.sizes[2], input.sizes[3]);
    }
    else if (entity.player.isattacking === entity.player.atkstates[1]) {
      fill('red');
      rect(input.sizes[0] * entity.player.facedir + entity.player.x, input.sizes[1] + entity.player.y, input.sizes[2], input.sizes[3]);
    }
    else if (entity.player.isattacking === entity.player.atkstates[2]) {
      fill('green');
      rect(input.sizes[0] * entity.player.facedir + entity.player.x, input.sizes[1] + entity.player.y, input.sizes[2], input.sizes[3]);
    }
    
  }
}

function plrMovementOnAtk(input) {
  let identifier = entity.player.atkstates.indexOf(entity.player.isattacking);
  if (input) {
    if (entity.player.isattacking) {
      entity.player.vy = 0;
      input.plrvx = input.statesvx[identifier];
      input.plrvy = input.statesvy[identifier];
      entity.player.x += input.plrvx * entity.player.facedir;
      entity.player.y += input.plrvy;
    }
    else if(!entity.player.isattacking) {
      entity.player.y += input.plrvy;
      entity.player.x += input.plrvx * entity.player.facedir;
      input.plrvy *= input.plrdrag;
      input.plrvx *= input.plrdrag;

      if (input.plrvy > 0 && entity.player.y >= height - SIZE/2 || entity.player.y <= 0 + SIZE/2) {
        input.plrvy = 0;
      }
    }
  }
}

function hitboxCollide(input) {
  if (input && entity.player.isattacking === entity.player.atkstates[1]) {
    let hitValid = collideRectRect(
      input.sizes[0] * entity.player.facedir + entity.player.x - input.sizes[2]/2, input.sizes[1] + entity.player.y - input.sizes[3]/2, input.sizes[2], input.sizes[3],
      entity.dummy.x - SIZE/2, entity.dummy.y  - SIZE/2, SIZE, SIZE
    );

    if (hitValid && !hitboxDissonancePrevention) {
      entity.dummy.isonkb = true;
      hitboxKbStorageX = input.kbx;
      hitboxKbStorageY = input.kby;
      hitboxDirStorage = entity.player.facedir;
      hitboxDissonancePrevention = true;
      entity.dummy.vy = 0;

      screenShakeAmount = input.amountss;
      screenShakeIntensity = input.intensityss;
      hitstopAmount = input.hsamount;
      
    }
  }
}

function displaySprite(input) {
   
  if (input) {
    let totalhitboxlife = input.span[0] + input.span[1] + input.span[2];

    if (millis() <= hitboxBirthTime + totalhitboxlife) {
      input.anim.draw();
    }
  }
}

function dummyOnKb() {
  if (entity.dummy.isonkb) {

    if (entity.dummy.kbcurvalue === entity.dummy.kbstates[1]) {
      if (entity.dummy.y >= height - SIZE/2 || entity.dummy.y <= 0 + SIZE/2) {
        hitboxKbStorageY *= -1;
      }
      if (entity.dummy.x >= width - SIZE/2 || entity.dummy.x <= 0 + SIZE/2) {
        hitboxKbStorageX *= -1;
      }
    }

    entity.dummy.x += hitboxKbStorageX * hitboxDirStorage;
    entity.dummy.y += hitboxKbStorageY;
    hitboxKbStorageX *= KB_RESIST;
    hitboxKbStorageY *= KB_RESIST;
  
    if (Math.abs(hitboxKbStorageX) >= 20 || Math.abs(hitboxKbStorageY) >= 20) {
      entity.dummy.kbcurvalue = entity.dummy.kbstates[1];
    }
    else if (Math.abs(hitboxKbStorageX) >= 3  || Math.abs(hitboxKbStorageY) >= 3) {
      entity.dummy.kbcurvalue = entity.dummy.kbstates[0];
    }
    else if (Math.abs(hitboxKbStorageX) < 3  || Math.abs(hitboxKbStorageY) < 3) {
      entity.dummy.isonkb = false;
      entity.dummy.kbcurvalue = null;
    }
  }
}






function screenShake() {
  if (screenShakeAmount > 0.5) {
    shakeX = random(-screenShakeIntensity, screenShakeIntensity);
    shakeY = random(-screenShakeIntensity, screenShakeIntensity);

    translate(shakeX, shakeY);

    screenShakeAmount *= REDUCE_SCREEN_SHAKE;
    screenShakeIntensity *= REDUCE_SCREEN_SHAKE;
  }
  else {
    screenShakeAmount = 0;
    screenShakeIntensity = 0;
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
      console.log(movementInputStorage);
    }
    if (key === 'r') {
      attackInputStorage = [];
      movementInputStorage = [];
    }
  }
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
      inputtedHitbox.anim.curframe = 0;
      entity.player.isattacking = true;
    }
  }

  if (movementInputStorage.length >= 3) {
    let getMoveFirstThreeInputs = movementInputStorage.splice(0,3);
    let firstMoveItemCollective = getMoveFirstThreeInputs.join('');
    movementSequenceStorage.push(firstMoveItemCollective);
    
    let currentMoveSequence = movementSequenceStorage.splice(0,1)[0];
    let moveActions = {
      'asd' : movementtech.lesserdashr,
      'awd' : movementtech.greatdashr,
      'dsa' : movementtech.lesserdashl,
      'dwa' : movementtech.greatdashl
    } ; 
    if (currentMoveSequence && moveActions[currentMoveSequence]) {
      inputtedMovementTech = moveActions[currentMoveSequence];
      mtechBirthTime = millis();
      entity.player.ismovingtech = true;
    }
  }
}
