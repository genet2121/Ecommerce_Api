// ordersRoutes.js
const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum"); 

router.get('/', auth.authenticate([Roles.BUYER, Roles.SELLER]), ordersController.getAllOrders);
router.get('/:id', auth.authenticate([Roles.BUYER, Roles.SELLER]), ordersController.getOrderById);
router.post('/',  auth.authenticate([Roles.SELLER]),ordersController.createOrder);
router.put('/:id', auth.authenticate([Roles.SELLER]), ordersController.updateOrder);
router.delete('/:id', auth.authenticate([Roles.SELLER]), ordersController.deleteOrder);

module.exports = router;
