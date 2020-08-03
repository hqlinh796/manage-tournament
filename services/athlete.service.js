const db = require('../models');

module.exports = {
    createAthlete: (athletes) => {
        const data =db.athletes.create(athletes);
        return data;
    },
    getListAthlete: ()=>{
        const data =db.athletes.findAll();
        console.log("data");
        return data;
    },
    getListByTeamID: (teamId)=>{
        const data = db.athletes.findAll({ where: { teamId: teamId } });
        return data;
    },
    getAthleteById: (id)=>{
        const data = db.athletes.findByPk(id);
        return data;
    },
    updateAthleteById: (id, data)=>{
        const newData = db.athletes.update(data, {
            where: {
                id: id
            }
        });
        console.log(newData);
    }
}