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
    console.log(req.params);
}
