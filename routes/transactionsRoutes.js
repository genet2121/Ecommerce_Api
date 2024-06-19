// transactionsRoutes.js
const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');
const { userValidationRules, validate } = require('../validators/transactionsValidator');

router.get('/', transactionsController.getAllTransactions);
router.get('/:id', transactionsController.getTransactionById);
router.post('/', userValidationRules, validate, transactionsController.createTransaction);
router.put('/:id', transactionsController.updateTransaction);
router.delete('/:id', transactionsController.deleteTransaction);

module.exports = router;
