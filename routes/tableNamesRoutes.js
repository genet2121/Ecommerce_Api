// tableNamesRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const router = express.Router();
const tableNamesController = require('../controllers/tableNamesController');
const { tableNamesValidationRules, tableNamesUpdateValidationRules, validate } = require('../validators/tableNamesValidator');

router.get('/', tableNamesController.getAllTableNames);
router.get('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), tableNamesController.getTableNameById);
router.post('/', tableNamesValidationRules, validate, tableNamesController.createTableName);
router.put('/:id', auth.authorize([Roles.ADMIN, Roles.SELLER]), tableNamesUpdateValidationRules, validate, tableNamesController.updateTableName);
router.delete('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), tableNamesController.deleteTableName);

module.exports = router;