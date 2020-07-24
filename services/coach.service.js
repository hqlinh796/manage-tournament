const db = require('../models');

module.exports ={
    addCoach: (data) =>{
        const info = db.coaches.create(data);
        return info;
    },
    getCoaches: ()=>{
        const data = db.coaches.findAll();
        return data;
    }
}