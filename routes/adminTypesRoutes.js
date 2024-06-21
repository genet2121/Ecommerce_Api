// adminTypesRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const router = express.Router();
const adminTypesController = require('../controllers/adminTypesController');
const { adminTypeValidationRules, adminTypeUpdateValidationRules, validate } = require('../validators/adminTypesValidator');

router.get('/', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), adminTypesController.getAllAdminTypes);
router.get('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), adminTypesController.getAdminTypeById);
router.post('/', auth.authorize([Roles.ADMIN, Roles.SELLER]), adminTypeValidationRules, validate, adminTypesController.createAdminType);
router.put('/:id', auth.authorize([Roles.ADMIN, Roles.SELLER]), adminTypeUpdateValidationRules, validate, adminTypesController.updateAdminType);
router.delete('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), adminTypesController.deleteAdminType);

module.exports = router;