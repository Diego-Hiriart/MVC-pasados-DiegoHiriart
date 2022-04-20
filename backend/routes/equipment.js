const express = require('express')
const router = express.Router();

const EquipmentController = require('../controllers/EquipmentController')

router.post('/equipment', EquipmentController.createEquipment)
router.get('/equipment', EquipmentController.getAllEquipment)

module.exports = router