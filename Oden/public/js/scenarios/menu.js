
function Menu() {
    let body = document.querySelector("body");
    body.innerHTML = "";

    let div = document.createElement("div");
    div.classList.add("menu");
    
    let title = document.createElement("h1");
    title.textContent = "Choose a scenario";
    let menu = newButton("Oden");

    div.appendChild(title);
    div.appendChild(menu);

    body.appendChild(div);

    menu.addEventListener("click", (e) => {
        Oden();
    });
}

document.addEventListener("DOMContentLoaded", (event) => {
    Menu();
});