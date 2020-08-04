var express = require('express');
var router = express.Router();
const athleteRoute = require('./athletes');
//doi bong
const doiBongRouter = require('./team');
const statisticalRouter = require('./statistical');
const coachRouter = require('./coach');
const stadiumRouter = require('./stadium');
const matchRouter = require('./match');
const pictureRouter = require('./picture');
const positionRouter = require('./position');
/* GET home page. */
router.use('/athletes', athleteRoute);
router.use('/teams', doiBongRouter);
router.use('/statisticals', statisticalRouter);
router.use('/coachs', coachRouter);
router.use('/stadiums', stadiumRouter);
router.use('/matchs', matchRouter);
router.use('/pictures', pictureRouter);
router.use('/positions', positionRouter);

module.exports = router;
