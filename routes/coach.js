var express = require('express');
var router = express.Router();

const coachController = require('../controllers/coach.controller');

router.get('/', coachController.getCoaches);

router.use('/', function(req, res, next){
    const birthday = req.body.birthday.toString();
    const date = new Date(birthday);
    req.body.birthday = date.toUTCString();
    next();
});
router.post('/', coachController.addCoach);


module.exports = router;