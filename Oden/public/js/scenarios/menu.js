
function Menu() {
    let body = document.querySelector("body");
    body.innerHTML = "";

    // 只在第一页设置背景
    body.style.backgroundImage = "url('assets/First page.png')";
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";

    let div = document.createElement("div");
    div.classList.add("menu");
    
    // let title = document.createElement("h1");
    // title.textContent = "Choose a scenario";
    // let menu = newButton("Fire Oil Spill", FireScenario);

    // 创建标题
    let title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = "Oil Spill";
    // 创建副标题
    let subtitle = document.createElement("h2");
    subtitle.classList.add("subtitle");
    subtitle.textContent = "Clean Up";
    // 创建按钮
    let menu = document.createElement("button");
    menu.classList.add("button");
    menu.textContent = "Start Mission";
    menu.onclick = FireScenario; // 点击按钮时执行 FireScenario

    div.appendChild(title);
    div.appendChild(subtitle);
    div.appendChild(menu);
    body.appendChild(div);
}

document.addEventListener("DOMContentLoaded", (event) => {
    Menu();
});