var express = require('express');
var router = express.Router();

const teamController = require('../controllers/team.controller');


router.get('/apis/all', teamController.getTeamsAPI);
router.get('/:id', teamController.getTeamByID);
router.use('/:id', function(req, res, next){
    req.body.teamId = req.params.id;
    next();
})
router.post('/:id', teamController.addAthlete);


router.get('/', teamController.getTeams);
router.post('/', teamController.addTeam);


module.exports = router;
