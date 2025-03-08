function Guide_Page() {
    // 选择 <body> 元素并清空其内容
    let body = document.querySelector("body");
    body.innerHTML = "";

    // 设置背景颜色，移除背景图像
    document.body.style.backgroundImage = "none";
    document.body.style.background = "linear-gradient(to bottom, #154E52, #0B2B2D)";

    // 创建主容器 div
    let div = document.createElement("div");
    div.classList.add("guide");

    // 创建 ODEN 标志
    let logo = document.createElement("img");
    logo.classList.add("oden-logo");
    logo.src = "assets/logo.png"; // 设置 logo 图片路径

    // 创建通知部分的容器
    let notificationContainer = document.createElement("div");
    notificationContainer.classList.add("notification-container");

    // 创建警告图标
    let warningIcon = document.createElement("img");
    warningIcon.classList.add("icon", "warning-icon");
    warningIcon.src = "assets/!.png";

    // 创建通知标题
    let notificationTitle = document.createElement("div");
    notificationTitle.classList.add("section-title");
    notificationTitle.textContent = "NOTIFICATION";

    // 创建通知内容
    let notification = document.createElement("div");
    notification.classList.add("notification");

    let notifText = document.createElement("p");
    notifText.textContent = "UNE FUITE A ÉTÉ DÉTECTÉE... LE TEMPS PRESSE. COMMENCEZ VOTRE MISSION !";
    
    // 将文本添加到通知内容中
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
    infoIcon.src = "assets/i.png";

    // 创建说明标题
    let instructionsTitle = document.createElement("div");
    instructionsTitle.classList.add("section-title");
    instructionsTitle.textContent = "INTRUCTIONS";

    // 创建说明内容
    let instructions = document.createElement("div");
    instructions.classList.add("notification");

    let instrText = document.createElement("p");
    instrText.innerHTML = "BRÛLEZ LE PLUS POSSIBLE DE LA MARÉE NOIRE AVANT QU'ELLE NE SE PROPAGE DANS L'OCÉAN !<br><br>UTILISEZ VOTRE DOIGT POUR VOUS DÉPLACER SUR L'ÉCRAN.";
    
    // 将文本添加到说明内容中
    instructions.appendChild(instrText);
    
    // 将各个部分添加到说明容器中
    instructionsContainer.appendChild(infoIcon);
    instructionsContainer.appendChild(instructionsTitle);
    instructionsContainer.appendChild(instructions);

    // 创建开始按钮
    let startButton = document.createElement("button");
    startButton.classList.add("button");
    startButton.textContent = "COMMENCER";
    startButton.onclick = FireScenario; // 点击按钮后调用 FireScenario 进入游戏

    // 将所有元素添加到主容器中
    div.appendChild(logo);
    div.appendChild(notificationContainer);
    div.appendChild(instructionsContainer);
    div.appendChild(startButton);
    
    // 将主容器添加到 body
    body.appendChild(div);
}

// 监听 DOM 加载完成后，初始化 Guide 页面
document.addEventListener("DOMContentLoaded", (event) => {  
    Guide_Page(); 
});
