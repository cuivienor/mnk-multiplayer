/* GET home page. */
var fs = require('fs');
var shortid = require('shortid');
var games = JSON.parse((fs.readFileSync('data.json', 'utf8')));

module.exports.index = function(req, res) {
    res.render('index');
};

module.exports.getLink = function(req, res) {

    var game = {
        type: req.params.id,
        id: shortid.generate()
    };
    games.push(game);
    fs.writeFileSync('data.json', JSON.stringify(games));
    res.send(game);
};

module.exports.play = function(req, res) {
    var game;
    games.forEach(function(e) {
        if (e.id === req.params.id) {
            game = e.type;
        }
    });

    var rows = game.split('-')[0];
    var columns = game.split('-')[1];
    res.render('play', {rows: rows, columns: columns});
};


