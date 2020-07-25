var express = require('express');
var router = express.Router();

const matchController = require('../controllers/match.controller');

router.post('/', matchController.addMatch);

module.exports = router;

