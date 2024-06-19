const { body, validationResult } = require('express-validator');

const cartValidationRules = [
  body('user_id')
    .isInt()
    .notEmpty()
    .withMessage('User ID must be an integer'),
  body('product_id')
    .isInt()
    .notEmpty()
    .withMessage('Product ID must be an integer'),
  body('quantity')
    .isInt({ min: 1 })
    .notEmpty()
    .withMessage('Quantity must be at least 1'),
  body('status_in')
    .isIn(['active', 'completed'])
    .notEmpty()
    .withMessage('Status must be either active or completed')
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
  validate,
};
