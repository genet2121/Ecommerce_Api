// adminTypesRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const router = express.Router();
const adminTypesController = require('../controllers/adminTypesController');
const { adminTypeValidationRules, adminTypeUpdateValidationRules, validate } = require('../validators/adminTypesValidator');

const TABLE_NAME = 'admin_types';
router.get('/', auth.authorize('can_view', TABLE_NAME), adminTypesController.getAllAdminTypes);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), adminTypesController.getAdminTypeById);
router.post('/', auth.authorize('can_add', TABLE_NAME), adminTypeValidationRules, validate, adminTypesController.createAdminType);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), auth.authorize([Roles.ADMIN, Roles.SELLER]), adminTypeUpdateValidationRules, validate, adminTypesController.updateAdminType);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), adminTypesController.deleteAdminType);

module.exports = router;


