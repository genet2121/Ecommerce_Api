// documentsRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
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
const TABLE_NAME = 'documents';
const upload = multer({ storage: storage });

router.get('/',auth.authorize('can_view', TABLE_NAME), documentsController.getAllDocuments);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), documentsController.getDocumentById);
router.post('/', auth.authorize('can_add', TABLE_NAME), upload.single('doc'), documentValidationRules, validate, documentsController.createDocument);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), upload.single('doc'), documentUpdateValidationRules, validate, documentsController.updateDocument);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), documentsController.deleteDocument);

module.exports = router;


