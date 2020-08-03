const db = require('../models');

module.exports ={
    addStadium: (stadium)=>{
        const data = db.stadiums.create(stadium);
        return data;
    },
    getStadiumById: (id) =>{
        const data = db.stadiums.findByPk(id);
        return data;
    },
    getAllStadium: ()=>{
        const data = db.stadiums.findAll({
            include: [
                {
                  model: db.teams,
                  as: 'stadium_team'
                }
            ]
        });
        return data;
    },
    updateStadiumById:(id, data)=>{
        const newData = db.stadiums.update(data,{
            where:{id: id}
        });
        return newData;
    }
}