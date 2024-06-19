// categoryAttributesRoutes.js
const express = require('express');
const router = express.Router();
const categoryAttributesController = require('../controllers/categoryAttributesController');
const { userValidationRules, validate } = require('../validators/categoryAttributesValidator');

router.get('/', categoryAttributesController.getAllCategoryAttributes);
router.get('/:id', categoryAttributesController.getCategoryAttributeById);
router.post('/', userValidationRules, validate, categoryAttributesController.createCategoryAttribute);
router.put('/:id', categoryAttributesController.updateCategoryAttribute);
router.delete('/:id', categoryAttributesController.deleteCategoryAttribute);

module.exports = router;
