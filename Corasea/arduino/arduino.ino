#include <Servo.h>
#include <Adafruit_NeoPixel.h>

//  -----------  Partie Bouture

#define BOUTURES_STATE_PIN 11 // LED d'état simple (verte) pour montrer que l'étape du bouturage est disponible

#define BOUTURES_LED_PIN 6   // Pin de la bande LED qui illumine les coraux
#define BOUTURES_NUM_LEDS 8  // Nombre total de LEDs (même si on ne les utilise pas toutes)

  // Capteurs Hall
#define BOUTURES_MAGNETIC_SENSOR_PIN_1 2  // Capteur Hall qui active les LEDs 1 et 2 (premier corail)
#define BOUTURES_MAGNETIC_SENSOR_PIN_2 3  // Capteur Hall qui active les LEDs 4 et 5 (second corail)
#define BOUTURES_MAGNETIC_SENSOR_PIN_3 4  // Capteur Hall qui active les LEDs 7 et 8 (troisième corail)

Adafruit_NeoPixel stripBouturage(BOUTURES_NUM_LEDS, BOUTURES_LED_PIN, NEO_GRB + NEO_KHZ800);

// Fin partie bouture


//   ---------   Dropping
#define DROPPING_STATE_PIN 12 // LED d'état simple (verte) pour montrer que l'étape du largage est disponible

#define SERVO_PIN 13        // Broche du moteur servo continu
#define MOTOR_NEUTRAL 95    // Position neutre du moteur pour définir le nombre où il bouge plus (0 et 89 dans un sens, 90 il bouge plus, 91 dans l'autre sens mais le neutre peut être différent de 90)

#define MOTOR_MAGNETIC_SENSOR_PIN 7  // Capteur Hall qui active le ring LED lorsque le module du bateau le touche

#define MOTOR_LED_PIN 8   // Broche du ring de 12 LED
#define MOTOR_NUM_LEDS 12  // Nombre total de LEDs

// Boutons de contrôle du moteur
#define BUTTON_UP_PIN 10     // Bouton pour monter
#define BUTTON_DOWN_PIN 9  // Bouton pour descendre

Adafruit_NeoPixel ring = Adafruit_NeoPixel(MOTOR_NUM_LEDS, MOTOR_LED_PIN, NEO_GRB + NEO_KHZ800);

Servo motor;

// Fin partie dropping


bool asStartBouturage = false;
bool asStartDropping = false;

// Tableau contenant tous les noms de LED/états :
String toutesLesLED[] = {
  "boutu1",
  "boutu2",
  "boutu3",
  "moteur",
  "droppingState",
  "bouturageState"
};
int toutesLesLEDLength = 6; // à modifier selon la taille du tableau précédent "toutesLesLED"


void setup() {
  // Initialisation du port COM
  Serial.begin(9600);
  // Initialisation du moteur et des boutons
  motor.attach(SERVO_PIN);

  // Initialisation des boutons
  pinMode(BUTTON_UP_PIN, INPUT_PULLUP);
  pinMode(BUTTON_DOWN_PIN, INPUT_PULLUP);


  // Initialisation des capteurs Hall
  pinMode(BOUTURES_MAGNETIC_SENSOR_PIN_1, INPUT);
  pinMode(BOUTURES_MAGNETIC_SENSOR_PIN_2, INPUT);
  pinMode(BOUTURES_MAGNETIC_SENSOR_PIN_3, INPUT);
  pinMode(MOTOR_MAGNETIC_SENSOR_PIN, INPUT);

  // LED d'états
    pinMode(BOUTURES_STATE_PIN, OUTPUT);
    pinMode(DROPPING_STATE_PIN, OUTPUT);

  // Initialisation des LEDs
  stripBouturage.begin();
  stripBouturage.show();  // Éteindre toutes les LEDs au départ
  ring.begin();        // Initialise la bande LED
  ring.show();         // Éteint toutes les LEDs au démarrage
}



void loop() {
  
  // Gestion du port COM
  if (Serial.available() > 0) {
    String incomingMessage = Serial.readStringUntil('\n');
    Serial.println("Reçu sur arduino: " +incomingMessage);

    incomingMessage.trim();

    // Vérification du message reçu
    if (incomingMessage == "state reset") {
      stateReset();
    } else if (incomingMessage == "debut bouturage") {
      stateReset();
      asStartBouturage = true;
    } else if (incomingMessage == "debut larguage") {
      stateReset();
      asStartDropping = true;
    }
    else {
      Serial.println(incomingMessage); // Affiche si l'Arduino a reçu un message inattendu
    }
  }

  // Si le bouturage est en cours
  if (asStartBouturage) {
    allumerLED("bouturageState", 0, 255, 0); // vert
    controleBouturage();  // Gère la partie bouturage
  }

  // Si le largage est en cours
  if (asStartDropping) {
    allumerLED("droppingState", 0,255,0); // vert
    controleMoteur();  // Gère la partie moteur
  }
}

// Controle le bouturage
void controleBouturage() {
  bool capteur1 = digitalRead(BOUTURES_MAGNETIC_SENSOR_PIN_1) == LOW;
  bool capteur2 = digitalRead(BOUTURES_MAGNETIC_SENSOR_PIN_2) == LOW;
  bool capteur3 = digitalRead(BOUTURES_MAGNETIC_SENSOR_PIN_3) == LOW;

  if (asStartBouturage) {
    if (capteur1){// Si le corail 1 est déposé sur le socle
      allumerLED("boutu1", 0, 0, 255);  // s'allume en Bleu
      Serial.println("bouture"); // envoie "bouture" à Processing pour qu'il s'affiche qu'il se passe quelque chose
      }
    else eteindreLED("boutu1"); // eteint s'il n'y a pas le corail

    if (capteur2){
      allumerLED("boutu2", 0, 0, 255);  // Bleu
      Serial.println("bouture");
      }
    else eteindreLED("boutu2");

    if (capteur3){
      allumerLED("boutu3", 0, 0, 255);  // Bleu
      Serial.println("bouture");
      }
    else eteindreLED("boutu3");


    if (capteur1 && capteur2 && capteur3) { // Si les 3 coraux sont placés, c'est la fin de l'interaction et on éteint tout
      asStartBouturage=false;
      Serial.println("LES 3 CORAUX SONT BONS");
      Serial.println("fin bouturage");
      delay(1000);
      eteindreLED("boutu1");
      eteindreLED("boutu2");
      eteindreLED("boutu3");
      delay(1000);
      eteindreLED("bouturageState");
    }
  }
}

// Controle le moteur
void controleMoteur() {
    if (digitalRead(BUTTON_UP_PIN) == LOW) { // si l'utilisateur est en train d'appuyer sur le bouton pour monter
      Serial.println("bouton");
      delay(50);  // Petite pause (pour lisibilité côté Processing)
      motor.write(180);  // Monte (sens horaire)
    
    } else if (digitalRead(BUTTON_DOWN_PIN) == LOW) { // si l'utilisateur est en train d'appuyer sur le bouton pour descendre
      Serial.println("bouton");
      delay(50);  // Petite pause (pour lisibilité côté Processing)
      motor.write(0);  // Descend (sens anti-horaire)

    } else {
      motor.write(MOTOR_NEUTRAL);  // Si aucun bouton n'est utilisé par l'utilisateur alors il se Stop (position neutre)
      delay(300);
    }
  
  bool capteur = digitalRead(MOTOR_MAGNETIC_SENSOR_PIN) == LOW;
  if (capteur) {
    allumerLED("moteur", 0, 0, 255);
    Serial.println("fin larguage");
    delay(2000); // allume la LED 2 secondes
    motor.write(MOTOR_NEUTRAL);
    asStartDropping = false;
    eteindreLED("moteur"); //eteint la LED
    eteindreLED("droppingState");
  }
}



// Fonction pour allumer une LED (par son nom dans "toutesLesLED")
void allumerLED(String ledString, int r, int g, int b) {
  if (ledString == "boutu1") {
    stripBouturage.setPixelColor(0, stripBouturage.Color(r, g, b));
    stripBouturage.setPixelColor(1, stripBouturage.Color(r, g, b));
    stripBouturage.show();
  } 
  else if (ledString == "boutu2") {
    stripBouturage.setPixelColor(3, stripBouturage.Color(r, g, b));
    stripBouturage.setPixelColor(4, stripBouturage.Color(r, g, b));
    stripBouturage.show();
  } 
  else if (ledString == "boutu3") {
    stripBouturage.setPixelColor(6, stripBouturage.Color(r, g, b));
    stripBouturage.setPixelColor(7, stripBouturage.Color(r, g, b));
    stripBouturage.show();
  } 
  else if (ledString == "bouturageState") {
    digitalWrite(BOUTURES_STATE_PIN, HIGH);  // Allume la LED
  } 
  else if (ledString == "droppingState") {
    digitalWrite(DROPPING_STATE_PIN, HIGH);  // Allume la LED
  } 
  else if (ledString == "moteur") {
    setMotorRingLEDs(ring.Color(255, 0, 0)); // Rouge
  } 
  else {
    Serial.println("Commande allumée inconnue reçue : " + ledString);
  }
}

// Fonction pour eteindre une LED (par son nom dans "toutesLesLED")
void eteindreLED(String ledString) {
  if (ledString == "boutu1") {
    stripBouturage.setPixelColor(0, stripBouturage.Color(0,0,0));
    stripBouturage.setPixelColor(1, stripBouturage.Color(0,0,0));
    stripBouturage.show();
  } 
  else if (ledString == "boutu2") {
    stripBouturage.setPixelColor(3, stripBouturage.Color(0,0,0));
    stripBouturage.setPixelColor(4, stripBouturage.Color(0,0,0));
    stripBouturage.show();
  } 
  else if (ledString == "boutu3") {
    stripBouturage.setPixelColor(6, stripBouturage.Color(0,0,0));
    stripBouturage.setPixelColor(7, stripBouturage.Color(0,0,0));
    stripBouturage.show();
  } 
  else if (ledString == "bouturageState") {
    digitalWrite(BOUTURES_STATE_PIN, LOW);  // eteint la LED
  } 
  else if (ledString == "droppingState") {
    digitalWrite(DROPPING_STATE_PIN, LOW);  // eteint la LED
  } 
  else if (ledString == "moteur") {
    setMotorRingLEDs(ring.Color(0, 0, 0)); // Rouge
  } 
  else {
    Serial.println("Commande eteindre inconnue reçue : " + ledString);
  }
}


// Fonction pour eteindre toutes les LED (notamment pour le stateReset)
void eteindreToutesLesLEDs() {
  for(int i = 0; i < toutesLesLEDLength; i++){
    eteindreLED(toutesLesLED[i]);
  };
}

// Fonction pour allumer toutes les LEDs du RING d'un coup
void setMotorRingLEDs(uint32_t color) {
  for (int i = 0; i < MOTOR_NUM_LEDS; i++) {
    ring.setPixelColor(i, color);
  }
  ring.show(); // Met à jour toutes les LEDs en une seule fois
}

// Fonction pour remettre le système dans son état de base
void stateReset() {
  asStartBouturage = false;
  asStartDropping = false;
  motor.write(MOTOR_NEUTRAL);  // Position neutre du moteur (pour qu'il ne bouge plus)
  eteindreToutesLesLEDs();
}
