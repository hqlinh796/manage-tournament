const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');

router.get('/login', accountController.getAccountPage);

router.post('/login', accountController.login);

router.post('/create-account', accountController.createAccount);

module.exports = router;