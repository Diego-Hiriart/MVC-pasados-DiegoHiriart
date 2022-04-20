const express = require('express')
const router = express.Router();

const UsersController = require('../controllers/UsersController')

router.post('/create', UsersController.createUser)
router.get('/get', UsersController.getAllUsers)

module.exports = router