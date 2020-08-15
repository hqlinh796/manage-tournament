const jwt = require('./jsonwebtoken');


module.exports = function authenticete(req, res, next) {
    //get token from cookies
    const token = req.cookies.token || '';
    const refreshToken = req.cookies.refreshToken || '';
    const data = jwt.decodeJWT(token, refreshToken);
    if (!data) {
        return res.redirect('login');
    }
    req.account = data;
    next();
}