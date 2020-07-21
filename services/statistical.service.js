const db = require('../models');

module.exports = {
    getTeamsList:  ()=>{
        console.log("db team: ");
        const data = db.teams.findAll();
        return data;
    }
}
