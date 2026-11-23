



function increaseDifficulty(cooldown, lastInstance, decrease) {
  if (globalKillBrickSettings.cooldown > 300) {
    if (millis() >= lastInstance + cooldown) {
      lastDifficultyRiseInstance = millis();
      globalKillBrickSettings.cooldown -= decrease;
    }
  }
}

function deathScreen() {
  let screenWidth = cols*CELL_SIZE;
  let screenHeight = rows*CELL_SIZE;

  fill(200, 0, 0, 120);
  rect(screenWidth/2, screenHeight/2, screenWidth, screenHeight);
  fill(255, 255, 255)
  rect(screenWidth/2, screenHeight/3, screenWidth/3, screenHeight/8);
  rect(screenWidth/2, screenHeight/2, screenWidth/5, screenHeight/8)

  textSize(50);
  fill('red');
  text("Yer Dead", screenWidth/2, screenHeight/3);

  textSize(25);
  fill('white');
  text(`You collected ${coinCollectedCounter} coins`, screenWidth/2, screenHeight/3 + screenHeight/12);

  textSize(50);
  fill('red');
  text("Restart", screenWidth/2, screenHeight/2);

  if (isDeadThemeOn === false) {
    playDeadTheme();
  }

  if (mouseX >= screenWidth/2 - (screenWidth/5)/2 && mouseX <= screenWidth/2 + (screenWidth/5)/2 &&
      mouseY >= screenHeight/2 - (screenHeight/8)/2 && mouseY <= screenHeight/2 + (screenHeight/8)/2 &&
      mouseIsPressed === true) {
    restartGame();
  }
}

function restartGame() {
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

function waitFor(ms) {
return new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
    }, ms)
  })
}


function playAliveTheme() {
  deadTheme.stop();
  aliveTheme.loop(true);
  aliveTheme.play();

  isDeadThemeOn = false;
  isAliveThemeOn = true;
}

function playDeadTheme() {
  aliveTheme.stop();
  deadTheme.loop(true);
  deadTheme.play();

  isAliveThemeOn = false;
  isDeadThemeOn = true;
}