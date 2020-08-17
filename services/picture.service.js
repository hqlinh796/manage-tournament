const db = require('../models');

module.exports ={
    addPicture: (picture)=>{
        const data = db.pictures.create(picture);
        return data;
    },
    getPictureById: (id) =>{
        const data = db.pictures.findByPk(id);
        return data;
    },
    getAllPicture: ()=>{
        const data = db.pictures.findAll();
        return data;
    },
    getPicturesByStadiumId: (id)=>{
        const data = db.pictures.findAll({
            where: {
                stadiumId: id,
            }
        });
        return data;
    },
    deletePicturesByStadiumId: (id)=>{
        const data = db.pictures.destroy({
            where: {
                stadiumId: id,
            }
        });
        return data;
    },
    
}