var express = require('express');
var router = express.Router();

const managerController = require('../controllers/manager.controller');

router.get('/add', managerController.showAddManager);

router.post('/add', managerController.addManager);

router.get('/', managerController.showManagerList);

router.get('/edit', managerController.showAddManager);

router.get('/delete', managerController.deleteManager);



module.exports = router;