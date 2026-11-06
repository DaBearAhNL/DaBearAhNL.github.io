//

const CELL_SIZE = 50;
const CELL_STATE = {
  open : 0,
  closed : 1,
  detected : 2,
} ;
const PLAYER = 5;
let thePlayer = {
  x : 0,
  y : 0
} ;

let rows;
let cols;
let grid;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
  // put player in grid

  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function draw() {
  background(220);
  noStroke();
  displayGrid();
}

function keyPressed() {
  if (key === 'r') {
    grid = generateRandomGrid(cols, rows);
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
  else if (key === 'e') {
    grid = generateEmptyGrid(cols, rows);
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
  else if(key === RIGHT_ARROW) {
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
  else if(key === LEFT_ARROW) {
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
  else if(key === UP_ARROW) {
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  else if(key === DOWN_ARROW) {
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }

}

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  toggleCell(x, y);
  
}

function movePlayer(x, y) {
  // dont walk off grid
  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === CELL_STATE.open) {

    let oldX = thePlayer.x;
    let oldY = thePlayer.y;

    thePlayer.x = x;
    thePlayer.y = y;

    grid[thePlayer.y][thePlayer.x] = PLAYER;

    grid[oldY][oldX] = CELL_STATE.open;
  }
  
}

function toggleCell(x, y) {
  //make sure ur in grid

  if (x >= 0 && x < cols && y < rows && y >= 0) {
    if (grid[y][x] === CELL_STATE.open) {
      grid[y][x] = CELL_STATE.closed;
    }
    else if (grid[y][x] === CELL_STATE.closed) {
      grid[y][x] = CELL_STATE.open;
    }
  }
  
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === CELL_STATE.open) {
        fill('white');
      }
      else if (grid[y][x] === CELL_STATE.closed) {
        fill('black');
      }
      else if (grid[y][x] === PLAYER) {
        fill('red');
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        newGrid[y].push(CELL_STATE.open);
      }
      else {
        newGrid[y].push(CELL_STATE.closed);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}