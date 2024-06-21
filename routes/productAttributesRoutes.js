// productAttributesRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const router = express.Router();
const productAttributesController = require('../controllers/productAttributesController');
const { productAttributesValidationRules, productAttributesUpdateValidationRules, validate } = require('../validators/productAttributesValidator');

router.get('/', productAttributesController.getAllProductAttributes);
router.get('/:id', productAttributesController.getProductAttributeById);
router.post('/', productAttributesValidationRules, validate, productAttributesController.createProductAttribute);
router.put('/:id', productAttributesUpdateValidationRules, validate, productAttributesController.updateProductAttribute);
router.delete('/:id', productAttributesController.deleteProductAttribute);

module.exports = router;
