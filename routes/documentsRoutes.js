// documentsRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const documentsController = require('../controllers/documentsController');
const { documentValidationRules, documentUpdateValidationRules, validate } = require('../validators/documentsValidator');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'userDocuments/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/', documentsController.getAllDocuments);
router.get('/:id', documentsController.getDocumentById);
router.post('/', upload.single('doc'), documentValidationRules, validate, documentsController.createDocument);
router.put('/:id', upload.single('doc'), documentUpdateValidationRules, validate, documentsController.updateDocument);
router.delete('/:id', documentsController.deleteDocument);

module.exports = router;
