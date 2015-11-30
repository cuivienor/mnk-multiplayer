module.exports.index = function(req, res) {
    res.render('modes/index', { game_id: req.params.game_id });
};

// module.exports.loadGame = function(req, res) {
//     res.render('games/
// };
