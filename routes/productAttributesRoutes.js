// productAttributesRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const router = express.Router();
const productAttributesController = require('../controllers/productAttributesController');
const { productAttributesValidationRules, productAttributesUpdateValidationRules, validate } = require('../validators/productAttributesValidator');

const TABLE_NAME = 'product_attributes';
router.get('/', auth.authorize('can_view', TABLE_NAME), productAttributesController.getAllProductAttributes);
router.get('/:id', auth.authorize('can_view_detail', TABLE_NAME), productAttributesController.getProductAttributeById);
router.post('/', auth.authorize('can_add', TABLE_NAME), productAttributesValidationRules, validate, productAttributesController.createProductAttribute);
router.put('/:id', auth.authorize('can_update', TABLE_NAME), productAttributesUpdateValidationRules, validate, productAttributesController.updateProductAttribute);
router.delete('/:id', auth.authorize('can_delete', TABLE_NAME), productAttributesController.deleteProductAttribute);

module.exports = router;



