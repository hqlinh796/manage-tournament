const db = require('../models');

module.exports.createAthelete = (athlete) => db.athletes.create(athlete);