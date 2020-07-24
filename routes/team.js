var express = require('express');
var router = express.Router();

const teamController = require('../controllers/team.controller');

router.get('/', teamController.getTeams);

router.post('/', teamController.addTeam);

module.exports = router;
