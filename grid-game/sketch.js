// Grid Game
// Newell Devera
// November 4, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 30;
const BASE_PLAYABLE_FIELD_DIMENSIONS = {
  width : CELL_SIZE * 20,
  height : CELL_SIZE * 15
} ;
const LIMITING_TRANSFORMATION_FIELD_DIMENSIONS = {
  width : CELL_SIZE * 20 + CELL_SIZE * 5,
  height : CELL_SIZE * 15 + CELL_SIZE * 5
} ; 

let fieldCoords = {
  x : 0,
  y : 0
} ;

let rows;
let cols;
let grid;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  fieldCoords.x = width/2;
  fieldCoords.y = height/2;

  cols = Math.floor(height/CELL_SIZE);
  rows = Math.floor(width/CELL_SIZE);
  grid = formBaseGrid(cols, rows);
}

function draw() {
  background(220);
  moveRect();
  

  grid = displayField(cols, rows);

  rect(fieldCoords.x, fieldCoords.y, LIMITING_TRANSFORMATION_FIELD_DIMENSIONS.width, LIMITING_TRANSFORMATION_FIELD_DIMENSIONS.height);
  rect(fieldCoords.x, fieldCoords.y, BASE_PLAYABLE_FIELD_DIMENSIONS.width, BASE_PLAYABLE_FIELD_DIMENSIONS.height);
  displayGrid(cols, rows);
  
}

function formBaseGrid(cols, rows) {
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
      rect(x * CELL_SIZE + CELL_SIZE/2, y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE, CELL_SIZE);
    }
  }
}

function displayField(cols, rows) {
  let nextFrame = formBaseGrid(cols, rows);

  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      let curTileX = x * CELL_SIZE + CELL_SIZE/2;
      let curTileY = y * CELL_SIZE + CELL_SIZE/2;
      let [min, max] = borderHandler(curTileX, curTileY)

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

function borderHandler(xCoords, yCoords) {
  // returns true within playable area, false if not
  
  let leftMinBorder = Math.floor(fieldCoords.x - BASE_PLAYABLE_FIELD_DIMENSIONS.width/2);
  let rightMinBorder = Math.floor(fieldCoords.x + BASE_PLAYABLE_FIELD_DIMENSIONS.width/2);
  let upMinBorder = Math.floor(fieldCoords.y - BASE_PLAYABLE_FIELD_DIMENSIONS.height/2);
  let downMinBorder = Math.floor(fieldCoords.y + BASE_PLAYABLE_FIELD_DIMENSIONS.height/2);

  let leftMaxBorder = Math.floor(fieldCoords.x - LIMITING_TRANSFORMATION_FIELD_DIMENSIONS.width/2);
  let rightMaxBorder = Math.floor(fieldCoords.x + LIMITING_TRANSFORMATION_FIELD_DIMENSIONS.width/2);
  let upMaxBorder = Math.floor(fieldCoords.y - LIMITING_TRANSFORMATION_FIELD_DIMENSIONS.height/2);
  let downMaxBorder = Math.floor(fieldCoords.y + LIMITING_TRANSFORMATION_FIELD_DIMENSIONS.height/2);
 
  let withinMin = 
    xCoords > leftMinBorder && xCoords < rightMinBorder &&
    yCoords > upMinBorder && yCoords < downMinBorder;

  let withinMax = 
    xCoords > leftMaxBorder && xCoords < rightMaxBorder &&
    yCoords > upMaxBorder && yCoords < downMaxBorder;

  return [withinMin, withinMax];
}


function moveRect() {
  if (keyIsDown('a')) {
    fieldCoords.x -= 5;
  }
  if (keyIsDown('d')) {
    fieldCoords.x += 5;
  }
  if (keyIsDown('s')) {
    fieldCoords.y += 5;
  }
  if (keyIsDown('w')) {
    fieldCoords.y -= 5;
  }
}

// function detectDistanceFromLeft(y, x) {
//   let distance = 0;
  
//   for (let tile = x; tile >= 0; tile--) {
//     if (grid[y][tile] === 0) {
//       return distance;
//     }
//     else if (grid[y][tile] === 1) {
//       distance++;
//     }
//   }
// }

// function moveToRight(y, amountby) {
//   let holder = [];
//   for (let tile in grid[y]) {
//     let recorder = detectDistanceFromLeft(y, tile);
//     if (grid[y][tile] === 1) {
//       if (recorder <= amountby) {
//         holder.push(0)
//       }
//       else if (recorder > amountby) {
//         holder.push(1)
//       }
//     }
//     else if (grid[y][tile] === 0) {
//       if (grid[y][tile - amountby] === 1) {
//         holder.push(1)
//       }
//       else {
//         holder.push(0)
//       }
//     }
//     // holder.push(detectDistanceFromRight(y, tile))
//   }
//   return holder;
// }
