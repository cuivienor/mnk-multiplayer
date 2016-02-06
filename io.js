var app = require('./app.js');
var io = require('socket.io')(app);

module.exports = io;
