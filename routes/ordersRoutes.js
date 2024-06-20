// ordersRoutes.js
const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const { orderValidationRules, orderUpdateValidationRules, validate } = require('../validators/ordersValidator');

router.get('/', ordersController.getAllOrders);
router.get('/:id', ordersController.getOrderById);
router.post('/', orderValidationRules, validate, ordersController.createOrder);
router.put('/:id', orderUpdateValidationRules, validate, ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
