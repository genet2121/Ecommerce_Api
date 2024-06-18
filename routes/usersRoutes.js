// usersRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const usersController = require('../controllers/usersController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'imageUploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.put('/:id', upload.single('image'), usersController.uploadImage);
router.delete('/:id', usersController.deleteUser);
router.get('/verify/:id/:token', usersController.verifyUser);

module.exports = router;