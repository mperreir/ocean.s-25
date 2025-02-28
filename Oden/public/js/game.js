 // 定义正方形瓦片的大小
 const TILE_SIZE = 40;
 const TILE_WIDTH = TILE_SIZE;
 const TILE_HEIGHT = TILE_SIZE;

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
      map.set(`${x},${y}`, {
        x, y,
        // type: isBase ? 'base' : isOil ? 'oil' : 'sea', // 设置瓦片类型
        type: isOil ? 'oil' : 'sea', // 设置瓦片类型
        oilAmount: isOil ? Math.floor(Math.random() * 3) + 1 : 0 // 设置漏油量
      });
    }

}
  return map;
}

// 绘制瓦片

function drawTile(x, y, color, canvas, ctx) {
  const centerX = canvas.width / 2; // canvas 中心 x 坐标
  const centerY = canvas.height / 2; // canvas 中心 y 坐标

  // 计算瓦片在 canvas 上的坐标
  const tileX = x * TILE_WIDTH + centerX - (TILE_WIDTH * 20 / 2);
  const tileY = y * TILE_HEIGHT + centerY - (TILE_HEIGHT * 20 / 2);

  ctx.fillStyle = color; // 设置填充颜色
  ctx.fillRect(tileX, tileY, TILE_WIDTH, TILE_HEIGHT); // 绘制矩形
}

//  游戏循环
function gameLoop() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空 canvas

  // 绘制地图
  gameState.map.forEach(tile => {
    const color = tile.type === 'oil' ? '#000000' : '#1E90FF'; // 漏油颜色，海洋颜色
    // const color = tile.type === 'base' ? '#FFD700' : // 基地颜色
    // tile.type === 'oil' ? '#000000' : '#1E90FF'; // 漏油颜色，海洋颜色
    drawTile(tile.x, tile.y, color, canvas, ctx); // 绘制瓦片
  });

  // 绘制采集船
  const centerX = canvas.width / 2; // canvas 中心 x 坐标
  const centerY = canvas.height / 2; // canvas 中心 y 坐标

  // 计算船只在 canvas 上的坐标
  const shipX = gameState.ship.x * TILE_WIDTH + centerX - (TILE_WIDTH * 20 / 2) + TILE_WIDTH / 2;
  const shipY = gameState.ship.y * TILE_HEIGHT + centerY - (TILE_HEIGHT * 20 / 2) + TILE_HEIGHT / 2;

  // 如果船只图片已加载，则绘制图片
  if (gameState.shipImage) {
    ctx.drawImage(gameState.shipImage, shipX - 20, shipY - 20, 40, 40);
  }

  requestAnimationFrame(gameLoop); // 请求下一次动画帧
}

// 初始化游戏
function initGame() {
    // 获取 canvas 元素和 2D 渲染上下文
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth; // 设置 canvas 宽度
  canvas.height = window.innerHeight; // 设置 canvas 高度
  gameState.map = generateMap(20, 20); // 生成地图

  // 加载船只图片
  const shipImage = new Image();
  shipImage.src = 'assets/ship.png'; // 设置图片路径
  shipImage.onload = () => {
    gameState.shipImage = shipImage; // 图片加载完成后，保存到 gameState 中
    gameLoop(); // 启动游戏循环
  };

  // 键盘事件监听
  document.addEventListener('keydown', (e) => {
    const directions = {
      ArrowUp: { x: 0, y: -1 }, // 上
      ArrowDown: { x: 0, y: 1 }, // 下
      ArrowLeft: { x: -1, y: 0 }, // 左
      ArrowRight: { x: 1, y: 0 } // 右
    };

    const dir = directions[e.key]; // 获取按键对应的方向
    if (!dir) return; // 如果按键不是方向键，则返回

    const newX = gameState.ship.x + dir.x; // 计算新的 x 坐标
    const newY = gameState.ship.y + dir.y; // 计算新的 y 坐标

    // 检查边界
    if (newX < 0 || newX >= 20 || newY < 0 || newY >= 20) return;

    // 更新位置
    gameState.ship.x = newX;
    gameState.ship.y = newY;

    gameState.time++; // 时间加 1
    document.getElementById('time').textContent = gameState.time; // 更新时间显示

      gameLoop(); // 重新绘制

      // 检查当前格子
    // const currentTile = gameState.map.get(`${newX},${newY}`);

    // // 采集漏油
    // if (currentTile && currentTile.type === 'oil' && gameState.ship.inventory < gameState.ship.capacity) {
    //   const collected = Math.min(currentTile.oilAmount, gameState.ship.capacity - gameState.ship.inventory);
    //   gameState.ship.inventory += collected; // 增加库存
    //   currentTile.oilAmount -= collected; // 减少瓦片上的漏油量
    //   if (currentTile.oilAmount <= 0) {
    //     currentTile.type = 'sea'; // 如果瓦片上的漏油量为 0，则将瓦片类型设置为海洋
    //   }
    //   document.getElementById('inventory').textContent = gameState.ship.inventory; // 更新库存显示
    //   gameLoop(); // 重新绘制
    // }

    // // 返回基地
    // if (currentTile && currentTile.type === 'base' && gameState.ship.inventory > 0) {
    //   gameState.ship.inventory = 0; // 清空库存
    //   document.getElementById('inventory').textContent = 0; // 更新库存显示
    //gameLoop(); // 重新绘制
    // }
  });
}

