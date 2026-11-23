// These functions are responsible for the grid(the entire area where the field can move) and the field(the area the player can move inside).
// They are responsible for assigning the grid, showing the grid, letting both the field and player to move within certain boundaries.
// Most importantly this file holds the function that gives out a tile inside the field and keeps assigning the corresponding tile no matter if the field moves to an entity.


function initializeGrid(rows, cols) { // Forms an empty grid at first.
  let placeHolderGrid = [];
  for (let y = 0; y < rows; y++) {
    placeHolderGrid.push([]);
    for (let x = 0; x < cols; x++) {
      placeHolderGrid[y].push(1);
    }
  }
  return placeHolderGrid;
}

function displayTiles(rows, cols) { // Shows tiles that are not defined by a lifetime.
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill('black');
      }
      else if (grid[y][x] === 1) {
        fill('gray');
      }
      else if (grid[y][x] === 2) {
        fill('cyan');
      }
      rect(x * CELL_SIZE + CELL_SIZE/2, y * CELL_SIZE + CELL_SIZE/2, CELL_SIZE, CELL_SIZE);
    }
  }
}

function formField(rows, cols) { // Sets a field within the grid where all the events happen.
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

function recordFieldCoords(rows, cols) { // (The function that made me revise my entire code 2 times)
  let nextField = [];
  let rowCounter = 0;

  for (let y = 0; y < rows; y++) {
    let curTileY = y * CELL_SIZE + CELL_SIZE/2;
    
    if (borderHandler(null, curTileY, FIELD_DIMS.orientation.verticals)) { // From here it creates an array that mimics the field's columns and rows.
      nextField.push([]);
      
      for (let x = 0; x < cols; x++) {
        let curTileX = x * CELL_SIZE + CELL_SIZE/2;

        if (borderHandler(curTileX, null, FIELD_DIMS.orientation.horizontals)) {
          nextField[rowCounter].push({x , y}); // For every tile, it passes out their grid position which allows the entities to pick a placement on the field and moves with the field.
        }
      }
      rowCounter++;
    }
  }
  return nextField;
}

function borderHandler(xCoords, yCoords, orientation) { // Creates starting points that allows the recordFieldCoords to measure which tile from the grid the field starts and where it ends
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

function moveField() { // Moves the field around randomly to disorientate the player.
  fieldCoords.x += fieldCoords.dx
  fieldCoords.y += fieldCoords.dy

  if (fieldCoords.x <= 0 + FIELD_DIMS.width/2 || fieldCoords.x >= (cols * CELL_SIZE) - FIELD_DIMS.width/2) {
    fieldCoords.dx *= -1;
  }

  if (fieldCoords.y <= 0 + FIELD_DIMS.height/2 || fieldCoords.y >= (rows * CELL_SIZE) - FIELD_DIMS.height/2) {
    fieldCoords.dy *= -1;
  }
}