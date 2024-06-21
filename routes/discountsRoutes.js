// discountsRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const router = express.Router();
const discountsController = require('../controllers/discountsController');
const { discountValidationRules, discountUpdateValidationRules, validate } = require('../validators/discountsValidator');

router.get('/', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), discountsController.getAllDiscounts);
router.get('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), discountsController.getDiscountById);
router.post('/', auth.authorize([Roles.ADMIN, Roles.SELLER]), discountValidationRules, validate, discountsController.createDiscount);
router.put('/:id', auth.authorize([Roles.ADMIN, Roles.SELLER]), discountUpdateValidationRules, validate, discountsController.updateDiscount);
router.delete('/:id', auth.authorize([Roles.ADMIN, Roles.SELLER]), discountsController.deleteDiscount);

module.exports = router;
