// receiptsRoutes.js
const express = require('express');
const router = express.Router();
const receiptsController = require('../controllers/receiptsController');
const { receiptValidationRules, validate } = require('../validators/receiptsValidator');

router.get('/', receiptsController.getAllReceipts);
router.get('/:id', receiptsController.getReceiptById);
router.post('/', receiptValidationRules, validate, receiptsController.createReceipt);
router.put('/:id', receiptsController.updateReceipt);
router.delete('/:id', receiptsController.deleteReceipt);

module.exports = router;
