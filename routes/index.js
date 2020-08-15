var express = require('express');
var router = express.Router();
const athleteRoute = require('./athletes');
const doiBongRouter = require('./team');
const statisticalRouter = require('./statistical');
const coachRouter = require('./coach');
const stadiumRouter = require('./stadium');
const matchRouter = require('./match');
const pictureRouter = require('./picture');
const positionRouter = require('./position.js')
const accountRouter = require('./account');

const authenticate = require('../components/authentication');

/* GET home page. */

router.use('/athletes', authenticate, athleteRoute);
router.use('/team', authenticate, doiBongRouter);
router.use('/statistical', authenticate, statisticalRouter);
router.use('/coach', authenticate, coachRouter);
router.use('/stadium', authenticate, stadiumRouter);
router.use('/match', authenticate, matchRouter);
router.use('/picture', authenticate, pictureRouter);
router.use('/position', authenticate, positionRouter);
router.use('/accounts', accountRouter);

module.exports = router;
