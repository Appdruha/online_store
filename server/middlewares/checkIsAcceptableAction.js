const {Rating} = require('../models/models')
const ApiError = require('../errors/ApiError')

module.exports = function () {
    return async function (req, res, next) {
        try {
            const {id} = req.params
            const {userId} = req.body
            const rating = await Rating.findOne({where: {userId, deviceId: id}})
            const isRated = rating === null
            if (req.method === "POST") {
                   isRated ? next() : next(ApiError.forbidden("Недопустимое действие"))
            } else if (req.method === "PUT") {
                    isRated ? next(ApiError.forbidden("Недопустимое действие")) : next()
            }
        } catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    }
}