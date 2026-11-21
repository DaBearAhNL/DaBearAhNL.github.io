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
  killTiles : 2,
  coins : 3,
  player : 4,
  walls : 5
} ; 

const FIELD_SPEED = 5;
const FIELD_DIMS = {
  width : CELL_SIZE * 16,
  height : CELL_SIZE * 12,
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
  health : 100,
  x : 0,
  y : 0,


}


class Player {
  constructor() {
    
    this.xPrime = 3;
    this.yPrime = 3;
    this.x = 0;
    this.y = 0;
    this.entity = 2;
  }

  select() {
    let field = selectTile(recordFieldCoords(rows, cols), Math.floor(this.xPrime), Math.floor(this.yPrime))
    this.x = field.x;
    this.y = field.y;
  }

  spawn() {
    grid[Math.floor(this.y)][Math.floor(this.x)] = this.entity;
  }

  move() {
    if (keyIsDown('i')) {
      this.yPrime -= 0.25;
    }
    if (keyIsDown('k')) {
      this.yPrime += 0.25;
    }
    if (keyIsDown('l')) {
      this.xPrime += 0.25;
    }
    if (keyIsDown('j')) {
      this.xPrime -= 0.25;
    }
  }

  interactions() {

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
  player = new Player();
}



function draw() {
  background(220);
  moveRect();
  
  
  grid = formField(rows, cols);
  
 
  console.log(selectTile(recordFieldCoords(rows, cols), 2, 3).y);

  
  rect(fieldCoords.x, fieldCoords.y, FIELD_DIMS.width, FIELD_DIMS.height);
 
  player.select();
  player.spawn();
  player.move();
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
      else if (grid[y][x] === 3) {
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

function selectTile(selection, x, y) {
  let newField = selection;

  // let selectedY = newField[Math.floor(Math.random() * newField.length)];
  // let selectedTile = selectedY[Math.floor(Math.random() * selectedY.length)];

  let selectedY = newField[y];
  let selectedTile = selectedY[x];

  return selectedTile;
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
