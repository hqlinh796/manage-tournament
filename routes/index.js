var express = require('express');
var router = express.Router();
const athleteRoute = require('./athletes');
//doi bong
const doiBongRouter = require('./team');
const statisticalRouter = require('./statistical');

/* GET home page. */
router.use('/athletes', athleteRoute);
router.use('/team', doiBongRouter);
router.use('/statistical', statisticalRouter);

module.exports = router;
