/* GET home page. */
var fs = require('fs');
var shortid = require('shortid');
var pg = require('../../db/pg');

module.exports.index = function(req, res) {
    pg.renderGames(res);
};

module.exports.getLink = function(req, res) {
    var params = [parseInt(req.params.id)];
    params.push(shortid.generate());
    pg.writeChallange(params, res);
};

module.exports.play = function(req, res) {
    console.log(req.params);
    pg.getGame(req.params.url, res);
    // res.render('play', {rows: rows, columns: columns});
};
