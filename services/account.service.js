const db = require('../models');

module.exports = {
    getAccountByUsername: (username) => {
        return db.accounts.findOne({
            username
        });
    },
    createAccount: (username, password, roleCode) => {
        return db.accounts.create({
            username,
            password,
            roleCode
        });
    },
    getAccounts: () => {
        return db.accounts.findAll({
            include: [
                'account_team',
                'account_role'
            ]
        });
    }
}