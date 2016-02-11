var io = require('socket.io')();
var pg = require('./db/pg');
var Player = require('./lib/player.js');
var state = require('./lib/state.js');

pg.populateGames(state.addGame);
state.setRadios(io);

io.on('connection', function(socket) {
    console.log('user connected');

    var player = new Player({name: 'Peter'});
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('register', function(url) {
        socket.join(url);
        player.addToGame(state.getGames()[url]);
        state.setRadios(io);
    });

    socket.on('move', function(moveSpec) {
        player.move(moveSpec);
        console.log(player.game.board);
    });
});

module.exports = io;
