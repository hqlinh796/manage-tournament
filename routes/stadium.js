var express = require('express');
var router = express.Router();

const stadiumController = require('../controllers/stadium.controller');
const pictureController = require('../controllers/picture.controller');

router.get('/', stadiumController.getAllStadium);
router.get('/:id', stadiumController.getStadium);
router.post('/:id', stadiumController.updateStadiumById);

router.post('/', stadiumController.createStadium);


module.exports = router;