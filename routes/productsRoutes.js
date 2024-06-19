const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { userValidationRules, validate } = require('../validators/productsValidator');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', userValidationRules, validate, productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
