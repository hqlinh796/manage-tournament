const db = require('../models');
const pictureService = require('../services/picture.service');

module.exports = {
    getPicturesByStadiumId: async (req, res, next) =>{
        const id = req.params.id
        const data =await pictureService.getPicturesByStadiumId(id);
        res.json(data);
    },
    getAllPicture: async (req, res, next) =>{
        const data = await pictureService.getAllPicture();
        res.json(data);
    },
}