// Grid Game
// Newell Devera
// November 4, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



async function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);

  globalKillBrickCosmeticSettings.spritesheet = await loadImage('Spritesheet/attack_spritesheet.png');
  globalCoinCosmeticSettings.spritesheet = await loadImage('Spritesheet/coin_spritesheet.png');

  aliveTheme = await loadSound('SFX/AliveTheme.mp3');
  deadTheme = await loadSound('SFX/DeathTheme.mp3');
  hitSfx = await loadSound('SFX/Hit.mp3');
  globalKillBrickCosmeticSettings.sfx = await loadSound('SFX/Warning.ogg');
  globalCoinCosmeticSettings.sfx = await loadSound('SFX/CollectCoin.mp3');
  deathSfx[0] = await loadSound('SFX/DeathSfx1.mp3');
  deathSfx[1] = await loadSound('SFX/DeathSfx2.mp3');
  deathSfx[2] = await loadSound('SFX/DeathSfx3.mp3');
  deathSfx[3] = await loadSound('SFX/DeathSfx4.mp3');
  
  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  if (rows % 2 === 1) {
    rows -=1;
  }
  if (cols % 2 === 1) {
    cols -=1;
  }

  fieldCoords.x = width/2;
  fieldCoords.y = height/2;
  fieldCoords.dx = random(-5, 5),
  fieldCoords.dy = random(-5, 5),
  defaults.fieldCoords = structuredClone(fieldCoords);

  grid = initializeGrid(cols, rows);
  player = new Player(playerSettings);
}

function draw() {
  background(220);
  
  grid = formField(rows, cols);

  player.display();
  displayTiles(rows, cols);

  if (playerIsAlive) {
    runGame();

  }
  else {
    deathScreen();
  }
  
}

function runGame() {
  player.checkHealth();
  player.recordTileFieldPos();
  player.move();

  generateNewKillBrick(globalKillBrickSettings.cooldown, globalKillBrickSettings.lastInstance);
  assignNewKillBrick();

  generateNewCoin(globalCoinSettings.cooldown, globalCoinSettings.lastInstance);
  assignNewCoinToGrid()

  player.interactions();
    
  ifCoinCollected();
    
  displayNewKillBrick();
  displayNewCoin();

  increaseDifficulty(increaseDifficultyAfter, lastDifficultyRiseInstance, decreaseSpawnCooldown);
  moveField();

  if(isAliveThemeOn === false) {
    playAliveTheme();
  }
}
