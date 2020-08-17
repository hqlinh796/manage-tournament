const athleteService = require('../services/athlete.service');
const positionService = require('../services/position.service');
const teamService = require('../services/team.service');
const managerService = require('../services/manager.service');
const db = require('../models');
const coachService = require('../services/coach.service');

module.exports = {
    createAthlete: async (req, res, next) => {
        const athlete = req.body;
        const teamId = req.params.id;
        athlete.teamId = teamId;
        try {
            const result = await athleteService.createAthlete(athlete);
            console.log(result);
            res.redirect('./' + teamId);
        } catch (error) {
            next(error);
        }
    },
    getListAthlete: async (req, res, next) => {
        try {
            const result = await athleteService.getListAthlete();
            const position = await positionService.getAllPosition();
            res.render('athlete/index', { athleteList: result, position: position });
        } catch (error) {
            next(error);
        }
    },
    getAPIAthleteById: async (req, res, next) => {
        const id = req.params.id;
        console.log(id);
        const data = await athleteService.getAPIAthleteById(id);
        res.json(data);
    },
    getAthletesByTeamId: async (req, res, next) => {
        const id = req.params.id;
        const teamData = await teamService.getTeamByID(id);
        const athletesData = await athleteService.getAthletesByTeamId(id);
        // console.log(teamData.managerId);
        const managerData = await managerService.getManagerByAccount(teamData.managerId);
    
        // const coachesData = await coachService.getCoachesNotInTeam();
        const coachesData = await coachService.getCoaches();
    
        const coachData = await coachService.getCoachById(teamData.coachId);
        console.log("coachData");
        console.log(coachData);
        console.log(coachesData);
        console.log(managerData);

        res.render('athlete/index', { athletesData, teamData, managerData, coachesData, coachData });
    },
    updateAthleteById: async (req, res, next) => {
        const id = req.params.id;
        console.log(id);
        const data = req.body;
        const newData = await athleteService.updateAthleteById(id, data);

        const athlete = await athleteService.getAthleteById(id);
        res.redirect('./team/' + athlete.teamId);
    },
    deleteAthleteById: async (req, res, next)=>{
        const id = req.params.id;
        console.log(id);
        const data = await athleteService.deleteAthleteById(id);
        res.json(data);
    }
}