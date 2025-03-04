function Guide_Page() {
    let body = document.querySelector("body");
    body.innerHTML = "";

    // 设置背景
    body.style.backgroundImage = "url('assets/Guide_Page.png')";
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";

    let div = document.createElement("div");
    div.classList.add("guide");

    // 通知部分
    let notification = document.createElement("div");
    notification.classList.add("notification");

    let notifIcon = document.createElement("span");
    notifIcon.textContent = "⚠️";
    let notifText = document.createElement("p");
    notifText.textContent = "Une fuite a été détectée... Le temps presse. Commencez votre mission !";

    notification.appendChild(notifIcon);
    notification.appendChild(notifText);

    // 说明部分
    let instructions = document.createElement("div");
    instructions.classList.add("instructions");

    let instrIcon = document.createElement("span");
    instrIcon.textContent = "ℹ️";
    let instrText = document.createElement("p");
    instrText.innerHTML = "Brûlez le plus possible de la marée noire avant qu'elle ne se propage dans l'océan !<br>Utilisez votre doigt pour vous déplacer sur l'écran.";

    instructions.appendChild(instrIcon);
    instructions.appendChild(instrText);

    // 开始按钮
    let startButton = document.createElement("button");
    startButton.classList.add("button");
    startButton.textContent = "COMMENCER";
    startButton.onclick = FireScenario; // 进入游戏的函数

    div.appendChild(notification);
    div.appendChild(instructions);
    div.appendChild(startButton);
    body.appendChild(div);
}

// 监听 DOM 加载完成，初始化 Guide 页面
document.addEventListener("DOMContentLoaded", (event) => {
    Guide_Page();
});
