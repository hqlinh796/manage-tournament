const express = require('express');
const router = express.Router();

const roleController = require('../controllers/role.controller');


router.get('/', roleController.getRoles);
router.post('/create-role', roleController.createRole);


//router.post('/', stadiumController.createStadium);


module.exports = router;