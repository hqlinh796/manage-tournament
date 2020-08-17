const database = require('../models');

class MatchService {
    static async getAllMatch() {
        try {
            return await database.matches.findAll({include: [
                {
                    model: database.stadiums,
                    as: 'match_stadium'
                },
                {
                    model: database.teams,
                    as: 'match_guestTeam'
                },
                {
                    model: database.teams,
                    as: 'match_hostTeam'
                }
            ]});
        } catch (error) {
            throw error;
        }
    }

    static async addMatch(newMatch) {
        try {
            return await database.matches.create(newMatch);
        } catch (error) {
            throw error;
        }
    }

    static async updateMatch(id, updateMatch) {
        try {
            const matchToUpdate = await database.matches.findOne({
                where: {
                    id: id
                }
            });

            if (matchToUpdate) {
                await database.managers.update(updateMatch, {
                    where: {
                        id: id
                    }
                });
                return matchToUpdate;
            }
            
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getMatch(id) {
        try {
            const match = await database.matches.findOne({
                where: {
                    id: id
                }
            });

            return match;
        } catch (error) {
            throw error;
        }
    }

    static async deleteMatch(id) {
        try {
            const matchToDelete = await database.matches.findOne({
                where: {
                    id: id
                }
            });

            if (matchToDelete) {
                const deleteMatch = await database.matches.destroy({
                    where: {
                        id: id
                    }
                });
                return matchToDelete;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MatchService;