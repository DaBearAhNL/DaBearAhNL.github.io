// Array and Object Orienation Project
// Newell Devera
// 10/26/2026
//
// Extra for Experts:
// In this project, I learned how to use the class functions and sprite cycling with the help of this tutorial : https://www.youtube.com/watch?v=eE65ody9MdI&t=202s.
// I also do hope you consider the complexity of my code as an extra for experts.

// sir this comment is from 10:16 pm on the due date im currently fighting against time to get the sound effects in and making it look clean.
// this project has gotta be the one to make my heart race the most.


// --------------- CONSTANT VARIABLES --------------- //

const NO_INPUTS_DETECTED = 100;
const TERMINATE_INPUT_STORAGE = 500;
const SIZE = 75;
const GRAVITY = 0.75;
const KB_RESIST = 0.9;
const INSURANCE = 1500;
const REDUCE_SCREEN_SHAKE = 0.85;

// --------------- PROCESSING VARIABLES --------------- //

// Processing Attack Variables
let attackInputStorage = [];
let allowedAttackInputs = ['k', 'l','m'];
let testingAThing = ' ';
let attackSequenceStorage = [];
let isCurAtkInputting = false;
let lastAtkInpTime;

// Processing Movement Variables
let movementInputStorage = [];
let allowedMovementInputs = ['w', 'a', 's', 'd'];
let testingMThing = ' ';
let movementSequenceStorage = [];
let isCurMoveInputting = false;
let lastMoveInpTime;

// --------------- HITBOXES --------------- //

// Hitboxlife Variables
let showHitbox = false;
let inputtedHitbox;
let hitboxBirthTime = 0;

// Knockback Variables
let hitboxKbStorageX;
let hitboxKbStorageY;
let hitboxDirStorage;
let hitboxDissonancePrevention = false;

// Hitbox Controller
let hitboxes = {
  basic : { // Basic Attack Settings
    // Hitbox from player
    sizes : [SIZE+SIZE/1.95, 0, SIZE*2, SIZE],
    span : [35, 100, 50],
    statesvx : [1,1,1],
    statesvy : [0, 0, 0],
    plrvx : null,
    plrvy : null,
    plrdrag : 0.5,

    // Hitbox from player
    kbx : 10,
    kby : -5,

    // Screenshake from hitbox
    amountss : 20,
    intensityss : 2.5,
    hsamount : 5,

    // Sprites from hitbox
    anim : null,
    yfaceanim : 1,
    framesby : 0.75,
    animoffsetx : SIZE,
    animoffsety : -SIZE/4,
    xscale : 3,
    yscale : 5,

    // Sounds from hitbox
    sfx : null,
  } ,
  uppercut : { // Uppercut Settings
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

    // Sprites from hitbox
    anim : null,
    yfaceanim : 1,
    framesby : 0.35,
    animoffsetx : 10,
    animoffsety : 0,
    xscale : 2,
    yscale : 4,
    
    // Sounds from hitbox
    sfx : null,
  } , 
  downslam : { // Downslam Settings
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

    sfx : null,
  } ,
  uptilt : { // Uptilt Settings
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

    sfx : null,
  } ,
  dropkick : { // Dropkick Settings
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

    sfx : null,
  }
} ; 

// --------------- MOVEMENT TECHS --------------- //

// Mtechlife Variables
let soundOnMTech = false;
let inputtedMovementTech;
let mtechBirthTime = 0;


// Mtech Controller
let movementtech = { 
  greatdashr : { // Greatdash Right
    // Dash Lifetime
    span : [100, 100],

    // Movement during certain states
    statesvx : [50, 20],
    statesvy : [0, 0],

    // Player settings for mtech
    plrvx : null,
    plrvy : null,
    plrdrag : 0.85
  },
  greatdashl : { // Greatdash Left
    span : [100, 100],

    statesvx : [-50, -20],
    statesvy : [0, 0],

    plrvx : null,
    plrvy : null,
    plrdrag : 0.85
  },
  lesserdashr : { // Lesserdash Right
    span : [50, 100],

    statesvx : [20, 10],
    statesvy : [0, 0],

    plrvx : null,
    plrvy : null,
    plrdrag : 0.85
  },
  lesserdashl : { // Lesserdash Left
    span : [50, 100],

    statesvx : [-20, -10],
    statesvy : [0, 0],

    plrvx : null,
    plrvy : null,
    plrdrag : 0.85
  }
} ;

// --------------- MISCELLANOUS (e.i their too short to have a cool title) --------------- //

// Responsible for displaying dummy and player
let entity;


// Sprite Animation Variables
let animations;
let heavyAttackSprites;
let lightAttackSprites;
let dashAttackSprites;


// Hitstop and Screenshake Variables
let screenShakeIntensity;
let screenShakeAmount;
let shakeX;
let shakeY;
let hitstopAmount;

// --------------- SPRITE ANIMATION CLASS --------------- //
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
    ) ;

    pop();

    if (!hitstopAmount) {
      this.curframe += this.framesby;
    } ;
  } ;
}




// --------------- SETUP FUNCTION --------------- //
async function setup() {
  createCanvas(windowWidth, windowHeight);

  // Loading all vfx and sfx
  heavyAttackSprites = await loadImage("Sprites/heavyattack.png");
  lightAttackSprites = await loadImage("Sprites/lightattack.png");
  dashAttackSprites = await loadImage("Sprites/dashattack.png");

  hitboxes.basic.sfx = await loadSound("SoundEffects/LightAttack.wav");
  hitboxes.uppercut.sfx = await loadSound("SoundEffects/HeavyAttack.wav");
  hitboxes.downslam.sfx = await loadSound("SoundEffects/HeavyAttack.wav");
  hitboxes.uptilt.sfx = await loadSound("SoundEffects/DashAttackHit.wav");
  hitboxes.dropkick.sfx = await loadSound("SoundEffects/DashAttackHit.wav");

  movementtech.greatdashl.sfx = await loadSound("SoundEffects/GreaterDash.wav");
  movementtech.greatdashr.sfx = await loadSound("SoundEffects/GreaterDash.wav");
  movementtech.lesserdashl.sfx = await loadSound("SoundEffects/LesserDash.wav");
  movementtech.lesserdashr.sfx = await loadSound("SoundEffects/LesserDash.wav");

  // Initiating entity settings
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

  // Assigning sprite animations to hitboxes
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

  // Shape settings
  rectMode(CENTER);
  imageMode(CENTER);
  noStroke();
}




// --------------- DRAW LOOP --------------- //
function draw() {
  background('black');

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

  visualGrouper(inputtedHitbox);
  showInstructions();
  
}


// --------------- ENTITY FUNCTIONS --------------- //
function showInstructions() { // Read these ples
  fill('white');
  textSize(25);
  text('READ', 50, 50);
  textSize(20);
  text('Attack Inputs :', 50, 75);
  text('[LKM, LKL, KMK, KLL, KMM]', 200, 75);
  text('Movement Inputs :', 50, 105);
  text('[ASD, AWD, DSA, DWA]', 235, 105);
  text('[R] to reset all inputs', 50, 135);
  text('[Z] to show hitboxes', 50, 165);
  text('Now go bully the dude', 50, 195);
}

function spawnEntities() { // Displays player and dummy
  fill('cyan');
  square(entity.player.x, entity.player.y, SIZE);
  fill('white');
  square(entity.dummy.x, entity.dummy.y, SIZE);
}

function entitySettings() { // Determine base entity states
  let entities = [entity.player, entity.dummy];
  for (let objects of entities) {
    // X Border Restrictions
    if (objects.x + SIZE/2 > width) {
      objects.x = width - SIZE/2;
    }
    else if (objects.x - SIZE/2 < 0) {
      objects.x = 0 + SIZE/2;
    }

    // Y Border Restrictions
    if (objects.y + SIZE/2 > height) {
      objects.curvertstate = objects.vertstates[0],
      objects.y = height - SIZE/2;
      objects.vy = 0;
    }
    else if (objects.y - SIZE/2 < 0) {
      objects.y = 0 + SIZE/2;
      objects.vy = 0;
    }

    // Determines entities vertical states
    if (objects.vy <= 0 && objects.y + SIZE < height) {
      objects.curvertstate = objects.vertstates[2];
    }
    else if (objects.vy > 0 && objects.y + SIZE < height) {
      objects.curvertstate = objects.vertstates[1];
    }
  }
}

function playerSettings() { // Responsible for player moving and jumping

  // Base horizontal movement settings
  if (keyIsDown('a')) {
    entity.player.x -= entity.player.walkspeed;
    entity.player.facedir = -1;
  }
  if (keyIsDown('d')) {
    entity.player.x += entity.player.walkspeed;
    entity.player.facedir = 1;
  }

  // Base vertical movement settings
  if (entity.player.curvertstate === entity.player.vertstates[0] && keyIsDown(' ')) {
    entity.player.vy -= 5;
  }
  if (entity.player.curvertstate === entity.player.vertstates[2] && keyIsDown(' ')) {
    entity.player.vy -= 0.01;
  }
}


function PlrGravitySim() { // Gravities (it breaks when i dont put them in one variable idk why)
  entity.player.vy += GRAVITY;
  entity.player.y += entity.player.vy;
}
function DummyGravitySim() {
  entity.dummy.vy += GRAVITY;
  entity.dummy.y += entity.dummy.vy;
}



// --------------- MOVEMENT TECH FUNCTIONS --------------- //
function movementTechFunctionGrouper(input) { // Groups all mtech functions to look cleaner in draw loop
  determinePlrMTechStates(input);
  plrMovementOnMTech(input);
  playSoundOnMovement(input);

}

function determinePlrMTechStates(input) { // Checks where you are in an mtech duration to apply new settings
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

function plrMovementOnMTech(input) { // Applies velocity during a mtech. Determined by current state
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

      if (input.plrvy > 0 && entity.player.y >= height - SIZE/2 || entity.player.y <= 0 + SIZE/2) {
        input.plrvy = 0;
      }
    }
  }
}

function playSoundOnMovement(input) { // Plays sound on mtech
  if (input && soundOnMTech) {
    input.sfx.play();
    soundOnMTech = false;
  }
}




// --------------- MOVEMENT TECH FUNCTIONS --------------- //
function attackFunctionGrouper(input) { // Groups all attack functions
  determinePlrAttackStates(input);
  plrMovementOnAtk(input);
  hitboxCollide(input);
}

function determinePlrAttackStates(input) { // Checks your current time during a specfic attacks duration
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


function plrMovementOnAtk(input) { // Responsible for moving the player in certain attacks
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

function hitboxCollide(input) { // Checks if inputted attack hits dummy
  if (input && entity.player.isattacking === entity.player.atkstates[1]) {
    let hitValid = collideRectRect(
      input.sizes[0] * entity.player.facedir + entity.player.x - input.sizes[2]/2, input.sizes[1] + entity.player.y - input.sizes[3]/2, input.sizes[2], input.sizes[3],
      entity.dummy.x - SIZE/2, entity.dummy.y  - SIZE/2, SIZE, SIZE
    );

    if (hitValid && !hitboxDissonancePrevention) { // Required to not let the hitbox hit multiple times (this thing helped so much)
      entity.dummy.isonkb = true;
      hitboxKbStorageX = input.kbx;
      hitboxKbStorageY = input.kby;
      hitboxDirStorage = entity.player.facedir;
      hitboxDissonancePrevention = true;
      entity.dummy.vy = 0;

      screenShakeAmount = input.amountss;
      screenShakeIntensity = input.intensityss;
      hitstopAmount = input.hsamount;

      input.sfx.play();
      
    }
  }
}



// --------------- VISUAL FUNCTIONS --------------- //
function visualGrouper(input) { // Groups all visual functions to look cleaner in draw loop
  displayHitbox(input);
  displaySprite(input);
}

function displaySprite(input) { // Displays sprite animations during attack
  if (input) {
    let totalhitboxlife = input.span[0] + input.span[1] + input.span[2];

    if (millis() <= hitboxBirthTime + totalhitboxlife) {
      input.anim.draw();
    }
  }
}

function displayHitbox(input) { // Shows hitbox
  if (input && showHitbox) {
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


// --------------- KNOCKBACK AND SCREENSHAKE --------------- //
function dummyOnKb() { // Determines dummies total knockback value and checks whether it is moving too fast or not for certain interactions
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


function screenShake() { // Shakes the screen during valid hit
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




// --------------- INPUT FUNCTIONS --------------- //
function determineTimeSinceLastInput() { // Insurance to not let the mtech or attack array holding and grouping valid inputs to be filled with invalid keys
  // For attack array
  if (isCurAtkInputting === true && millis() >= lastAtkInpTime + NO_INPUTS_DETECTED) {
    isCurAtkInputting = false;
  }
  else if (isCurAtkInputting === false && millis() >= lastAtkInpTime + TERMINATE_INPUT_STORAGE) {
    attackInputStorage = [];
  }
  // For mtech array
  if (isCurMoveInputting === true && millis() >= lastMoveInpTime + NO_INPUTS_DETECTED) {
    isCurMoveInputting = false;
  }
  else if (isCurMoveInputting === false && millis() >= lastMoveInpTime + TERMINATE_INPUT_STORAGE) {
    movementInputStorage = [];
  }
}

function keyPressed() { // Checks keyboard inputs
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
    if (key === 'r') {
      attackInputStorage = [];
      movementInputStorage = [];
    }
    if (key === 'z') {
      showHitbox = !showHitbox;
    }
  }
}


function processInputs() { // Checks either attack or mtech array
  if (attackInputStorage.length >= 3) { // If array has 3 or more inputs, pulls first three inputs
    let getAtkFirstThreeInputs = attackInputStorage.splice(0,3);
    let firstAtkItemCollective = getAtkFirstThreeInputs.join(''); // Then joins inputs together to form a string
    attackSequenceStorage.push(firstAtkItemCollective); // Somewhat of a double check and ensures the first three inputted keys are the first in line

    let currentAtkSequence = attackSequenceStorage.splice(0,1); // Pulls the formed string for "comparison"
    let atkActions = {
      'lkm' : hitboxes.basic,
      'kmk' : hitboxes.downslam,
      'lkl' : hitboxes.uppercut,
      'kll' : hitboxes.uptilt,
      'kmm' : hitboxes.dropkick,
    } ; 
    if (currentAtkSequence && atkActions[currentAtkSequence]) { // Compares whether formed string is a valid action. If yes, assign it to inputted hitbox. If no, discards
      inputtedHitbox = atkActions[currentAtkSequence];
      hitboxBirthTime = millis();
      inputtedHitbox.anim.curframe = 0;
      entity.player.isattacking = true;
    }
  }

  if (movementInputStorage.length >= 3) { // Same thing as on top this time just on mtech
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
      soundOnMTech = true;
      entity.player.ismovingtech = true;
    }
  }
}


// GRAHRHAGHRGAGRAG 827 LINES RAHHHHHHHHHHHHHHHH