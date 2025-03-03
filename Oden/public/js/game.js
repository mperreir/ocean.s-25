 // 定义正方形瓦片的大小
 const TILE_SIZE = 40;
 const TILE_WIDTH = TILE_SIZE;
 const TILE_HEIGHT = TILE_SIZE;

 const TILE_NBROW = 20;
 const TILE_NBCOL = 20;


 const size_sand = 2;
 let imagesLoaded = 0;

 // 初始化游戏状态
 let gameState = {
   ship: {
     x: 0, // 船只的 x 坐标
     y: 0 // 船只的 y 坐标
     //inventory: 0, // 船只的库存
     //capacity: 10 // 船只的容量
   },
   //base: { x: 5, y: 5 }, // 基地坐标
   map: new Map(), // 地图数据
   shipImage: new Image(), // 船只图片
   sandImage: new Image(),
   seaImage: new Image(),
   oilImage: new Image(),
   time: 0 // 记录时间
 };

 // 设置船只初始坐标
 gameState.ship.x = 0;
 gameState.ship.y = 0;

// 生成地图

function generateMap(cols, rows) {
  const map = new Map();
  const oilClusters = Math.floor(Math.random() * 2) + 2; // 随机生成 2 或 3 个漏油聚集地
  const oilCenters = [];

  // 随机生成漏油中心点
  for (let i = 0; i < oilClusters; i++) {
    const x = Math.floor(Math.random() * cols);
    const y = Math.floor(Math.random() * rows);
    oilCenters.push({ x, y });
  }

  // 遍历每个瓦片
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let isOil = false;
      // 检查是否靠近任何一个漏油中心点
      for (const center of oilCenters) {
        const distance = Math.sqrt(Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2));
        if (distance < 5 && Math.random() < 0.7) {
          isOil = true;
          break;
        }
      }

      //const isBase = x === gameState.base.x && y === gameState.base.y; // 判断是否为基地

      // 创建瓦片数据
      if ((x <= size_sand && y <= size_sand - 1) || (x <= size_sand - 1 && y <= size_sand)) {
        map.set(`${x},${y}`, {
          x, y,
          type: 'sand',
          oilAmount: 0
        });
      } else {
        map.set(`${x},${y}`, {
          x, y,
          // type: isBase ? 'base' : isOil ? 'oil' : 'sea', // 设置瓦片类型
          type: isOil ? 'oil' : 'sea', // 设置瓦片类型
          oilAmount: isOil ? Math.floor(Math.random() * 3) + 1 : 0 // 设置漏油量
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

    const minX = Math.max(0, gameState.ship.x);
    const maxX = minX + nbrows;

    const minY = Math.max(0, gameState.ship.y);
    const maxY = minY + nbcols;

    console.log("maxY : ", maxY);
    console.log("nbcols : ", nbcols);

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
          default:
            color = gameState.seaImage;
        }

        // 计算瓦片在 canvas 上的坐标
        const tileX = (tile.x - gameState.ship.x) * TILE_WIDTH;
        const tileY = (tile.y - gameState.ship.y) * TILE_HEIGHT;

        ctx.drawImage(color, tileX, tileY, TILE_WIDTH, TILE_HEIGHT);
      }
    });

    const shipX = (size_sand) * TILE_WIDTH;
    const shipY = (size_sand) * TILE_HEIGHT;
  
    if (gameState.shipImage) {
      ctx.drawImage(gameState.shipImage, shipX, shipY, TILE_WIDTH, TILE_HEIGHT);
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

  gameState.shipImage.onload = imageLoaded;
  gameState.oilImage.onload = imageLoaded;
  gameState.seaImage.onload = imageLoaded;
  gameState.sandImage.onload = imageLoaded;

  document.addEventListener("touchstart", touchHandler, {passive: false});
  document.addEventListener("touchmove", touchHandler, {passive: false});

}

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === 4) {
      gameLoop();
  }
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
      if (tileX >= 0 && tileX < 20 && tileY >= 0 && tileY < 20) {
        if (tileX < gameState.ship.x) {
          gameState.ship.x -= 1;
        } else if (tileX > gameState.ship.x) {
          gameState.ship.x += 1;
        }

        if (tileY < gameState.ship.y) {
          gameState.ship.y -= 1;
        } else if (tileY > gameState.ship.y) {
          gameState.ship.y += 1;
        }
      }

      requestAnimationFrame(gameLoop);

      e.preventDefault();  // Prevent scrolling on touch devices
  }
}



