// Grid Game
// Newell Devera
// November 4, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 30;
const BORDER = {
  x : CELL_SIZE/5,
  y : CELL_SIZE/5,
} ; 

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
      if (borderHandler(x, rows, y, cols)) {
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
      square(x * CELL_SIZE + CELL_SIZE/2, y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE);
    }
  }
}


function borderHandler(xValue, xLimit, yValue, yLimit) {
  // returns true within playable area, false if not
  if (xValue > Math.floor(BORDER.x) && xValue < Math.floor(xLimit - BORDER.x) &&
  yValue > Math.floor(BORDER.y) && yValue < Math.floor(yLimit - BORDER.y)) {
    return true;
  }
  else {
    return false;
  }
}

function mousePressed() {
  console.log(detectDistanceFromRight(Math.floor(mouseY/CELL_SIZE), Math.floor(mouseX/CELL_SIZE)));
}

function detectDistanceFromRight(y, x) {
  let holder = 0;
  
  for (let tile = x; tile <= rows; tile--) {
    if (grid[y][tile] === 0) {
      return [holder, y, grid[y].indexOf(1)];
    }
    else if (grid[y][tile] === 1) {
      holder++;
    }
  }
}
