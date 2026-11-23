function generateNewKillBrick(cooldown, lastInstance) {
  if (millis() >= lastInstance + cooldown) {
    globalKillBrickSettings.lastInstance = millis();
    spawnNewKillBrick();
  }
}

function spawnNewKillBrick() {
  let xRange = FIELD_COLS;
  let yRange = FIELD_ROWS;

  let killBrickSettings = {
    x : Math.floor(Math.random() * xRange),
    y : Math.floor(Math.random() * yRange),
    type :  globalKillBrickSettings.type,
    periods : globalKillBrickSettings.periods,
    id : globalKillBrickSettings.idCounter
  }

  let cosmeticSettings = globalKillBrickCosmeticSettings;

  let killTile = new KillBrick(killBrickSettings, cosmeticSettings);

  killBrickStorage.push(killTile);
  killTile.iterate();

  globalKillBrickSettings.idCounter++;
}

function assignNewKillBrick() {
  for (let killBrick of killBrickStorage) {
    killBrick.recordTileFieldPos();
    killBrick.assign();
  }
}

function displayNewKillBrick() {
  for (let killBrick of killBrickStorage) {
    killBrick.display();
  }
}





function generateNewCoin(cooldown, lastInstance) {
  if (millis() >= lastInstance + cooldown) {
    globalCoinSettings.lastInstance = millis();
    spawnNewCoin();
  }
}

function spawnNewCoin() {
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

function assignNewCoinToGrid() {
  for (let coin of coinStorage) {
    coin.recordTileFieldPos();
    coin.assign();
  }
}

function ifCoinCollected() {
  for (let coin of coinStorage) {
    coin.collected();
  }
}

function displayNewCoin() {
  for (let coin of coinStorage) {
    coin.display();
  }
}