const {sequelize} = require('../models');
const {QueryTypes} = require('sequelize')
const db = require('../models');

module.exports ={
    addCoach: (data) =>{
        const info = db.coaches.create(data);
        return info;
    },
    getCoaches: ()=>{
        const data = db.coaches.findAll();
        return data;
    },
    getCoachById: (id)=>{
        const data = db.coaches.findByPk(id);
        return data;
    },
    getCoachesNotInTeam: ()=>{
        const data = sequelize.query(`select *
        from coaches left join teams on coaches.id = teams.coach_id
        where teams.coach_id  is null
        `, {
            type: QueryTypes.SELECT
        }
        )
        return data;
    }
}