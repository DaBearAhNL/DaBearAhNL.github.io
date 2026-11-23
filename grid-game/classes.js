





class Player {
  constructor(entitySettings) {
    this.curField = [];
    this.fieldPos = {
      x : entitySettings.x,
      y : entitySettings.y,
    } ; 
    this.gridPos = {
      x : 0,
      y : 0
    } ; 
    this.cellType = entitySettings.type;
    this.health = entitySettings.health;
    this.speed = entitySettings.speed;
    this.iFrames = entitySettings.iFrames;
    this.isImmune = false;
  }

  recordTileFieldPos() {
    this.curField = recordFieldCoords(rows, cols);
    let field = this.curField;
    let onRow = field[Math.floor(this.fieldPos.y)];

    if (onRow) {
      let onTile = onRow[Math.floor(this.fieldPos.x)]

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

  outOfBounds() {
    this.fieldPos.x = playerSettings.x;
    this.fieldPos.y = playerSettings.y;
    this.health--;
    hitSfx.play();
  }

  display() {
    grid[this.gridPos.y][this.gridPos.x] = this.cellType;
  }

  move() {
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

  interactions() {
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

  removeImmunity() {
    waitFor(this.iFrames)
    .then (() => this.isImmune = false);
  }

  checkHealth() {
    if (this.health === 0) {
      deathSfx[Math.ceil(random(1 , deathSfx.length)) - 1].play();
      playerIsAlive = false;
    }
  }



}

class KillBrick {
  constructor(entitySettings, cosmeticSettings) {
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

    this.cellType = entitySettings.type;
    this.periods = entitySettings.periods;
    this.curState = this.cellType.warning;
    this.tileId = entitySettings.id;
    
    this.spritesheet = cosmeticSettings.spritesheet;
    this.sheetWidth = cosmeticSettings.spritesheet.width;
    this.sheetHeight = cosmeticSettings.spritesheet.height;

    this.totalSprites = this.sheetWidth / this.sheetHeight;
    this.frameWidth = this.sheetWidth / this.totalSprites
    this.spriteOn = 0;

    this.byFramesOf = cosmeticSettings.framesBy;
    this.timing = cosmeticSettings.timing;

    this.scaling = {
      x : cosmeticSettings.scaling.x,
      y : cosmeticSettings.scaling.y
    } ;
  }

  recordTileFieldPos() {
    this.curField = recordFieldCoords(rows, cols);
    let field = this.curField;
    
    let onRow = field[Math.floor(this.fieldPos.y)];
    let onTile = onRow[Math.floor(this.fieldPos.x)]
    
    this.gridPos.x = onTile.x;
    this.gridPos.y = onTile.y;
  }

  assign() {
    grid[this.gridPos.y][this.gridPos.x] = this.curState;
  }

  display() {
    this.byFramesOf = this.timing;

    this.screenCoords.x = this.gridPos.x * CELL_SIZE + CELL_SIZE/2;
    this.screenCoords.y = this.gridPos.y * CELL_SIZE + CELL_SIZE/2;

    image(this.spritesheet, this.screenCoords.x, this.screenCoords.y, this.sheetHeight*this.scaling.x, this.sheetHeight*this.scaling.y,
      this.frameWidth*Math.floor(this.spriteOn), 0, this.frameWidth, this.sheetHeight
    ) ;

    this.spriteOn += this.byFramesOf;

  }

  initiate() {
    this.curState = this.cellType.initiated;
  }

  delete() {
  let findTileStorage = killBrickStorage.findIndex(tile => tile.tileId === this.tileId);

    if (findTileStorage !== -1) {
      killBrickStorage.splice(findTileStorage, 1);
    }
  }

  iterate() {
    globalKillBrickCosmeticSettings.sfx.play();
    waitFor(this.periods.warning)
    .then(() => this.initiate())
    .then(() => waitFor(this.periods.initiated))
    .then(() => this.delete());
  }

}


class Coin {
  constructor(entitySettings, cosmeticSettings) {
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

    this.cellType = entitySettings.type;
    this.lifeTime = entitySettings.lifeTime;
    this.isAlive = true;
    this.tileId = entitySettings.id

    this.spritesheet = cosmeticSettings.spritesheet;
    this.sheetWidth = cosmeticSettings.spritesheet.width;
    this.sheetHeight = cosmeticSettings.spritesheet.height;

    this.frameWidth = this.sheetWidth / 4
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

  recordTileFieldPos() {
    this.curField = recordFieldCoords(rows, cols);
    let field = this.curField;
    
    let onRow = field[Math.floor(this.fieldPos.y)];
    let onTile = onRow[Math.floor(this.fieldPos.x)]
    
    this.gridPos.x = onTile.x;
    this.gridPos.y = onTile.y;
  }

  assign() {
    grid[this.gridPos.y][this.gridPos.x] = this.cellType;
  }

  display() {
    this.byFramesOf = this.timing;

    this.screenCoords.x = this.gridPos.x * CELL_SIZE + CELL_SIZE/2;
    this.screenCoords.y = this.gridPos.y * CELL_SIZE + CELL_SIZE/2;

    image(this.spritesheet, this.screenCoords.x, this.screenCoords.y, this.sheetHeight*this.scaling.x, this.sheetHeight*this.scaling.y,
      this.frameWidth*Math.floor(this.spriteOn), 0, this.frameWidth, this.sheetHeight
    ) ;

    this.spriteOn += this.byFramesOf;

    if (Math.floor(this.spriteOn) >= this.totalSprites - this.spriteInsurance) {
      this.spriteOn = 0;
    }
  }

  collected() {
    if (this.gridPos.x === player.gridPos.x && this.gridPos.y === player.gridPos.y) {
      globalCoinCosmeticSettings.sfx.play();
      this.delete();
    }
  }
  
  delete() {
    let findTileStorage = coinStorage.findIndex(tile => tile.tileId === this.tileId);

    if (findTileStorage !== -1) {
      coinStorage.splice(findTileStorage, 1);
    }
  }

  iterate() {
    waitFor(this.lifeTime)
    .then(() => this.delete());
  }

}