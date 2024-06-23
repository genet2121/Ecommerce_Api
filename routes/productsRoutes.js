
const auth = require('../infrastructure/service/authentatication/auth');
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { productValidationRules, productUpdateValidationRules, validate } = require('../validators/productsValidator');

const TABLE_NAME = 'products';
router.get('/', auth.authorize('can_view', TABLE_NAME), productsController.getAllProducts);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), productsController.getProductById);
router.post('/', auth.authorize('can_add', TABLE_NAME), productValidationRules, validate, productsController.createProduct);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), productUpdateValidationRules, validate, productsController.updateProduct);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), productsController.deleteProduct);


module.exports = router;
