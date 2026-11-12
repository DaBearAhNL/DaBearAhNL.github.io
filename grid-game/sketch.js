// Grid Game
// Newell Devera
// November 4, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 30;
const BORDER_RANGE = CELL_SIZE/10;
let rows;
let cols;
let grid;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  cols = Math.floor(height/CELL_SIZE);
  rows = Math.floor(width/CELL_SIZE);
  grid = formGrid(cols, rows);
}

function draw() {
  background(220);
  displayGrid(cols, rows);

}

function formGrid(cols, rows) {
  let placeHolderGrid = [];
  for (let y = 0; y < cols; y++) {
    placeHolderGrid.push([]);
    for (let x = 0; x < rows; x++) {
      if (random(100) <= 50) {
        placeHolderGrid[y].push(1);
      }
      else {
        placeHolderGrid[y].push(0);
      }
    }
  }
  return placeHolderGrid;
}

function displayGrid(cols, rows) {
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      if (grid[y][x] === 1) {
        fill('white');
      }
      else if (grid[y][x] === 0) {
        fill('black');
      }
      square(x * CELL_SIZE+CELL_SIZE/1.8, y * CELL_SIZE+CELL_SIZE/1.35, CELL_SIZE);
    }
  }
}


function borderHandler(value, dependency) {
  // returns true within playable area, false if not
  if (value > Math.floor(BORDER_RANGE) && value < Math.floor(dependency - BORDER_RANGE)) {
    return true;
  }
  else {
    return false;
  }
}