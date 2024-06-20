// adminsRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const adminsController = require('../controllers/adminsController');
const { adminValidationRules, adminUpdateValidationRules, validate } = require('../validators/adminsValidator');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'adminPhotos/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  
const upload = multer({ storage: storage });

router.get('/', adminsController.getAllAdmins);
router.get('/:id', adminsController.getAdminById);
router.post('/', upload.single('photo'), adminValidationRules, validate, adminsController.createAdmin);
router.put('/:id', upload.single('photo'), adminUpdateValidationRules, validate, adminsController.updateAdmin);
router.delete('/:id', adminsController.deleteAdmin);

module.exports = router;
