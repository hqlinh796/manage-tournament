const database = require('../models');

class MatchAthleteScore {
    static async getByMatchAthlete(matchAthlete) {
        try {
            return await database.matches_scores.findOne({
                where: {
                    matchAthlete: matchAthlete
                },
                // include: [
                //     {
                //         model: database.typescores,
                //         as: 'matches_scores_typescore'
                //     }
                // ]
            });
        } catch (error) {
            throw(error);
        }
    }
}

module.exports = MatchAthleteScore;