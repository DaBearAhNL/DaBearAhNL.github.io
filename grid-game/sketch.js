// Grid Game
// Newell Devera
// November 4, 2026
//
// Extra for Experts:
// - For my extra for experts I used multple js files and learned the surface of promises to create a wait function.

// This is the main js. file that shows how the game runs and ends.

async function setup() {
  createCanvas(windowWidth, windowHeight);

  // Aligns all visuals seen on the screen.
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);

  // Assigns the spritesheet used for the coin and killbrick animations.
  globalKillBrickCosmeticSettings.spritesheet = await loadImage('Spritesheet/attack_spritesheet.png');
  globalCoinCosmeticSettings.spritesheet = await loadImage('Spritesheet/coin_spritesheet.png');

  // Assigns all the sound effects to a variable.
  aliveTheme = await loadSound('SFX/AliveTheme.mp3');
  deadTheme = await loadSound('SFX/DeathTheme.mp3');
  hitSfx = await loadSound('SFX/Hit.mp3');
  globalKillBrickCosmeticSettings.sfx = await loadSound('SFX/Warning.ogg');
  globalCoinCosmeticSettings.sfx = await loadSound('SFX/CollectCoin.mp3');
  deathSfx[0] = await loadSound('SFX/DeathSfx1.mp3');
  deathSfx[1] = await loadSound('SFX/DeathSfx2.mp3');
  deathSfx[2] = await loadSound('SFX/DeathSfx3.mp3');
  deathSfx[3] = await loadSound('SFX/DeathSfx4.mp3');
  
  // Assigns a range and domain for the grid.
  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  if (rows % 2 === 1) {
    rows -=1;
  }
  if (cols % 2 === 1) {
    cols -=1;
  }

  // Initiating fieldCoords because it would break if done before setup function.
  fieldCoords.x = width/2;
  fieldCoords.y = height/2;
  fieldCoords.dx = random(-5, 5),
  fieldCoords.dy = random(-5, 5),
  defaults.fieldCoords = structuredClone(fieldCoords);

  // Forms the playable grid and the player.
  grid = initializeGrid(cols, rows);
  player = new Player(playerSettings);
}

function draw() {
  background(220);
  grid = formField(rows, cols); // Constantly shows the field per frame.

  // Player has to be shown first or else displayTiles function will overwrite the player (i dunno why).
  player.display(); 
  displayTiles(rows, cols);
  
  // As long as the player is alive the game will run normally, if player's hp reaches zero then game stops and the death screen is shown.
  if (playerIsAlive) { 
    runGame();
  }
  else {
    deathScreen();
  }
}

function runGame() {
  // Constantly checks player statuses first to make sure interactions function happens at the same frame and has the correct data.
  player.checkHealth();
  player.recordTileFieldPos();
  player.move();

  // Assigns a new killbrick tile after a certain cooldown.
  generateNewKillBrick(globalKillBrickSettings.cooldown, globalKillBrickSettings.lastInstance);
  assignNewKillBrick();

  // Assigns a new coin tile after a certain cooldown.
  generateNewCoin(globalCoinSettings.cooldown, globalCoinSettings.lastInstance);
  assignNewCoinToGrid()

  player.interactions(); // Player interactions occur at the very last of the functions so that events from interacting with other entities happen at the same frame.
    
  ifCoinCollected(); // I just wanted to put this here before the displayNewCoin function just so that it removes the delay of a coin deleting after being picked up.
  
  // Displays other entities that arent the player
  displayNewKillBrick();
  displayNewCoin();

  increaseDifficulty(increaseDifficultyAfter, lastDifficultyRiseInstance, decreaseSpawnCooldown); // After 2 seconds, lower the cooldown of spawning a new killbrick by 0.05 seconds

  moveField(); // Randomly moves the field around.

  // Certain soundtrack plays if player is alive and prevents it from playing multiple times per frame.
  if(isAliveThemeOn === false) {
    playAliveTheme();
  }
}

function deathScreen() { 
  // Variables to make it easier to set positions for the text and shapes.
  let screenWidth = cols*CELL_SIZE;
  let screenHeight = rows*CELL_SIZE;

  // All the "boxes" or borders that encase the following text and layers it ontop of the game itself.
  fill(200, 0, 0, 120);
  rect(screenWidth/2, screenHeight/2, screenWidth, screenHeight);
  fill(255, 255, 255)
  rect(screenWidth/2, screenHeight/3, screenWidth/3, screenHeight/8);
  rect(screenWidth/2, screenHeight/2, screenWidth/5, screenHeight/8)

  // All the text encased within the boxes
  textSize(50);
  fill('red');
  text("Yer Dead", screenWidth/2, screenHeight/3);

  textSize(25);
  fill('white');
  text(`You collected ${coinCollectedCounter} coins`, screenWidth/2, screenHeight/3 + screenHeight/12);

  textSize(50);
  fill('red');
  text("Restart", screenWidth/2, screenHeight/2);

  // Certain soundtrack plays if player is dead and prevents it from playing multiple times per frame.
  if (isDeadThemeOn === false) {
    playDeadTheme();
  }

  // Detects if player clicks within the restart box to restart all the settings back to default.
  if (mouseX >= screenWidth/2 - (screenWidth/5)/2 && mouseX <= screenWidth/2 + (screenWidth/5)/2 &&
      mouseY >= screenHeight/2 - (screenHeight/8)/2 && mouseY <= screenHeight/2 + (screenHeight/8)/2 &&
      mouseIsPressed === true) {
    restartGame();
  }
}

function restartGame() { // Sets everything back to their default values and deletes every entity.
  playerIsAlive = true;
  killBrickStorage.splice(0, killBrickStorage.length);
  coinStorage.splice(0, coinStorage.length);

  fieldCoords = structuredClone(defaults.fieldCoords);
  playerSettings = structuredClone(defaults.playerSettings);
  killBrickStorage = structuredClone(defaults.killBrickStorage);
  globalKillBrickSettings = structuredClone(defaults.globalKillBrickSettings);
  coinStorage = structuredClone(defaults.coinStorage);
  globalCoinSettings = structuredClone(defaults.globalCoinSettings);
  coinCollectedCounter = structuredClone(defaults.coinCollectedCounter);
  lastDifficultyRiseInstance = structuredClone(defaults.lastDifficultyRiseInstance);

  player = new Player(playerSettings);
}
