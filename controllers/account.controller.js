const accountService = require('../services/account.service');

module.exports = {
    addAccount : async (req, res, next) => {
        const newAccount = req.body;
        try {
            const createAccount = await accountService.addAccount(newAccount);
        
            res.send(createAccount);
    
        } catch (error) {
            next(error);
        }
    },
    getAllAccounts: async (req, res, next) => {
        try {
            const accounts = await accountService.getAllAccounts();
            return accounts;
        } catch (error) {
            next(error);
        }
    }
};