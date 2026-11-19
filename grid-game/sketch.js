// Grid Game
// Newell Devera
// November 4, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const FIELD_SPEED = 5;
const CELL_SIZE = 30;
const BASE_FIELD_DIMS = {
  width : CELL_SIZE * 15,
  height : CELL_SIZE * 12,
  specify : 'inner'
} ;
const TRANSFORMABLE_FIELD_DIMS = {
  width : BASE_FIELD_DIMS.width + 4*CELL_SIZE,
  height : BASE_FIELD_DIMS.height + 4*CELL_SIZE,
  specify : 'outer'
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

  rect(fieldCoords.x, fieldCoords.y, TRANSFORMABLE_FIELD_DIMS.width, TRANSFORMABLE_FIELD_DIMS.height);
  rect(fieldCoords.x, fieldCoords.y, BASE_FIELD_DIMS.width, BASE_FIELD_DIMS.height);
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
      let [min, max] = borderHandler(curTileX, curTileY, false, false);

      if (min && max) {
        nextFrame[y][x] = 1;
      }
      else if (!min && max) {
        nextFrame[y][x] = 2;
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

    if (borderHandler(null, curTileY, BASE_FIELD_DIMS.specify, 2)) {
      nextField.push([]);
      
      for (let x = 0; x < rows; x++) {

        let curTileX = x * CELL_SIZE + CELL_SIZE/2;

        if (borderHandler(curTileX, null, BASE_FIELD_DIMS.specify, 1)) {
          let relativeX = curTileX - (fieldCoords.x - BASE_FIELD_DIMS.width/2);
          let relativeY = curTileY - (fieldCoords.y - BASE_FIELD_DIMS.height/2);

          let tileX = Math.floor(relativeX/CELL_SIZE + 0.5);
          let tileY = Math.floor(relativeY/CELL_SIZE + 1);

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

  let selectedY = newField[Math.floor(Math.random() * newField.length)];
  let selectedTile = selectedY[Math.floor(Math.random() * selectedY.length)];

  let borderY = fieldCoords.y - BASE_FIELD_DIMS.height/2;
  let borderX = fieldCoords.x - BASE_FIELD_DIMS.width/2;
  
  let correspondingY = selectedTile.y + Math.floor(borderY / CELL_SIZE);
  let correspondingX = selectedTile.x + Math.floor(borderX / CELL_SIZE);

  grid[correspondingY][correspondingX] = 3;
  console.log(correspondingX, correspondingY);
}


function borderHandler(xCoords, yCoords, specifics, orientation) {
  // returns true within playable area, false if not
  let withins = [false, false];
  
  let leftMinBorder = Math.floor(fieldCoords.x - BASE_FIELD_DIMS.width/2);
  let rightMinBorder = Math.floor(fieldCoords.x + BASE_FIELD_DIMS.width/2);
  let upMinBorder = Math.floor(fieldCoords.y - BASE_FIELD_DIMS.height/2);
  let downMinBorder = Math.floor(fieldCoords.y + BASE_FIELD_DIMS.height/2);

  let leftMaxBorder = Math.floor(fieldCoords.x - TRANSFORMABLE_FIELD_DIMS.width/2);
  let rightMaxBorder = Math.floor(fieldCoords.x + TRANSFORMABLE_FIELD_DIMS.width/2);
  let upMaxBorder = Math.floor(fieldCoords.y - TRANSFORMABLE_FIELD_DIMS.height/2);
  let downMaxBorder = Math.floor(fieldCoords.y + TRANSFORMABLE_FIELD_DIMS.height/2);

  if (specifics && orientation) {
    if (specifics === 'inner') {
      withins[0] = xCoords > leftMinBorder && xCoords < rightMinBorder;
      withins[1] = yCoords > upMinBorder && yCoords < downMinBorder;
    }
    else if (specifics === 'outer') {
      withins[0] = xCoords > leftMaxBorder && xCoords < rightMaxBorder;
      withins[1] = yCoords > upMaxBorder && yCoords < downMaxBorder;
    }

    return withins[orientation - 1];
  }

  else {
    withins[0] = 
      xCoords > leftMinBorder && xCoords < rightMinBorder &&
      yCoords > upMinBorder && yCoords < downMinBorder;

    withins[1] = 
      xCoords > leftMaxBorder && xCoords < rightMaxBorder &&
      yCoords > upMaxBorder && yCoords < downMaxBorder;
  }

  return [withins[0], withins[1]];
}


function moveRect() {
  if (keyIsDown('a')) {
    fieldCoords.x -= FIELD_SPEED;
    Math.floor[fieldCoords.x];
  }
  if (keyIsDown('d')) {
    fieldCoords.x += FIELD_SPEED;
    Math.floor[fieldCoords.x];
  }
  if (keyIsDown('s')) {
    fieldCoords.y += FIELD_SPEED;
    Math.floor[fieldCoords.y];
  }
  if (keyIsDown('w')) {
    fieldCoords.y -= FIELD_SPEED;
    Math.floor[fieldCoords.y];
  }

}

