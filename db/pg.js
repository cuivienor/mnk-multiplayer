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

        client.query('SELECT games.name, games.type, games.params FROM (SELECT * FROM challanges WHERE url = $1) T LEFT JOIN games ON T.game_id = games.id', [url], function(err, result) {
            if (handleError(err, client, done)) return;
            
            var m = parseInt(result.rows[0].params.split('-')[0]);
            var n = parseInt(result.rows[0].params.split('-')[1]);
            console.log(result.rows);
            res.render('play', {rows: m, columns: n});
            done();
        });
        
    });

};
