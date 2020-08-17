const express = require('express');
const router = express.Router();
const athleteRoute = require('./athletes');
const teamRouter = require('./team');
const statisticalRouter = require('./statistical');
const coachRouter = require('./coach');
const stadiumRouter = require('./stadium');
const matchRouter = require('./match');
const pictureRouter = require('./picture');
const positionRouter = require('./position');
const managerRouter = require('./manager')
const accountRoute = require('./account');
const roleRouter = require('./role');
const authenticate = require('../components/authentication');
const matchController = require('../controllers/match.controller');


/* GET home page. */
router.get('/', authenticate, matchController.showMatchList);
router.use('/accounts', accountRoute);
router.use('/athletes', authenticate, athleteRoute);
router.use('/teams', authenticate, teamRouter);
router.use('/statisticals', authenticate, statisticalRouter);
router.use('/coaches', authenticate, coachRouter);
router.use('/stadiums', authenticate, stadiumRouter);
router.use('/matchs', authenticate, matchRouter);
router.use('/pictures', authenticate, pictureRouter);
router.use('/positions', authenticate, positionRouter);
router.use('/managers', authenticate, managerRouter);
router.use('/roles', authenticate, roleRouter);
module.exports = router;
