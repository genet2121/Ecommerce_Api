// cartsRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const router = express.Router();
const cartsController = require('../controllers/cartsController');
const { cartValidationRules, cartUpdateValidationRules, validate } = require('../validators/cartsValidator');

router.get('/', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), cartsController.getAllCarts);
router.get('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), cartsController.getCartById);
router.post('/', auth.authorize([Roles.ADMIN, Roles.SELLER]), cartValidationRules, validate, cartsController.createCart);
router.put('/:id', auth.authorize([Roles.ADMIN, Roles.SELLER]), cartUpdateValidationRules, validate, cartsController.updateCart);
router.delete('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), cartsController.deleteCart);

module.exports = router;