const { body, validationResult } = require('express-validator');

const bankDetailsValidationRules = [
  body('payment_method_id')
    .notEmpty().withMessage('Payment method ID is required')
    .isInt({ min: 1 }).withMessage('Payment method ID must be a positive integer'),

  body('bank_name')
    .notEmpty().withMessage('Bank name is required'),

  body('account_number')
    .notEmpty().withMessage('Account number is required')
    .trim()
    .isLength({ max: 50 }).withMessage('Account number must be less than 50 characters')
    .matches(/^\d+$/).withMessage('Account number must contain only digits'),

  body('card_number')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Card number must be less than 50 characters')
    .matches(/^\d+$/).withMessage('Card number must contain only digits')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  bankDetailsValidationRules,
  validate,
};
