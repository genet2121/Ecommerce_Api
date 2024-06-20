const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { productValidationRules, productUpdateValidationRules, validate } = require('../validators/productsValidator');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', productValidationRules, validate, productsController.createProduct);
router.put('/:id', productUpdateValidationRules, validate, productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
