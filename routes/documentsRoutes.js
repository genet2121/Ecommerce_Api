// documentsRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../infrastructure/service/authentatication/auth');
const router = express.Router();
const documentsController = require('../controllers/documentsController');
const { documentValidationRules, documentUpdateValidationRules, validate } = require('../validators/documentsValidator');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(dir, { recursive: true });
    cb(null, 'userDocuments/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.pdf)$/i;

const fileFilter = (req, file, cb) => {
  if (!allowedExtensions.test(file.originalname)) {
      return cb(new Error('document type not supported'), false);
  }
  if (!file.mimetype.startsWith("doc/")) {
      return cb(new Error('document type not supported'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: fileFilter
});

const TABLE_NAME = 'documents';
router.get('/',auth.authorize('can_view', TABLE_NAME), documentsController.getAllDocuments);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), documentsController.getDocumentById);
router.post('/', auth.authorize('can_add', TABLE_NAME), documentValidationRules, validate, documentsController.createDocument);
router.post('/:id/document', auth.authorize('can_add', TABLE_NAME), upload.single('doc'), documentsController.uploadDocumentFile);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), documentUpdateValidationRules, validate, documentsController.updateDocument);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), documentsController.deleteDocument);

module.exports = router;


