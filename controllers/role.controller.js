const roleService = require('../services/role.service');
const db = require('../models');
const sequelize = db.sequelize;
module.exports = {
    getRoles: async (req, res, next) => {
        const condition = {
            include: [{
                models: db.actions,
                as: 'actions',
            }]
        }
        const roleList = await roleService.getRoles(condition);
        console.log(JSON.stringify(roleList));
        return res.render('role', {roleList});
    },
    createRole: async (req, res, next) => {
        const {name, code, actions} = req.body;

        let role = await roleService.findRoleByCode(code);
        if (role) {
            console.log('Da co role');
            
            return;
        }

        role = await roleService.createRole(name, code, actions);
        if (!role) {
            //create error
            const error = new Error('Have an error, try again!');
            next(error);
            return;
        }

        return res.status(201).json({});
        
    }
}