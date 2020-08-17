const db = require('../models');

module.exports = {
    getActions: () => {
        return db.actions.findAll();
    }
}