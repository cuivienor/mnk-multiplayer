var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlGames = require('../controllers/games');
var ctrlModes = require('../controllers/modes');

/* GET home page. */
router.get('/', ctrlMain.index);

router.get('/games/', ctrlGames.index);

router.get('/games/:game_id/modes/', ctrlModes.index);

module.exports = router;
