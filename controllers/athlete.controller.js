const athleteService = require('../services/athlete.service');
const positionService = require('../services/position.service');
const teamService = require('../services/team.service');
const db = require('../models');

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

        res.render('athlete/index', { athletesData, teamData });
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