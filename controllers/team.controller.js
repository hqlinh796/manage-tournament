const teamService = require('../services/team.service');
const coachService = require('../services/coach.service');
const athleteService = require('../services/athlete.service');
const positionService = require('../services/position.service');

module.exports = {
    getTeams: async (req, res, next) => {
        const teamData = await teamService.getTeams();
        const coachsData = await coachService.getCoaches();
        console.log(teamData);
        console.log(coachsData);
        if (teamData == [] && coachsData == [])
            res.render('team/teams');
        if (teamData == [])
            res.render('team/teams', { coachsData: coachsData });
        if (coachsData == [])
            res.render('team/teams', { teamData: teamData.dataValues });
        res.render('team/teams', { teamData: teamData, coachsData: coachsData });
    },
    addTeam: async (req, res, next) => {
        const data = req.body;
        console.log(data);
        await teamService.addTeams(data);
        res.redirect('/team');
    },
    getTeamByID: async (req, res, next) =>{
        const id = req.params.id;
        const coachsData = await coachService.getCoaches();
        const teamData = await teamService.getTeamByID(id);
        const athleteList = await athleteService.getListByTeamID(id);
        const position = await positionService.getAllPosition();
        res.render('team/teamInfo', {teamData: teamData, athleteList: athleteList, position:position, coachsData});
    },
    addAthlete: async (req, res, next) =>{
        const id = req.params.id;
        console.log(req.body);
        athleteService.createAthlete(req.body);
        const teamData = await teamService.getTeamByID(id);
        const athleteList = await athleteService.getListByTeamID(id);
        const location = req.originalUrl.toString();
        res.redirect(location);
    },
    getTeamsAPI: async (req, res, next) => {
        const teamData = await teamService.getTeams();
        const coachsData = await coachService.getCoaches();
        res.json(teamData);
    },
    updateAthlete: async(req, res, next)=>{
        const data = req.body;
        const id = req.params.id;
        const newData = await athleteService.updateAthleteById(id, data);
        res.json(newData);
    }
}