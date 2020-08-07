const db = require('../models');

module.exports = {
    getTeams: ()=>{
        try {
            const dataTeams = db.teams.findAll({
                include: [
                    {
                      model: db.coaches,
                      as: 'team_coach'
                    },
                    {
                      model: db.accounts,
                      as: 'team_manager'
                    }
                ]
            });
            return dataTeams;
        } catch (error) {
            throw(error)
        }
    },

    addTeam:(teamData) =>{
        const team = db.teams.create(teamData);
        return team;
    },
    getTeamByID: (id) =>{
        const data = db.teams.findByPk(id);
        return data;
    },
    getTeamByManager: (managerId) => {
        const teamData = db.teams.findOne({
            where: {
                managerId: managerId
            }
        });
        return teamData;
    }, 
    updateTeam: (id, teamUpdate) => {
        try {
            const teamToUpdate = db.teams.findOne({
                where: {
                    id: id
                }
            });
            if (teamToUpdate) {
                db.teams.update(teamUpdate, {
                    where: {
                        id: id
                    }
                });
                return teamToUpdate;
            }
            
            return null;
        } catch (error) {
            throw(error)
        }
    }, 
    deleteTeam: (id) => {
        try {
            const teamToDelete = db.teams.findOne({
                where: {
                    id: id
                }
            });
            if (teamToDelete) {
                db.teams.destroy({
                    where: {
                        id: id
                    }
                });
                return teamToDelete;
            }
            return null;
        } catch (error) {
            throw(error);
        }
    },
    updateManagerTeam(idOldManager,idNewManager) {
        try {
            const teamToUpdate = db.teams.findOne({
                where: {
                    managerId: idOldManager
                }
            });
            teamToUpdate.managerId = idNewManager;
            if (teamToUpdate) {
                db.teams.update(teamToUpdate,{
                    where: {
                        managerId: idOldManager
                    }
                });
                return teamToUpdate;
            }
            return null;
        } catch (error) {
            throw(error);
        }
    }
}

