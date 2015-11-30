module.exports.index = function(req, res) {
    var games = ['Tic-Tac-Toe', 'Connect6', 'Five-In-A-Row'];
    res.render('menu', {title: "Games", items: games });
};
