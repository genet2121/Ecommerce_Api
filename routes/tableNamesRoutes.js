// tableNamesRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const router = express.Router();
const tableNamesController = require('../controllers/tableNamesController');
const { tableNameValidationRules, tableNameUpdateValidationRules, validate } = require('../validators/tableNamesValidator');

router.get('/', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), tableNamesController.getAllTableNames);
router.get('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), tableNamesController.getTableNameById);
router.post('/', auth.authorize([Roles.ADMIN, Roles.SELLER]), tableNameValidationRules, validate, tableNamesController.createTableName);
router.put('/:id', auth.authorize([Roles.ADMIN, Roles.SELLER]), tableNameUpdateValidationRules, validate, tableNamesController.updateTableName);
router.delete('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), tableNamesController.deleteTableName);

module.exports = router;