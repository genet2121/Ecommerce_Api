// categoriesRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../infrastructure/service/authentatication/auth');
const categoriesController = require('../controllers/categoriesController');
const { categoryValidationRules, categoryUpdateValidationRules, validate } = require('../validators/categoriesValidator');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync('categoryImages/', { recursive: true });
    cb(null, 'categoryImages/');
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

const TABLE_NAME = 'categories';
router.get('/', auth.authorize('can_view', TABLE_NAME), categoriesController.getAllCategories);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), categoriesController.getCategoryById);
router.post('/', auth.authorize('can_add', TABLE_NAME), categoryValidationRules, validate, categoriesController.createCategory);
router.post('/:id/image', auth.authorize('can_add', TABLE_NAME), upload.single('image'), categoriesController.uploadCategoryImage);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), categoryUpdateValidationRules, validate, categoriesController.updateCategory);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), categoriesController.deleteCategory);

module.exports = router;


