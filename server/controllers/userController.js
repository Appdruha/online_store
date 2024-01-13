const ApiError = require('../errors/ApiError')
const bcrypt = require('bcryptjs')
const {User, Basket} = require('../models/models')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '1d'}
    )
}

const generateRefreshToken = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.REFRESH_KEY,
        {expiresIn: '30d'}
    )
}

const cookieMaxAge = 60*60*24*30

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, roleKey, rememberMe} = req.body
            if (!email || !password) {
                return next(ApiError.forbidden('Некорректный email или пароль'))
            }
            const candidate = await User.findOne(({where: {email}}))
            if (candidate) {
                return next(ApiError.forbidden({'emailError': 'Такой email уже зарегистрирован'}))
            }
            let role = "USER"
            if (roleKey === process.env.ADMIN_KEY) {
                role = "ADMIN"
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, password: hashPassword, role})
            req.user = user
            const basket = await Basket.create({userId: user.id})

            if (rememberMe) {
                next(UserController.sendRefreshToken(req, res, next))
            } else {
                const token = generateJwt(user.id, user.email, user.role)
                return res.json({token})
            }
        } catch {
            return next(ApiError.badRequest('Ошибка при регистрации'))
        }
    }

    async login(req, res, next) {
        try {
            const {email, password, rememberMe} = req.body
            const user = await User.findOne({where: {email}})
            if (!user) {
                return next(ApiError.forbidden({'emailError': 'Пользователь не найден'}))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.badRequest({'passwordError': 'Неверный пароль'}))
            }
            req.user = user

            if (rememberMe) {
                next(UserController.sendRefreshToken(req, res, next))
            } else {
                const token = generateJwt(user.id, user.email, user.role)
                return res.json({token})
            }
        } catch {
            return next(ApiError.badRequest('Ошибка при входе'))
        }
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    static sendRefreshToken(req, res, next) {
        const user = req.user
        const token = generateJwt(user.id, user.email, user.role)
        const refreshToken = generateRefreshToken(user.id, user.email, user.role)
         res.setHeader(
            "set-cookie",
            cookie.serialize("refreshToken", refreshToken, {
                maxAge: cookieMaxAge,
                httpOnly: false,
                path: '/'
            })
        )

        return res.json({token})
    }
}

module.exports = new UserController()










