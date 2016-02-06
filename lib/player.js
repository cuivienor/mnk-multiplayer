"use strict"

function Player(spec) {
    this.name = spec.name;
    // this.game = spec.game;
    
    this.setValue = function(value) {
        this.value = value;
    };

    this.addToGame = function(game) {
        this.game = game;
        this.playing = game.addPlayer(this);
    };

    this.move = function(spec) {
        if (this.game.currentPlayer === this) {
            return this.game.move(spec);
        } else {
            console.log('Wrong player attempted move');
            return false;
        }
    };


}

module.exports = Player;
