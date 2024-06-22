// userAddressesRoutes.js
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const express = require('express');
const router = express.Router();
const userAddressesController = require('../controllers/userAddressesController');
const { userAddressValidationRules, userAddressUpdateValidationRules, validate } = require('../validators/userAddressesValidator');
const TABLE_NAME = 'user_addresses';
router.get('/', auth.authorize('can_view', TABLE_NAME), userAddressesController.getAllUserAddresses);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), userAddressesController.getUserAddressById);
router.post('/', auth.authorize('can_add', TABLE_NAME), userAddressValidationRules, validate, userAddressesController.createUserAddress);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), userAddressUpdateValidationRules, validate, userAddressesController.updateUserAddress);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), userAddressesController.deleteUserAddress);

module.exports = router;

