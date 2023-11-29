const {Rating, BasketDevice} = require('../models/models')
const ApiError = require('../errors/ApiError')

module.exports = function (action) {
    return async function (req, res, next) {
        try {
            const {id} = req.params
            const {userId} = req.body
            switch (action.type) {
                case "RATING":
                    const rating = await Rating.findOne({where: {userId, deviceId: id}})
                    const isRated = rating === null
                    if (req.method === "POST") {
                        isRated ? next() : next(ApiError.forbidden("Недопустимое действие"))
                    } else if (req.method === "PUT") {
                        isRated ? next(ApiError.forbidden("Недопустимое действие")) : next()
                    }
                    break

                case "BASKET":
                    const basketDevice = await BasketDevice.findOne({where: {basketId: userId, deviceId: id}})
                    basketDevice === null ? next() : next(ApiError.forbidden("Недопустимое действие"))
                    break
                default:
                    next(ApiError.badRequest("Ошибка на сервере"))
            }
        } catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    }
}