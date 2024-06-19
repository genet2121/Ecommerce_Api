// userAddressesRoutes.js
const express = require('express');
const router = express.Router();
const userAddressesController = require('../controllers/userAddressesController');
const { userValidationRules, validate } = require('../validators/userAddressesValidator');

router.get('/', userAddressesController.getAllUserAddresses);
router.get('/:id', userAddressesController.getUserAddressById);
router.post('/', userValidationRules, validate, userAddressesController.createUserAddress);
router.put('/:id', userAddressesController.updateUserAddress);
router.delete('/:id', userAddressesController.deleteUserAddress);

module.exports = router;
