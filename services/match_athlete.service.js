const database = require('../models');

class MatchAthleteService {
    static async getByMatch() {
        try {
            return await database.matches_athletes.findAll();
        } catch (error) {
            throw(error);
        }
    }
}

module.exports = MatchAthleteService;