// ordersRoutes.js
const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const auth = require('../infrastructure/service/authentatication/auth');
const { orderValidationRules, orderUpdateValidationRules, validate } = require('../validators/ordersValidator');

const TABLE_NAME = 'orders';
router.get('/', auth.authorize('can_view', TABLE_NAME), ordersController.getAllOrders);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), ordersController.getOrderById);
router.post('/', auth.authorize('can_add', TABLE_NAME), orderValidationRules, validate, ordersController.createOrder);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), orderUpdateValidationRules, validate, ordersController.updateOrder);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), ordersController.deleteOrder);

module.exports = router;



