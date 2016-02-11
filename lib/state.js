module.exports = (function(){
    var games = {};

    return {
        getGames: function() {
            return games;
        },
        addGame: function(url, game) {
            games[url] = game;
        },
        setRadios: function(radio) {
            Object.keys(games).forEach(function(url) {
                games[url].setRadio(radio, url);
            });
        }
    };
})();
