function Player(spec) {
    this.name = spec.name;
    this.value = spec.value;
    this.game = spec.game;
    this.playing = this.game.addPlayer(this);

    this.move = function(spec) {
        if (this.game.currentPlayer === this) {
            return this.game.move(spec);
        } else {
            console.log('Wrong player attempted move');
            return false;
        }
    };
}

module.exports.Player = Player;
