var express = require('express');
var router = express.Router();
const pictureController = require('../controllers/picture.controller');


router.get('/', pictureController.getAllPicture);

router.get('/:id', pictureController.getPicturesByStadiumId);


module.exports = router;
