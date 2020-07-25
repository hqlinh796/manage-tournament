const matchService = require('../services/matches.service');

module.exports = {
    addMatch : async (req, res, next) => {
        const newMatch = req.body;
        console.log(newMatch);
    
        try {
            const createMatch = await matchService.addMatch(newMatch);
            
            console.log(createMatch);
            res.send('create successfully!');
    
        } catch (error) {
            next(error);
        }
    }
};
