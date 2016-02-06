var io = require('socket.io')();

var rooms = {};

io.on('connection', function(socket) {
    console.log('user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('room', function(msg) {
        console.log(msg);
        socket.join(msg);
        if (rooms[msg] === undefined) {
            rooms[msg] = [];
        }
        rooms[msg].push(socket);
    });
    socket.on('move', function(msg) {
        console.log(msg);
        console.log(socket.rooms);
    });
});

module.exports = io;
