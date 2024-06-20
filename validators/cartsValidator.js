const { body, validationResult } = require('express-validator');

const cartValidationRules = [
  body('user_id')
    .notEmpty()
    .isInt().withMessage('User ID must be an integer'),

  body('product_id')
    .notEmpty()
    .isInt().withMessage('Product ID must be an integer'),

  body('quantity')
    .notEmpty()
    .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),

  body('status_in')
    .notEmpty()
    .isIn(['active', 'completed']).withMessage('Status must be either active or completed')
];

const cartUpdateValidationRules = [
  body('user_id')
    .optional()
    .isInt().withMessage('User ID must be an integer'),

  body('product_id')
    .optional()
    .isInt().withMessage('Product ID must be an integer'),

  body('quantity')
    .optional()
    .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    
  body('status_in')
    .optional()
    .isIn(['active', 'completed']).withMessage('Status must be either active or completed')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  cartValidationRules,
  cartUpdateValidationRules,
  validate,
};
