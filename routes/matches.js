var express = require('express');
var router = express.Router();

const matchController = require('../controllers/match.controller');

router.post('/', matchController.addMatch);

router.get('/teams', (req, res, next) => {
    res.render('./team/manager-team-add');
});

module.exports = router;

