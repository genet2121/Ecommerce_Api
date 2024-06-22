// rolesRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const router = express.Router();
const rolesController = require('../controllers/rolesController');
const { rolesValidationRules, rolesUpdateValidationRules, validate } = require('../validators/rolesValidator');

router.get('/', rolesController.getAllRoles);
router.get('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), rolesController.getRoleById);
router.post('/',  rolesValidationRules, validate, rolesController.createRole);
router.put('/:id', rolesUpdateValidationRules, validate, rolesController.updateRole);
router.delete('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), rolesController.deleteRole);

module.exports = router;