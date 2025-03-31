function Compare_Page(time) {
    let page = newPage("<br>NOTIFICATION", "LA MARÉE NOIRE A ÉTÉ <br>MAÎTRISÉE AVANT DE POUVOIR <br>NUIRE À L'ENVIRONNEMENT !");
    let {body, div, notificationContainer} = page;
    body.style.alignItems = "normal";

    let feak_logo = document.createElement("img");
    feak_logo.classList.add("feak-logo");
    feak_logo.src = "assets/comparaison.png";

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
    
    let headerRow = document.createElement("tr");
    let headerCategory = document.createElement("td");
    headerCategory.textContent = "CATÉGORIE";
    headerCategory.classList.add("stats-label");
    let headerVous = document.createElement("td");
    headerVous.textContent = "VOUS";
    headerVous.classList.add("stats-label");
    let headerOden = document.createElement("td");
    headerOden.textContent = "ODEN";
    headerOden.classList.add("stats-label");

    headerRow.appendChild(headerCategory);
    headerRow.appendChild(headerVous);
    headerRow.appendChild(headerOden);

    statsTable.appendChild(headerRow);

    let row1 = document.createElement("tr");
    let label1 = document.createElement("td");
    label1.textContent = "TEMPS DE JEU:";
    label1.classList.add("stats-label");
    let valueVous1 = document.createElement("td");
    valueVous1.textContent = time + " SEC";
    valueVous1.classList.add("stats-value");
    let valueOden1 = document.createElement("td");
    valueOden1.textContent = "10 SEC";
    valueOden1.classList.add("stats-value");
    row1.appendChild(label1);
    row1.appendChild(valueVous1);
    row1.appendChild(valueOden1);
    statsTable.appendChild(row1);
    
    let row2 = document.createElement("tr");
    let label2 = document.createElement("td");
    label2.textContent = "TEMPS RÉEL:";
    label2.classList.add("stats-label");
    let valueVous2 = document.createElement("td");
    valueVous2.textContent = ((time / 50) * 209).toFixed(0) + " H";
    valueVous2.classList.add("stats-value");

    let valueOden2 = document.createElement("td");
    valueOden2.textContent = "30 H";
    valueOden2.classList.add("stats-value");

    row2.appendChild(label2);
    row2.appendChild(valueVous2);
    row2.appendChild(valueOden2);
    statsTable.appendChild(row2);
    
    let row3 = document.createElement("tr");
    let label3 = document.createElement("td");
    label3.textContent = "CONCENTRATION\nDE CO2 DANS L'AIR:";
    label3.classList.add("stats-label");
    let valueVous3 = document.createElement("td");
    valueVous3.textContent = (440 + time * 3) + " PPM";
    valueVous3.classList.add("stats-value");

    let valueOden3 = document.createElement("td");
    valueOden3.textContent = "420 PPM";
    valueOden3.classList.add("stats-value");
    row3.appendChild(label3);
    row3.appendChild(valueVous3);
    row3.appendChild(valueOden3);
    statsTable.appendChild(row3);
    
    instructions.appendChild(statsTable);
    
    let noteText = document.createElement("p");
    noteText.classList.add("stats-note");
    noteText.innerHTML = "/ 400 PPM EST LA CONCENTRATION NORMALE DE CO2 /";
    instructions.appendChild(noteText);
        
    instructionsContainer.appendChild(infoIcon);
    instructionsContainer.appendChild(instructionsTitle);
    instructionsContainer.appendChild(instructions);

    let startButton = newButton("CONTINUER", End_Page);

    div.appendChild(feak_logo);
    div.appendChild(notificationContainer);
    div.appendChild(instructionsContainer);
    div.appendChild(startButton);
    
    body.appendChild(div);
}
