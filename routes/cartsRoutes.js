// cartsRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const router = express.Router();
const cartsController = require('../controllers/cartsController');
const { cartValidationRules, cartUpdateValidationRules, validate } = require('../validators/cartsValidator');

const TABLE_NAME = 'carts';
router.get('/', auth.authorize('can_view', TABLE_NAME), cartsController.getAllCarts);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), cartsController.getCartById);
router.post('/', auth.authorize('can_add', TABLE_NAME), cartValidationRules, validate, cartsController.createCart);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), cartUpdateValidationRules, validate, cartsController.updateCart);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), cartsController.deleteCart);

module.exports = router;


