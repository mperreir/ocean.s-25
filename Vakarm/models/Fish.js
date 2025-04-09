class Fish {
  constructor(species, state = 'normal') {
    this.species = species;
    this.state = state; // "normal", "stressed", "crazy", "dead"
  }

  updateState(noiseLevel) {
    if (noiseLevel < 140) {
      this.state = 'normal';
    } else if (noiseLevel < 155) {
      this.state = 'stressed';
    } else if (noiseLevel < 170) {
      this.state = 'crazy';
    } else {
      this.state = 'dead';
    }
  }
}

module.exports = Fish;
