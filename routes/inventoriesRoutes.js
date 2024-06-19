// inventoryRoutes.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoriesController');
const { userValidationRules, validate } = require('../validators/inventoriesValidator');

router.get('/', inventoryController.getAllInventories);
router.get('/:id', inventoryController.getInventoryById);
router.post('/', userValidationRules, validate, inventoryController.createInventory);
router.put('/:id', inventoryController.updateInventory);
router.delete('/:id', inventoryController.deleteInventory);

module.exports = router;
