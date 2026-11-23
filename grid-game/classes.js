// All the classes that determines the behaviours and interactions of the entities

class Player { // Player Class
  constructor(entitySettings) {
    // Grid and field positions of the player.
    this.curField = [];
    this.fieldPos = {
      x : entitySettings.x,
      y : entitySettings.y,
    } ; 
    this.gridPos = {
      x : 0,
      y : 0
    } ; 
    // Player settings
    this.cellType = entitySettings.type;
    this.health = entitySettings.health;
    this.speed = entitySettings.speed;
    this.iFrames = entitySettings.iFrames;
    this.isImmune = false;
  }

  recordTileFieldPos() { // Finds the players position on the field.
    this.curField = recordFieldCoords(rows, cols);
    let field = this.curField;
    let onRow = field[Math.floor(this.fieldPos.y)];

    if (onRow) {
      let onTile = onRow[Math.floor(this.fieldPos.x)];

      if (onTile) {
        this.gridPos.x = onTile.x;
        this.gridPos.y = onTile.y;
      }
      else {
        this.outOfBounds();
      }
    }
    else {
      this.outOfBounds();
    }
  }

  outOfBounds() { // Damages the player whenever they fall off the field.
    this.fieldPos.x = playerSettings.x;
    this.fieldPos.y = playerSettings.y;
    this.health--;
    hitSfx.play();
  }

  display() { // Shows player.
    grid[this.gridPos.y][this.gridPos.x] = this.cellType;
  }

  move() { // Player Movement
    if (keyIsDown('w')) {
      this.fieldPos.y -= this.speed;
    }
    if (keyIsDown('s')) {
      this.fieldPos.y += this.speed;
    }
    if (keyIsDown('d')) {
      this.fieldPos.x += this.speed;
    }
    if (keyIsDown('a')) {
      this.fieldPos.x -= this.speed;
    }
  }

  interactions() { // Player interactions between coins and activated killbricks.
    if (grid[this.gridPos.y][this.gridPos.x] === CELLS.killTile.initiated && !this.isImmune) {
      this.health--;
      this.isImmune = true;
      this.removeImmunity();
      hitSfx.play();
    }
    else if (grid[this.gridPos.y][this.gridPos.x] === CELLS.coin) {
      coinCollectedCounter++;
    }
  }

  removeImmunity() { // Whenever a player is hit they gain immunity, this just determines how long it lasts.
    waitFor(this.iFrames)
    .then (() => this.isImmune = false);
  }

  checkHealth() { // Constantly checks whenever the player is still alive or dead.
    if (this.health === 0) {
      deathSfx[Math.ceil(random(1 , deathSfx.length)) - 1].play();
      playerIsAlive = false;
    }
  }
}

class KillBrick { // Killbrick Class
  constructor(entitySettings, cosmeticSettings) {
    // Grid and field positions of a killbrick.
    this.curField = [];
    this.fieldPos = {
      x : entitySettings.x,
      y : entitySettings.y,
    } ; 
    this.gridPos = {
      x : 0,
      y : 0
    } ; 

    this.screenCoords = {
      x : 0,
      y : 0,
    } ;
    // Killbrick settings.
    this.cellType = entitySettings.type;
    this.periods = entitySettings.periods;
    this.curState = this.cellType.warning;
    this.tileId = entitySettings.id;
    // Killbrick animation variables
    this.spritesheet = cosmeticSettings.spritesheet;
    this.sheetWidth = cosmeticSettings.spritesheet.width;
    this.sheetHeight = cosmeticSettings.spritesheet.height;
    this.totalSprites = this.sheetWidth / this.sheetHeight;
    this.frameWidth = this.sheetWidth / this.totalSprites;
    this.spriteOn = 0;
    this.byFramesOf = cosmeticSettings.framesBy;
    this.timing = cosmeticSettings.timing;
    this.scaling = {
      x : cosmeticSettings.scaling.x,
      y : cosmeticSettings.scaling.y
    } ;
  }

  recordTileFieldPos() { // Finds the killbrick's position on the field.
    this.curField = recordFieldCoords(rows, cols);
    let field = this.curField;
    
    let onRow = field[Math.floor(this.fieldPos.y)];
    let onTile = onRow[Math.floor(this.fieldPos.x)];
    
    this.gridPos.x = onTile.x;
    this.gridPos.y = onTile.y;
  }

  assign() { // Assign killbrick properties unto a tile.
    grid[this.gridPos.y][this.gridPos.x] = this.curState;
  }

  display() { // Shows the killbrick and plays its animation
    this.byFramesOf = this.timing;
    this.screenCoords.x = this.gridPos.x * CELL_SIZE + CELL_SIZE/2;
    this.screenCoords.y = this.gridPos.y * CELL_SIZE + CELL_SIZE/2;

    image(this.spritesheet, this.screenCoords.x, this.screenCoords.y, this.sheetHeight*this.scaling.x, this.sheetHeight*this.scaling.y,
      this.frameWidth*Math.floor(this.spriteOn), 0, this.frameWidth, this.sheetHeight
    ) ;

    this.spriteOn += this.byFramesOf;
  }

  initiate() { // After a warning period, the killbrick can damage the player.
    this.curState = this.cellType.initiated;
  }

  delete() { // Deletes killbrick after their lifetime.
    let findTileStorage = killBrickStorage.findIndex(tile => tile.tileId === this.tileId);

    if (findTileStorage !== -1) {
      killBrickStorage.splice(findTileStorage, 1);
    }
  }

  iterate() { // Process of which a killbrick undergoes, warns -> can damage player -> dies.
    globalKillBrickCosmeticSettings.sfx.play();
    waitFor(this.periods.warning)
    .then(() => this.initiate())
    .then(() => waitFor(this.periods.initiated))
    .then(() => this.delete());
  }

}


class Coin { // Coin Class
  constructor(entitySettings, cosmeticSettings) {
    // Grid and field positions of a coin
    this.curField = [];
    this.fieldPos = {
      x : entitySettings.x,
      y : entitySettings.y,
    } ; 
    this.gridPos = {
      x : 0,
      y : 0
    } ; 
    this.screenCoords = {
      x : 0,
      y : 0
    } ;
    // Coin settings
    this.cellType = entitySettings.type;
    this.lifeTime = entitySettings.lifeTime;
    this.isAlive = true;
    this.tileId = entitySettings.id;
    // Coin animation variables
    this.spritesheet = cosmeticSettings.spritesheet;
    this.sheetWidth = cosmeticSettings.spritesheet.width;
    this.sheetHeight = cosmeticSettings.spritesheet.height;
    this.frameWidth = this.sheetWidth / 4;
    this.totalSprites = this.sheetWidth / this.sheetHeight;
    this.spriteOn = 0;
    this.spriteInsurance = 1.4;
    this.timing = cosmeticSettings.timing;
    this.byFramesOf = cosmeticSettings.framesBy;
    this.scaling = {
      x : cosmeticSettings.scaling.x,
      y : cosmeticSettings.scaling.y
    } ;
  }

  recordTileFieldPos() { // Finds coin position on the field.
    this.curField = recordFieldCoords(rows, cols);
    let field = this.curField;
    
    let onRow = field[Math.floor(this.fieldPos.y)];
    let onTile = onRow[Math.floor(this.fieldPos.x)];
    
    this.gridPos.x = onTile.x;
    this.gridPos.y = onTile.y;
  }

  assign() { // Assigns coin properties unto a tile.
    grid[this.gridPos.y][this.gridPos.x] = this.cellType;
  }

  display() { // Shows where the coin is and plays its animation.
    this.byFramesOf = this.timing;
    this.screenCoords.x = this.gridPos.x * CELL_SIZE + CELL_SIZE/2;
    this.screenCoords.y = this.gridPos.y * CELL_SIZE + CELL_SIZE/2;

    image(this.spritesheet, this.screenCoords.x, this.screenCoords.y, this.sheetHeight*this.scaling.x, this.sheetHeight*this.scaling.y,
      this.frameWidth*Math.floor(this.spriteOn), 0, this.frameWidth, this.sheetHeight
    ) ;

    this.spriteOn += this.byFramesOf;
    if (Math.floor(this.spriteOn) >= this.totalSprites - this.spriteInsurance) { // Loops coin animation
      this.spriteOn = 0;
    }
  }

  collected() { // If coin tile has player on, deletes the coin
    if (this.gridPos.x === player.gridPos.x && this.gridPos.y === player.gridPos.y) {
      globalCoinCosmeticSettings.sfx.play();
      this.delete();
    }
  }
  
  delete() { // Deletes the coin
    let findTileStorage = coinStorage.findIndex(tile => tile.tileId === this.tileId);

    if (findTileStorage !== -1) {
      coinStorage.splice(findTileStorage, 1);
    }
  }

  iterate() { // Waits for the coin's lifetime to diminish then deletes coin.
    waitFor(this.lifeTime)
    .then(() => this.delete());
  }

}