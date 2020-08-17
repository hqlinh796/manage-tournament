const db = require('../models');

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
        if (!role)
            return null;
        role.addActions(actions);
        return role;
    }
    
}