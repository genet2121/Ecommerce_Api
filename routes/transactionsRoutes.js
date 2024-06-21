// transactionsRoutes.js
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');
const { transactionValidationRules, transactionUpdateValidationRules, validate } = require('../validators/transactionsValidator');

router.get('/', transactionsController.getAllTransactions);
router.get('/:id', transactionsController.getTransactionById);
router.post('/', transactionValidationRules, validate, transactionsController.createTransaction);
router.put('/:id', transactionUpdateValidationRules, validate, transactionsController.updateTransaction);
router.delete('/:id', transactionsController.deleteTransaction);

module.exports = router;
