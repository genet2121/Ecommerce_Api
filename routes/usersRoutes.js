// usersRoutes.js
const auth = require('../infrastructure/service/authentatication/auth');
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
router.post('/:id/image', upload.single('image'), userValidationRules, validate, usersController.createUser);
router.put('/:id', userUpdateValidationRules, validate, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);
router.post('/verify', usersController.verifyUser);
//router.post('/resend-token', usersController.resendVerificationToken);
router.post('/resend-token/:userId', usersController.resendVerificationToken);


module.exports = router;