const express = require('express')
const router = express.Router();

const UsersController = require('../controllers/UsersController')

router.post('/create', UsersController.createUser)
router.get('/get', UsersController.getAllUsers)
router.put('/update', UsersController.updateUser)
router.delete('/delete', UsersController.deleteUser)

module.exports = router