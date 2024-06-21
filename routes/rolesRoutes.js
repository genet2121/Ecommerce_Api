// rolesRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const router = express.Router();
const rolesController = require('../controllers/rolesController');
const { roleValidationRules, roleUpdateValidationRules, validate } = require('../validators/rolesValidator');

router.get('/', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), rolesController.getAllRoles);
router.get('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), rolesController.getRoleById);
router.post('/', auth.authorize([Roles.ADMIN, Roles.SELLER]), roleValidationRules, validate, rolesController.createRole);
router.put('/:id', auth.authorize([Roles.ADMIN, Roles.SELLER]), roleUpdateValidationRules, validate, rolesController.updateRole);
router.delete('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), rolesController.deleteRole);

module.exports = router;