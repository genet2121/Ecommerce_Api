// productImagesRoutes.js
const express = require('express');
const router = express.Router();
const productImagesController = require('../controllers/productImagesController');

router.get('/', productImagesController.getAllProductImages);
router.get('/:id', productImagesController.getProductImageById);
router.post('/', productImagesController.createProductImage);
router.put('/:id', productImagesController.updateProductImage);
router.delete('/:id', productImagesController.deleteProductImage);

module.exports = router;
