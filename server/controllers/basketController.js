const {Device, BasketDevice} = require('../models/models')
const ApiError = require('../errors/ApiError')
const {Op} = require("sequelize");

class BasketController {
    async getBasket(req, res) {
        const {userId} = req.body
        const basketDevices = await BasketDevice.findAll({where: {basketId: userId}})
        const deviceArr = JSON.parse(JSON.stringify(basketDevices)).map(device => ({id: device.deviceId}))
        const devices = await Device.findAll({where: {
            [Op.or]: deviceArr
        }})
        return res.json(devices)
    }
}

module.exports = new BasketController()