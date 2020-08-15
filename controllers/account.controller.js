const bcrypt = require('bcrypt');
const accountService = require('../services/account.service');
const roleService = require('../services/role.service');
const saltRounds = 10;
const db = require('../models');

module.exports = {
    getLoginPage: (req, res) => {
        
        res.cookie('token', 'coNacuaChu');
        res.render('login');
    },
    verifyAccount: (req, res, next) => {
        //get jwt
        const jwt = req.cookies.token;
        if (!jwt) {
            res.redirect('/login');
            return;
        }
        
        //verify token


        next();

    },
    login: async (req, res, next) => {
        const {username, password} = req.body;
        //check if username exist
        const account = await accountService.getAccountByUsername(username);
        //console.log('account: ', JSON.stringify(req.body));
        if (!account) {
            //response error
            res.render()
            return;
        }
        bcrypt.compare(password, account.password, (err, isMatch) => {
            if (err || !isMatch) {
                console.log(err);
                //response error
                res.render('account/account');
                return;
            }
            //generate token and set header
            res.render('index');
        })
        
    },
    createAccount: async (req, res, next) => {
        console.log(JSON.stringify(req.body));
        const {username, password, roleCode} = req.body;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    next(err);
                } else {
                    const account = await accountService.createAccount(username, hash, roleCode);
                    if (account)
                        return res.status(201).json({});
                    else {
                        const error = new Error('Can\'t create new account');
                        next(error);
                    } 
                        
                }
            });
        });
    },
    getAccountPage: async (req, res, next) => {
        const temp = await db.matches_scores.findAll();
        console.log(JSON.stringify(temp));
        const accountList = await accountService.getAccounts();
        const roleList = await roleService.getRoles();
        console.log(JSON.stringify(roleList));
        res.render('account/account', {accountList, roleList});

        //xu ly accountList
    }
}

