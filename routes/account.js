const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');
const authenticate = require('../components/authentication');

router.get('/login', accountController.getLoginPage);

router.post('/login', accountController.login);

router.post('/create-account', authenticate, accountController.createAccount);

module.exports = router;