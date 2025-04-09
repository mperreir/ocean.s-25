////////////////////////////////////////////////////
// BroadcastChannel
////////////////////////////////////////////////////
const channel = new BroadcastChannel('myChannel');

// Paramètres bruit
let noiseLevel = 120;
const baseNoise = 120;
const maxNoise = 190;
const dB_per_ship_classic = 6;
const dB_per_ship_greenov = 2;

// Océan (vagues)
let oceanWaves = [];
const waveResolution = 50;
const waveAmplitude = 30;
let waveOffset = 0;

// Navires
let classicShips = [];
let greenovShips = [];
let shipImgClassic, shipImgGreenov;
const shipScale = 2;

// Poissons
let fishSchool = [];
const NUM_FISH = 15;
let fishImg;
const fishScale = 0.05;

// Sliders
const classicSlider = document.getElementById('classicSlider');
const classicCountDisplay = document.getElementById('classicCountDisplay');
const greenovSlider = document.getElementById('greenovSlider');
const greenovCountDisplay = document.getElementById('greenovCountDisplay');


////////////////////////////////////////////////////
// PRELOAD (p5)
////////////////////////////////////////////////////
function preload() {
  // Images navires
  shipImgClassic = loadImage('media/poissons/ship.png');
  shipImgGreenov = loadImage('media/poissons/ship.png');
  // Image poisson
  fishImg = loadImage('media/poissons/fish.png');
}

////////////////////////////////////////////////////
// SETUP
////////////////////////////////////////////////////
function setup() {
  const container = document.getElementById('canvasContainer');
  let cnv = createCanvas(container.clientWidth, container.clientHeight);
  cnv.parent("canvasContainer");

  // Init océan
  for(let i=0; i<waveResolution; i++){
    oceanWaves.push({ x: (width/(waveResolution-1))*i, y: height/2 });
  }

  classicShips = [];
  greenovShips = [];

  // Poissons
  fishSchool = [];
  for(let i=0; i<NUM_FISH; i++){
    fishSchool.push(new Fish(random(width), random(height)));
  }
}

////////////////////////////////////////////////////
// DRAW
////////////////////////////////////////////////////
function draw() {
  background(10,70,115);

  // 1) Océan
  drawOceanBackground();

  // 2) Navires classiques
  for(let s of classicShips){
    s.update();
    s.display();
  }

  // 3) Navires greenov
  for(let g of greenovShips){
    g.update();
    g.display();
  }

  // 4) Poissons
  for(let f of fishSchool){
    // 4 états => on calcule selon noiseLevel
    f.updateState(noiseLevel);
    f.updateMovement(); // boids simplifié ou random ?
    f.display();
  }

  // 5) Calcul bruit total
  let newNoise = baseNoise
    + classicShips.length*dB_per_ship_classic
    + greenovShips.length*dB_per_ship_greenov;

  if(newNoise>maxNoise) newNoise = maxNoise;

  // 6) Si changement => broadcast
  if(newNoise!==noiseLevel){
    noiseLevel = newNoise;
    channel.postMessage({
      noiseLevel,
      shipsCount: classicShips.length + greenovShips.length
    });
  }
}

////////////////////////////////////////////////////
// WINDOW RESIZED
////////////////////////////////////////////////////
function windowResized(){
  const container = document.getElementById('canvasContainer');
  resizeCanvas(container.clientWidth, container.clientHeight);

  oceanWaves = [];
  for(let i=0; i<waveResolution; i++){
    oceanWaves.push({ x: (width/(waveResolution-1))*i, y: height/2 });
  }
}

////////////////////////////////////////////////////
// SLIDERS
////////////////////////////////////////////////////
classicSlider.addEventListener('input', () => {
  let val = parseInt(classicSlider.value);
  classicCountDisplay.textContent = val;
  updateClassicShips(val);
});

greenovSlider.addEventListener('input', () => {
  let val = parseInt(greenovSlider.value);
  greenovCountDisplay.textContent = val;
  updateGreenovShips(val);
});

function updateClassicShips(targetCount){
  let currentCount = classicShips.length;
  if(targetCount>currentCount){
    for(let i=0; i<(targetCount-currentCount); i++){
      // spawn en left
      let y = random(30, height-30);
      let x = random(-100, -300); 
      classicShips.push(new Ship(x,y,"classic"));
    }
  } else if(targetCount<currentCount){
    classicShips.splice(0, currentCount-targetCount);
  }
}

function updateGreenovShips(targetCount){
  let currentCount = greenovShips.length;
  if(targetCount>currentCount){
    for(let i=0; i<(targetCount-currentCount); i++){
      let y = random(30, height-30);
      let x = random(-100, -300);
      greenovShips.push(new Ship(x,y,"greenov"));
    }
  } else if(targetCount<currentCount){
    greenovShips.splice(0, currentCount-targetCount);
  }
}

////////////////////////////////////////////////////
// Dessiner Océan
////////////////////////////////////////////////////
function drawOceanBackground(){
  noFill();
  stroke(255,255,255,40);
  strokeWeight(2);

  waveOffset += 0.01;
  let yBase = height/2;

  for(let i=0; i<waveResolution; i++){
    let x = oceanWaves[i].x;
    let y = yBase + sin((frameCount*0.02) + i*0.3)*waveAmplitude;
    oceanWaves[i].y=y;
  }

  beginShape();
  curveVertex(oceanWaves[0].x-50, height);
  for(let w of oceanWaves){
    curveVertex(w.x, w.y);
  }
  curveVertex(oceanWaves[oceanWaves.length-1].x+50, height);
  endShape(CLOSE);
}

////////////////////////////////////////////////////
// CLASSE Ship : horizontal (left->right)
////////////////////////////////////////////////////
class Ship{
  constructor(x,y,type){
    this.position = createVector(x,y);
    // Déplacement horizontal
    this.velocity = createVector(random(1,2), 0);
    this.type= type; // "classic" ou "greenov"
  }

  update(){
    this.position.add(this.velocity);
    // si on sort par la droite => re-spawn à gauche
    if(this.position.x > width+50){
      this.position.x = random(-50, -300);
      this.position.y = random(30, height-30);
    }
  }

  display(){
    push();
    translate(this.position.x, this.position.y);
    // On oriente l'image si besoin
    // ex: rotate(0) => navire horizontal
    // ou rotate(PI/2) => navire vertical
    imageMode(CENTER);
    if(this.type==="classic"){
      image(shipImgClassic,0,0, shipImgClassic.width*shipScale, shipImgClassic.height*shipScale);
    } else {
      image(shipImgGreenov,0,0, shipImgGreenov.width*shipScale, shipImgGreenov.height*shipScale);
    }
    pop();
  }
}

////////////////////////////////////////////////////
// CLASSE Fish : 4 états (normal, stressed, crazy, dead)
////////////////////////////////////////////////////
class Fish {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.vx = random(-1,1);
    this.vy = random(-1,1);
    this.state = "normal"; // normal, stressed, crazy, dead
  }

  updateState(noise){
    if(noise<140){
      this.state = "normal";
    } else if(noise<155){
      this.state = "stressed";
    } else if(noise<170){
      this.state = "crazy";
    } else {
      this.state = "dead";
    }
  }

  updateMovement(){
    if(this.state==="dead"){
      return; // ne bouge plus (ou on peut le retirer)
    }
    // On applique un simple mouvement => ou un mini boids
    let speed = 1;
    if(this.state==="stressed") speed=1.5;
    if(this.state==="crazy")    speed=2.5;

    this.x += this.vx * speed;
    this.y += this.vy * speed;

    // Bords
    if(this.x<0) this.x=width;
    if(this.x>width) this.x=0;
    if(this.y<0) this.y=height;
    if(this.y>height) this.y=0;
  }

  display(){
    if(this.state==="dead"){
      // On peut dessiner un poisson “mort” (X eyes) ou rien
      push();
      translate(this.x, this.y);
      stroke(255,0,0);
      strokeWeight(2);
      line(-5,-5,5,5);
      line(-5,5,5,-5);
      pop();
      return;
    }

    push();
    translate(this.x,this.y);
    // teinte selon l'état
    if(this.state==="stressed"){
      tint(255,180,100);
    } else if(this.state==="crazy"){
      tint(255,50,50);
    }
    imageMode(CENTER);
    image(fishImg,0,0, fishImg.width*fishScale, fishImg.height*fishScale);

    // éventuellement un petit texte
    if(this.state==="stressed"){
      fill(255,200,0);
      textSize(12);
      textAlign(CENTER);
      text("Stressé!",0,-10);
    } else if(this.state==="crazy"){
      fill(255,0,0);
      textSize(12);
      textAlign(CENTER);
      text("Perdu!!",0,-10);
    }
    pop();
  }
}
