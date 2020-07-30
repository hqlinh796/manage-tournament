var express = require('express');
var router = express.Router();
const athleteRoute = require('./athletes');
//doi bong
const doiBongRouter = require('./team');
const statisticalRouter = require('./statistical');
const matchRouter = require('./matches');
const adminRouter = require('./admin');

/* GET home page. */
router.use('/athletes', athleteRoute);
router.use('/team', doiBongRouter);
router.use('/statistical', statisticalRouter);
router.use('/matches', matchRouter);
router.use('/admin', adminRouter);

module.exports = router;
