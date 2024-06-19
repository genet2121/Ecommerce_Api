// discountsRoutes.js
const express = require('express');
const router = express.Router();
const discountsController = require('../controllers/discountsController');
const { userValidationRules, validate } = require('../validators/discountsValidator');

router.get('/', discountsController.getAllDiscounts);
router.get('/:id', discountsController.getDiscountById);
router.post('/', userValidationRules, validate, discountsController.createDiscount);
router.put('/:id', discountsController.updateDiscount);
router.delete('/:id', discountsController.deleteDiscount);

module.exports = router;
