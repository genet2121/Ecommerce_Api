// paymentMethodsRoutes.js
const express = require('express');
const router = express.Router();
const paymentMethodsController = require('../controllers/paymentMethodsController');
const { paymentMethodValidationRules, validate } = require('../validators/paymentMethodsValidator');

router.get('/', paymentMethodsController.getAllPaymentMethods);
router.get('/:id', paymentMethodsController.getPaymentMethodById);
router.post('/', paymentMethodValidationRules, validate, paymentMethodsController.createPaymentMethod);
router.put('/:id', paymentMethodsController.updatePaymentMethod);
router.delete('/:id', paymentMethodsController.deletePaymentMethod);

module.exports = router;
