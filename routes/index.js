var express = require('express');
var router = express.Router();
const atheleteRoute = require('./athletes');
/* GET home page. */
router.use('/athletes', atheleteRoute);

module.exports = router;
