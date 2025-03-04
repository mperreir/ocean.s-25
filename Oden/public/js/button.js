


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
    document.getElementById("divPad").appendChild( this.control );
}
