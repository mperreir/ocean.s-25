# Oden Project

## Project Overview    

Oden is an interactive application designed to simulate marine oil spill events and their emergency response processes. The project combines a web application with Arduino hardware interaction, providing users with an immersive learning and training environment to understand the impact of oil spills on the marine environment and how to effectively respond to such emergencies.

Main features include:

- Oil spill simulation and diffusion visualization
- Multiple scenario simulations (fire, successful control, failure outcomes, etc.)
- Interactive vessel control system
- Real-time status monitoring and time tracking
- Hardware button interaction (via Arduino)

## Installation Guide

### Prerequisites

- Node.js (v12.0.0 or higher)
- npm (v6.0.0 or higher)
- Arduino IDE (for hardware components)

### Web Application Installation

1. Clone the repository
```bash
git clone https://github.com/MrMaxPomme/ocean.s-25.git
cd Oden
```

2. Install dependencies
```bash
npm install
```

3. Start the server
```bash
npm start
```

4. Access the application
Open in your browser: http://localhost:8080

### Arduino Setup

1. Connect the Arduino board to your computer
2. Open Arduino IDE
3. Load the `Arduino/sketch_mar3a/sketch_mar3a.ino` file
4. Upload the code to the Arduino board
5. Ensure the button is correctly connected to the D2 pin

## Usage Instructions

### Basic Operations

- Use the virtual joystick on screen to control vessel movement
- Trigger specific events through the Arduino button
- Observe oil diffusion and take appropriate measures
- Learn emergency response strategies in different scenarios

### Scenario Descriptions

- **Tutorial Scenario**: Provides operation guidelines and background information
- **Fire Scenario**: Simulates situations where oil spills lead to fires
- **Successful Control**: Demonstrates the results of successfully controlling an oil spill
- **Failure Outcome**: Shows the consequences of not controlling a spill in time
- **Comparison Scenario**: Compares the effects of different response strategies

## Technology Stack

### Frontend

- Native JavaScript
- HTML5 Canvas (game rendering)
- CSS3 (styles and animations)

### Backend

- Node.js
- Express.js (Web server)

### Hardware

- Arduino (physical interaction)

## Project Structure

```
Oden/
├── Arduino/                 # Arduino-related files
│   ├── animation/           # Animation-related code
│   └── sketch_mar3a/        # Arduino main program
├── public/                  # Frontend resources
│   ├── assets/              # Images and multimedia resources
│   ├── css/                 # Style files
│   ├── fonts/               # Font files
│   ├── js/                  # JavaScript code
│   │   ├── scenarios/       # Scripts for different scenarios
│   │   └── ...              # Other JS files
│   └── index.html           # Main HTML file
├── package.json             # Project dependency configuration
└── server.js               # Express server code
```
