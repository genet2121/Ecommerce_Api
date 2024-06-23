// paymentMethodsRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const router = express.Router();
const paymentMethodsController = require('../controllers/paymentMethodsController');
const { paymentMethodValidationRules, paymentMethodUpdateValidationRules, validate } = require('../validators/paymentMethodsValidator');

const TABLE_NAME = 'payment_methods';
router.get('/', auth.authorize('can_view', TABLE_NAME), paymentMethodsController.getAllPaymentMethods);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), paymentMethodsController.getPaymentMethodById);
router.post('/', auth.authorize('can_add', TABLE_NAME), paymentMethodValidationRules, validate, paymentMethodsController.createPaymentMethod);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), paymentMethodUpdateValidationRules, validate, paymentMethodsController.updatePaymentMethod);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), paymentMethodsController.deletePaymentMethod);

module.exports = router;


