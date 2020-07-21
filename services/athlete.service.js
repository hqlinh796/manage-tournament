const db = require('../models');

module.exports = {
    createAthlete: (athletes) => {
        const data = db.athletes.create(athletes);
        return data;
    },
    getListAthlete: ()=>{
        const data = db.athletes.findAll();
        return data;
    }
}