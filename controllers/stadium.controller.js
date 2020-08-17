const stadiumService = require('../services/stadium.service');
const pictureService = require('../services/picture.service');

module.exports = {
    getAllStadium: async (req, res, next) => {
        const data = await stadiumService.getAllStadium();
        res.render('stadium/index', { stadiumData: data });
    },
    getStadium: async (req, res, next) => {
        const id = req.params.id;
        const data = await stadiumService.getStadiumById(id);
        res.json(data);
    },
    createStadium: async (req, res, next) => {
        try {
            const data = req.body;
            console.log(JSON.stringify(data));
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
            res.redirect('/stadiums');
        } catch (error) {
            next(error);
        }
    },
    updateStadiumById: async (req, res, next) =>{
        
        try {
            const data = req.body;
            const id = req.params.id;
            const newData = await stadiumService.updateStadiumById(id, data);
            await pictureService.deletePicturesByStadiumId(id);
            const pictures = data.pictures;
            if(pictures){
                for (pic in pictures){
                    const dataPicture = {};
                    dataPicture.stadiumId = id;
                    dataPicture.picture = pictures[pic];
                    console.log(dataPicture);
                    pictureService.addPicture(dataPicture);
                } 
            }
            res.redirect('/stadiums');
        } catch (error) {
            next(error);
        }
    }
}