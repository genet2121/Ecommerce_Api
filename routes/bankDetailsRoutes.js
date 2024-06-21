// bankDetailsRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const router = express.Router();
const bankDetailsController = require('../controllers/bankDetailsController');
const { bankDetailValidationRules, bankDetailUpdateValidationRules, validate } = require('../validators/bankDetailsValidator');

router.get('/', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), bankDetailsController.getAllBankDetails);
router.get('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), bankDetailsController.getBankDetailById);
router.post('/',auth.authorize([Roles.ADMIN, Roles.SELLER]), bankDetailValidationRules, validate, bankDetailsController.createBankDetail);
router.put('/:id', auth.authorize([Roles.ADMIN, Roles.SELLER]), bankDetailUpdateValidationRules, validate, bankDetailsController.updateBankDetail);
router.delete('/:id', auth.authorize([Roles.ADMIN, Roles.SELLER]), bankDetailsController.deleteBankDetail);

module.exports = router;
