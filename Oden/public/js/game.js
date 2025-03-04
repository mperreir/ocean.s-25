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
  camera: {
    x: 0,
    y: 0,
    orientation: 0
  },
  ship: {
    x: 0,
    y: 0,
  },
  map: new Map(),
  shipImage: new Image(),
  sandImage: new Image(),
  seaImage: new Image(),
  deepseaImage: new Image(),
  oilImageFull: new Image(),
  oilImageFirst: new Image(),
  oilImageSecond: new Image(),
  oilImageThird: new Image(),
  oilImageFourth: new Image(),
  oilImageFire: new Image(),
  baseLeftImage: new Image(),
  baseRightImage: new Image(),
  time: 0,
  oilcenter: {
    x: 0,
    y: 0
  },
  time: 45,
  started: false,
  nbpropagation: 1,
  fire: false,
};

gameState.camera.x = 0;
gameState.camera.y = 0;


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
          oilAmount: 0.2
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
      } else if (x === 0 || y === 0 || x === cols - 1 || y === rows - 1) {
        map.set(`${x},${y}`, {
          x, y,
          type: 'deepsea',
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

    const minX = Math.max(0, Math.floor(gameState.camera.x));
    const maxX = minX + nbrows;

    const minY = Math.max(0, Math.floor(gameState.camera.y));
    const maxY = minY + nbcols;

    gameState.map.forEach(tile => {
      if (    
        tile.x >= minX && tile.x < maxX &&
        tile.y >= minY && tile.y < maxY  
       ) {

        let color; 

        switch (tile.type) {
          case ("oil"):
            color = gameState.oilImageFull;
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
          case ("deepsea"):
            color = gameState.deepseaImage;
            break;
          default:
            color = gameState.seaImage;
            break;
        }

        const tileX = (tile.x - gameState.camera.x) * TILE_WIDTH;
        const tileY = (tile.y - gameState.camera.y) * TILE_HEIGHT;

        if (color === gameState.oilImageFull) {

          switch (true) {
            case tile.oilAmount <= 0.2:
              color = gameState.oilImageFirst;
              break;
            case tile.oilAmount <= 0.4:
              color = gameState.oilImageSecond;
              break;
            case tile.oilAmount <= 0.6:
              color = gameState.oilImageThird;
              break;
            case tile.oilAmount <= 0.8:
              color = gameState.oilImageFourth;
              break;
            case tile.oilAmount <= 1:
              color = gameState.oilImageFull;
              break;
          }

        }

        ctx.drawImage(color, tileX, tileY, TILE_WIDTH, TILE_HEIGHT);

      }
    });

    gameState.ship.x = (nbrows / 2) * TILE_WIDTH;
    gameState.ship.y = (nbcols / 2 - 1) * TILE_HEIGHT; 
  
    if (gameState.shipImage) {

      ctx.save();

      // move to the center of the canvas
      ctx.translate(gameState.ship.x + TILE_WIDTH / 2, gameState.ship.y + TILE_HEIGHT/2);
    
      // rotate the canvas to the specified degrees
      ctx.rotate(gameState.camera.orientation*Math.PI/180);

      ctx.drawImage(gameState.shipImage, -TILE_WIDTH / 2, -TILE_HEIGHT / 2, TILE_WIDTH, TILE_HEIGHT);

      ctx.restore();
    }

    ctx.beginPath();
    canvas_arrow(ctx, 
      gameState.ship.x + TILE_WIDTH / 2, 
      gameState.ship.y + TILE_HEIGHT / 2, 
      ((gameState.oilcenter.x - gameState.camera.x) * TILE_WIDTH), 
      ((gameState.oilcenter.y - gameState.camera.y) * TILE_HEIGHT), 
      TILE_SIZE);
    ctx.stroke();
  }
}


function initGame() {
  const canvas = document.getElementById('gameCanvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  gameState.map = generateMap(TILE_NBROW, TILE_NBCOL);

  let nbrows = Math.floor(Math.floor(window.innerWidth / TILE_WIDTH) / 2);
  let nbcols = Math.floor(Math.floor(window.innerHeight / TILE_HEIGHT) / 2);

  gameState.camera.x = (TILE_NBROW / 2 - 1) - nbrows;
  gameState.camera.y = (TILE_NBCOL / 2 - 1) - nbcols;

  gameState.shipImage.src = 'assets/ship.png';
  gameState.oilImageFull.src = 'assets/oil.png';
  gameState.oilImageFirst.src = 'assets/oil_spread1.png';
  gameState.oilImageSecond.src = 'assets/oil_spread2.png';
  gameState.oilImageThird.src = 'assets/oil_spread3.png';
  gameState.oilImageFourth.src = 'assets/oil_spread4.png';
  gameState.oilImageFire.src = 'assets/fire.png';

  gameState.seaImage.src = 'assets/sea.png';
  gameState.deepseaImage.src = 'assets/sea2.png';
  gameState.sandImage.src = 'assets/shore.png';
  gameState.baseLeftImage.src = 'assets/station_left.png';
  gameState.baseRightImage.src = 'assets/station_right.png';

  gameState.shipImage.onload = imageLoaded;
  gameState.oilImageFull.onload = imageLoaded;
  gameState.oilImageFirst.onload = imageLoaded;
  gameState.oilImageSecond.onload = imageLoaded;
  gameState.oilImageThird.onload = imageLoaded;
  gameState.oilImageFourth.onload = imageLoaded;
  gameState.oilImageFire.onload = imageLoaded;
  gameState.deepseaImage.onload = imageLoaded;
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

  buttonFire(window.innerWidth / 2 + 120, window.innerHeight - 150, 30);

  const pad = document.getElementById("pad");

  pad.addEventListener("touchstart", (e) => {
    touchHandler(e);
    if (!gameState.started) {
      gameState.started = true;
      const timer = setInterval(() => {
        if (gameState.time > 0 && !gameState.fire) {
          const time = document.getElementById("time");
          gameState.time--;
          gameState.time < 10 ? time.innerText = "0"+gameState.time : time.innerText = gameState.time;

          propagationOil();
          
          if (gameState.time % 5 == 0) {
            gameState.nbpropagation++;
          }
        }
      }, 1000);
    }
  }, {passive: false});
  pad.addEventListener("touchmove", touchHandler, {passive: false});

  document.getElementById("buttonFire").addEventListener("click", () => {

    const { x: centerX, y: centerY } = gameState.oilcenter;
    const dist = gameState.nbpropagation;
    const shipX = (gameState.camera.x + gameState.ship.x / TILE_WIDTH);
    const shipY = (gameState.camera.y + gameState.ship.y / TILE_HEIGHT);

    if ((Math.abs(shipX - centerX) === dist && Math.abs(shipY - centerY) <= dist) ||
      (Math.abs(shipY - centerY) === dist && Math.abs(shipX - centerX) <= dist))
    {
     console.log("hello"); 
    }

    gameState.fire = true;
    gameState.oilImageFull = gameState.oilImageFire;
    gameState.oilImageFirst = gameState.oilImageFire;
    gameState.oilImageSecond = gameState.oilImageFire;
    gameState.oilImageThird = gameState.oilImageFire;
    gameState.oilImageFourth = gameState.oilImageFire;

    requestAnimationFrame(gameLoop);
  });
}

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === 12) {
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
    let speed = 0.1;

    if (['deepsea', 'oil'].includes(ceilType((gameState.camera.x + gameState.ship.x / TILE_WIDTH), (gameState.camera.y + gameState.ship.y / TILE_HEIGHT)))) {
      speed = 0.01;
    }

    if (gameState.fire) {
      if (joystick.left) {
        if (['sea', 'deepsea'].includes(ceilType(((gameState.camera.x + gameState.ship.x / TILE_WIDTH) - 0.2), (gameState.camera.y + gameState.ship.y / TILE_HEIGHT)))) {
          gameState.camera.x -= speed;
          gameState.camera.orientation = 270;
        }
      } else if (joystick.right) {
        if (['sea', 'deepsea'].includes(ceilType(((gameState.camera.x + gameState.ship.x / TILE_WIDTH) + 0.2), (gameState.camera.y + gameState.ship.y / TILE_HEIGHT)))) {
          gameState.camera.x += speed;
          gameState.camera.orientation = 90;
        }
      }
  
      if (joystick.up) {
        if (['sea', 'deepsea'].includes(ceilType(((gameState.camera.x + gameState.ship.x / TILE_WIDTH)), (gameState.camera.y + gameState.ship.y / TILE_HEIGHT) - 0.2))) {
          gameState.camera.y -= speed;
          gameState.camera.orientation = 0;
        }
      } else if (joystick.down) {
        if (['sea', 'deepsea'].includes(ceilType(((gameState.camera.x + gameState.ship.x / TILE_WIDTH)), (gameState.camera.y + gameState.ship.y / TILE_HEIGHT) + 0.2))) {
          gameState.camera.y += speed;
          gameState.camera.orientation = 180;
        }
      }
    } else {
      if (joystick.left) {
        if (['sea', 'deepsea', 'oil'].includes(ceilType(((gameState.camera.x + gameState.ship.x / TILE_WIDTH) - 0.2), (gameState.camera.y + gameState.ship.y / TILE_HEIGHT)))) {
          gameState.camera.x -= speed;
          gameState.camera.orientation = 270;
        }
      } else if (joystick.right) {
        if (['sea', 'deepsea', 'oil'].includes(ceilType(((gameState.camera.x + gameState.ship.x / TILE_WIDTH) + 0.2), (gameState.camera.y + gameState.ship.y / TILE_HEIGHT)))) {
          gameState.camera.x += speed;
          gameState.camera.orientation = 90;
        }
      }

      if (joystick.up) {
        if (['sea', 'deepsea', 'oil'].includes(ceilType(((gameState.camera.x + gameState.ship.x / TILE_WIDTH)), (gameState.camera.y + gameState.ship.y / TILE_HEIGHT) - 0.2))) {
          gameState.camera.y -= speed;
          gameState.camera.orientation = 0;
        }
      } else if (joystick.down) {
        if (['sea', 'deepsea', 'oil'].includes(ceilType(((gameState.camera.x + gameState.ship.x / TILE_WIDTH)), (gameState.camera.y + gameState.ship.y / TILE_HEIGHT) + 0.2))) {
          gameState.camera.y += speed;
          gameState.camera.orientation = 180;
        }
      }
    }

    if (joystick.left && joystick.up) {
      gameState.camera.orientation = 315;
    } else if (joystick.right && joystick.up) {
      gameState.camera.orientation = 45;
    } else if (joystick.left && joystick.down) {
      gameState.camera.orientation = 225;
    } else if (joystick.right && joystick.down) {
      gameState.camera.orientation = 135;
    }
    

    requestAnimationFrame(gameLoop);

    e.preventDefault();  // Prevent scrolling on touch devices
  }
}

function ceilType(x, y) {

  for (let [_, tile] of gameState.map) {
    if (tile.x === Math.round(x) && tile.y === Math.round(y)) {
      return tile.type;
    }
  }

  return null;
}

function propagationOil() {
  const { x: centerX, y: centerY } = gameState.oilcenter;
  const dist = gameState.nbpropagation;

  for (let [_, tile] of gameState.map) {
    if ((Math.abs(tile.x - centerX) === dist && Math.abs(tile.y - centerY) <= dist) ||
    (Math.abs(tile.y - centerY) === dist && Math.abs(tile.x - centerX) <= dist) ||
    (tile.x === centerX && tile.y === centerY)) {
      if (tile.type === 'sea') {
        tile.type = 'oil';
        tile.oilAmount = 0.2;
      } else if (tile.type === 'oil') {
        tile.oilAmount += 0.2;
      }
    }
  }
  
  requestAnimationFrame(gameLoop);
}
