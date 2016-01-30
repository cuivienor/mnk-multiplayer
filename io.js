var Game = require('./lib/game').Game;
var Player = require('./lib/player').Player;

module.exports.io = function(io) {
    io.on('connection', function(socket){
        console.log('a user connected');
        var p = new Player('Peter', 1);
        console.log(p);
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });

        socket.on('move', function(msg){
            console.log('message: ' + msg);
        });
    });
};

