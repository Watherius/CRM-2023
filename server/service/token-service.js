const jwt = require('jsonwebtoken');
const db = require("../models");
require('dotenv').config();

const Token = db.tokenSchema;

class TokenService 
{
    generateTokens(payload)
    {
        const accessToken = jwt.sign(payload, process.env.TOKEN_ACCESS_KEY, {expiresIn: '24h'});
        const refreshToken = jwt.sign(payload, process.env.TOKEN_REFRESH_KEY, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken,
        }
    }

    validateAccessToken(token)
    {
        try {
            const userData = jwt.verify(token, process.env.TOKEN_ACCESS_KEY);
            return userData;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token)
    {
        try {
            const userData = jwt.verify(token, process.env.TOKEN_REFRESH_KEY);
            return userData;
        } catch (error) {
            return null;
        }
    }

    async saveToken(userId, refreshToken)
    {
        const tokenData = await Token.findOne({ where: {userId}});
        if (tokenData)
        {
            tokenData.refreshToken = refreshToken;
            return await tokenData.save();
        }
        const token = await Token.create({userId, refreshToken});
        return token;
    }

    async removeToken(refreshToken)
    {
        const tokenData = await Token.destroy({where: {refreshToken: refreshToken}});
        return tokenData;
    }

    async findToken(refreshToken)
    {
        const tokenData = await Token.findOne({where: {refreshToken: refreshToken}});
        return tokenData;
    }
}

module.exports = new TokenService();