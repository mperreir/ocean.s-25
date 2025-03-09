function Reussi_Page(time) {
    // 选择 <body> 元素并清空其内容
    let body = document.querySelector("body");
    body.innerHTML = "";

    // 设置背景颜色，移除背景图像
    document.body.style.backgroundImage = "none";
    document.body.style.background = "linear-gradient(to bottom, #0F3D40, #0B2B2D)";

    // 创建主容器 div
    let div = document.createElement("div");
    div.classList.add("guide");

    // 创建 ODEN 标志
    let feak_logo = document.createElement("img");
    feak_logo.classList.add("feak-logo");
    feak_logo.src = "assets/reussi.png"; // 设置 logo 图片路径

    // 创建通知部分的容器
    let notificationContainer = document.createElement("div");
    notificationContainer.classList.add("notification-container");

    // 创建警告图标
    let warningIcon = document.createElement("img");
    warningIcon.classList.add("icon", "warning-icon");
    warningIcon.src = "assets/!.png";

    // 创建通知标题
    let notificationTitle = document.createElement("div"); // 创建通知标题元素
    notificationTitle.classList.add("section-title");// 添加 CSS 类以应用样式
    notificationTitle.innerHTML = "<br>NOTIFICATION";// 设置标题文本内容

    // 创建通知内容的容器
    let notification = document.createElement("div");
    notification.classList.add("notification"); // 添加 CSS 类以应用样式

    // 创建通知文本元素
    let notifText = document.createElement("p");
    notifText.innerHTML = "LA MARÉE NOIRE A ÉTÉ <br>MAÎTRISÉE AVANT DE POUVOIR <br>NUIRE À L'ENVIRONNEMENT !"; // 设置通知文本内容

    // 将通知文本添加到内部容器
    notification.appendChild(notifText);

    // 将各个部分添加到通知容器中
    notificationContainer.appendChild(warningIcon);
    notificationContainer.appendChild(notificationTitle);
    notificationContainer.appendChild(notification);

    // 创建说明部分的容器
    let instructionsContainer = document.createElement("div");
    instructionsContainer.classList.add("notification-container");

    // 创建信息图标
    let infoIcon = document.createElement("img");
    infoIcon.classList.add("icon", "info-icon");
    infoIcon.src = "assets/statis.png";

    // 创建说明标题
    let instructionsTitle = document.createElement("div");
    instructionsTitle.classList.add("section-title");
    instructionsTitle.innerHTML = "<br>STATISTIQUES";

    // 创建说明内容
    let instructions = document.createElement("div");
    instructions.classList.add("notification", "stats-notification");

    // 创建统计数据表格
    let statsTable = document.createElement("table");// 创建一个 <table> 元素用于存放统计信息
    statsTable.classList.add("stats-table");// 为表格添加类名 "stats-table"，方便后续应用 CSS 样式
    
    // 添加游戏时间行
    let row1 = document.createElement("tr");// 创建一行（<tr>），用于显示“游戏时间”信息
    let label1 = document.createElement("td");// 创建第一列（<td>），用于存放“游戏时间”标签
    label1.textContent = "TEMPS DE JEU:";// 添加 CSS 类 "stats-label"，用于样式化标签
    label1.classList.add("stats-label");// 添加 CSS 类 "stats-label"，用于样式化标签
    let value1 = document.createElement("td");// 创建第二列（<td>），用于存放“游戏时间”数值
    value1.textContent = time + " SEC";// 设置游戏时间的数值（示例值 24 秒）
    value1.classList.add("stats-value");// 添加 CSS 类 "stats-value"，用于样式化数值
    row1.appendChild(label1);// 将“游戏时间”标签和数值单元格添加到该行
    row1.appendChild(value1);
    statsTable.appendChild(row1);
    
    // 添加实际时间行
    let row2 = document.createElement("tr");
    let label2 = document.createElement("td");
    label2.textContent = "TEMPS RÉEL:";
    label2.classList.add("stats-label");
    let value2 = document.createElement("td");
    value2.textContent = ((time / 50) * 209).toFixed(2) + " HOURS";
    value2.classList.add("stats-value");
    row2.appendChild(label2);
    row2.appendChild(value2);
    statsTable.appendChild(row2);
    
    // 添加CO2浓度行
    let row3 = document.createElement("tr");
    let label3 = document.createElement("td");
    label3.textContent = "CONCENTRATION\nDE CO2 DANS L'AIR:";
    label3.classList.add("stats-label");
    let value3 = document.createElement("td");
    value3.textContent = (440 + time * 3) + " PPM";
    value3.classList.add("stats-value");
    row3.appendChild(label3);
    row3.appendChild(value3);
    statsTable.appendChild(row3);
    
    // 将表格添加到通知内容中
    instructions.appendChild(statsTable);
    
    // 添加说明文本
    let noteText = document.createElement("p");
    noteText.classList.add("stats-note");
    noteText.innerHTML = "/ 400 PPM EST LA CONCENTRATION NORMALE DE CO2<br>/ LE TEMPS RÉEL ET LA CONCENTRATION DE CO2 SONT ESTIMÉS EN FONCTION DU TEMPS PASSÉ DANS LE JEU ET DE L'AMPLEUR DE LA MARÉE NOIRE /";
    instructions.appendChild(noteText);

    
    // 将各个部分添加到说明容器中
    instructionsContainer.appendChild(infoIcon);
    instructionsContainer.appendChild(instructionsTitle);
    instructionsContainer.appendChild(instructions);

    // 创建开始按钮
    let startButton = document.createElement("button");
    startButton.classList.add("button");
    startButton.textContent = "CONTINUER";
    startButton.onclick = () => Futur_Page(time);

    // 将所有元素添加到主容器中
    div.appendChild(feak_logo);
    div.appendChild(notificationContainer);
    div.appendChild(instructionsContainer);
    div.appendChild(startButton);
    
    // 将主容器添加到 body
    body.appendChild(div);
}

// 监听 DOM 加载完成后，初始化 Guide 页面
document.addEventListener("DOMContentLoaded", (event) => {  
    Reussi_Page(); 
});
