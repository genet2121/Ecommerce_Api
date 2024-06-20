const { body, validationResult } = require('express-validator');

const discountValidationRules = [
  body('seller_id')
    .notEmpty()
    .isInt().withMessage('Seller ID must be an integer'),

  body('product_id')
    .notEmpty()
    .isInt().withMessage('Product ID must be an integer'),

  body('discount_code')
    .notEmpty()
    .isString().withMessage('Discount code is required'),

  body('discount_percent')
    .notEmpty().withMessage('Start date is required')
    .isFloat({ gt: 0, lte: 100 }).withMessage('Discount percent must be between 0 and 100')
    .isDecimal({ decimal_digits: '1,2' }).withMessage('Amount must be a decimal number'),

  body('start_date')
    .notEmpty().withMessage('Start date is required')
    .isISO8601()
    .toDate(),

  body('end_date')
    .notEmpty().withMessage('End date is required')
    .isISO8601()
    .toDate()
];

const discountUpdateValidationRules = [
  body('seller_id')
  .optional()
  .isInt().withMessage('Seller ID must be an integer'),

body('product_id')
  .optional()
  .isInt().withMessage('Product ID must be an integer'),

body('discount_code')
  .optional()
  .isString().withMessage('Discount code is required'),

body('discount_percent')
  .optional()
  .isFloat({ gt: 0, lte: 100 }).withMessage('Discount percent must be between 0 and 100')
  .isDecimal({ decimal_digits: '1,2' }).withMessage('Amount must be a decimal number'),

body('start_date')
  .optional()
  .isISO8601()
  .toDate(),

body('end_date')
  .optional()
  .isISO8601()
  .toDate()
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  discountValidationRules,
  discountUpdateValidationRules,
  validate,
};
