const athleteService = require('../services/athlete.service');
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
            res.json(result).status(200);
        } catch (error) {
            next(error);
        }
    },
    getAddAthleteForm: async (req, res, next) =>{
        try {
            res.render('athlete/add');
        } catch (error) {
            next(error);
        }
    }
}