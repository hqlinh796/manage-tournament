const atheleteService = require('../services/athelete.service');


module.exports.createAthlete = async (req, res, next) => {
    const athlete = req.body;
    try {
        const result = await atheleteService.createAthelete(athlete);
        res.json(result).status(200);
    } catch (error) {
        next(error);
    }
}