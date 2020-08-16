const database = require('../models');

class MatchAthleteService {
    static async getByMatch(matchId) {
        try {
            return await database.matches_athletes.findAll({
                where: {
                    matchId: matchId
                },
                include: [
                    {
                        model: database.athletes , 
                        as: 'matches_athletes_athlete'
                    },
                    {
                        model: database.matches , 
                        as: 'matches_athletes_matches'
                    }, 
                    {
                        model: database.matches_scores , 
                        as: 'matches_athletes_scores'
                    }
                ]
            });
        } catch (error) {
            throw(error);
        }
    }
}

module.exports = MatchAthleteService;