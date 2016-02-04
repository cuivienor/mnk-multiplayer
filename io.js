module.exports.io = function(io) {
    io.on('connection', function(socket) {
        console.log('user connected');
    });
};
