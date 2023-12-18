const jwt = require('jsonwebtoken')

module.exports = function () {
    return async function (req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1]
            let decoded
            if (token) {
                decoded = jwt.verify(token, process.env.SECRET_KEY)
                req.user = decoded
                next()
            } else {
                next()
            }
        } catch {
            next()
        }
    }
}