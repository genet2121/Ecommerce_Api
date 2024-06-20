// categoriesRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const categoriesController = require('../controllers/categoriesController');
const { categoryValidationRules, categoryUpdateValidationRules, validate } = require('../validators/categoriesValidator');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'categoryImages/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getCategoryById);
router.post('/', upload.single('image'), categoryValidationRules, validate, categoriesController.createCategory);
router.put('/:id', upload.single('image'), categoryUpdateValidationRules, validate, categoriesController.updateCategory);
router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;
