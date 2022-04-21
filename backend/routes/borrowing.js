const express = require('express')
const router = express.Router();

const BorrowingsController = require('../controllers/BorrowingsController')

router.post('/create', BorrowingsController.createBorrowing)
router.get('/get', BorrowingsController.getAllBorrowings)

module.exports = router