const db = require('../models');

module.exports ={
    getAllPosition: ()=>{
        const data = db.positions.findAll();
        return data;
    }
}