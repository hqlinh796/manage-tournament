const teamService = require('../services/team.service');
const coachService = require('../services/coach.service');
const athleteService = require('../services/athlete.service');
const positionService = require('../services/position.service');
const accountService = require('../services/account.service');
const managerService = require('../services/manager.service');

module.exports = {
    getTeams: async (req, res, next) => {
        const teamData = await teamService.getTeams();
        const coachsData = await coachService.getCoaches();
        console.log(teamData);
        console.log(coachsData);
        if (teamData == [] && coachsData == [])
            res.render('team/teams');
        if (teamData == [])
            res.render('team/teams', { coachsData: coachsData });
        if (coachsData == [])
            res.render('team/teams', { teamData: teamData.dataValues });
        res.render('team/teams', { teamData: teamData, coachsData: coachsData });
    },
    addTeam: async (req, res, next) => {
        var newTeam = req.body;
        console.log(JSON.stringify(newTeam));
        delete newTeam.teamId;
        if (!newTeam.managerId) {
            delete newTeam.managerId;
        }
        if (!newTeam.coachId) {
            delete newTeam.coachId;
        }
        try {
            if (newTeam.id) {
                await teamService.updateTeam(newTeam.id, newTeam);
            } else {
                await teamService.addTeam(newTeam);
            }

            res.redirect('/teams');
        } catch (error) {
            next(error)
        }
    },
    getTeamByID: async (req, res, next) =>{
        const id = req.params.id;
        const coachsData = await coachService.getCoaches();
        const teamData = await teamService.getTeamByID(id);
        const athleteList = await athleteService.getAthletesByTeamId(id);
        const position = await positionService.getAllPosition();
        res.render('team/teamInfo', {teamData: teamData, athleteList: athleteList, position:position, coachsData});
    },
    addAthlete: async (req, res, next) =>{
        const id = req.params.id;
        console.log(req.body);
        athleteService.createAthlete(req.body);
        const teamData = await teamService.getTeamByID(id);
        const athleteList = await athleteService.getListByTeamID(id);
        const location = req.originalUrl.toString();
        res.redirect(location);
    },
    showTeamList: async (req, res, next) => {
        try {
            const teams = await teamService.getTeams();
            for(let i = 0; i < teams.length; i++) {
                teams[i].manager = await teams[i].getTeam_manager();
                teams[i].coach = await teams[i].getTeam_coach();
                if (teams[i].manager == null) {
                    teams[i].manager = undefined;
                }
                if (teams[i].coach == null) {
                    teams[i].coach = undefined;
                }
            }

            const managers = await managerService.getAllManagers();
            const coaches = await coachService.getCoaches();
            let team;
            if(req.query.id) {
                team = await teamService.getTeamByID(req.query.id);
                team.manager = await managerService.getManagerByAccount(team.managerId);
                team.coach = await team.getTeam_coach();
            }

            for(let i = 0; i < managers.length; i++) {
                managers[i].account = await managers[i].getManager_account();
            }

            res.render('team/team-list', {
                teams : teams,
                teamData: team,
                managers: managers,
                coaches: coaches
            });
        } catch (error) {
            next(error);
        }
    },
    showTeamAdd: async (req, res, next) => {
        try {
            const managers = await managerService.getAllManagers();
            const coaches = await coachService.getCoaches();
            let team;
            if(req.query.id) {
                team = await teamService.getTeamByID(req.query.id);
                team.manager = await managerService.getManagerByAccount(team.managerId);
                team.coach = await team.getTeam_coach();
            }

            for(let i = 0; i < managers.length; i++) {
                managers[i].account = await managers[i].getManager_account();
            }

            res.render('team/team-add', {
                coaches: coaches,
                managers: managers,
                team: team
            });
        } catch (error) {
            next(error);
        }
    },
    deleteTeam: async(req, res, next) => {
        try {
            if(req.query.id) {
                await teamService.deleteTeam(req.query.id);
            }

            res.redirect('/teams');
        } catch (error) {
            next(error);
        }
    },
    getTeamsAPI: async (req, res, next) => {
        const teamData = await teamService.getTeams();
        const coachsData = await coachService.getCoaches();
        res.json(teamData);
    },
    updateAthlete: async(req, res, next)=>{
        const data = req.body;
        const id = req.params.id;
        const newData = await athleteService.updateAthleteById(id, data);
        res.json(newData);
    },
    statistical: async(req, res, next) =>{
        const id = req.params.id;
        const result = await teamService.statistical(id);
        res.render('statistical/index.ejs', {result});
    },

    updateTeam: async (req, res, next)=>{
        const data = req.body;
        const id = req.params.id;
        console.log("update team");
        console.log(data);
        const result = await teamService.updateTeam(id, data);
        if(result){
            res.redirect('/athletes/team/' + id);
        }
        
    }
}