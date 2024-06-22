// productImagesRoutes.js
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productImagesController = require('../controllers/productImagesController');
const { productImageValidationRules, productImageUpdateValidationRules, validate } = require('../validators/productImagesValidator');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'productImages/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const TABLE_NAME = 'product_images';
const upload = multer({ storage: storage });

router.get('/', auth.authorize('can_view', TABLE_NAME), productImagesController.getAllProductImages);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), productImagesController.getProductImageById);
router.post('/', auth.authorize('can_add', TABLE_NAME), upload.single('image'), productImageValidationRules, validate, productImagesController.createProductImage);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), upload.single('image'), productImageUpdateValidationRules, validate, productImagesController.updateProductImage);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), productImagesController.deleteProductImage);

module.exports = router;

