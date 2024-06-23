// discountsRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const router = express.Router();
const discountsController = require('../controllers/discountsController');
const { discountValidationRules, discountUpdateValidationRules, validate } = require('../validators/discountsValidator');

const TABLE_NAME = 'discounts';
router.get('/', auth.authorize('can_view', TABLE_NAME), discountsController.getAllDiscounts);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), discountsController.getDiscountById);
router.post('/', auth.authorize('can_add', TABLE_NAME), discountValidationRules, validate, discountsController.createDiscount);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), discountUpdateValidationRules, validate, discountsController.updateDiscount);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), discountsController.deleteDiscount);

module.exports = router;


