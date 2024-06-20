// cartsRoutes.js
const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');
const { cartValidationRules, cartUpdateValidationRules, validate } = require('../validators/cartsValidator');

router.get('/', cartsController.getAllCarts);
router.get('/:id', cartsController.getCartById);
router.post('/', cartValidationRules, validate, cartsController.createCart);
router.put('/:id', cartUpdateValidationRules, validate, cartsController.updateCart);
router.delete('/:id', cartsController.deleteCart);

module.exports = router;