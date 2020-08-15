const jwt = require('./jsonwebtoken');
const db = require('../models');

module.exports = function authorize(action) {
    return async (req, res, next) => {
        const actionList = await db.roles.findOne({
            where: {
                roleCode: req.account.roleCode
            },
            include: [{
                model: db.actions,
                as: 'actions'
            }]
        })
        //console.log(JSON.stringify(actionList));
        //check role has actions equal to action
        //next();

        //403

    }
}