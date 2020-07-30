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
const positionRouter = require('./position.js')
/* GET home page. */
router.use('/athletes', athleteRoute);
router.use('/team', doiBongRouter);
router.use('/statistical', statisticalRouter);
router.use('/coach', coachRouter);
router.use('/stadium', stadiumRouter);
router.use('/match', matchRouter);
router.use('/picture', pictureRouter);
router.use('/position', positionRouter);

module.exports = router;
