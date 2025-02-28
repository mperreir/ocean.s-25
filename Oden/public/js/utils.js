
function newButton(title, func) {
    let menu = document.createElement('button');
    let span = document.createElement("span");
    span.innerHTML = title;
    menu.appendChild(span);
    menu.classList.add("btn");

    menu.addEventListener("click", (e) => {
        func();
    });

    return menu;
}