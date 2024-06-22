// transactionsRoutes.js
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');
const { transactionValidationRules, transactionUpdateValidationRules, validate } = require('../validators/transactionsValidator');
const TABLE_NAME = 'transactions';
router.get('/', auth.authorize('can_view', TABLE_NAME), transactionsController.getAllTransactions);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), transactionsController.getTransactionById);
router.post('/', auth.authorize('can_add', TABLE_NAME), transactionValidationRules, validate, transactionsController.createTransaction);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), transactionUpdateValidationRules, validate, transactionsController.updateTransaction);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), transactionsController.deleteTransaction);

module.exports = router;

