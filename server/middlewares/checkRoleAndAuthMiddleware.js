const jwt = require('jsonwebtoken')

module.exports = function (role = "") {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const {refreshToken} = req.body
            const token = req.headers.authorization.split(" ")[1]
            if (!token) {
                return res.status(401).json({message: "Не авторизован"})
            }

            let decoded
            if (refreshToken) {
                decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY)
            } else {
                decoded = jwt.verify(token, process.env.SECRET_KEY)
            }

            if (role && decoded.role !== role) {
                return res.status(403).json({message: "Нет доступа"})
            }
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    }
}
















