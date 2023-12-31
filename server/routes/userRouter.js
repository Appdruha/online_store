const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/checkRoleAndAuthMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/auth', authMiddleware(), userController.check)

module.exports = router