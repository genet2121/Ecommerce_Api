// transactionsRoutes.js
const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');
const { transactionValidationRules, validate } = require('../validators/transactionsValidator');

router.get('/', transactionsController.getAllTransactions);
router.get('/:id', transactionsController.getTransactionById);
router.post('/', transactionValidationRules, validate, transactionsController.createTransaction);
router.put('/:id', transactionsController.updateTransaction);
router.delete('/:id', transactionsController.deleteTransaction);

module.exports = router;
