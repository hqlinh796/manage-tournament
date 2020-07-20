var express = require('express');
var router = express.Router();
const athleteController = require('../controllers/athelete.controller');

/* GET users listing. */
router.post('/', athleteController.createAthlete);



//router.post()

module.exports = router;
