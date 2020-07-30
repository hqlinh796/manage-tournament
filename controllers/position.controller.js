const positionService = require('../services/position.service');

module.exports = {
    getAllPosition: async (req, res, next)=>{
        const data =await positionService.getAllPosition();
        res.json(data);
    }
}