const uuid = require('uuid')
const path = require('path')
const sequelize = require('sequelize')
const {Device, DeviceInfo, Rating, BasketDevice} = require('../models/models')
const ApiError = require('../errors/ApiError')
const Op = sequelize.Op

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
            next(ApiError.badRequest("Ошибка при создании предмета"))
        }
    }

    async getAll(req, res, next) {
        try {
            let {brandId, typeId, limit, page} = req.query
            let id
            let basketDevices = []
            if (req.user) {
                id = req.user.id
                basketDevices = await BasketDevice.findAll({
                    where: {basketId: id},
                    attributes: ["deviceId"]
                })
            }
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            let devices
            const basketDevicesID = JSON.parse(JSON.stringify(basketDevices)).map(dev => dev.deviceId)
            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({
                    where: {
                        id: {[Op.notIn]: basketDevicesID}
                    },
                    attributes: {exclude: ['createdAt', 'updatedAt']},
                    limit, offset
                })
            }
            if (brandId && !typeId) {
                devices = await Device.findAndCountAll({
                    where: {
                        brandId,
                        id: {[Op.notIn]: basketDevicesID}
                    },
                    attributes: {exclude: ['createdAt', 'updatedAt']},
                    limit, offset
                })
            }
            if (!brandId && typeId) {
                devices = await Device.findAndCountAll({
                    where: {
                        typeId,
                        id: {[Op.notIn]: basketDevicesID}
                    },
                    attributes: {exclude: ['createdAt', 'updatedAt']},
                    limit, offset
                })
            }
            if (brandId && typeId) {
                devices = await Device.findAndCountAll({
                    where: {
                        brandId,
                        typeId,
                        id: {[Op.notIn]: basketDevicesID}
                    },
                    attributes: {exclude: ['createdAt', 'updatedAt']},
                    limit, offset
                })
            }
            return res.json(devices)
        } catch {
            return next(ApiError.badRequest('Ошибка при получении предметов'))
        }
    }

    async getOne(req, res, next) {
        try {
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
        } catch {
            return next(ApiError.badRequest('Ошибка при получении предмета'))
        }
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

    async setRating(req, res, next) {
        try {
            const {deviceId, rate} = req.body
            const {id} = req.user
            let rating
            if (req.method === "PUT") {
                rating = await Rating.update({rate}, {where: {deviceId, userId: id}})
            } else {
                rating = await Rating.create({rate, userId: id, deviceId})
            }
            await DeviceController.updateDeviceRating(deviceId)
            return res.json(rating)
        } catch {
            return next(ApiError.badRequest('Ошибка при выставлении рейтинга'))
        }
    }

    async ratedDevices(req, res, next) {
        try {
            const {id} = req.user
            const devices = await Rating.findAll({where: {userId: id}, attributes: ["deviceId"]})
            return res.json(devices)
        } catch {
            return next(ApiError.badRequest('Ошибка при получении оцененных предметов'))
        }
    }

    async addDeviceToBasket(req, res, next) {
        try {
            const {deviceId} = req.body
            const {id} = req.user
            const basketDevice = await BasketDevice.create({deviceId, basketId: id})
            return res.json(basketDevice)
        } catch {
            return next(ApiError.badRequest('Ошибка при добавлении в корзину'))
        }
    }

    async removeDevice(req, res, next) {
        try {
            const {id} = req.params
            const removedDevice = await Device.destroy({where: {id}})
            if (removedDevice === 0) {
                return next(ApiError.badRequest('Предмет с таким ID не найден'))
            }
            return res.json(removedDevice)
        } catch {
            return next(ApiError.badRequest('Ошибка при удалении предмета'))
        }
    }

    async removeDeviceFromBasket(req, res, next) {
        try {
            const {id} = req.params
            const userId = req.user.id
            const removedDevice = await BasketDevice.destroy({where: {basketId: userId, deviceId: id}})
            if (removedDevice === 0) {
                return next(ApiError.badRequest('Предмет с таким ID не найден'))
            }
            return res.json(removedDevice)
        } catch {
            return next(ApiError.badRequest('Ошибка при удалении предмета из корзины'))
        }
    }
}

module.exports = new DeviceController()