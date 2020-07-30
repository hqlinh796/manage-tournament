const teamService = require('../services/team.service');
const accountService = require('../services/account.service');
const managerService = require('../services/manager.service');

module.exports = {
    getAddTeamForm: (req, res, next)=> {
        res.render('team/add', {title: "Team"});
    },
    showTeamAdd: async (req, res, next) => {
        try {
            const accounts = await accountService.getAllAccounts();
            const managers = await managerService.getAllManagers();

            res.render('team/add', {
                accounts: accounts,
                managers: managers,
            });
        } catch (error) {
            next(error);
        }
    },
    showTeamList: async (req, res, next) => {
        try {
            const teams = await teamService.getAllTeams();
            res.render('team/teams-list', {
                teams: teams
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}