// Processing p5
import processing.serial.*;  // Import serial library
import processing.video.*;   // Import video library

Serial myPort;               // Serial object
boolean showAnimation = false;  // Variable to control animation
Movie myMovie;  // Video object
 
void setup() {  
  fullScreen();  // Set full-screen mode  
  myMovie = new Movie(this, "10s.mp4"); // Load video (MP4 file must be placed in the `data` directory)
  String portName = "COM16";  // Connect to Arduino's serial port (e.g., "COM3" or "/dev/ttyUSB0")
  myPort = new Serial(this, portName, 9600);
}

void draw() {
  background(0);  // Black background
  if (showAnimation) // If a button signal is received, play the animation
  {
    if (!myMovie.isPlaying()) // If no video is currently playing
    {
      myMovie.play();  // Play the video
    }
    image(myMovie, 0, 0, width, height);  // Scale the video to fill the entire screen
    if (myMovie.time() >= myMovie.duration() - 0.1) {
      showAnimation = false;  // Reset to black screen after video ends
      myMovie.stop();         // Stop the video
    }
  }
}

// Listen for serial data
void serialEvent(Serial p) {
  String inString = p.readStringUntil('\n');
  if (inString != null) {
    inString = trim(inString);  // Remove spaces and newline characters
    if (inString.equals("Pressed")) {
      showAnimation = true; 
    }
  }
}

void movieEvent(Movie m) { // Ensure Processing correctly reads video frames
  m.read();
}
