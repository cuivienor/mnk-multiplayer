var Game = require('./lib/game').Game;
var Player = require('./lib/player').Player;

var players = [];
var game;
module.exports.io = function(io) {
    io.on('connection', function(socket){

        var currentPlayer;
        console.log('a user connected');
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });

        socket.on('move', function(msg){
            console.log(currentPlayer.value + ": " + msg);
            var loc = JSON.parse(msg);
            var move = game.move(parseInt(loc.i), parseInt(loc.j), currentPlayer);
            if (move === true) {
                loc.player = currentPlayer.value;
                io.emit('move', JSON.stringify(loc));
            }
            
        });

        socket.on('newUser', function(msg) {
            if (players.length < 2) {
                console.log('Player Created');
                currentPlayer = new Player(msg, players.length + 1);
                players.push(currentPlayer);
            }
            if (players.length === 2) {
                console.log('created game');
                game = new Game(3, 3, 3, 1, 1, players[0], players[1]);
                debugger;
            }
        });
    });
};

