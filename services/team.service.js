const db = require('../models');

module.exports = {
    getTeams: ()=>{
        const dataTeams = db.teams.findAll({
            include: [
                {
                  model: db.coaches,
                  as: 'team_coach'
                }
            ]
        });
        return dataTeams;
    },

    addTeams:(teamData) =>{
        const team = db.teams.create(teamData);
        return team;
    }
}

