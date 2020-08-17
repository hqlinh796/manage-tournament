
const matchService = require('../services/match.service');
const teamService = require('../services/team.service');
const matchAthleteService = require('../services/match_athlete.service');
const matchScoreService = require('../services/match_score.service');
const e = require('express');


module.exports = {
    showMatchList: async (req, res, next) => {
        try {
            const matches = await matchService.getAllMatch();
            const teams = await teamService.getTeams();
            
            for(let i = 0; i < matches.length; i++) {
                const matchAthletes = await matchAthleteService.getByMatch(matches[i].id);
                let listAthGoalHost = [];
                let listAthGoalGuest = [];
                let goal1 = 0, goal2 = 0;
                matchAthletes.forEach(matchAthlete => {
                    
                    if (matchAthlete.matches_athletes_athlete.teamId == matchAthlete.matches_athletes_matches.hostTeam ) {
                        matchAthlete.matches_athletes_scores.forEach(matchScore => {
                            if(!matchScore.typeScore.localeCompare('C')) {
                                listAthGoalHost.push(matchAthlete.matches_athletes_athlete.fullName + ' p' + matchScore.time);
                                goal1++;
                            } else {
                                listAthGoalHost.push(matchAthlete.matches_athletes_athlete.fullName + '(Phản lưới)' + ' p' + matchScore.time);
                                goal2++;
                            }
                        });
                    } else {
                        matchAthlete.matches_athletes_scores.forEach(matchScore => {
                            if(!matchScore.typeScore.localeCompare('C')) {
                                listAthGoalGuest.push(matchAthlete.matches_athletes_athlete.fullName+ ' p' + matchScore.time);
                                goal2++;
                            } else {
                                listAthGoalGuest.push(matchAthlete.matches_athletes_athlete.fullName + '(Phản lưới)'+ ' p' + matchScore.time);
                                goal1++;
                            }
                        });
                    }
                });

                let result = goal1 + '-' + goal2;
                matches[i].listAthGoalHost = listAthGoalHost;
                matches[i].listAthGoalGuest = listAthGoalGuest;
                
                if (new Date(matches[i].time) > new Date()) {
                    matches[i].result = '?-?';
                } else {
                    matches[i].result = result;
                }
            }

            res.render('match/match-list', {
                matches: matches,
                teams: teams
            });

        } catch (error) {
           next(error); 
        }
    },
    addMatch: async (req, res, next) => {
        try {
            console.log(await matchService.addMatch(req.body));

            res.redirect('/matchs');
        } catch (error) {
            next(e);
        }
    },
    deleteMatch: async (req, res, next) => {
        try {
            if(req.query.id) {
                await matchService.deleteMatch(req.query.id);
            }

            res.redirect('/matchs');
        } catch (error) {
            next(e);
        }
    }
}