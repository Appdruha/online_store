const {Brand} = require("../models/models");
const ApiError = require('../errors/ApiError')

class BrandController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const brands = await Brand.create({name})
            return res.json(brands)
        } catch {
            return next(ApiError.badRequest('Ошибка при создании бренда'))
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await Brand.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}})
            return res.json(brands)
        } catch {
            return next(ApiError.badRequest('Ошибка при получении брендов'))
        }
    }
}

module.exports = new BrandController()