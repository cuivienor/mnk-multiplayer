/* GET home page. */
var fs = require('fs');
var shortid = require('shortid');
var pg = require('../../db/pg');

module.exports.index = function(req, res) {
    pg.renderGames(res);
};

module.exports.getLink = function(req, res) {
    var gameID = parseInt(req.params.id);
    var url = shortid.generate();
    pg.writeChallange([gameID, url], res);
};

module.exports.play = function(req, res) {
    console.log(req.params);
    pg.getGame(req.params.url, res);
};
