const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middlewares/checkRoleAndAuthMiddleware')

router.post('/', checkRole('ADMIN'), deviceController.create)
router.post('/:id/rating', deviceController.setRating)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

module.exports = router