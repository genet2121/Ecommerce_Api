// receiptsRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const router = express.Router();
const receiptsController = require('../controllers/receiptsController');
const { receiptValidationRules, receiptUpdateValidationRules, validate } = require('../validators/receiptsValidator');

const TABLE_NAME = 'receipts';
router.get('/', auth.authorize('can_view', TABLE_NAME), receiptsController.getAllReceipts);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), receiptsController.getReceiptById);
router.post('/', auth.authorize('can_add', TABLE_NAME), receiptValidationRules, validate, receiptsController.createReceipt);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), receiptUpdateValidationRules, validate, receiptsController.updateReceipt);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), receiptsController.deleteReceipt);

module.exports = router;


