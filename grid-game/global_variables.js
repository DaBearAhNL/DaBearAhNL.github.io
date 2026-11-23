const CELL_SIZE = 30;
const CELLS = {
  void : 0,
  tiles : 1,
  player : 2,
  killTile : {
    warning : 3,
    initiated : 4,
  } ,
  coin : 5
} ; 

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

let rows;
let cols;
let grid;
let field;

let fieldCoords = {
  x : 0,
  y : 0,
  dx : 0,
  dy : 0,
} ;


let player;
let playerIsAlive = true;
let playerSettings = {
  iFrames : 1500,
  health : 5,
  speed : 0.25,
  x : FIELD_COLS/2,
  y : FIELD_ROWS - FIELD_ROWS/3,
  type : CELLS.player,
} ;

let killBrickStorage = [];
let globalKillBrickSettings = {
  type : CELLS.killTile,
  cooldown : 1000,
  periods : {
    warning : 500,
    initiated : 500,
  },
  idCounter : 0,
  lastInstance : 0
} ;
let globalKillBrickCosmeticSettings = {
  spritesheet : null,
  framesBy : 1,
  timing : 0.14,
  scaling : {
    x : 0.5,
    y : 0.5,
  },
  sfx : null,
} ;

let coinStorage = [];
let globalCoinSettings = {
  type : CELLS.coin,
  cooldown : 2000,
  lifeTime : 3500,
  idCounter : 0,
  lastInstance : 0
} ;
let globalCoinCosmeticSettings = {
  spritesheet : null,
  framesBy : 1,
  timing : 0.15,
  scaling : {
    x : 0.35,
    y : 0.2,
  },
  sfx :  null,
} ; 

let coinCollectedCounter = 0;
let increaseDifficultyAfter = 2000;
let lastDifficultyRiseInstance = 0;
let decreaseSpawnCooldown = 50;

let hitSfx;
let deathSfx = [1, 2, 3, 4];
let aliveTheme;
let deadTheme;

let isAliveThemeOn = false;
let isDeadThemeOn = false;

let defaults = {
  fieldCoords : null,
  playerSettings : structuredClone(playerSettings),
  killBrickStorage : [],
  globalKillBrickSettings : structuredClone(globalKillBrickSettings),
  coinStorage : [],
  globalCoinSettings : structuredClone(globalCoinSettings),
  coinCollectedCounter : structuredClone(coinCollectedCounter),
  lastDifficultyRiseInstance : structuredClone(lastDifficultyRiseInstance),
} ;
