/* GET home page. */
var fs = require('fs');
var shortid = require('shortid');
var pg = require('../../db/pg');
var state = require('../../lib/state.js');

module.exports.index = function(req, res) {
    pg.renderGames(res);
};

module.exports.getLink = function(req, res) {
    var gameID = parseInt(req.params.id);
    var url = shortid.generate();
    pg.writeChallange([gameID, url], res, state.addGame);
};

module.exports.play = function(req, res) {
    console.log(req.params);
    console.log(state.getGames());
    res.render('play', {rows: state.getGames()[req.params.url].m, columns: state.getGames()[req.params.url].n});
    // pg.getGame(req.params.url, res);
};
