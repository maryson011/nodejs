const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/taskController')

router.get('/add', TaskController.createTask)
router.post('/add', TaskController.createTaskSave)
router.post('/remove', TaskController.removeTask)
router.post('/edit', TaskController.updateTaskPost)
router.get('/edit/:id', TaskController.updateTask)
router.post('/updatestatus', TaskController.toggleTaskStatus)
router.get('/', TaskController.showTasks)

module.exports = router