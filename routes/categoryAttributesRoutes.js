// categoryAttributesRoutes.js
const express = require('express');
const router = express.Router();
const categoryAttributesController = require('../controllers/categoryAttributesController');
const { categoryAttributeValidationRules, categoryAttributeUpdateValidationRules, validate } = require('../validators/categoryAttributesValidator');

router.get('/', categoryAttributesController.getAllCategoryAttributes);
router.get('/:id', categoryAttributesController.getCategoryAttributeById);
router.post('/', categoryAttributeValidationRules, validate, categoryAttributesController.createCategoryAttribute);
router.put('/:id', categoryAttributeUpdateValidationRules, validate, categoryAttributesController.updateCategoryAttribute);
router.delete('/:id', categoryAttributesController.deleteCategoryAttribute);

module.exports = router;
