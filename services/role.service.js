const db = require('../models');
const { sequelize } = require('../models');

module.exports = {
    getRoles: (condition) => db.roles.findAll({
        include: [{
            model: db.actions,
            as: 'actions',
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        }]
    }),

    findRoleByCode: (code) => db.roles.findOne({where: {code}}),
    createRole: async (name, code, actions) => {
        const role = await db.roles.create({name, code});
        const actionList = await db.actions.findAll({
            where: {
                code: actions
            }
        })
        
        console.log(actionList);
        if (!role || !actionList.length)
            return null;
        role.addActions(actionList);
        return role;
    },
    getRoleByCode: (code) => db.roles.findOne({
        where: {code},
        include: [{
            model: db.actions,
            as: 'actions'
        }]
    })
    
}