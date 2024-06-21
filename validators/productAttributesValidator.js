const { body, validationResult } = require('express-validator');

const productAttributesValidationRules = [
  body('product_id')
    .notEmpty()
    .isInt().withMessage('Product id must be an integer'),

  body('category_attribute_id')
    .notEmpty()
    .isInt().withMessage('Attribute id must be an integer'),

  body('attribute_value')
    .notEmpty()
    .isString().withMessage('Attribute value is required'),
];

const productAttributesUpdateValidationRules = [
  body('product_id')
  .optional()
  .isInt().withMessage('Product id must be an integer'),

body('category_attribute_id')
  .optional()
  .isInt().withMessage('Attribute id must be an integer'),

body('attribute_value')
  .optional()
  .isString().withMessage('Attribute value is required'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  productAttributesValidationRules,
  productAttributesUpdateValidationRules,
  validate,
};
