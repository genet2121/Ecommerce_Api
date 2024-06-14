// userAddressesRoutes.js
const express = require('express');
const router = express.Router();
const userAddressesController = require('../controllers/userAddressesController');

router.get('/', userAddressesController.getAllUserAddresses);
router.get('/:id', userAddressesController.getUserAddressById);
router.post('/', userAddressesController.createUserAddress);
router.put('/:id', userAddressesController.updateUserAddress);
router.delete('/:id', userAddressesController.deleteUserAddress);

module.exports = router;
