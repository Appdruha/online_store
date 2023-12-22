const {Device, BasketDevice} = require('../models/models')
const ApiError = require('../errors/ApiError')
const {Op} = require("sequelize");

class BasketController {
    async getBasket(req, res, next) {
        try {
            const {basketId} = req.query
            const basketDevices = await BasketDevice.findAll({where: {basketId}})
            const deviceArr = JSON.parse(JSON.stringify(basketDevices)).map(device => ({id: device.deviceId}))
            const devices = await Device.findAndCountAll({
                where: {
                    [Op.or]: deviceArr
                }
            })
            return res.json(devices)
        } catch {
            return next(ApiError.badRequest('Ошибка при получении корзины'))
        }
    }
}

module.exports = new BasketController()