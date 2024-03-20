const express = require('express')
const router = express.Router()
const ToughtsController = require('../controllers/ToughtsConttroller')

// helpers
const checkAuth = require('../helpers/auth').checkAuth // sem invocação ()

router.get('/add', checkAuth, ToughtsController.createTougth)
router.post('/add', checkAuth, ToughtsController.createTougthSave)
router.get('/edit/:id', checkAuth, ToughtsController.updateTought)
router.post('/edit', checkAuth, ToughtsController.updateToughtSave)
router.get('/dashboard', checkAuth, ToughtsController.dashboard)
router.post('/remove', checkAuth, ToughtsController.removeTought)
router.get('/', ToughtsController.showToughts)

module.exports = router
