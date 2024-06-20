const { body, validationResult } = require('express-validator');

const productValidationRules = [
  body('p_name')
    .notEmpty()
    .isString().withMessage('Product name is required'),

  body('des')
    .notEmpty()
    .isString().withMessage('Description is required'),

  body('price')
    .notEmpty()
    .isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),

  body('cat_attr_id')
    .notEmpty()
    .isInt().withMessage('Category attribute ID must be an integer'),

  body('seller_id')
    .notEmpty()
    .isInt().withMessage('Seller ID must be an integer')
];

const productUpdateValidationRules = [
  body('p_name')
    .optional()
    .isString().withMessage('Product name is required'),

  body('des')
    .optional()
    .isString().withMessage('Description is required'),

  body('price')
    .optional()
    .isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),

  body('cat_attr_id')
    .optional()
    .isInt().withMessage('Category attribute ID must be an integer'),

  body('seller_id')
    .optional()
    .isInt().withMessage('Seller ID must be an integer')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  productValidationRules,
  productUpdateValidationRules,
  validate,
};
