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

router.get('/', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), complaintsController.getAllComplaints);
router.get('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), complaintsController.getComplaintById);
router.post('/', auth.authorize([Roles.ADMIN, Roles.SELLER]), upload.single('complaint_images'), complaintValidationRules, validate, complaintsController.createComplaint);
router.put('/:id', auth.authorize([Roles.ADMIN, Roles.SELLER]), complaintUpdateValidationRules, validate, complaintsController.updateComplaint);
router.delete('/:id', auth.authorize([Roles.ADMIN, Roles.SELLER]), complaintsController.deleteComplaint);

module.exports = router;
