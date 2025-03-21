function Guide_Page() {
    let page = newPage("<br>NOTIFICATION",  "UNE FUITE A ÉTÉ DÉTECTÉE...<br>LE TEMPS PRESSE.<br>COMMENCEZ VOTRE MISSION !");
    let {body, div, notificationContainer} = page;
    body.style.alignItems = "normal";

    let logo = document.createElement("img");
    logo.classList.add("oden-logo");
    logo.src = "assets/logo.png";

    let instructionsContainer = document.createElement("div");
    instructionsContainer.classList.add("notification-container");

    let infoIcon = document.createElement("img");
    infoIcon.classList.add("icon", "info-icon");
    infoIcon.src = "assets/i.png";

    let instructionsTitle = document.createElement("div");
    instructionsTitle.classList.add("section-title");
    instructionsTitle.innerHTML = "<br>INTRUCTIONS";

    let instructions = document.createElement("div");
    instructions.classList.add("notification");

    let instrText = document.createElement("p");
    instrText.innerHTML = "BRÛLEZ LE PLUS POSSIBLE DE LA MARÉE NOIRE AVANT QU'ELLE NE SE PROPAGE DANS L'OCÉAN !<br><br>UTILISEZ VOTRE DOIGT POUR VOUS DÉPLACER SUR L'ÉCRAN.";
    
    instructions.appendChild(instrText);

    instructionsContainer.appendChild(infoIcon);
    instructionsContainer.appendChild(instructionsTitle);
    instructionsContainer.appendChild(instructions);

    let startButton = newButton("COMMENCER", FireScenario);

    div.appendChild(logo);
    div.appendChild(notificationContainer);
    div.appendChild(instructionsContainer);
    div.appendChild(startButton);
    
    body.appendChild(div);
}

document.addEventListener("DOMContentLoaded", () => {  
    Guide_Page(); 
});
