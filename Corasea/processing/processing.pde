import processing.video.*;
import processing.serial.*;

Movie myMovie;
Serial myPort;

//gestion d'état
boolean isPlaying = false; // Si un utilisateur est en train d'utiliser l'installation
boolean isWaitingBouturageVideoPoint = false;      // Si l'utilisateur est en train de regarder la vidéo jusqu'au bouturage
boolean isWaitingDroppingVideoPoint = false;       // Si l'utilisateur est en train de regarder la vidéo jusqu'au larguage des coraux dans l'eau
boolean asStartBouturage = false;
boolean asStartDropping = false;
boolean asEndedBouturage = false;
long lastActivityTime = 0;
long maxInactiveTime = 30000; // temps max d'inactivité (en millisecondes 30000 = 30 secondes)

// Variable de l'écran
int screenWidth=1370; // à modifier également dans "setup"
int screenHeight=700; // à modifier également dans "setup"

// Variable des points de la vidéo
int endAnimationVideoPoint = 3;
int bouturageVideoPoint = 70;
int droppingVideoPoint = 85;


// S'exécute seulement au tout début du programme
void setup() {
  size(1370, 700);  // Ajuste selon la taille de ton écran
  myMovie = new Movie(this, "video.mov");  // La vidéo est dans le dossier "data"
  myPort = new Serial(this, "COM3", 9600);  // !!! Remplace COM3 par ton port Arduino !!!
  myMovie.play();
  myMovie.loop();
}


// S'exécute en boucle
void draw() {
  background(0);
  image(myMovie, 0, 0, width, height);
  if (!isPlaying) { // S'il n'y a pas d'utilisateur

    // Revient au début quand on arrive à la fin de l'animation du début
    if (myMovie.time() > endAnimationVideoPoint) {
      myMovie.jump(0);
    }
    // Vérifie si l'utilisateur passe le doigt dans le rectangle défini (un carré au centre)
    if (mouseX > screenWidth/8 &&
        mouseX < screenWidth-screenWidth/8 &&
        mouseY > screenWidth/8 &&
        mouseY < screenHeight-screenWidth/8) {
      startPlaying(); // Commence l'interaction avec l'utilisateur
    }
    
  } else { // en train de jouer
    if (checkInactivity()) {
      println("INACTIVITE DETECTEE");
      stateReset();
    }
    // regarde la vidéo jusqu'au bouturage
    if (isWaitingBouturageVideoPoint) {
      
      // lorsque la vidéo arrive au point du bouturage, elle se met en pause et envoie à Arduino que c'est le debut du bouturage
      if (myMovie.time() >= bouturageVideoPoint) {
        
        //gestion d'état
        myMovie.pause();
        isWaitingBouturageVideoPoint=false;
        asStartBouturage = true;
        myPort.write("debut bouturage");
        updateTime();
      }
      
    // regarde la vidéo jusqu'au larguage
    } else if (isWaitingDroppingVideoPoint) {
      // lorsque la vidéo arrive au point du largage, elle se met en pause et envoie à Arduino que c'est le debut du largage
      if (myMovie.time() >= droppingVideoPoint) {
         
        //gestion d'état
        myMovie.pause();
        isWaitingDroppingVideoPoint=false;
        asStartDropping = true;
        myPort.write("debut larguage");
        updateTime();
      }
    }
  }
}


// ------------- Fonctions intégrées à Processing
void movieEvent(Movie m) {
  m.read();
}

// Détecte la fin de la vidéo
void movieEnded(Movie m) {
  stateReset(); // reset l'état pour recommencer à la boucle de début
}

void serialEvent(Serial p) {
  String message = p.readStringUntil('\n');
  if (message != null) {
    message = message.trim();
    println(millis()+ " - Reçu d’Arduino : " + message);
    updateTime();

    if (message.equals("fin bouturage") && asStartBouturage) {
      println("fin bouturage serialevent");
      isWaitingDroppingVideoPoint = true;
      asEndedBouturage = true;
      delay(3000);  // attend que l'utilisateur regarde l'écran
      myMovie.play();  // Reprendre la vidéom
      myMovie.jump(bouturageVideoPoint+9); // passe le temps d'attente sur la vidéo
      
      
    } else if (message.equals("fin larguage") && asStartDropping ) {
      println("fin larguage serialevent");
      delay(3000); // attend que l'utilisateur regarde l'écran
      myMovie.play();  // Reprendre la vidéo
      myMovie.jump(droppingVideoPoint+9); // passe le temps d'attente sur la vidéo

      
  } else if (message.equals("bouton")) { // "bouton" reçu par Arduino
      updateTime();
      
    } else if (message.equals("bouture")) { // "bouture" reçu par Arduino
      updateTime();
      
    } else {
      updateTime();
    }
  }
}

// ------------- Fin fonction intégrées à Processing


// ------------- Fonction créées 

boolean checkInactivity() {
  if (!isPlaying ||                     //si l'utilisateur ne joue pas encore
    isWaitingBouturageVideoPoint ||   //Si visionnage de vidéo en cours
    isWaitingDroppingVideoPoint) {     //Si visionnage de vidéo en cours
    return false;
  }
  return millis() - lastActivityTime > maxInactiveTime; // Sinon check que la dernière utilisation date de moins que le temps max d'inactivite défini
}

// Fonction qui lance le processus d'interaction avec l'utilisateur
void startPlaying() {
  isPlaying = true;
  isWaitingBouturageVideoPoint = true;
  updateTime();
  println("Début interaction");
  myMovie.jump(endAnimationVideoPoint);
}

void updateTime() {
  lastActivityTime = millis();
}


// Reset l'état du programme
void stateReset() {
  println("fonction stateReset");
  isPlaying = false; // Si l'utilisateur a lancé une interaction
  isWaitingBouturageVideoPoint = false;
  isWaitingDroppingVideoPoint = false;
  asStartBouturage = false;
  asStartDropping = false;
  asEndedBouturage = false;

  myPort.write("state reset");

  updateTime();
  myMovie.jump(1);
  myMovie.play();
  myMovie.loop();
  myPort.write("fin state reset");

}
