// tableNamesRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const router = express.Router();
const tableNamesController = require('../controllers/tableNamesController');
const { tableNamesValidationRules, tableNamesUpdateValidationRules, validate } = require('../validators/tableNamesValidator');

const TABLE_NAME = 'table_names';
router.get('/', auth.authorize('can_view', TABLE_NAME), tableNamesController.getAllTableNames);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), tableNamesController.getTableNameById);
router.post('/', auth.authorize('can_add', TABLE_NAME), tableNamesValidationRules, validate, tableNamesController.createTableName);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), tableNamesUpdateValidationRules, validate, tableNamesController.updateTableName);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), tableNamesController.deleteTableName);

module.exports = router;



