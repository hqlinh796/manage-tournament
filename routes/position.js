var express = require('express');
var router = express.Router();
const positionController = require('../controllers/position.controller');


router.get('/', positionController.getAllPosition);



module.exports = router;
