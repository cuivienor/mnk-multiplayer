var io = require('socket.io')();
var pg = require('./db/pg');
var Player = require('./lib/player.js');
var currentGames = {};

io.on('connection', function(socket) {
    console.log('user connected');

    var player = new Player({name: 'Peter'});
    socket.on('disconnect', function() {
        player.quit();
        console.log('user disconnected');
    });

    socket.on('register', function(url) {
        socket.join(url);
        if (currentGames[url] === undefined) {
            pg.initiateGame(url, currentGames, player, io);
        } else {
            player.addToGame(currentGames[url]);
        }
    });

    socket.on('move', function(moveSpec) {
        player.move(moveSpec);
        console.log(player.game.board);
    });
});

module.exports = io;
