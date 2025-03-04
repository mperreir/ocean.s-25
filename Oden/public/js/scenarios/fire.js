
function FireScenario() {
    let body = document.querySelector("body");
    body.innerHTML = "";

    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "gameCanvas");
    let divHud = document.createElement("div");
    divHud.setAttribute("id", "hud");

    let time = document.createElement("div");
    time.innerHTML = 'Temps en jeu: 00:<span id="time" >50</span>'
    let Realtime = document.createElement("div");
    Realtime.innerHTML = 'Temps réel: <span id="Realtime" >209</span> heures'

    let pause = document.createElement("div");
    pause.setAttribute("id", "pause");

    let hudPause = document.createElement("div");
    hudPause.setAttribute("id", "hudPause");
    hudPause.classList.add("hidden");

    let textPause = document.createElement("div");
    textPause.innerText = "Glissez votre doigt pour diriger le bateau dans toutes les directions : haut, bas, gauche, droite.";
    textPause.style.top = window.innerHeight / 2 - 20;
    textPause.style.left = 0;
    textPause.style.margin = 10;
    textPause.style.color = "white";

    hudPause.appendChild(textPause);
    divHud.appendChild(time);
    divHud.appendChild(Realtime);
    body.appendChild(hudPause);
    body.appendChild(divHud);
    body.appendChild(canvas);
    body.appendChild(pause)


    initGame();
}