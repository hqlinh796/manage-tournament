const database = require('../models');

class MatchesService {
    static async getAllMatches() {
        try {
            return await database.matches.findAll();
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
                await database.matches.update(updateMatch, {
                    where: {
                        id: id
                    }
                });
                return updateMatch;
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
                return deleteMatch;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MatchesService;