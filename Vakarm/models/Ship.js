class Ship {
  constructor(type, noiseContribution) {
    this.type = type;
    this.noiseContribution = noiseContribution; 
    //6 dB pour un "navire classique", 1 dB pour un "Greenov"
  }
}

module.exports = Ship;
