var express = require('express');
var router = express.Router();
const statisticalController = require('../controllers/statistical.controller');

/* GET users listing. */
router.get('/', statisticalController.redirect);

//team statistical
router.get('/', statisticalController.getTeamsList)


module.exports = router;
