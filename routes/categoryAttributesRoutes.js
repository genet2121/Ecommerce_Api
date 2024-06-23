// categoryAttributesRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../infrastructure/service/authentatication/auth');
const categoryAttributesController = require('../controllers/categoryAttributesController');
const { categoryAttributeValidationRules, categoryAttributeUpdateValidationRules, validate } = require('../validators/categoryAttributesValidator');

const TABLE_NAME = 'category_attributes';
router.get('/', auth.authorize('can_view', TABLE_NAME), categoryAttributesController.getAllCategoryAttributes);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), categoryAttributesController.getCategoryAttributeById);
router.post('/', auth.authorize('can_add', TABLE_NAME), categoryAttributeValidationRules, validate, categoryAttributesController.createCategoryAttribute);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), categoryAttributeUpdateValidationRules, validate, categoryAttributesController.updateCategoryAttribute);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), categoryAttributesController.deleteCategoryAttribute);

module.exports = router;


