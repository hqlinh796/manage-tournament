var express = require('express');
var router = express.Router();
const athleteController = require('../controllers/athlete.controller');


router.get('/', athleteController.getListAthlete);

router.get('/:id', athleteController.getAthleteById);

/* GET users listing. */
router.use('/', function(req, res, next){
    const birthday = req.body.birthday.toString();
    const date = new Date(birthday);
    req.body.birthday = date.toUTCString();
    next();
});

router.post('/', athleteController.createAthlete);




//router.post()

module.exports = router;
