const db = require('../models');

module.exports = {
    getRoles: () => db.roles.findAll(),
    
}