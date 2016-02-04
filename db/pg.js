var pg = require('pg');


var conString = `postgres://pppetrov:${process.env.PG_PASSWORD}@localhost/mnk-game`;

module.exports.renderGames = function (res) {
    pg.connect(conString, function(err, client, done) {
        var handleError = function(err) {
            if(!err) return false;
            if(client){
                done(client);
            }
            console.log('Connection Error');
            return true;
        };

        if(handleError(err)) return;

        client.query('SELECT * FROM games', function(err, result) {
            if(handleError(err)) return; 
            res.render('index', {games: result.rows});
            done();
        });
    });
};

module.exports.writeChallange = function (params, res) {
    console.log(params);
    pg.connect(conString, function(err, client, done) {
        var handleError = function(err) {
            if(!err) return false;
            if(client){
                done(client);
            }
            console.log('Connection Error');
            return true;
        };

        if(handleError(err)) return;

        client.query('INSERT INTO challanges (url, game_id) VALUES ($2, $1)', params, function(err, result) {
            if (handleError(err)) return;
            res.send({id: params[1]});
            done();
        });
        
    });
};
