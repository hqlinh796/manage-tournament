const stadiumService = require('../services/stadium.service');
const pictureService = require('../services/picture.service');

module.exports = {
    getAllStadium: async (req, res, next) => {
        const data = await stadiumService.getAllStadium();
        res.render('stadium/stadium', { data: data });
    },
    getStadium: async (req, res, next) => {
        const id = req.params.id;
        const data = await stadiumService.getStadiumById(id);
        res.json(data);
    },
    createStadium: async (req, res, next) => {
        try {
            const data = req.body;
            console.log(data);
            const result = await stadiumService.addStadium(data);
            const pictures = data.pictures;
            if(pictures){
                for (pic in pictures){
                    const dataPicture = {};
                    dataPicture.stadiumId = result.id;
                    dataPicture.picture = pictures[pic];
                    console.log(dataPicture);
                    pictureService.addPicture(dataPicture);
                } 
            }
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}