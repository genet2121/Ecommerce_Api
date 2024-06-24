// tableNamesRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const router = express.Router();
const tableNamesController = require('../controllers/tableNamesController');
const { tableNamesValidationRules, tableNamesUpdateValidationRules, validate } = require('../validators/tableNamesValidator');

//const TABLE_NAME = 'table_names';
router.get('/', tableNamesController.getAllTableNames);
router.get('/:id', tableNamesController.getTableNameById);
router.post('/', tableNamesValidationRules, validate, tableNamesController.createTableName);
router.put('/:id', tableNamesUpdateValidationRules, validate, tableNamesController.updateTableName);
router.delete('/:id', tableNamesController.deleteTableName);

module.exports = router;



