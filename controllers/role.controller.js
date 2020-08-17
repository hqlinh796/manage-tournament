const roleService = require('../services/role.service');
const db = require('../models');
const actionService = require('../services/action.service');
const sequelize = db.sequelize;
module.exports = {
    getRoles: async (req, res, next) => {
        const condition = {
            includes: [{
                models: db.actions,
                as: 'actions',
            }]
        }
        const roleList = await roleService.getRoles(condition);
        const actionList = await actionService.getActions();
        const actionGroupByCategory = {
            team: [],
            tournament: [],
            account: []
        };
        actionList.forEach(action => {
            if (action.code.includes('team-'))
                actionGroupByCategory.team.push(action);
            else if (action.code.includes('tournament-'))
                actionGroupByCategory.tournament.push(action);
            else 
                actionGroupByCategory.account.push(action);
        })


        return res.render('role', {roleList, actionGroupByCategory});
    },
    createRole: async (req, res, next) => {
        
        //const temp = JSON.parse(JSON.stringify(req.body));
        const {name, code, actions} = JSON.parse(JSON.stringify(req.body));
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
        
    },
    deleteRole: async (req, res, next) => {
        const code = req.params.roleCode;
        const role = await db.roles.destroy({
            where: {
                code: code
            }
        })
        res.redirect('/roles');
    },
    getRole: async (req, res, next) => {
        const role = await roleService.getRoleByCode(req.params.roleCode);
        res.json(role).status(200);
    }
}