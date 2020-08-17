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
const roleRouter = require('./role');

const authenticate = require('../components/authentication');

router.use('/athletes', authenticate, athleteRoute);
router.use('/teams', authenticate, doiBongRouter);
router.use('/statisticals', authenticate, statisticalRouter);
router.use('/coachs', authenticate, coachRouter);
router.use('/stadiums', authenticate, stadiumRouter);
router.use('/matchs', authenticate, matchRouter);
router.use('/pictures', authenticate, pictureRouter);
router.use('/positions', authenticate, positionRouter);
router.use('/roles', roleRouter);
router.use('/accounts', accountRouter);

module.exports = router;
