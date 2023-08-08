const jwt = require('jsonwebtoken');
require('dotenv').config();
const tokenService = require('../service/token-service')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS"){
        next();
    }

    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) {
            return res.status(403).json({message: 'Пользователь не авторизован'})
        }

        const accessToken = req.headers.authorization.split(' ')[1]
        if(!accessToken) {
            return res.status(403).json({message: 'Пользователь не авторизован'})
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData) {
            return res.status(403).json({message: 'Пользователь не авторизован'})
        }

        req.user = userData
        next()
    } catch (error) {
        console.log(error);
        return res.status(403).json({message: 'Пользователь не авторизован'})
    }
}