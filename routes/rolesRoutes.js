// rolesRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const router = express.Router();
const rolesController = require('../controllers/rolesController');
const { rolesValidationRules, rolesUpdateValidationRules, validate } = require('../validators/rolesValidator');

const TABLE_NAME = 'roles';
router.get('/', auth.authorize('can_view', TABLE_NAME), rolesController.getAllRoles);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), rolesController.getRoleById);
router.post('/', auth.authorize('can_add', TABLE_NAME), rolesValidationRules, validate, rolesController.createRole);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), rolesUpdateValidationRules, validate, rolesController.updateRole);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), rolesController.deleteRole);

module.exports = router;

