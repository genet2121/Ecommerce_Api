// bankDetailsRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const router = express.Router();
const bankDetailsController = require('../controllers/bankDetailsController');
const { bankDetailValidationRules, bankDetailUpdateValidationRules, validate } = require('../validators/bankDetailsValidator');
const TABLE_NAME = 'bank_details';
router.get('/', auth.authorize('can_view', TABLE_NAME), bankDetailsController.getAllBankDetails);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), bankDetailsController.getBankDetailById);
router.post('/',auth.authorize('can_add', TABLE_NAME), bankDetailValidationRules, validate, bankDetailsController.createBankDetail);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), bankDetailUpdateValidationRules, validate, bankDetailsController.updateBankDetail);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), bankDetailsController.deleteBankDetail);

module.exports = router;
