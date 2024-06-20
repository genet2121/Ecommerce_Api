// inventoryRoutes.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoriesController');
const { inventoryValidationRules, inventoryUpdateValidationRules, validate } = require('../validators/inventoriesValidator');

router.get('/', inventoryController.getAllInventories);
router.get('/:id', inventoryController.getInventoryById);
router.post('/', inventoryValidationRules, validate, inventoryController.createInventory);
router.put('/:id', inventoryUpdateValidationRules, validate, inventoryController.updateInventory);
router.delete('/:id', inventoryController.deleteInventory);

module.exports = router;
