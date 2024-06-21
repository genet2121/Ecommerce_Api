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
  
const upload = multer({ storage: storage });

router.get('/', productImagesController.getAllProductImages);
router.get('/:id', productImagesController.getProductImageById);
router.post('/', upload.single('image'), productImageValidationRules, validate, productImagesController.createProductImage);
router.put('/:id', upload.single('image'), productImageUpdateValidationRules, validate, productImagesController.updateProductImage);
router.delete('/:id', productImagesController.deleteProductImage);

module.exports = router;
