const express = require('express');
const router = express.Router();

const roleController = require('../controllers/role.controller');
const db = require('../models');

router.get('/', roleController.getRoles);
router.post('/create-role', roleController.createRole);
router.get('/delete-role/:roleCode', roleController.deleteRole);
router.get('/:roleCode', roleController.getRole);
//router.post('/', stadiumController.createStadium);


module.exports = router;