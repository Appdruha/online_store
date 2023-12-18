const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRoleAndAuth = require('../middlewares/checkRoleAndAuthMiddleware')
const checkIsAcceptableAction = require('../middlewares/checkIsAcceptableActionMiddleware')
const decodeToken = require('../middlewares/decodeTokenMiddleware')

router.post('/', checkRoleAndAuth('ADMIN'), deviceController.create)
router.post('/toBasket',
    checkRoleAndAuth(), checkIsAcceptableAction({type: "BASKET"}), deviceController.addDeviceToBasket)
router.post('/rating',
    checkRoleAndAuth(), checkIsAcceptableAction({type: "RATING"}), deviceController.setRating)
router.put('/rating',
    checkRoleAndAuth(), checkIsAcceptableAction({type: "RATING"}), deviceController.setRating)
router.get('/rating', checkRoleAndAuth(), deviceController.ratedDevices)
router.get('/', decodeToken(), deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.delete('/:id', checkRoleAndAuth('ADMIN'), deviceController.removeDevice)
router.delete('/:id/fromBasket', checkRoleAndAuth(), deviceController.removeDeviceFromBasket)

module.exports = router