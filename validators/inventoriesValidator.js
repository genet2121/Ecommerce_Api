const { body, validationResult } = require('express-validator');

const inventoryValidationRules = [
  body('product_id')
    .notEmpty()
    .isInt().withMessage('Product ID must be an integer'),

  body('quantity')
    .notEmpty()
    .isInt({ min: 1 }).withMessage('Quantity must be a non-negative integer')
];

const inventoryUpdateValidationRules = [
  body('product_id')
    .optional()
    .isInt().withMessage('Product ID must be an integer'),

  body('quantity')
    .optional()
    .isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  inventoryValidationRules,
  inventoryUpdateValidationRules,
  validate,
};
