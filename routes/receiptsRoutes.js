// receiptsRoutes.js
const express = require('express');
const router = express.Router();
const receiptsController = require('../controllers/receiptsController');
const { userValidationRules, validate } = require('../validators/recieptsValidator');

router.get('/', receiptsController.getAllReceipts);
router.get('/:id', receiptsController.getReceiptById);
router.post('/', userValidationRules, validate, receiptsController.createReceipt);
router.put('/:id', receiptsController.updateReceipt);
router.delete('/:id', receiptsController.deleteReceipt);

module.exports = router;
