var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/main');

/* GET home page. */
router.get('/', ctrl.index);
router.get('/getLink/:id', ctrl.getLink);
router.get('/play/:id', ctrl.play);

module.exports = router;
