const jwt = require('jsonwebtoken');
require('dotenv').config();
const tokenService = require('../service/token-service')

module.exports = function (roles) {
    return function (req, res, next) {
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

            const {role: userRoles} = tokenService.validateAccessToken(accessToken);
            if(!userRoles) {
                return res.status(403).json({message: 'Пользователь не авторизован'})
            }
            let hasRole = false;
            masRoles = [userRoles];
            
            masRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            })
            if (!hasRole) {
                return res.status(403).json({message: 'У вас нет доступа'})
            }
            next()
        } catch (error) {
            console.log(error);
            return res.status(403).json({message: 'Пользователь не авторизован'})
        }
    }
}