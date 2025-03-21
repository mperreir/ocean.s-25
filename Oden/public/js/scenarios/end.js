function End_Page() {

    let page = newPage("<br>STATUT", "ODEN, GRÂCE À L'UTILISATION DE ROBOTS AUTOMATIQUES, A EFFICACEMENT COLLECTÉ LA MARÉE NOIRE ET L'A TRANSPORTÉE VERS LE CENTRE DE TRAITEMENT.");
    let {body, div, notificationContainer} = page;
    body.style.alignItems = "normal";

    let logo = document.createElement("img");
    logo.classList.add("oden-logo");
    logo.src = "assets/logo.png";

    let instructionsContainer = document.createElement("div");
    instructionsContainer.classList.add("notification-container");

    let infoIcon = document.createElement("img");
    infoIcon.classList.add("icon", "info-icon");
    infoIcon.src = "assets/!.png";

    let instructionsTitle = document.createElement("div");
    instructionsTitle.classList.add("section-title");
    instructionsTitle.innerHTML = "<br>NOTIFICATION";

    let instructions = document.createElement("div");
    instructions.classList.add("notification");

    let instrText = document.createElement("p");
    instrText.innerHTML = "CLIQUEZ SUR LE BOUTON DU MODULE POUR VOIR COMMENT LES HYDROCARBURES COLLECTÉS SONT TRAITÉS AVEC DES BACTÉRIES SPÉCIFIQUES.";
    
    instructions.appendChild(instrText);

    instructionsContainer.appendChild(infoIcon);
    instructionsContainer.appendChild(instructionsTitle);
    instructionsContainer.appendChild(instructions);

    div.appendChild(logo);
    div.appendChild(notificationContainer);
    div.appendChild(instructionsContainer);
    
    body.appendChild(div);
}
