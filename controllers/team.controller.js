const teamService = require('../services/team.service');
const coachService = require('../services/coach.service');


module.exports = {
    getTeams: async (req, res, next)=> {
        const teamData = await teamService.getTeams();
        const coachsData = await coachService.getCoaches();
        res.render('team/teams', {teamData: teamData, coachsData: coachsData});
    },
    addTeam: async (req, res, next) =>{
        const data = req.body;
        await teamService.addTeams(data);
        res.redirect('/team');
    }

}