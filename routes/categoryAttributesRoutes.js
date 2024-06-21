// categoryAttributesRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../infrastructure/service/authentatication/auth');
const Roles = require("../configration/enum");
const categoryAttributesController = require('../controllers/categoryAttributesController');
const { categoryAttributeValidationRules, categoryAttributeUpdateValidationRules, validate } = require('../validators/categoryAttributesValidator');

router.get('/', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), categoryAttributesController.getAllCategoryAttributes);
router.get('/:id', auth.authorize([Roles.ADMIN, Roles.BUYER, Roles.SELLER]), categoryAttributesController.getCategoryAttributeById);
router.post('/', auth.authorize([Roles.ADMIN, Roles.SELLER]), categoryAttributeValidationRules, validate, categoryAttributesController.createCategoryAttribute);
router.put('/:id', auth.authorize([Roles.ADMIN, Roles.SELLER]), categoryAttributeUpdateValidationRules, validate, categoryAttributesController.updateCategoryAttribute);
router.delete('/:id', auth.authorize([Roles.ADMIN, Roles.SELLER]), categoryAttributesController.deleteCategoryAttribute);

module.exports = router;
