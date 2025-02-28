 // 定义正方形瓦片的大小
 const TILE_SIZE = 40;
 const TILE_WIDTH = TILE_SIZE;
 const TILE_HEIGHT = TILE_SIZE;
 const size_sand = 3;

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
   shipImage: null, // 船只图片
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
      if ((x >= cols - size_sand && y >= rows - size_sand - 1) || (x >= cols - size_sand - 1 && y >= rows - size_sand)) {
        map.set(`${x},${y}`, {
          x, y,
          type: 'sand',
          oilAmount: 0
        });
      } else if (x === 0 && y === 0) {
        map.set(`${x},${y}`, {
          x, y,
          // type: isBase ? 'base' : isOil ? 'oil' : 'sea', // 设置瓦片类型
          type: 'sand', // 设置瓦片类型
          oilAmount: 0 // 设置漏油量
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

    let nbrows = Math.floor(window.innerWidth / TILE_WIDTH) / 2;
    let nbcols = Math.floor(window.innerHeight / TILE_HEIGHT) / 2;
    let cpt = 0;
    // 绘制地图
    gameState.map.forEach(tile => {
      
      if (tile.x > gameState.ship.x - nbrows && tile.x < gameState.ship.x + nbrows
        && tile.y > gameState.ship.y - nbcols && tile.y < gameState.ship.y + nbrows
       ) {
        let color = new Image(); // 漏油颜色，海洋颜色

        switch (tile.type) {
          case ("oil"):
            color.src = 'assets/oil.png';
            break;
          case ("sand"):
            color.src = "assets/shore.png";
            break;
          default:
            color.src = 'assets/sea.png';
        }

        // 计算瓦片在 canvas 上的坐标
        const tileX = tile.x * TILE_WIDTH;
        const tileY = tile.y * TILE_HEIGHT;

        ctx.drawImage(color, tileX - (tileX - (cpt * TILE_WIDTH)), tileY - (tileY - (cpt * TILE_HEIGHT)), 40, 40);
        cpt++;
      }
    });

    // 计算船只在 canvas 上的坐标
    const shipX = gameState.ship.x * TILE_WIDTH;
    const shipY = gameState.ship.y * TILE_HEIGHT;

    // 如果船只图片已加载，则绘制图片
    if (gameState.shipImage) {
      ctx.drawImage(gameState.shipImage, shipX, shipY, TILE_WIDTH, TILE_HEIGHT);
    }


    requestAnimationFrame(gameLoop); // 请求下一次动画帧
  }
}

// 初始化游戏
function initGame() {
    // 获取 canvas 元素和 2D 渲染上下文
  const canvas = document.getElementById('gameCanvas');

  const width = 20;
  const height = 20;

  canvas.width = window.innerWidth; // 设置 canvas 宽度
  canvas.height = window.innerHeight; // 设置 canvas 高度

  gameState.map = generateMap(width, height); // 生成地图

  gameState.ship.x = width - size_sand - 1;
  gameState.ship.y = height - size_sand - 1;

  // 加载船只图片
  const shipImage = new Image();
  shipImage.src = 'assets/ship.png'; // 设置图片路径
  shipImage.onload = () => {
    gameState.shipImage = shipImage; // 图片加载完成后，保存到 gameState 中
    gameLoop(); // 启动游戏循环
  };

  document.addEventListener("touchstart", touchHandler, {passive: false});
  document.addEventListener("touchmove", touchHandler, {passive: false});

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
          gameState.ship.x -= 0.1;
        } else if (tileX > gameState.ship.x) {
          gameState.ship.x += 0.1;
        }

        if (tileY < gameState.ship.y) {
          gameState.ship.y -= 0.1;
        } else if (tileY > gameState.ship.y) {
          gameState.ship.y += 0.1;
        }
      }

      // 计算船只在 canvas 上的坐标
      const shipX = gameState.ship.x * TILE_WIDTH;
      const shipY = gameState.ship.y * TILE_HEIGHT;
      const ctx = canvas.getContext('2d');

      // 如果船只图片已加载，则绘制图片
      if (gameState.shipImage) {
        ctx.drawImage(gameState.shipImage, shipX - 20, shipY - 20, 40, 40);
      }

      e.preventDefault();  // Prevent scrolling on touch devices
  }
}



