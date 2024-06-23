// adminsRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const adminsController = require('../controllers/adminsController');
const { adminValidationRules, adminUpdateValidationRules, validate } = require('../validators/adminsValidator');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(dir, { recursive: true });
    cb(null, 'adminPhotos/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

const fileFilter = (req, file, cb) => {
  if (!allowedExtensions.test(file.originalname)) {
      return cb(new Error('not an image file type'), false);
  }
  if (!file.mimetype.startsWith("image/")) {
      return cb(new Error('not an image file type'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: fileFilter
});

router.get('/', adminsController.getAllAdmins);
router.get('/:id', adminsController.getAdminById);
router.post('/', adminValidationRules, validate, adminsController.createAdmin);
router.post('/:id/photo', upload.single('photo'), adminsController.uploadAdminPhoto);
router.put('/:id', adminUpdateValidationRules, validate, adminsController.updateAdmin);
router.delete('/:id', adminsController.deleteAdmin);

module.exports = router;
