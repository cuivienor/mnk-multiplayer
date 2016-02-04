var pg = require('pg');


var conString = `postgres://pppetrov:${process.env.PG_PASSWORD}@localhost/mnk-game`;

var handleError = function(err, client, done) {
    if(!err) return false;
    if(client){
        done(client);
    }
    console.log('Connection Error');
    return true;
};


module.exports.renderGames = function (res) {
    pg.connect(conString, function(err, client, done) {

        if(handleError(err, client, done)) return;

        client.query('SELECT * FROM games', function(err, result) {
            if(handleError(err, client, done)) return; 
            res.render('index', {games: result.rows});
            done();
        });
    });
};

module.exports.writeChallange = function (params, res) {
    console.log(params);
    pg.connect(conString, function(err, client, done) {

        if(handleError(err, client, done)) return;

        client.query('INSERT INTO challanges (url, game_id) VALUES ($2, $1)', params, function(err, result) {
            if (handleError(err, client, done)) return;
            res.send({id: params[1]});
            done();
        });
        
    });
};

module.exports.getGame = function (url, res) {
    console.log(url);
    pg.connect(conString, function(err, client, done) {

        if(handleError(err, client, done)) return;

        client.query('SELECT games.m, games.n FROM (SELECT * FROM challanges WHERE url = $1) T LEFT JOIN games ON T.game_id = games.id', [url], function(err, result) {
            if (handleError(err, client, done)) return;
            console.log(result);
            res.render('play', {rows: result.rows[0].m, columns: result.rows[0].n});
            done();
        });
        
    });

};
