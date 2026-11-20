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
  width : CELL_SIZE * 15,
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





async function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  

  fieldCoords.x = width/2;
  fieldCoords.y = height/2;

  cols = Math.floor(height/CELL_SIZE);
  rows = Math.floor(width/CELL_SIZE);
  if (cols % 2 === 1) {
    cols -=1;
  }
  if (rows % 2 === 1) {
    rows -=1;
  }
  grid = initializeGrid(cols, rows);
}

function draw() {
  background(220);
  moveRect();
  
  
  grid = formField(cols, rows);
  selectTile(recordFieldCoords(cols, rows));

  
  rect(fieldCoords.x, fieldCoords.y, FIELD_DIMS.width, FIELD_DIMS.height);
  displayTiles(cols, rows);
  
}


function initializeGrid(cols, rows) {
  let placeHolderGrid = [];
  for (let y = 0; y < cols; y++) {
    placeHolderGrid.push([]);
    for (let x = 0; x < rows; x++) {
      placeHolderGrid[y].push(1);
    }
  }
  return placeHolderGrid;
}

function displayTiles(cols, rows) {
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
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

function formField(cols, rows) {
  let nextFrame = initializeGrid(cols, rows);

  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
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

function recordFieldCoords(cols, rows) {
  let nextField = [];
  let rowCounter = 0;

  for (let y = 0; y < cols; y++) {

    let curTileY = y * CELL_SIZE + CELL_SIZE/2;

    if (borderHandler(null, curTileY, FIELD_DIMS.orientation.verticals)) {
      nextField.push([]);
      
      for (let x = 0; x < rows; x++) {

        let curTileX = x * CELL_SIZE + CELL_SIZE/2;

        if (borderHandler(curTileX, null, FIELD_DIMS.orientation.horizontals)) {
          let relativeX = curTileX - (fieldCoords.x - FIELD_DIMS.width/2);
          let relativeY = curTileY - (fieldCoords.y - FIELD_DIMS.height/2);

          let tileX = Math.floor(relativeX/CELL_SIZE + 0.5);
          let tileY = Math.floor(relativeY/CELL_SIZE + 0.5);

          nextField[rowCounter].push({x : tileX, y : tileY});
        }
      }
      rowCounter++;
    }
  }
  
  return nextField;
}

function selectTile(selection) {
  let newField = selection;

  let selectedY = newField[5];
  let selectedTile = selectedY[5];

  //Math.floor(Math.random() * selectedY.length)

  let borderY = fieldCoords.y - FIELD_DIMS.height/2;
  let borderX = fieldCoords.x - FIELD_DIMS.width/2;
  
  let correspondingY = selectedTile.y + Math.floor(borderY / CELL_SIZE);
  let correspondingX = selectedTile.x + Math.floor(borderX / CELL_SIZE);


  console.log(correspondingX, correspondingY);
}


function borderHandler(xCoords, yCoords, orientation) {
  // returns true within playable area, false if not
  let withins = [false, false];
  
  let leftBorder = Math.floor(fieldCoords.x - FIELD_DIMS.width/2);
  let rightBorder = Math.floor(fieldCoords.x + FIELD_DIMS.width/2);
  let upBorder = Math.floor(fieldCoords.y - FIELD_DIMS.height/2);
  let downBorder = Math.floor(fieldCoords.y + FIELD_DIMS.height/2);

  withins[0] = xCoords > leftBorder && xCoords < rightBorder;
  withins[1] = yCoords > upBorder && yCoords < downBorder;

  if (orientation) {
    return withins[orientation - 1];
  }
  else {
    return withins.every(border => border);
  }
  
}

function fieldBorder() {
  let withins = [false, false];

  if (fieldCoords.x + FIELD_DIMS.width/2 > cols * CELL_SIZE || fieldCoords.x - FIELD_DIMS.width/2 <= 0) {
    withins[0] = true; 
  }
  if (fieldCoords.y + FIELD_DIMS.height/2 > rows * CELL_SIZE || fieldCoords.y - FIELD_DIMS.height/2 <= 0) {
    withins[1] = true; 
  }

  return withins.every(border => border);
}

function moveRect() {
  if (fieldBorder()) {
    if (keyIsDown('a')) {
      fieldCoords.x -= FIELD_SPEED;
    }
    if (keyIsDown('d')) {
      fieldCoords.x += FIELD_SPEED;
    }
    if (keyIsDown('s')) {
      fieldCoords.y += FIELD_SPEED;
    }
    if (keyIsDown('w')) {
      fieldCoords.y -= FIELD_SPEED;
    }
  }
  

}

