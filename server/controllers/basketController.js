const {Device, BasketDevice} = require('../models/models')
const ApiError = require('../errors/ApiError')
const {Op} = require("sequelize");

class BasketController {
    async getBasket(req, res, next) {
        try {
            let {basketId, page, limit} = req.query
            const basketDevices = await BasketDevice.findAll({where: {basketId}})
            const deviceArr = JSON.parse(JSON.stringify(basketDevices)).map(device => ({id: device.deviceId}))
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            const devices = await Device.findAndCountAll({
                where: {
                    [Op.or]: deviceArr
                },
                attributes: {exclude: ['createdAt', 'updatedAt']},
                limit, offset
            })
            return res.json(devices)
        } catch {
            return next(ApiError.badRequest('Ошибка при получении корзины'))
        }
    }

    async getIsDeviceInBasket(req, res, next) {
        try {
            const {id} = req.user
            const {deviceId} = req.query
            const basketDevice = await BasketDevice.findOne({where: {basketId: id, deviceId}})
            if (basketDevice) {
                return res.json({message: true})
            } else return res.json({message: false})
        } catch {
            return next(ApiError.badRequest('Ошибка при опознинии предмета'))
        }
    }
}

module.exports = new BasketController()