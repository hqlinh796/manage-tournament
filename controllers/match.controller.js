
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

            res.redirect('/match');
        } catch (error) {
            next(e);
        }
    },
    deleteMatch: async (req, res, next) => {
        try {
            if(req.query.id) {
                await matchService.deleteMatch(req.query.id);
            }

            res.redirect('/match');
        } catch (error) {
            next(e);
        }
    }
}