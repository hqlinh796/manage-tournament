var express = require('express');
var router = express.Router();

const matchController = require('../controllers/match.controller');

router.get('/', matchController.showMatchList);

router.post('/add', matchController.addMatch);

router.get('/delete', matchController.deleteMatch);

module.exports = router;