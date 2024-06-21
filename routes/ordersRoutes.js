// ordersRoutes.js
const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');



const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum"); 
//const { orderValidationRules, validate } = require('../validators/ordersValidator');
const { orderValidationRules, orderUpdateValidationRules, validate } = require('../validators/ordersValidator');

router.get('/', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), ordersController.getAllOrders);
router.get('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), ordersController.getOrderById);
router.post('/', auth.authorize([Roles.ADMIN, Roles.SELLER]), orderValidationRules, validate, ordersController.createOrder);
router.put('/:id', auth.authorize([Roles.ADMIN, Roles.SELLER]), orderUpdateValidationRules, validate, ordersController.updateOrder);
router.delete('/:id', auth.authorize([Roles.ADMIN, Roles.SELLER]), ordersController.deleteOrder);

module.exports = router;
