
function Menu() {
    let body = document.querySelector("body");
    body.innerHTML = "";

    let div = document.createElement("div");
    div.classList.add("menu");
    
    let title = document.createElement("h1");
    title.textContent = "Choose a scenario";
    let menu = newButton("Fire Oil Spill", FireScenario);

    div.appendChild(title);
    div.appendChild(menu);

    body.appendChild(div);
}

document.addEventListener("DOMContentLoaded", (event) => {
    Menu();
});