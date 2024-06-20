const { body, validationResult } = require('express-validator');

const productImageValidationRules = [
  body('product_id')
    .notEmpty()
    .isInt().withMessage('Product ID must be an integer'),
];

const productImageUpdateValidationRules = [
  body('product_id')
    .optional()
    .isInt().withMessage('Product ID must be an integer'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  productImageValidationRules,
  productImageUpdateValidationRules,
  validate,
};
