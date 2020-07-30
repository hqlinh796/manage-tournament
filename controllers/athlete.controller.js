const athleteService = require('../services/athlete.service');
const positionService = require('../services/position.service');
const db = require('../models');

module.exports = {
    createAthlete: async (req, res, next) => {
        const athlete = req.body;
        try {
            const result = await athleteService.createAthlete(athlete);
            res.redirect('./athletes');
        } catch (error) {
            next(error);
        }
    },
    getListAthlete: async (req, res, next) =>{
        try {
            const result = await athleteService.getListAthlete();
            const position = await positionService.getAllPosition();
            res.render('athlete/athletes', {athleteList: result, position: position});
        } catch (error) {
            next(error);
        }
    },
    getAthleteById: async (req, res, next) =>{
        const id = req.params.id;
        console.log(id);
        const data = await athleteService.getAthleteById(id);
        res.json(data);
    }
}