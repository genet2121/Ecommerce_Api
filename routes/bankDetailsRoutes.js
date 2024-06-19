// bankDetailsRoutes.js
const express = require('express');
const router = express.Router();
const bankDetailsController = require('../controllers/bankDetailsController');
const { userValidationRules, validate } = require('../validators/bankDetailsValidator');

router.get('/', bankDetailsController.getAllBankDetails);
router.get('/:id', bankDetailsController.getBankDetailById);
router.post('/', userValidationRules, validate, bankDetailsController.createBankDetail);
router.put('/:id', bankDetailsController.updateBankDetail);
router.delete('/:id', bankDetailsController.deleteBankDetail);

module.exports = router;
