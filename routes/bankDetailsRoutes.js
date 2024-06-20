// bankDetailsRoutes.js
const express = require('express');
const router = express.Router();
const bankDetailsController = require('../controllers/bankDetailsController');
const { bankDetailValidationRules, bankDetailUpdateValidationRules, validate } = require('../validators/bankDetailsValidator');

router.get('/', bankDetailsController.getAllBankDetails);
router.get('/:id', bankDetailsController.getBankDetailById);
router.post('/', bankDetailValidationRules, validate, bankDetailsController.createBankDetail);
router.put('/:id', bankDetailUpdateValidationRules, validate, bankDetailsController.updateBankDetail);
router.delete('/:id', bankDetailsController.deleteBankDetail);

module.exports = router;
