/* GET home page. */

module.exports.index = function(req, res) {
    res.render('index');
};

module.exports.getLink = function(req, res) {
    console.log(req.params);
};
