const TILE_SIZE = 40;
const TILE_WIDTH = TILE_SIZE;
const TILE_HEIGHT = TILE_SIZE;

const TILE_NBROW = 41;
const TILE_NBCOL = 41;

let joystick;

const size_sand_x = 2;
const size_sand_y = 2;

let imagesLoaded = 0;

let gameState = {
  ship: {
    x: 0,
    y: 0,
    orientation: 0
  },
  map: new Map(),
  shipImage: new Image(),
  sandImage: new Image(),
  seaImage: new Image(),
  oilImage: new Image(),
  baseLeftImage: new Image(),
  baseRightImage: new Image(),
  time: 0,
  oilcenter: {
  x: 0,
  y: 0
  },
};

gameState.ship.x = 0;
gameState.ship.y = 0;


function generateMap(cols, rows) {
  const map = new Map();

  const oilX = getRandomInt(cols / 2, cols - 1);
  const oilY = getRandomInt(rows / 2, rows - 1);

  gameState.oilcenter.x = oilX;
  gameState.oilcenter.y = oilY;

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      
      if ((x === Math.floor(rows / 2) && (y === Math.floor(cols / 2) || y === Math.floor(cols / 2) + 1 || y === Math.floor(cols / 2) + 2))|| ((x === Math.floor(rows / 2) + 1 || x === Math.floor(rows / 2) - 1) && y === Math.floor(cols / 2) + 1)) {
        map.set(`${x},${y}`, {
          x, y,
          type: 'sand',
          oilAmount: 0
        });
      } else if (x === oilX && y === oilY) {
        map.set(`${x},${y}`, {
          x, y,
          type: 'oil', 
          oilAmount: Math.floor(Math.random() * 3) + 1
        });
      } else if (x === oilX && y === oilY + 1) {
        map.set(`${x},${y}`, {
          x, y,
          type: 'baseLeft', 
          oilAmount: 0
        });
      } else if (x === oilX + 1 && y === oilY + 1) {
        map.set(`${x},${y}`, {
          x, y,
          type: 'baseRight', 
          oilAmount: 0
        });
      } else {
        map.set(`${x},${y}`, {
          x, y,
          type: 'sea',
          oilAmount: 0
        });
      }
    }

}
  return map;
}


function gameLoop() {
  const canvas = document.getElementById('gameCanvas');

  if (canvas !== null) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let nbrows = Math.floor(window.innerWidth / TILE_WIDTH) + 2;
    let nbcols = Math.floor(window.innerHeight / TILE_HEIGHT) + 2;

    const minX = Math.max(0, Math.floor(gameState.ship.x));
    const maxX = minX + nbrows;

    const minY = Math.max(0, Math.floor(gameState.ship.y));
    const maxY = minY + nbcols;

    gameState.map.forEach(tile => {
      if (    
        tile.x >= minX && tile.x < maxX &&
        tile.y >= minY && tile.y < maxY  
       ) {

        let color; 

        switch (tile.type) {
          case ("oil"):
            color = gameState.oilImage;
            break;
          case ("sand"):
            color = gameState.sandImage;
            break;
          case ("baseLeft"):
            color = gameState.baseLeftImage;
            break;
          case ("baseRight"):
            color = gameState.baseRightImage;
            break;
          default:
            color = gameState.seaImage;
            break;
        }

        const tileX = (tile.x - gameState.ship.x) * TILE_WIDTH;
        const tileY = (tile.y - gameState.ship.y) * TILE_HEIGHT;

        ctx.drawImage(color, tileX, tileY, TILE_WIDTH, TILE_HEIGHT);
      }
    });

    const shipX = (nbrows / 2) * TILE_WIDTH;
    const shipY = (nbcols / 2 - 1) * TILE_HEIGHT;
  
    if (gameState.shipImage) {

      ctx.save();

      // move to the center of the canvas
      ctx.translate(shipX + TILE_WIDTH / 2, shipY + TILE_HEIGHT/2);
    
      // rotate the canvas to the specified degrees
      ctx.rotate(gameState.ship.orientation*Math.PI/180);

      ctx.drawImage(gameState.shipImage, -TILE_WIDTH / 2, -TILE_HEIGHT / 2, TILE_WIDTH, TILE_HEIGHT);

      ctx.restore();
    }

    ctx.beginPath();
    canvas_arrow(ctx, 
      shipX + TILE_WIDTH / 2, 
      shipY + TILE_HEIGHT / 2, 
      ((gameState.oilcenter.x - gameState.ship.x) * TILE_WIDTH), 
      ((gameState.oilcenter.y - gameState.ship.y) * TILE_HEIGHT), 
      TILE_SIZE);
    ctx.stroke();
  }
}

// 初始化游戏
function initGame() {
  const canvas = document.getElementById('gameCanvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  gameState.map = generateMap(TILE_NBROW, TILE_NBCOL);

  let nbrows = Math.floor(Math.floor(window.innerWidth / TILE_WIDTH) / 2);
  let nbcols = Math.floor(Math.floor(window.innerHeight / TILE_HEIGHT) / 2);

  gameState.ship.x = (TILE_NBROW / 2 - 1) - nbrows;
  gameState.ship.y = (TILE_NBCOL / 2 - 1) - nbcols;

  gameState.shipImage.src = 'assets/ship.png';
  gameState.oilImage.src = 'assets/oil.png';
  gameState.seaImage.src = 'assets/sea.png';
  gameState.sandImage.src = 'assets/shore.png';
  gameState.baseLeftImage.src = 'assets/station_left.png';
  gameState.baseRightImage.src = 'assets/station_right.png';

  gameState.shipImage.onload = imageLoaded;
  gameState.oilImage.onload = imageLoaded;
  gameState.seaImage.onload = imageLoaded;
  gameState.sandImage.onload = imageLoaded;
  gameState.baseLeftImage.onload = imageLoaded;
  gameState.baseRightImage.onload = imageLoaded;

  joystick = new JoyStick({
    radius: 60,
    x: window.innerWidth / 2,
    y: window.innerHeight - 150,
    inner_radius: 50,
    mouse_support: false,
  });

  const pad = document.getElementById("pad");

  pad.addEventListener("touchstart", touchHandler, {passive: false});
  pad.addEventListener("touchmove", touchHandler, {passive: false});

}

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === 6) {
      gameLoop();
  }
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function touchHandler(e) {
  if (e.touches) {

      // Check if the new position is within bounds
      if (joystick.left) {
        gameState.ship.x -= 0.2;
        gameState.ship.orientation = 270;
      } else if (joystick.right) {
        gameState.ship.x += 0.2;
        gameState.ship.orientation = 90;
      }

      if (joystick.up) {
        gameState.ship.y -= 0.2;
        gameState.ship.orientation = 0;
      } else if (joystick.down) {
        gameState.ship.y += 0.2;
        gameState.ship.orientation = 180;
      }
    

      requestAnimationFrame(gameLoop);

      e.preventDefault();  // Prevent scrolling on touch devices
  }
}



