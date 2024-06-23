// inventoryRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const router = express.Router();
const inventoryController = require('../controllers/inventoriesController');
const { inventoryValidationRules, inventoryUpdateValidationRules, validate } = require('../validators/inventoriesValidator');

const TABLE_NAME = 'inventories';
router.get('/', auth.authorize('can_view', TABLE_NAME), inventoryController.getAllInventories);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), inventoryController.getInventoryById);
router.post('/', auth.authorize('can_add', TABLE_NAME), inventoryValidationRules, validate, inventoryController.createInventory);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), inventoryUpdateValidationRules, validate, inventoryController.updateInventory);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), inventoryController.deleteInventory);

module.exports = router;


