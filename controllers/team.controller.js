const teamService = require('../services/team.service');
const coachService = require('../services/coach.service');
const athleteService = require('../services/athlete.service');
const positionService = require('../services/position.service');
const accountService = require('../services/account.service');
const managerService = require('../services/manager.service');
const matchService = require('../services/match.service');
const matchAthleteService = require('../services/match_athlete.service');

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

            res.redirect('/team');
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
    showRank: async(req, res, next) => {
        const matches = await matchService.getAllMatch();
        const teams = await teamService.getTeams();
        teams.forEach(team => {
            team.win = 0;
            team.lose = 0;
            team.drawn = 0;
            team.score = 0;
            team.goalDifference = 0;
        });

            
            for(let i = 0; i < matches.length; i++) {
                const matchAthletes = await matchAthleteService.getByMatch(matches[i].id);
                let goal1 = 0, goal2 = 0;
                matchAthletes.forEach(matchAthlete => {
                    
                    if (matchAthlete.matches_athletes_athlete.teamId == matchAthlete.matches_athletes_matches.hostTeam ) {
                        matchAthlete.matches_athletes_scores.forEach(matchScore => {
                            if(!matchScore.typeScore.localeCompare('C')) {
                                goal1++;
                            } else {
                                goal2++;
                            }
                        });
                    } else {
                        matchAthlete.matches_athletes_scores.forEach(matchScore => {
                            if(!matchScore.typeScore.localeCompare('C')) {
                                goal2++;
                            } else {
                                goal1++;
                            }
                        });
                    }
                });

                
                const team1 = teams.find(({id}) => {
                    return id === (matches[i].hostTeam);
                });
                
                const team2 = teams.find(({id}) => {
                    return id === (matches[i].guestTeam);
                });


                if (new Date(matches[i].time) < new Date()) {
                    if(goal1 > goal2) {
                        team1.win++;
                        team1.score += 3;
                    } else if (goal1 < goal2) {
                        team2.win++;
                        team2.score += 3;
                    } else {
                        team1.drawn++;
                        team1.score += 1;
                        team2.drawn++;
                        team1.score += 1;
                    }
                }
                team1.goalDifference += goal1 - goal2;
                team2.goalDifference += goal2 - goal1;
            }

            res.render('team/team-rank', {
                teams: teams
            });
    }
}