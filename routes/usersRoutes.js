// usersRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { userValidationRules, userUpdateValidationRules, validate } = require('../validators/usersValidator');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'userImages/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', userValidationRules, validate, usersController.createUser);
router.put('/:id', userUpdateValidationRules, validate, upload.single('image'), usersController.updateUser);
router.delete('/:id', usersController.deleteUser);
router.get('/verify/:id/:token', usersController.verifyUser);

module.exports = router;