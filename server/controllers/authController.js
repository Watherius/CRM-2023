const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
require('dotenv').config();
const message = require('../config/message.config');
const tokenService = require("../service/token-service");

const User = db.user;

class authController {
    async registration(req, res, next) {
        try {
            const {firstName, secondName, middleName, phone, email, password, role} = req.body;
            const person = await User.findOne({where: {[Op.or]: [{email}, {phone}]}})
            if (person) {
                return res.status(400).json({message: message.userExists});
            }
            const user = await User.create({firstName, secondName, middleName, phone, email, password, role})
            const tokens = tokenService.generateTokens({id: user.id, role: user.role, firstName: user.firstName, secondName: user.secondName});
            await tokenService.saveToken(user.id, tokens.refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.status(201).json({
                ...tokens,
                user,
                message: message.userRegistered,
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({message: message.errorRegistration});
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({ where: {email}});
            if (!user) {
                return res.status(400).json({message: message.userNoExists})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: message.incorrectPassword})
            }
            const tokens = tokenService.generateTokens({id: user.id, role: user.role});
            await tokenService.saveToken(user.id, tokens.refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json({  
                ...tokens,
                user: {id: user.id, role: user.role, firstName: user.firstName, secondName: user.secondName},
                message: message.successfulAuthorization,
            });
        } catch (error) {
            console.log(error)
            res.status(400).json({message: message.errorAuthorization});
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = tokenService.removeToken(refreshToken);
            res.clearCookie('refreshToken');
            return res.json({message: 'Токен удален'});
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Ошибка запроса'});
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            if(!refreshToken)
            {
                return res.json({message: 'Пользователь не авторизован'});
            }
            const userData = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = await tokenService.findToken(refreshToken);
            if (!userData || !tokenFromDb)
            {
                return res.json({message: 'Пользователь не авторизован'});
            }
            const user = await User.findByPk(userData.id);
            const tokens = tokenService.generateTokens({id: user.id, role: user.role, firstName: user.firstName, secondName: user.secondName});
            await tokenService.saveToken(user.id, tokens.refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({
                ...tokens
            })

        } catch(error) {
            console.log(error)
            res.status(400).json({message: 'Ошибка запроса'});
        }
    }

    async getUsers(req, res) {
        try {
            const user = await User.findAll()
            res.json(user)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new authController()