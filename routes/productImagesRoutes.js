// productImagesRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productImagesController = require('../controllers/productImagesController');
const { userValidationRules, validate } = require('../validators/productImagesValidator');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'productUploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

router.get('/', productImagesController.getAllProductImages);
router.get('/:id', productImagesController.getProductImageById);
router.post('/', upload.single('image'), userValidationRules, validate, productImagesController.createProductImage);
router.put('/:id', productImagesController.updateProductImage);
router.delete('/:id', productImagesController.deleteProductImage);

module.exports = router;
