// paymentMethodsRoutes.js
const express = require('express');
const router = express.Router();
const paymentMethodsController = require('../controllers/paymentMethodsController');

router.get('/', paymentMethodsController.getAllPaymentMethods);
router.get('/:id', paymentMethodsController.getPaymentMethodById);
router.post('/', paymentMethodsController.createPaymentMethod);
router.put('/:id', paymentMethodsController.updatePaymentMethod);
router.delete('/:id', paymentMethodsController.deletePaymentMethod);

module.exports = router;
