var io = require('socket.io')();
var pg = require('./db/pg');
var Player = require('./lib/player.js');
var state = require('./lib/state.js');

pg.populateGames(state.addGame);
state.setRadios(io);

io.on('connection', function(socket) {
    console.log('user connected');
    var player = new Player({name: 'Peter'});
    var url = socket.conn.request.headers.referer.split('/').splice(-1);
    socket.join(url);
    player.addToGame(state.getGames()[url]);
    state.setRadios(io);
    

    socket.on('disconnect', function() {
        player.leaveGame();
        delete player; // memory leak?!
        console.log('user disconnected');
    });

    // socket.on('register', function(url) {
    //     socket.join(url);
    //     player.addToGame(state.getGames()[url]);
    //     state.setRadios(io);
    // });

    socket.on('move', function(moveSpec) {
        player.move(moveSpec);
        // console.log(player.game.board);
    });

    socket.on('getState', function(msg) {
        io.to(url).emit('state', player.game.board);
    });
});

module.exports = io;
