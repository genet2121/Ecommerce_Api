// userAddressesRoutes.js
const express = require('express');
const router = express.Router();
const userAddressesController = require('../controllers/userAddressesController');
const { userAddressValidationRules, userAddressUpdateValidationRules, validate } = require('../validators/userAddressesValidator');

router.get('/', userAddressesController.getAllUserAddresses);
router.get('/:id', userAddressesController.getUserAddressById);
router.post('/', userAddressValidationRules, validate, userAddressesController.createUserAddress);
router.put('/:id', userAddressUpdateValidationRules, validate, userAddressesController.updateUserAddress);
router.delete('/:id', userAddressesController.deleteUserAddress);

module.exports = router;
