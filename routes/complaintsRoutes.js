// complaintsRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const path = require('path');
const complaintsController = require('../controllers/complaintsController');
const { complaintValidationRules, complaintUpdateValidationRules, validate } = require('../validators/complaintsValidator');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'complaintUploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
  const TABLE_NAME = 'complaints';

router.get('/', auth.authorize('can_view', TABLE_NAME), complaintsController.getAllComplaints);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), complaintsController.getComplaintById);
router.post('/', auth.authorize('can_add', TABLE_NAME), upload.single('complaint_images'), complaintValidationRules, validate, complaintsController.createComplaint);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), complaintUpdateValidationRules, validate, complaintsController.updateComplaint);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), complaintsController.deleteComplaint);

module.exports = router;


