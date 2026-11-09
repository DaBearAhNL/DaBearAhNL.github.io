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
let stoneImg;
let purpleImg;

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
      placeHolderGrid[y].push(1);
    }
  }
  return placeHolderGrid;
}

function displayGrid(cols, rows) {
  for (let y = 0; y < cols; y++) {
    if (borderHandler(y, cols)) {
      for (let x = 0; x < rows; x++) {
        if  (borderHandler(x, rows) && grid[y][x] === 1) {
          fill('white');
          square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
        }
      }
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