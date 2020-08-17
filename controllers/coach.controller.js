const coachService = require('../services/coach.service');

module.exports = {
    getCoaches: async (req, res, next)=>{
        const data =await coachService.getCoaches();
        console.log(data);
        res.render('coach/index', {data: data});
    },
    addCoach: async (req, res, next)=>{
        const data = req.body;
        console.log(data);
        await coachService.addCoach(data);
        res.redirect('/coaches');
    },
    getCoachesAPI: async (req, res, next)=>{
        const data =await coachService.getCoaches();
        console.log(data);
        res.json(data);
    },
}