const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middlewares/checkRoleAndAuthMiddleware')

router.get('/', authMiddleware(), basketController.getBasket)
router.get('/isInBasket', authMiddleware(), basketController.getIsDeviceInBasket)

module.exports = router


