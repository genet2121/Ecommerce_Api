// complaintsRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
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

router.get('/', complaintsController.getAllComplaints);
router.get('/:id', complaintsController.getComplaintById);
router.post('/', upload.single('complaint_images'), complaintValidationRules, validate, complaintsController.createComplaint);
router.put('/:id', complaintUpdateValidationRules, validate, complaintsController.updateComplaint);
router.delete('/:id', complaintsController.deleteComplaint);

module.exports = router;
