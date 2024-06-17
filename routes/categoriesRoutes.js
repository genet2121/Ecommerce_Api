// categoriesRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const categoriesController = require('../controllers/categoriesController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'adminUploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getCategoryById);
router.post('/', upload.single('image'), categoriesController.createCategory);
router.put('/:id', categoriesController.updateCategory);
router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;
