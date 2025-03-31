function Futur_Page(time) {
    let page = newPage("<br>NOTIFICATION", 
        "<br><br>DÉCOUVREZ LA SOLUTION LA <br>PLUS EFFICACE POUR GÉRER<br> UNE MARÉE NOIRE : ODEN,<br> L'INNOVATION DU FUTUR.<br><br><br>"
    );
    let {body, div, notificationContainer} = page;
    body.style.alignItems = "normal";

    body.style.alignItems = "center";

    let logo = document.createElement("img");
    logo.classList.add("oden-logo");
    logo.src = "assets/logo.png";

    let startButton = newButton("CONTINUER", () => Animation(time));

    div.appendChild(logo);
    div.appendChild(notificationContainer);
    div.appendChild(startButton);
    
    body.appendChild(div);
}
