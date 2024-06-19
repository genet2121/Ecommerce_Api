// adminsRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const adminsController = require('../controllers/adminsController');
const { userValidationRules, validate } = require('../validators/adminsValidator');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'adminUploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

router.get('/', adminsController.getAllAdmins);
router.get('/:id', adminsController.getAdminById);
router.post('/', upload.single('photo'), userValidationRules, validate, adminsController.createAdmin);
router.put('/:id', adminsController.updateAdmin);
router.delete('/:id', adminsController.deleteAdmin);

module.exports = router;
