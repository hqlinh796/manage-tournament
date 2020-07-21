var express = require('express');
var router = express.Router();

const teamController = require('../controllers/team.controller');

router.get('/add', teamController.getAddTeamForm);

router.get('/:id', function(req, res, next){
  
  res.render('./team/thong_tin_doi_bong');
})

module.exports = router;
