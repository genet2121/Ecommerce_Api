// categoriesRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
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
const TABLE_NAME = 'categories';

router.get('/', auth.authorize('can_view', TABLE_NAME), categoriesController.getAllCategories);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), categoriesController.getCategoryById);
router.post('/', auth.authorize('can_add', TABLE_NAME), upload.single('image'), categoryValidationRules, validate, categoriesController.createCategory);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), upload.single('image'), categoryUpdateValidationRules, validate, categoriesController.updateCategory);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), categoriesController.deleteCategory);

module.exports = router;


