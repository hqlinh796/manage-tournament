const statisticalService = require('../services/statistical.service');


module.exports = {
    redirect: async (req, res, next) => {
        res.redirect('statistical/win/teams');
    },
    getTeamsList: async (req, res, next) =>{
        const teamsList =  await statisticalService.getTeamsList();

        console.log(teamsList);
        res.render('doibong/thong_ke_ban_thang', {teamsList});
    }
}