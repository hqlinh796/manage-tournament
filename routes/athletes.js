const express = require('express');
const router = express.Router();
const athleteController = require('../controllers/athlete.controller');


router.get('/', athleteController.getListAthlete);

router.get('/apis/:id', athleteController.getAPIAthleteById);
router.get('/team/:id', athleteController.getAthletesByTeamId);
router.get('/:id', athleteController.getAPIAthleteById);

/* GET users listing. */
router.use('/', function(req, res, next){
    // const birthday = req.body.birthday.toString();
    // const date = new Date(birthday);
    // req.body.birthday = date.toUTCString();
    console.log(req.body);
    next();
});

router.post('/', athleteController.createAthlete);
router.post('/team/:id', athleteController.createAthlete);
router.post('/:id', athleteController.updateAthleteById);
router.delete('/:id', athleteController.deleteAthleteById);







//router.post()

module.exports = router;
