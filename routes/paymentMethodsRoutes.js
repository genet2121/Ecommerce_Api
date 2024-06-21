// paymentMethodsRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const router = express.Router();
const paymentMethodsController = require('../controllers/paymentMethodsController');
const { paymentMethodValidationRules, paymentMethodUpdateValidationRules, validate } = require('../validators/paymentMethodsValidator');

router.get('/', paymentMethodsController.getAllPaymentMethods);
router.get('/:id', paymentMethodsController.getPaymentMethodById);
router.post('/', paymentMethodValidationRules, validate, paymentMethodsController.createPaymentMethod);
router.put('/:id', paymentMethodUpdateValidationRules, validate, paymentMethodsController.updatePaymentMethod);
router.delete('/:id', paymentMethodsController.deletePaymentMethod);

module.exports = router;
