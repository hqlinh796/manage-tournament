const managerService = require('../services/manager.service');

const accountService = require('../services/account.service');
const teamService = require('../services/team.service');

module.exports = {
    addManager : async (req, res, next) => {
        const newManager = req.body;
        console.log(newManager);
        try {
            if(newManager.id) {
                const oldManager = await managerService.updateManager(newManager.id, newManager);
                console.log(oldManager.accountId);
                console.log(newManager.accountId);
                console.log(oldManager.accountId.localeCompare(newManager.accountId));
                if (oldManager.accountId.localeCompare(newManager.accountId) != 0) {
                    console.log(await teamService.updateManagerTeam(oldManager.accountId, newManager.accountId));
                }
                
            } else {
                console.log('bb');
                await managerService.addManager(newManager);
            }
            
            res.redirect('/managers');
        } catch (error) {
            next(error);
        }
    },
    deleteManager: async(req, res, next) => {
        try {
            if(req.query.id) {
                await managerService.deleteManager(req.query.id);
            }

            res.redirect('/managers');
        } catch (error) {
            next(error);
        }
    },
    showManagerList: async (req, res, next) => {
        try {
            const managers = await managerService.getAllManagers();
            const accounts = await accountService.getAccounts();
            for(let i = 0; i < managers.length; i++) {
                managers[i].team = await teamService.getTeamByManager(managers[i].accountId);
                managers[i].account = await managers[i].getManager_account();
            }

            res.render('manager/manager-list', {
                managers : managers,
                accounts: accounts
            });
        } catch (error) {
            next(error);
        }
    },
    showAddManager: async (req, res, next) => {
        try {
            const accounts = await accountService.getAllAccounts();
            let manager;
            let account;
            if (req.query.id) {
                manager = await managerService.getManager(req.query.id);
                account = await manager.getManager_account();
                
            } 
            res.render('manager/manager-add', {
                manager: manager,
                accounts: accounts,
                account: account
            });
        } catch (error) {
            next(error);
        }
    }
};