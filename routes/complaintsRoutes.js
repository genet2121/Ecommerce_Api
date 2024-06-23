// complaintsRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../infrastructure/service/authentatication/auth');
const path = require('path');
const fs = require('fs');
const complaintsController = require('../controllers/complaintsController');
const { complaintValidationRules, complaintUpdateValidationRules, validate } = require('../validators/complaintsValidator');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(dir, { recursive: true });
    cb(null, 'complaintUploads/');
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
  if (!file.mimetype.startsWith("complaint_doc/")) {
      return cb(new Error('document type not supported'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: fileFilter
});
const TABLE_NAME = 'complaints';
router.get('/', auth.authorize('can_view', TABLE_NAME), complaintsController.getAllComplaints);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), complaintsController.getComplaintById);
router.post('/', auth.authorize('can_add', TABLE_NAME), complaintValidationRules, validate, complaintsController.createComplaint);
router.post('/:id/document', auth.authorize('can_add', TABLE_NAME), upload.single('complaint_doc'), complaintsController.uploadComplaintDocument);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), complaintUpdateValidationRules, validate, complaintsController.updateComplaint);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), complaintsController.deleteComplaint);

module.exports = router;


