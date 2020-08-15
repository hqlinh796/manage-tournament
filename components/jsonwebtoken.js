const jwt = require('jsonwebtoken');
const jwtSecret = 'AbCd123456!@#$%^';

module.exports = {
    generateJWT: function(username, roleCode) {
        const token = jwt.sign({ username, roleCode }, jwtSecret, { expiresIn: 60 });
        const refreshToken = jwt.sign({ username, roleCode }, jwtSecret, { expiresIn: 60*60*24 });
        return {
            token,
            refreshToken
        }
    },
    decodeJWT: function(token, refreshToken) {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                jwt.verify(refreshToken, jwtSecret, (error, data2) => {
                    if (error) 
                        return '';
                    else
                        return data2;
                })
            } else
                return data;
        })
    }
}