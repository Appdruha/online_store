const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middlewares/checkRoleAndAuthMiddleware')
const checkIsAcceptableAction = require('../middlewares/checkIsAcceptableActionMiddleware')
const authMiddleware = require('../middlewares/checkRoleAndAuthMiddleware')

router.post('/', checkRole('ADMIN'), deviceController.create)
router.post('/:id/toBasket',
    authMiddleware(), checkIsAcceptableAction({type: "BASKET"}), deviceController.addDeviceToBasket)
router.post('/:id/rating',
    authMiddleware(), checkIsAcceptableAction({type: "RATING"}), deviceController.setRating)
router.put('/:id/rating',
    authMiddleware(), checkIsAcceptableAction({type: "RATING"}), deviceController.setRating)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.delete('/:id', checkRole('ADMIN'), deviceController.removeDevice)
router.delete('/:id/fromBasket', authMiddleware(), deviceController.removeDeviceFromBasket)

module.exports = router