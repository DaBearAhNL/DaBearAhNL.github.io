// // Grid Game
// // Newell Devera
// // November 4, 2026
// //
// // Extra for Experts:
// // - describe what you did to take this project "above and beyond"

// const CELL_SIZE = 30;
// const CELLS = {
//   void : 0,
//   tiles : 1,
//   player : 2,
//   killTile : {
//     warning : 3,
//     initiated : 4,
//   } ,
//   coin : 5
// } ; 

// const FIELD_COLS = 16;
// const FIELD_ROWS = 12;
// const FIELD_DIMS = {
//   width : CELL_SIZE * FIELD_COLS,
//   height : CELL_SIZE * FIELD_ROWS,
//   orientation : {
//     verticals : 2,
//     horizontals : 1
//   }
// } ;

// let rows;
// let cols;
// let grid;
// let field;

// let fieldCoords = {
//   x : 0,
//   y : 0,
//   dx : 0,
//   dy : 0,
// } ;


// let player;
// let playerIsAlive = true;
// let playerSettings = {
//   iFrames : 1500,
//   health : 5,
//   speed : 0.25,
//   x : FIELD_COLS/2,
//   y : FIELD_ROWS - FIELD_ROWS/3,
//   type : CELLS.player,
// } ;

// let killBrickStorage = [];
// let globalKillBrickSettings = {
//   type : CELLS.killTile,
//   cooldown : 1000,
//   periods : {
//     warning : 500,
//     initiated : 500,
//   },
//   idCounter : 0,
//   lastInstance : 0
// } ;
// let globalKillBrickCosmeticSettings = {
//   spritesheet : null,
//   framesBy : 1,
//   timing : 0.14,
//   scaling : {
//     x : 0.5,
//     y : 0.5,
//   },
//   sfx :  null,
// }

// let coinStorage = [];
// let globalCoinSettings = {
//   type : CELLS.coin,
//   cooldown : 2000,
//   lifeTime : 3500,
//   idCounter : 0,
//   lastInstance : 0
// } ;
// let globalCoinCosmeticSettings = {
//   spritesheet : null,
//   framesBy : 1,
//   timing : 0.15,
//   scaling : {
//     x : 0.35,
//     y : 0.2,
//   },
//   sfx :  null,
// } ; 

// let coinCollectedCounter = 0;
// let increaseDifficultyAfter = 2000;
// let lastDifficultyRiseInstance = 0;
// let decreaseSpawnCooldown = 50;

// let defaults = {
//   fieldCoords : null,
//   playerSettings : structuredClone(playerSettings),
//   killBrickStorage : [],
//   globalKillBrickSettings : structuredClone(globalKillBrickSettings),
//   coinStorage : [],
//   globalCoinSettings : structuredClone(globalCoinSettings),
//   coinCollectedCounter : structuredClone(coinCollectedCounter),
//   lastDifficultyRiseInstance : structuredClone(lastDifficultyRiseInstance),
// } ;






// class Player {
//   constructor(entitySettings) {
//     this.curField = [];
//     this.fieldPos = {
//       x : entitySettings.x,
//       y : entitySettings.y,
//     } ; 
//     this.gridPos = {
//       x : 0,
//       y : 0
//     } ; 
//     this.cellType = entitySettings.type;
//     this.health = entitySettings.health;
//     this.speed = entitySettings.speed;
//     this.iFrames = entitySettings.iFrames;
//     this.isImmune = false;


//   }

//   recordTileFieldPos() {
//     this.curField = recordFieldCoords(rows, cols);
//     let field = this.curField;
    
//     let onRow = field[Math.floor(this.fieldPos.y)];

//     if (onRow) {
//       let onTile = onRow[Math.floor(this.fieldPos.x)]

//       if (onTile) {
//         this.gridPos.x = onTile.x;
//         this.gridPos.y = onTile.y;
//       }
//       else {
//         this.outOfBounds();
//       }
//     }
//     else {
//       this.outOfBounds();
//     }
//   }

//   outOfBounds() {
//     this.fieldPos.x = playerSettings.x;
//     this.fieldPos.y = playerSettings.y;

//     this.health--;
//   }

//   display() {
//     grid[this.gridPos.y][this.gridPos.x] = this.cellType;
//   }

//   move() {
//     if (keyIsDown('i')) {
//       this.fieldPos.y -= this.speed;
//     }
//     if (keyIsDown('k')) {
//       this.fieldPos.y += this.speed;
//     }
//     if (keyIsDown('l')) {
//       this.fieldPos.x += this.speed;
//     }
//     if (keyIsDown('j')) {
//       this.fieldPos.x -= this.speed;
//     }
//   }

//   interactions() {
//     if (grid[this.gridPos.y][this.gridPos.x] === CELLS.killTile.initiated && !this.isImmune) {
//       this.health--;
//       this.isImmune = true;
//       this.removeImmunity(); 
//     }

//     else if (grid[this.gridPos.y][this.gridPos.x] === CELLS.coin) {
//       coinCollectedCounter++;
//     }
//   }

//   removeImmunity() {
//     waitFor(this.iFrames)
//     .then (() => this.isImmune = false);
//   }

//   checkHealth() {
//     if (this.health === 0) {
//       playerIsAlive = false;
//     }
//   }



// }

// class KillBrick {
//   constructor(entitySettings, cosmeticSettings) {
//     this.curField = [];

//     this.fieldPos = {
//       x : entitySettings.x,
//       y : entitySettings.y,
//     } ; 
//     this.gridPos = {
//       x : 0,
//       y : 0
//     } ; 

//     this.screenCoords = {
//       x : 0,
//       y : 0,
//     } ;

//     this.cellType = entitySettings.type;
//     this.periods = entitySettings.periods;
//     this.curState = this.cellType.warning;
//     this.tileId = entitySettings.id;
    
//     this.spritesheet = cosmeticSettings.spritesheet;
//     this.sheetWidth = cosmeticSettings.spritesheet.width;
//     this.sheetHeight = cosmeticSettings.spritesheet.height;

//     this.totalSprites = this.sheetWidth / this.sheetHeight;
//     this.frameWidth = this.sheetWidth / this.totalSprites
//     this.spriteOn = 0;

//     this.byFramesOf = cosmeticSettings.framesBy;
//     this.timing = cosmeticSettings.timing;

//     this.scaling = {
//       x : cosmeticSettings.scaling.x,
//       y : cosmeticSettings.scaling.y
//     } ;
//   }

//   recordTileFieldPos() {
//     this.curField = recordFieldCoords(rows, cols);
//     let field = this.curField;
    
//     let onRow = field[Math.floor(this.fieldPos.y)];
//     let onTile = onRow[Math.floor(this.fieldPos.x)]
    
//     this.gridPos.x = onTile.x;
//     this.gridPos.y = onTile.y;
//   }

//   assign() {
//     grid[this.gridPos.y][this.gridPos.x] = this.curState;
//   }

//   display() {
//     this.byFramesOf = this.timing;

//     this.screenCoords.x = this.gridPos.x * CELL_SIZE + CELL_SIZE/2;
//     this.screenCoords.y = this.gridPos.y * CELL_SIZE + CELL_SIZE/2;

//     image(this.spritesheet, this.screenCoords.x, this.screenCoords.y, this.sheetHeight*this.scaling.x, this.sheetHeight*this.scaling.y,
//       this.frameWidth*Math.floor(this.spriteOn), 0, this.frameWidth, this.sheetHeight
//     ) ;

//     this.spriteOn += this.byFramesOf;

//   }

//   initiate() {
//     this.curState = this.cellType.initiated;
//   }

//   delete() {
//   let findTileStorage = killBrickStorage.findIndex(tile => tile.tileId === this.tileId);

//     if (findTileStorage !== -1) {
//       killBrickStorage.splice(findTileStorage, 1);
//     }
//   }

//   iterate() {
//     waitFor(this.periods.warning)
//     .then(() => this.initiate())
//     .then(() => waitFor(this.periods.initiated))
//     .then(() => this.delete());
//   }

// }


// class Coin {
//   constructor(entitySettings, cosmeticSettings) {
//     this.curField = [];

//     this.fieldPos = {
//       x : entitySettings.x,
//       y : entitySettings.y,
//     } ; 
//     this.gridPos = {
//       x : 0,
//       y : 0
//     } ; 

//     this.screenCoords = {
//       x : 0,
//       y : 0
//     } ;

//     this.cellType = entitySettings.type;
//     this.lifeTime = entitySettings.lifeTime;
//     this.isAlive = true;
//     this.tileId = entitySettings.id

//     this.spritesheet = cosmeticSettings.spritesheet;
//     this.sheetWidth = cosmeticSettings.spritesheet.width;
//     this.sheetHeight = cosmeticSettings.spritesheet.height;

//     this.frameWidth = this.sheetWidth / 4
//     this.totalSprites = this.sheetWidth / this.sheetHeight;
//     this.spriteOn = 0;
//     this.spriteInsurance = 1.4;

//     this.timing = cosmeticSettings.timing;
//     this.byFramesOf = cosmeticSettings.framesBy;

//     this.scaling = {
//       x : cosmeticSettings.scaling.x,
//       y : cosmeticSettings.scaling.y
//     } ;
//   }

//   recordTileFieldPos() {
//     this.curField = recordFieldCoords(rows, cols);
//     let field = this.curField;
    
//     let onRow = field[Math.floor(this.fieldPos.y)];
//     let onTile = onRow[Math.floor(this.fieldPos.x)]
    
//     this.gridPos.x = onTile.x;
//     this.gridPos.y = onTile.y;
//   }

//   assign() {
//     grid[this.gridPos.y][this.gridPos.x] = this.cellType;
//   }

//   display() {
//     this.byFramesOf = this.timing;

//     this.screenCoords.x = this.gridPos.x * CELL_SIZE + CELL_SIZE/2;
//     this.screenCoords.y = this.gridPos.y * CELL_SIZE + CELL_SIZE/2;

//     image(this.spritesheet, this.screenCoords.x, this.screenCoords.y, this.sheetHeight*this.scaling.x, this.sheetHeight*this.scaling.y,
//       this.frameWidth*Math.floor(this.spriteOn), 0, this.frameWidth, this.sheetHeight
//     ) ;

//     this.spriteOn += this.byFramesOf;

//     if (Math.floor(this.spriteOn) >= this.totalSprites - this.spriteInsurance) {
//       this.spriteOn = 0;
//     }
//   }

//   collected() {
//     if (this.gridPos.x === player.gridPos.x && this.gridPos.y === player.gridPos.y) {
//       this.delete();
//     }
//   }
  
//   delete() {
//     let findTileStorage = coinStorage.findIndex(tile => tile.tileId === this.tileId);

//     if (findTileStorage !== -1) {
//       coinStorage.splice(findTileStorage, 1);
//     }
//   }

//   iterate() {
//     waitFor(this.lifeTime)
//     .then(() => this.delete());
//   }

// }








// async function setup() {
//   createCanvas(windowWidth, windowHeight);
//   rectMode(CENTER);
//   imageMode(CENTER);
//   textAlign(CENTER, CENTER);
//   // noStroke()

//   globalKillBrickCosmeticSettings.spritesheet = await loadImage('Spritesheet/attack_spritesheet.png');
//   globalCoinCosmeticSettings.spritesheet = await loadImage('Spritesheet/coin_spritesheet.png');

//   rows = Math.floor(height/CELL_SIZE);
//   cols = Math.floor(width/CELL_SIZE);
//   if (rows % 2 === 1) {
//     rows -=1;
//   }
//   if (cols % 2 === 1) {
//     cols -=1;
//   }

//   fieldCoords.x = width/2;
//   fieldCoords.y = height/2;
//   fieldCoords.dx = random(-5, 5),
//   fieldCoords.dy = random(-5, 5),
//   defaults.fieldCoords = structuredClone(fieldCoords);

//   grid = initializeGrid(cols, rows);
//   player = new Player(playerSettings);
// }



// function draw() {
//   background(220);
  
//   grid = formField(rows, cols);

//   player.display();
//   displayTiles(rows, cols);

//   if (playerIsAlive) {
//     player.checkHealth();

//     player.recordTileFieldPos();
//     player.move();

//     generateNewKillBrick(globalKillBrickSettings.cooldown, globalKillBrickSettings.lastInstance);
//     assignNewKillBrick();

//     generateNewCoin(globalCoinSettings.cooldown, globalCoinSettings.lastInstance);
//     assignNewCoinToGrid()

//     player.interactions();
    
//     ifCoinCollected();
    
//     displayNewKillBrick();
//     displayNewCoin();

//     increaseDifficulty(increaseDifficultyAfter, lastDifficultyRiseInstance, decreaseSpawnCooldown);

//     moveRect();
//   }
//   else {
//     deathScreen()
//   }
  
  

  
// }










// function initializeGrid(rows, cols) {
//   let placeHolderGrid = [];
//   for (let y = 0; y < rows; y++) {
//     placeHolderGrid.push([]);
//     for (let x = 0; x < cols; x++) {
//       placeHolderGrid[y].push(1);
//     }
//   }
//   return placeHolderGrid;
// }

// function displayTiles(rows, cols) {
//   for (let y = 0; y < rows; y++) {
//     for (let x = 0; x < cols; x++) {
//       if (grid[y][x] === 0) {
//         fill('black');
//       }
//       else if (grid[y][x] === 1) {
//         fill('gray');
//       }
//       else if (grid[y][x] === 2) {
//         fill('cyan');
//       }
//       rect(x * CELL_SIZE + CELL_SIZE/2, y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE, CELL_SIZE);
//     }
//   }
// }

// function formField(rows, cols) {
//   let nextFrame = initializeGrid(rows, cols);

//   for (let y = 0; y < rows; y++) {
//     for (let x = 0; x < cols; x++) {
//       let curTileX = x * CELL_SIZE + CELL_SIZE/2;
//       let curTileY = y * CELL_SIZE + CELL_SIZE/2;
//       let within = borderHandler(curTileX, curTileY, false);

//       if (within) {
//         nextFrame[y][x] = 1;
//       }
//       else {
//         nextFrame[y][x] = 0;
//       }
//     }
//   }
//   return nextFrame;
// }

// function recordFieldCoords(rows, cols) {
//   let nextField = [];
//   let rowCounter = 0;

//   for (let y = 0; y < rows; y++) {

//     let curTileY = y * CELL_SIZE + CELL_SIZE/2;
    

//     if (borderHandler(null, curTileY, FIELD_DIMS.orientation.verticals)) {
//       nextField.push([]);
      
//       for (let x = 0; x < cols; x++) {

//         let curTileX = x * CELL_SIZE + CELL_SIZE/2;

//         if (borderHandler(curTileX, null, FIELD_DIMS.orientation.horizontals)) {
//           nextField[rowCounter].push({x , y});
//         }
//       }
//       rowCounter++;
//     }
//   }
  
//   return nextField;
// }





// function generateNewKillBrick(cooldown, lastInstance) {
//   if (millis() >= lastInstance + cooldown) {
//     globalKillBrickSettings.lastInstance = millis();
//     spawnNewKillBrick();
//   }
// }

// function spawnNewKillBrick() {
//   let xRange = FIELD_COLS;
//   let yRange = FIELD_ROWS;

//   let killBrickSettings = {
//     x : Math.floor(Math.random() * xRange),
//     y : Math.floor(Math.random() * yRange),
//     type :  globalKillBrickSettings.type,
//     periods : globalKillBrickSettings.periods,
//     id : globalKillBrickSettings.idCounter
//   }

//   let cosmeticSettings = globalKillBrickCosmeticSettings;

//   let killTile = new KillBrick(killBrickSettings, cosmeticSettings);

//   killBrickStorage.push(killTile);
//   killTile.iterate();

//   globalKillBrickSettings.idCounter++;
// }

// function assignNewKillBrick() {
//   for (let killBrick of killBrickStorage) {
//     killBrick.recordTileFieldPos();
//     killBrick.assign();
//   }
// }

// function displayNewKillBrick() {
//   for (let killBrick of killBrickStorage) {
//     killBrick.display();
//   }
// }





// function generateNewCoin(cooldown, lastInstance) {
//   if (millis() >= lastInstance + cooldown) {
//     globalCoinSettings.lastInstance = millis();
//     spawnNewCoin();
//   }
// }

// function spawnNewCoin() {
//   let xRange = FIELD_COLS;
//   let yRange = FIELD_ROWS;

//   let coinSettings = {
//     x : Math.floor(Math.random() * xRange),
//     y : Math.floor(Math.random() * yRange),
//     type : globalCoinSettings.type,
//     lifeTime : globalCoinSettings.lifeTime,
//     id : globalCoinSettings.idCounter,
//   } ;

//   let cosmeticSettings = globalCoinCosmeticSettings;

//   let coin = new Coin(coinSettings, cosmeticSettings);

//   coinStorage.push(coin);
//   coin.iterate();

//   globalCoinSettings.idCounter++;
// }

// function assignNewCoinToGrid() {
//   for (let coin of coinStorage) {
//     coin.recordTileFieldPos();
//     coin.assign();
//   }
// }

// function ifCoinCollected() {
//   for (let coin of coinStorage) {
//     coin.collected();
//   }
// }

// function displayNewCoin() {
//   for (let coin of coinStorage) {
//     coin.display();
//   }
// }



// function increaseDifficulty(cooldown, lastInstance, decrease) {
//   if (globalKillBrickSettings.cooldown > 25) {
//     if (millis() >= lastInstance + cooldown) {
//       lastDifficultyRiseInstance = millis();
//       globalKillBrickSettings.cooldown -= decrease;
//     }
//   }
// }

// function deathScreen() {
//   let screenWidth = cols*CELL_SIZE;
//   let screenHeight = rows*CELL_SIZE;

//   fill(200, 0, 0, 120);
//   rect(screenWidth/2, screenHeight/2, screenWidth, screenHeight);
//   fill(255, 255, 255)
//   rect(screenWidth/2, screenHeight/3, screenWidth/3, screenHeight/8);
//   rect(screenWidth/2, screenHeight/2, screenWidth/5, screenHeight/8)
//   textSize(50);
//   fill('red');
//   text("Yer Dead", screenWidth/2, screenHeight/3);

//   if (mouseX >= screenWidth/2 - (screenWidth/5)/2 && mouseX <= screenWidth/2 + (screenWidth/5)/2 &&
//       mouseY >= screenHeight/2 - (screenHeight/8)/2 && mouseY <= screenHeight/2 + (screenHeight/8)/2 &&
//       mouseIsPressed === true) {
//     restartGame();
//   }
// }

// function restartGame() {
//   playerIsAlive = true;

//   fieldCoords = structuredClone(defaults.fieldCoords);
//   playerSettings = defaults.playerSettings;
//   killBrickStorage = defaults.killBrickStorage;
//   globalKillBrickSettings = defaults.globalKillBrickSettings;
//   coinStorage = defaults.coinStorage;
//   globalCoinSettings = defaults.globalCoinSettings;
//   coinCollectedCounter = defaults.coinCollectedCounter;
//   lastDifficultyRiseInstance = defaults.lastDifficultyRiseInstance;

//   player = new Player(playerSettings);

// }



// function borderHandler(xCoords, yCoords, orientation) {
//   // returns true within playable area, false if not
//   let withins = [false, false];
  
//   let leftBorder = Math.floor(fieldCoords.x - FIELD_DIMS.width/2);
//   let rightBorder = Math.floor(fieldCoords.x + FIELD_DIMS.width/2);
//   let upBorder = Math.floor(fieldCoords.y - FIELD_DIMS.height/2);
//   let downBorder = Math.floor(fieldCoords.y + FIELD_DIMS.height/2);

//   withins[0] = xCoords + CELL_SIZE/2 > leftBorder && xCoords - CELL_SIZE/2 < rightBorder;
//   withins[1] = yCoords + CELL_SIZE/2 > upBorder && yCoords - CELL_SIZE/2 < downBorder;

//   if (orientation) {
//     return withins[orientation - 1];
//   }
//   else {
//     return withins.every(border => border);
//   }
  
// }

// function fieldBorder() {
//   let withins = [false, false];

//   if (fieldCoords.x + FIELD_DIMS.width/2 <= cols * CELL_SIZE && fieldCoords.x - FIELD_DIMS.width/2 >= 0) {
//     withins[0] = true; 
//   }
//   if (fieldCoords.y + FIELD_DIMS.height/2 <= rows * CELL_SIZE && fieldCoords.y - FIELD_DIMS.height/2 >= 0) {
//     withins[1] = true; 
//   }

//   return withins.every(border => border);
// }

// function moveRect() {
//   fieldCoords.x += fieldCoords.dx
//   fieldCoords.y += fieldCoords.dy

//   if (fieldCoords.x <= 0 + FIELD_DIMS.width/2 || fieldCoords.x >= (cols * CELL_SIZE) - FIELD_DIMS.width/2) {
//     fieldCoords.dx *= -1;
//   }

//   if (fieldCoords.y <= 0 + FIELD_DIMS.height/2 || fieldCoords.y >= (rows * CELL_SIZE) - FIELD_DIMS.height/2) {
//     fieldCoords.dy *= -1;
//   }
// }


// function waitFor(ms) {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve()
//       }, ms)
//     })
//   }
