// Grid Game
// Newell Devera
// November 4, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 30;
const CELLS = {
  void : 0,
  tiles : 1,
  killbricks : 2,
  coins : 3,
  player : 4,
  walls : 5
} ; 

const FIELD_SPEED = 5;
const FIELD_COLS = 16;
const FIELD_ROWS = 12;
const FIELD_DIMS = {
  width : CELL_SIZE * FIELD_COLS,
  height : CELL_SIZE * FIELD_ROWS,
  orientation : {
    verticals : 2,
    horizontals : 1
  }
} ;
let fieldCoords = {
  x : 0,
  y : 0
} ;

let rows;
let cols;
let grid;
let field;

let player;
let playerSettings = {
  health : 25,
  speed : 0.25,
  startingFieldX : FIELD_COLS/2,
  startingFieldY : FIELD_ROWS - FIELD_ROWS/3
}

let killBrickStorage = [];
let killBrickWarningPeriod = 0;

let coinStorage = [];


class Player {
  constructor(startX, startY, health, speed, cellType) {
    this.curField = [];
    this.fieldPosX = startX;
    this.fieldPosY = startY;
    this.gridPosX = 0;
    this.gridPosY = 0;
    this.cellType = cellType;
    this.health = health;
    this.speed = speed;


  }

  recordTilePositionOnField() {
    this.curField = recordFieldCoords(rows, cols);
    let field = this.curField;
    
    let onRow = field[Math.floor(this.fieldPosY)];
    let onTile = onRow[Math.floor(this.fieldPosX)]
    
    this.gridPosX = onTile.x;
    this.gridPosY = onTile.y;
  }

  display() {
    grid[this.gridPosY][this.gridPosX] = this.cellType;
  }

  move() {
    if (keyIsDown('i')) {
      this.fieldPosY -= this.speed;
    }
    if (keyIsDown('k')) {
      this.fieldPosY += this.speed;
    }
    if (keyIsDown('l')) {
      this.fieldPosX += this.speed;
    }
    if (keyIsDown('j')) {
      this.fieldPosX -= this.speed;
    }
  }

  interactions() {
    if (grid[this.gridPosY][this.gridPosX] === CELLS.killbricks) {
      this.health--;
    }
  }

}

class Coin {
  constructor() {
    

  }

  spawn() {

  }

  ifCollected() {

  }

  despawn() {

  }
}

class KillBrick {
  constructor() {
    this.curField = [];
    this.fieldPosX = 5;
    this.fieldPosY = 5;
    this.gridPosX = 0;
    this.gridPosY = 0;
    this.prevGridPosX = 0;
    this.prevGridPosY = 0;
    this.cellType = CELLS.killbricks;
  }

  warning() {

  }

}

async function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

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

  grid = initializeGrid(cols, rows);
  player = new Player(playerSettings.startingFieldX, playerSettings.startingFieldY, playerSettings.health,
                      playerSettings.speed, CELLS.player);
}



function draw() {
  background(220);
  moveRect();
  
  
  grid = formField(rows, cols);
  grid[12][16] = CELLS.killbricks;
  
  
  rect(fieldCoords.x, fieldCoords.y, FIELD_DIMS.width, FIELD_DIMS.height);
 
  player.recordTilePositionOnField();
  player.move();
  player.interactions();
  player.display();
  
  
  displayTiles(rows, cols);
  
  
}










function initializeGrid(rows, cols) {
  let placeHolderGrid = [];
  for (let y = 0; y < rows; y++) {
    placeHolderGrid.push([]);
    for (let x = 0; x < cols; x++) {
      placeHolderGrid[y].push(1);
    }
  }
  return placeHolderGrid;
}

function displayTiles(rows, cols) {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1) {
        fill('white');
      }
      else if (grid[y][x] === 0) {
        fill('red');
      }
      else if (grid[y][x] === 2) {
        fill('gray');
      }
      else if (grid[y][x] === 4) {
        fill('green');
      }
      rect(x * CELL_SIZE + CELL_SIZE/2, y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE, CELL_SIZE);
    }
  }
}

function formField(rows, cols) {
  let nextFrame = initializeGrid(rows, cols);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let curTileX = x * CELL_SIZE + CELL_SIZE/2;
      let curTileY = y * CELL_SIZE + CELL_SIZE/2;
      let within = borderHandler(curTileX, curTileY, false);

      if (within) {
        nextFrame[y][x] = 1;
      }
      else {
        nextFrame[y][x] = 0;
      }
    }
  }
  return nextFrame;
}

function recordFieldCoords(rows, cols) {
  let nextField = [];
  let rowCounter = 0;

  for (let y = 0; y < rows; y++) {

    let curTileY = y * CELL_SIZE + CELL_SIZE/2;
    

    if (borderHandler(null, curTileY, FIELD_DIMS.orientation.verticals)) {
      nextField.push([]);
      
      for (let x = 0; x < cols; x++) {

        let curTileX = x * CELL_SIZE + CELL_SIZE/2;

        if (borderHandler(curTileX, null, FIELD_DIMS.orientation.horizontals)) {
          nextField[rowCounter].push({x , y});
        }
      }
      rowCounter++;
    }
  }
  
  return nextField;
}




function generateNewKillBrick() {
  let killTileSettings = {
    fieldX : Math.random(0,FIELD_COLS),
    fieldY : Math.random(0,FIELD_ROWS),


  }

}





function borderHandler(xCoords, yCoords, orientation) {
  // returns true within playable area, false if not
  let withins = [false, false];
  
  let leftBorder = Math.floor(fieldCoords.x - FIELD_DIMS.width/2);
  let rightBorder = Math.floor(fieldCoords.x + FIELD_DIMS.width/2);
  let upBorder = Math.floor(fieldCoords.y - FIELD_DIMS.height/2);
  let downBorder = Math.floor(fieldCoords.y + FIELD_DIMS.height/2);

  withins[0] = xCoords + CELL_SIZE/2 > leftBorder && xCoords - CELL_SIZE/2 < rightBorder;
  withins[1] = yCoords + CELL_SIZE/2 > upBorder && yCoords - CELL_SIZE/2 < downBorder;

  if (orientation) {
    return withins[orientation - 1];
  }
  else {
    return withins.every(border => border);
  }
  
}

function fieldBorder() {
  let withins = [false, false];

  if (fieldCoords.x + FIELD_DIMS.width/2 <= cols * CELL_SIZE && fieldCoords.x - FIELD_DIMS.width/2 >= 0) {
    withins[0] = true; 
  }
  if (fieldCoords.y + FIELD_DIMS.height/2 <= rows * CELL_SIZE && fieldCoords.y - FIELD_DIMS.height/2 >= 0) {
    withins[1] = true; 
  }

  return withins.every(border => border);
}

function moveRect() {
  let updateX = fieldCoords.x;
  let updateY = fieldCoords.y;

  if (keyIsDown('a')) {
    updateX -= FIELD_SPEED;
  }
  if (keyIsDown('d')) {
    updateX += FIELD_SPEED;
  }
  if (keyIsDown('s')) {
    updateY += FIELD_SPEED;
  }
  if (keyIsDown('w')) {
    updateY -= FIELD_SPEED;
  }

  if (updateX - FIELD_DIMS.width/2 >= 0 && updateX + FIELD_DIMS.width/2 <= cols * CELL_SIZE) {
    fieldCoords.x = updateX;
  }

  if (updateY - FIELD_DIMS.height/2 >= 0 && updateY + FIELD_DIMS.height/2 <= rows * CELL_SIZE) {
    fieldCoords.y = updateY;
  }
}
