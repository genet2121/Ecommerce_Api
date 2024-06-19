// documentsRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const documentsController = require('../controllers/documentsController');
const { userValidationRules, validate } = require('../validators/documentsValidator');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'documentUploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/', documentsController.getAllDocuments);
router.get('/:id', documentsController.getDocumentById);
router.post('/', upload.single('image'), userValidationRules, validate, documentsController.createDocument);
router.put('/:id', documentsController.updateDocument);
router.delete('/:id', documentsController.deleteDocument);

module.exports = router;
