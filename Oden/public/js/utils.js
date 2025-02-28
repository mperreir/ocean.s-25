
function newButton(title) {
    let menu = document.createElement('button');
    let span = document.createElement("span");
    span.innerHTML = title;
    menu.appendChild(span);
    menu.classList.add("btn");

    return menu;
}