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
        const data = db.stadiums.findAll();
        return data;
    }
}