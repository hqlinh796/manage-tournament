const managerService = require('../services/manager.service');

const accountController = require('../controllers/account.controller');

module.exports = {
    addManager : async (req, res, next) => {
        const newManager = req.body;
    
        try {
            const createManager = await managerService.addManager(newManager);
            
            console.log(createManager);
            res.send('create successfully!');
    
        } catch (error) {
            next(error);
        }
    },
    getAllManagers: async (req, res, next) => {
        try {
            const managers = await managerService.getAllManagers();
            
            return managers;
        } catch (error) {
            next(error);
        }
    },
    showManagerList: async (req, res, next) => {
        try {
            const managers = await managerService.getAllManagers();
            console.log(managers);
            
            res.render('team/manager-team-list', {
                managers : managers
            });
        } catch (error) {
            next(error);
        }
    },
    showAddManager: async (req, res, next) => {
        try {
            const accounts = await accountController.getAllAccounts();

            res.render('team/manager-team-add', {
                accounts: accounts
            });
        } catch (error) {
            next(error);
        }
    }
    
};