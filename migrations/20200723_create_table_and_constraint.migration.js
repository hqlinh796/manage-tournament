const {sequelize} = require('../models');
const fs = require('fs');

module.exports = {
    up: (queryInterface, Sequelize) =>
        new Promise((resolve, rejects) => {
            fs.readFile(`${__dirname}/init_database.sql`, (err, content) => {
                if (err)
                    rejects(err);
                else
                    resolve(sequelize.query(content.toString()));
            })
        })
};