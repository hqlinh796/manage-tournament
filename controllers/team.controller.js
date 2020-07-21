const teamService = require('../services/team.service');


module.exports = {
    getAddTeamForm: (req, res, next)=> {
        res.render('team/add', {title: "Team"});
    }
}