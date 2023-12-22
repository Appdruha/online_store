const {Type} = require('../models/models')
const ApiError = require('../errors/ApiError')

class TypeController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const type = await Type.create({name})
            return res.json(type)
        } catch {
            return next(ApiError.badRequest('Ошибка при создании типа'))
        }
    }

    async getAll(req, res, next) {
        try {
            const types = await Type.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}})
            return res.json(types)
        } catch {
            return next(ApiError.badRequest('Ошибка при получении типов'))
        }
    }
}

module.exports = new TypeController()