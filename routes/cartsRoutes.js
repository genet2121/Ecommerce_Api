// cartsRoutes.js
const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

router.get('/', cartsController.getAllCarts);
router.get('/:id', cartsController.getCartById);
router.post('/', cartsController.createCart);
router.put('/:id', cartsController.updateCart);
router.delete('/:id', cartsController.deleteCart);

module.exports = router;