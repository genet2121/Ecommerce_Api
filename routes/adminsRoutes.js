// adminsRoutes.js
const express = require('express');
const router = express.Router();
const adminsController = require('../controllers/adminsController');

router.get('/', adminsController.getAllAdmins);
router.get('/:id', adminsController.getAdminById);
router.post('/', adminsController.createAdmin);
router.put('/:id', adminsController.updateAdmin);
router.delete('/:id', adminsController.deleteAdmin);

module.exports = router;
