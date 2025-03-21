
function newButton(text, func) {
    let button = document.createElement("button");
    button.classList.add("button");
    button.textContent = text;
    button.onclick = func;

    return button;
}

function buttonFire(x, y, inner_radius) {

    this.control = document.createElement('span');
    this.control.className = "hidden";
    this.control.id = "buttonFire";
    div_style = this.control.style;
    div_style.width = inner_radius * 2 + 'px';
    div_style.height = inner_radius * 2 + 'px';
    div_style.position = 'absolute';
    div_style.top = y - inner_radius + 'px';
    div_style.left = x - inner_radius + 'px';
    div_style.borderRadius = '50%';
    div_style.backgroundColor = 'rgba(228, 13, 13, 0.5)';
    div_style.borderWidth = '1px';
    div_style.borderColor = 'rgba(200,200,200,0.8)';
    div_style.borderStyle = 'solid';
    this.control.innerHTML = "Fire";
    this.control.style.textAlign = "center";
    this.control.style.lineHeight = inner_radius * 2 + 'px';
    this.control.style.color = "white";
    document.getElementById("divPad").appendChild( this.control );
}


function canvas_arrow(context, fromx, fromy, tox, toy, length, opacity) {
    const angle = Math.atan2(toy - fromy, tox - fromx);

    // Recalculer tox, toy pour correspondre à la longueur souhaitée
    tox = fromx + length * Math.cos(angle);
    toy = fromy + length * Math.sin(angle);

    const headlen = 10;

    context.strokeStyle = `rgba(200, 0, 0, ${opacity})`;
    context.lineWidth = 5;
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);

    context.lineTo(
        tox - headlen * Math.cos(angle - Math.PI / 6),
        toy - headlen * Math.sin(angle - Math.PI / 6)
    );
    context.moveTo(tox, toy);
    context.lineTo(
        tox - headlen * Math.cos(angle + Math.PI / 6),
        toy - headlen * Math.sin(angle + Math.PI / 6)
    );
}

function newPage(notifTitle, new_notifText) {
    let body = document.querySelector("body");
    body.innerHTML = "";

    document.body.style.backgroundImage = "none";
    document.body.style.background = "linear-gradient(to bottom, #0F3D40, #0B2B2D)";

    let div = document.createElement("div");
    div.classList.add("guide");

    let notificationContainer = document.createElement("div");
    notificationContainer.classList.add("notification-container");

    let warningIcon = document.createElement("img");
    warningIcon.classList.add("icon", "warning-icon");
    warningIcon.src = "assets/!.png";

    let notificationTitle = document.createElement("div");
    notificationTitle.classList.add("section-title");
    notificationTitle.innerHTML = notifTitle;

    let notification = document.createElement("div");
    notification.classList.add("notification");

    let notifText = document.createElement("p");
    notifText.innerHTML = new_notifText;

    notification.appendChild(notifText);

    notificationContainer.appendChild(warningIcon);
    notificationContainer.appendChild(notificationTitle);
    notificationContainer.appendChild(notification);

    return {body, div, notificationContainer};
}