const jwt = require('./jsonwebtoken');


module.exports = function authenticete(req, res, next) {
    //get token from cookies
    const token = req.cookies.token || '';
    const refreshToken = req.cookies.refreshToken || '';
    const data = jwt.decodeJWT(token, refreshToken);
    if (!data) {
        res.cookie('previousPage', req.originalUrl);
        return res.redirect('/accounts/login');
    }
    req.account = data;
    res.locals.account = data;
    next();
}