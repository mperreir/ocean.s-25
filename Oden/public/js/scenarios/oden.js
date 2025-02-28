
function Oden() {
    let body = document.querySelector("body");
    body.innerHTML = "";

    let div = document.createElement("div");
    div.classList.add("menu");

    let title = document.createElement("h1");
    title.textContent = "Oden";
    let menu = newButton("Menu");

    div.appendChild(title);
    div.appendChild(menu);

    body.appendChild(div);

    menu.addEventListener("click", (e) => {
        Menu();
    });

}