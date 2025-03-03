 // 定义正方形瓦片的大小
 const TILE_SIZE = 40;
 const TILE_WIDTH = TILE_SIZE;
 const TILE_HEIGHT = TILE_SIZE;

 const TILE_NBROW = 20;
 const TILE_NBCOL = 20;

 let joystick;

 const size_sand_x = 2;
 const size_sand_y = 2;

 let imagesLoaded = 0;

 // 初始化游戏状态
 let gameState = {
   ship: {
     x: 0,
     y: 0,
     orientation: 180
   },
   map: new Map(),
   shipImage: new Image(),
   sandImage: new Image(),
   seaImage: new Image(),
   oilImage: new Image(),
   baseLeftImage: new Image(),
   baseRightImage: new Image(),
   time: 0
 };

 // 设置船只初始坐标
 gameState.ship.x = 0;
 gameState.ship.y = 0;

// 生成地图

function generateMap(cols, rows) {
  const map = new Map();

  const oilX = getRandomInt(cols / 2, cols - 1);
  const oilY = getRandomInt(rows / 2, rows - 1);

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      

      //const isBase = x === gameState.base.x && y === gameState.base.y; // 判断是否为基地

      // 创建瓦片数据
      if ((x <= size_sand_x - 1 && y <= size_sand_y - 2) || (x <= size_sand_x - 2 && y <= size_sand_y - 1)) {
        map.set(`${x},${y}`, {
          x, y,
          type: 'sand',
          oilAmount: 0
        });
      } else if (x === oilX && y === oilY) {
        map.set(`${x},${y}`, {
          x, y,
          type: 'oil', 
          oilAmount: 0.9 // 设置漏油量
        });
      } else if (x === oilX && y === oilY + 1) {
        map.set(`${x},${y}`, {
          x, y,
          type: 'baseLeft', 
          oilAmount: 0 // 设置漏油量
        });
      } else if (x === oilX + 1 && y === oilY + 1) {
        map.set(`${x},${y}`, {
          x, y,
          type: 'baseRight', 
          oilAmount: 0 // 设置漏油量
        });
      } else {
        map.set(`${x},${y}`, {
          x, y,
          // type: isBase ? 'base' : isOil ? 'oil' : 'sea', // 设置瓦片类型
          type: 'sea', // 设置瓦片类型
          oilAmount: 0 // 设置漏油量
        });
      }
    }

}
  return map;
}

//  游戏循环
function gameLoop() {
  const canvas = document.getElementById('gameCanvas');

  if (canvas !== null) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空 canvas

    let nbrows = Math.floor(window.innerWidth / TILE_WIDTH) + 1;
    let nbcols = Math.floor(window.innerHeight / TILE_HEIGHT) + 1;

    const minX = Math.max(0, Math.floor(gameState.ship.x));
    const maxX = minX + nbrows;

    const minY = Math.max(0, Math.floor(gameState.ship.y));
    const maxY = minY + nbcols;

    // 绘制地图
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

        // 计算瓦片在 canvas 上的坐标
        const tileX = (tile.x - gameState.ship.x) * TILE_WIDTH;
        const tileY = (tile.y - gameState.ship.y) * TILE_HEIGHT;

        ctx.globalAlpha = 1 - tile.oilAmount;

        ctx.drawImage(color, tileX, tileY, TILE_WIDTH, TILE_HEIGHT);
      }
    });

    const shipX = (size_sand_x - 1) * TILE_WIDTH;
    const shipY = (size_sand_y - 1) * TILE_HEIGHT;
  
    if (gameState.shipImage) {

      ctx.save();

      // move to the center of the canvas
      ctx.translate(shipX + TILE_WIDTH / 2, shipY + TILE_HEIGHT/2);
    
      // rotate the canvas to the specified degrees
      ctx.rotate(gameState.ship.orientation*Math.PI/180);


      ctx.drawImage(gameState.shipImage, -TILE_WIDTH / 2, -TILE_HEIGHT / 2, TILE_WIDTH, TILE_HEIGHT);

      ctx.restore();
    }
  }
}

// 初始化游戏
function initGame() {
    // 获取 canvas 元素和 2D 渲染上下文
  const canvas = document.getElementById('gameCanvas');


  canvas.width = window.innerWidth; // 设置 canvas 宽度
  canvas.height = window.innerHeight; // 设置 canvas 高度

  gameState.map = generateMap(TILE_NBROW, TILE_NBCOL); // 生成地图

  gameState.ship.x = 0;
  gameState.ship.y = 0;

  // 加载船只图片
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
    radius: 80,
    x: window.innerWidth / 2,
    y: window.innerHeight /2,
    inner_radius: 70,
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
      const touch = e.touches[0];  // Get the first touch point
      const canvas = document.getElementById('gameCanvas');

      const canvasRect = canvas.getBoundingClientRect();  // Get canvas position relative to page

      // Calculate touch position relative to canvas
      const touchX = touch.clientX - canvasRect.left;
      const touchY = touch.clientY - canvasRect.top;

      const tileX = Math.floor((touchX) / TILE_WIDTH);
      const tileY = Math.floor((touchY) / TILE_HEIGHT);

      // Check if the new position is within bounds
      console.log(joystick.left) 
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



