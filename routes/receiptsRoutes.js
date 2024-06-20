// receiptsRoutes.js
const express = require('express');
const router = express.Router();
const receiptsController = require('../controllers/receiptsController');
const { receiptValidationRules, receiptUpdateValidationRules, validate } = require('../validators/receiptsValidator');

router.get('/', receiptsController.getAllReceipts);
router.get('/:id', receiptsController.getReceiptById);
router.post('/', receiptValidationRules, validate, receiptsController.createReceipt);
router.put('/:id', receiptUpdateValidationRules, validate, receiptsController.updateReceipt);
router.delete('/:id', receiptsController.deleteReceipt);

module.exports = router;
