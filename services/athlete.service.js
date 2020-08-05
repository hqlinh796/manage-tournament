const { Op } = require('sequelize');
const db = require('../models');
module.exports = {
    createAthlete: (athletes) => {
        const data = db.athletes.create(athletes);
        return data;
    },
    getListAthlete: () => {
        const data = db.athletes.findAll();
        console.log("data");
        return data;
    },
    getAthletesByTeamId: (teamId) => {
        const data = db.athletes.findAll({
            where: {
                teamId: {
                    [Op.eq]: teamId
                  },
            },
            include: [
                {
                    model: db.positions,
                    as: 'athlete_position',
                }
            ],
        });
        return data;
    },
    getAPIAthleteById: (id) => {
        const data = db.athletes.findByPk(id);
        return data;
    },
    getAthleteById: (id) => {
        const data = db.athletes.findByPk(id);
        return data;
    },
    updateAthleteById: (id, data) => {
        const newData = db.athletes.update(data, {
            where: {
                id: id
            }
        });
        return newData;
    },
    deleteAthleteById:(id) =>{
        const data = db.athletes.destroy({
            where: {
                id: id
            }
        });
        return id;
    }
}