const uuid = require('uuid')
const path = require('path')
const sequelize = require('sequelize')
const {Device, DeviceInfo, Rating, BasketDevice} = require('../models/models')
const ApiError = require('../errors/ApiError')

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            if (info) {
                info = JSON.parse(info)
                await DeviceInfo.create({
                    deviceId: device.id,
                    title: info.title,
                    description: info.description
                })

            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [
                    {
                        model: DeviceInfo,
                        attributes: ["title", "description"],
                        as: "info"
                    }
                ]
            }
        )
        return res.json(device)
    }

    static async updateDeviceRating(deviceId) {
        const avgRatingData = await Rating.findAll(
            {
                where: {deviceId},
                attributes: [[sequelize.fn('AVG', sequelize.col('rate')), 'avgRate']]
            }
        )
        const avgRating = Math.floor(JSON.parse(JSON.stringify(avgRatingData))[0].avgRate * 10) / 10

        await Device.update({rating: avgRating}, {where: {id: deviceId}})
    }

    async setRating(req, res) {
        const {id} = req.params
        const {userId, rate} = req.body
        let rating
        if (req.method === "PUT") {
            rating = await Rating.update({rate}, {where: {deviceId: id, userId}})
        } else {
            rating = await Rating.create({rate, userId, deviceId: id})
        }
        await DeviceController.updateDeviceRating(id)
        return res.json(rating)
    }

    async addDeviceToBasket(req, res) {
        const {id} = req.params
        const {userId} = req.body
        const basketDevice = await BasketDevice.create({deviceId: id, basketId: userId})
        return res.json(basketDevice)
    }
}

module.exports = new DeviceController()