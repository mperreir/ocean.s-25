
function FireScenario() {
    let body = document.querySelector("body");
    body.innerHTML = "";

    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "gameCanvas");
    let divHud = document.createElement("div");
    divHud.setAttribute("id", "hud");
    // let indications = document.createElement("div");
    // indications.innerHTML = "Use arrow keys to move";
    let time = document.createElement("div");
    time.innerHTML = '00:<span id="time" >45</span>'

    // let menuBtn = newButton("Menu", Menu);

    body.appendChild(canvas);
    // divHud.appendChild(indications);
    divHud.appendChild(time);
    // divHud.appendChild(menuBtn);
    body.appendChild(divHud);

    initGame();
}