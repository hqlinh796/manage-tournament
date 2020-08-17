
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
                    }
                });

                let result = goal1 + '-' + goal2;
                
                if (new Date(matches[i].time) > new Date()) {
                    matches[i].result = '#-#';
                } else {
                    matches[i].result = result;
                }
            }
            
            // matches.forEach(async match => {
            //     const matchAthletes = await matchAthleteService.getByMatch(match.id);

            //     let goal1 = 0, goal2 = 0;
            //     // for(let i = 0; i < matchAthletes.length; i++) {
            //     //     if (matchAthletes[i].matches_athletes_athlete.teamId == matchAthletes[i].matches_athletes_matches.hostTeam ) {
            //     //         matchAthletes[i].matches_athletes_scores.forEach(matchScore => {
            //     //             if(!matchScore.typeScore.localeCompare('C')) {
            //     //                 goal1++;
            //     //             } else {
            //     //                 goal2++;
            //     //             }
            //     //         });
            //     //     }
            //     // }
            //     matchAthletes.forEach(matchAthlete => {
            //         if (matchAthlete.matches_athletes_athlete.teamId == matchAthlete.matches_athletes_matches.hostTeam ) {
            //             matchAthlete.matches_athletes_scores.forEach(matchScore => {
            //                 if(!matchScore.typeScore.localeCompare('C')) {
            //                     goal1++;
            //                 } else {
            //                     goal2++;
            //                 }
            //             });
            //         }
            //     });

            //     let result = goal1 + '-' + goal2;
            //     console.log(match)
            // });


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