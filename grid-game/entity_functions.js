// These functions are all for the entities that spawn like the coin or killbrick.
// They are responsible for assigning them a position, spawning after a set amount of time, and displaying their animations.


// KILLBRICK FUNCTIONS
function generateNewKillBrick(cooldown, lastInstance) { // Spawns killbrick after set amount of time.
  if (millis() >= lastInstance + cooldown) {
    globalKillBrickSettings.lastInstance = millis();
    spawnNewKillBrick();
  }
}

function spawnNewKillBrick() { // Gives a killbrick tile certain settings to determine where they are placed on the field and a unique identifier.
  let xRange = FIELD_COLS;
  let yRange = FIELD_ROWS;

  let killBrickSettings = {
    x : Math.floor(Math.random() * xRange),
    y : Math.floor(Math.random() * yRange),
    type :  globalKillBrickSettings.type,
    periods : globalKillBrickSettings.periods,
    id : globalKillBrickSettings.idCounter
  } ;
  let cosmeticSettings = globalKillBrickCosmeticSettings;

  let killTile = new KillBrick(killBrickSettings, cosmeticSettings);

  killBrickStorage.push(killTile);
  killTile.iterate();

  globalKillBrickSettings.idCounter++;
}

function assignNewKillBrick() { // Places the killbrick on a tile from the field.
  for (let killBrick of killBrickStorage) {
    killBrick.recordTileFieldPos();
    killBrick.assign();
  }
}

function displayNewKillBrick() { // Runs the animation of a killbrick.
  for (let killBrick of killBrickStorage) {
    killBrick.display();
  }
}

function increaseDifficulty(cooldown, lastInstance, decrease) { // Spawns even more killbricks after 2 seconds.
  if (globalKillBrickSettings.cooldown > 300) {
    if (millis() >= lastInstance + cooldown) {
      lastDifficultyRiseInstance = millis();
      globalKillBrickSettings.cooldown -= decrease;
    }
  }
}


// COIN FUNCTIONS
function generateNewCoin(cooldown, lastInstance) {
  if (millis() >= lastInstance + cooldown) {
    globalCoinSettings.lastInstance = millis();
    spawnNewCoin();
  }
}

function spawnNewCoin() { // Gives a coin tile certain settings to determine where they are placed on the field and a unique identifier.
  let xRange = FIELD_COLS;
  let yRange = FIELD_ROWS;

  let coinSettings = {
    x : Math.floor(Math.random() * xRange),
    y : Math.floor(Math.random() * yRange),
    type : globalCoinSettings.type,
    lifeTime : globalCoinSettings.lifeTime,
    id : globalCoinSettings.idCounter,
  } ;
  let cosmeticSettings = globalCoinCosmeticSettings;

  let coin = new Coin(coinSettings, cosmeticSettings);

  coinStorage.push(coin);
  coin.iterate();

  globalCoinSettings.idCounter++;
}

function assignNewCoinToGrid() { // Places the coin on a tile from the field
  for (let coin of coinStorage) {
    coin.recordTileFieldPos();
    coin.assign();
  }
}

function displayNewCoin() { // Runs the animation of a killbrick
  for (let coin of coinStorage) {
    coin.display();
  }
}

function ifCoinCollected() { // Detects if a coin has been detected and deletes it from the coin storage.
  for (let coin of coinStorage) {
    coin.collected();
  }
}