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

router.get('/', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), categoriesController.getAllCategories);
router.get('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), categoriesController.getCategoryById);
router.post('/', auth.authorize([Roles.ADMIN, Roles.SELLER]), upload.single('image'), categoryValidationRules, validate, categoriesController.createCategory);
router.put('/:id', auth.authorize([Roles.ADMIN, Roles.SELLER]), upload.single('image'), categoryUpdateValidationRules, validate, categoriesController.updateCategory);
router.delete('/:id', auth.authorize([Roles.ADMIN, Roles.SELLER]), categoriesController.deleteCategory);

module.exports = router;
