const express = require('express');
const router = express.Router();

const accountController = require('../controllers/account.controller');
const managerController = require('../controllers/manager.controller');
const teamController = require('../controllers/team.controller');

router.post('/addAccount', accountController.addAccount);

router.post('/addManager', managerController.addManager);

router.get('/manager', managerController.showManagerList);

router.get('/manager/add', managerController.showAddManager);

router.get('/team', teamController.showTeamList);

router.get('/team/add', teamController.showTeamAdd);
module.exports = router;