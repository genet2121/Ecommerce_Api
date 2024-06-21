// productAttributesRoutes.js
const express = require('express');
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const router = express.Router();
const productAttributesController = require('../controllers/productAttributesController');
const { productAttributeValidationRules, productAttributeUpdateValidationRules, validate } = require('../validators/productAttributesValidator');

router.get('/', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), productAttributesController.getAllProductAttributes);
router.get('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), productAttributesController.getProductAttributeById);
router.post('/', auth.authorize([Roles.ADMIN, Roles.SELLER]), productAttributeValidationRules, validate, productAttributesController.createProductAttribute);
router.put('/:id', auth.authorize([Roles.ADMIN, Roles.SELLER]), productAttributeUpdateValidationRules, validate, productAttributesController.updateProductAttribute);
router.delete('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), productAttributesController.deleteProductAttribute);

module.exports = router;