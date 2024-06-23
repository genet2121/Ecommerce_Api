// productImagesRoutes.js
const auth = require('../infrastructure/service/authentatication/auth');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const productImagesController = require('../controllers/productImagesController');
const { productImageValidationRules, productImageUpdateValidationRules, validate } = require('../validators/productImagesValidator');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(dir, { recursive: true });
    cb(null, 'productImages/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

const fileFilter = (req, file, cb) => {
  if (!allowedExtensions.test(file.originalname)) {
      return cb(new Error('not an image file type'), false);
  }
  if (!file.mimetype.startsWith("image/")) {
      return cb(new Error('not an image file type'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: fileFilter
});

const TABLE_NAME = 'product_images';
router.get('/', auth.authorize('can_view', TABLE_NAME), productImagesController.getAllProductImages);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), productImagesController.getProductImageById);
router.post('/', auth.authorize('can_add', TABLE_NAME), productImageValidationRules, validate, productImagesController.createProductImage);
router.post('/:id/image', auth.authorize('can_add', TABLE_NAME), upload.single('image'), productImagesController.uploadProductImage);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), productImageUpdateValidationRules, validate, productImagesController.updateProductImage);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), productImagesController.deleteProductImage);

module.exports = router;

