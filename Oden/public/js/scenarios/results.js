function Results_Page(time, win) {
    let textNotif = (win) 
    ? "LA MARÉE NOIRE A ÉTÉ <br>MAÎTRISÉE AVANT DE POUVOIR <br>NUIRE À L'ENVIRONNEMENT !" 
    : "LA MARÉE NOIRE S'EST <br>PROPAGÉE TROP VITE ET TROP <br>LOIN.";

    let page = newPage("<br>NOTIFICATION", textNotif);
    let {body, div, notificationContainer} = page;
    body.style.alignItems = "normal";


    let feak_logo = document.createElement("img");
    feak_logo.classList.add("feak-logo");
    feak_logo.src = (win) ? "assets/reussi.png" : "assets/echec.png";

    
    let instructionsContainer = document.createElement("div");
    instructionsContainer.classList.add("notification-container");

    let infoIcon = document.createElement("img");
    infoIcon.classList.add("icon", "info-icon");
    infoIcon.src = "assets/statis.png";

    let instructionsTitle = document.createElement("div");
    instructionsTitle.classList.add("section-title");
    instructionsTitle.innerHTML = "<br>STATISTIQUES";

    let instructions = document.createElement("div");
    instructions.classList.add("notification", "stats-notification");

    let statsTable = document.createElement("table");
    statsTable.classList.add("stats-table");
    
    let row1 = document.createElement("tr");
    let label1 = document.createElement("td");
    label1.textContent = "TEMPS DE JEU:";
    label1.classList.add("stats-label");
    let value1 = document.createElement("td");
    value1.textContent = time + " SEC";
    value1.classList.add("stats-value");
    row1.appendChild(label1);
    row1.appendChild(value1);
    statsTable.appendChild(row1);
    
    let row2 = document.createElement("tr");
    let label2 = document.createElement("td");
    label2.textContent = "TEMPS RÉEL:";
    label2.classList.add("stats-label");
    let value2 = document.createElement("td");
    value2.textContent = ((time / 50) * 209).toFixed(2) + " HOURS";
    value2.classList.add("stats-value");
    row2.appendChild(label2);
    row2.appendChild(value2);
    statsTable.appendChild(row2);
    
    let row3 = document.createElement("tr");
    let label3 = document.createElement("td");
    label3.textContent = "CONCENTRATION\nDE CO2 DANS L'AIR:";
    label3.classList.add("stats-label");
    let value3 = document.createElement("td");
    value3.textContent = (440 + time * 3) + " PPM";
    value3.classList.add("stats-value");
    row3.appendChild(label3);
    row3.appendChild(value3);
    statsTable.appendChild(row3);
    
    instructions.appendChild(statsTable);
    
    let noteText = document.createElement("p");
    noteText.classList.add("stats-note");
    noteText.innerHTML = "/ 400 PPM EST LA CONCENTRATION NORMALE DE CO2<br>/ LE TEMPS RÉEL ET LA CONCENTRATION DE CO2 SONT ESTIMÉS EN FONCTION DU TEMPS PASSÉ DANS LE JEU ET DE L'AMPLEUR DE LA MARÉE NOIRE /";
    instructions.appendChild(noteText);
        
    instructionsContainer.appendChild(infoIcon);
    instructionsContainer.appendChild(instructionsTitle);
    instructionsContainer.appendChild(instructions);
    
    let startButton = newButton("CONTINUER", () => Futur_Page(time));

    div.appendChild(feak_logo);
    div.appendChild(notificationContainer);
    div.appendChild(instructionsContainer);
    div.appendChild(startButton);
    
    body.appendChild(div);
}