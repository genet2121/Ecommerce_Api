const { body, validationResult } = require('express-validator');

const inventoryValidationRules = [
  body('product_id')
    .isInt()
    .notEmpty()
    .withMessage('Product ID must be an integer'),
  body('quantity')
    .isInt({ min: 0 })
    .notEmpty()
    .withMessage('Quantity must be a non-negative integer')
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
  validate,
};
