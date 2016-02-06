var MnkGame = require('./game');
var Player = require('./player');

var game = new MnkGame({m: 3, n: 3, k: 3});

var p1 = new Player({name: 'Peter', game: game});
var p2 = new Player({name: 'George', game: game});


p1.move({row: 0, col: 0});
p2.move({row: 0, col: 1});
p1.move({row: 1, col: 0});
p2.move({row: 0, col: 2});
p1.move({row: 2, col: 0});
p2.move({row: 2, col: 0});

