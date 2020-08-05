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
    },
    getTeamByID: async (id) =>{
        const data =await db.teams.findByPk(id);
        return data;
    },
    updateTeamById: (id, data)=>{
        const newData = db.teams.update(data,{
            where:{
                id: id
            }
        });
        console.log(newData);
    }
}

