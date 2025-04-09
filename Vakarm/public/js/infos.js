// public/js/infos.js
document.addEventListener("DOMContentLoaded", function() {
  console.log("[infos] 📡 Attente des messages de oceanSim...");

  // 1) Channel
  const channel = new BroadcastChannel('myChannel');

  // 2) Récupérer éléments HTML
  const noiseLine      = document.getElementById('noiseLine');
  const shipsLine      = document.getElementById('shipsLine');
  const detailsTitle   = document.getElementById('detailsTitle');
  const detailsContent = document.getElementById('detailsContent');

  const boxGreen       = document.getElementById('boxGreen');
  const boxYellow      = document.getElementById('boxYellow');
  const boxOrange      = document.getElementById('boxOrange');
  const boxRed         = document.getElementById('boxRed');

  const greenovPopup   = document.getElementById("greenovPopup");
  const btnGoGreenov   = document.getElementById("btnGoGreenov");
  const btnClosePopup  = document.getElementById("btnClosePopup");

  let redPopupShown = false;

  const TRANCHE_DETAILS = {
  green: {
    title: "🌱 Conditions Quasi-Naturelles",
    content: 
      "Le niveau sonore reste faible. Les espèces marines conservent " +
      "une communication claire, un comportement stable et un stress minimal. " +
      "La reproduction, l’alimentation et les déplacements se font sans perturbation notable. ✅",
    bg: "bg-calm"
  },
  yellow: {
    title: "⚠️ Début de la Perturbation",
    content: 
      "Le bruit commence à s'intensifier. 🐋 Baleines et dauphins ressentent " +
      "un stress croissant, leur communication est partiellement brouillée. " +
      "Certains poissons deviennent nerveux, se dispersent davantage et " +
      "peuvent réduire leur activité de chasse ou de reproduction.",
    bg: "bg-warning"
  },
  orange: {
    title: "🔊 Bruit Modéré à Fort",
    content: 
      "Le niveau sonore est élevé. 🐟 Les poissons affichent des comportements " +
      "erratiques (fuite, désorientation), la reproduction est sévèrement affectée " +
      "et les mammifères marins peinent à se repérer. Les communications sous-marines " +
      "sont fortement perturbées, entraînant un risque d'isolement et une " +
      "hausse de la mortalité liée au stress. 😰",
    bg: "bg-danger"
  },
  red: {
    title: "🚨 Perturbation Sévère",
    content: 
      "Le bruit atteint un niveau critique ! 🆘 Les risques d’échouage " +
      "de mammifères marins explosent, et de nombreuses espèces subissent " +
      "un stress chronique fatal. ☠️ Les écosystèmes sont durement frappés, " +
      "la faune marine est en danger imminent : mortalité accrue et " +
      "collapse local des populations.",
    // On ajoute la classe bg-danger, puis on pourra ajouter "vibrate" séparément
    bg: "bg-danger"
  }
};

  // Boutons popup
  btnGoGreenov.addEventListener("click", () => {
    window.location.href = "/greenov";
  });
  btnClosePopup.addEventListener("click", () => {
    greenovPopup.style.display = "none";
  });

  // Écoute du broadcast
  channel.onmessage = (event) => {
    const data = event.data;
    console.log("[infos] Reçu", data);

    if (data.noiseLevel != null) {
      noiseLine.textContent = `Niveau de bruit : ${data.noiseLevel} dB`;
      updateTranche(data.noiseLevel);
    }
    if (data.shipsCount != null) {
      shipsLine.textContent = `Nombre de navires : ${data.shipsCount}`;
    }
  };

  function updateTranche(noiseLevel){
    // Retirer les classes
    document.body.classList.remove("bg-calm","bg-warning","bg-danger","vibrate");
    boxGreen.classList.remove('blink');
    boxYellow.classList.remove('blink');
    boxOrange.classList.remove('blink');
    boxRed.classList.remove('blink');

    let bracketKey;
    if (noiseLevel < 140) bracketKey = "green";
    else if (noiseLevel < 155) bracketKey = "yellow";
    else if (noiseLevel < 170) bracketKey = "orange";
    else bracketKey = "red";

    // Applique le blink sur la bonne box
    if (bracketKey === "green") boxGreen.classList.add('blink');
    else if (bracketKey === "yellow") boxYellow.classList.add('blink');
    else if (bracketKey === "orange") boxOrange.classList.add('blink');
    else if (bracketKey === "red")   boxRed.classList.add('blink');

    // MàJ titre & contenu
    const info = TRANCHE_DETAILS[bracketKey];
    detailsTitle.textContent   = info.title;
    detailsContent.textContent = info.content;

    // Ajouter la classe .bg-xxx
    document.body.classList.add(info.bg);

    // Si on est en rouge => popup
    if (bracketKey === 'red' && !redPopupShown) {
      redPopupShown = true;
      // Ajoute la classe "vibrate" en plus
      document.body.classList.add('vibrate');
      greenovPopup.style.display = "flex";
    }
  }
});
