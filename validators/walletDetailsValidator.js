const { body, validationResult } = require('express-validator');

const walletDetailValidationRules = [
  body('payment_method_id')
    .notEmpty()
    .isInt().withMessage('Payment method ID must be an integer'),

  body('wallet_name')
    .notEmpty()
    .isString().withMessage('Wallet name is required'),

  body('phone_number')
    .notEmpty()
    .isInt().withMessage('Phone number is required')
];

const walletDetailUpdateValidationRules = [
  body('payment_method_id')
    .optional()
    .isInt().withMessage('Payment method ID must be an integer'),

  body('wallet_name')
    .optional()
    .isString().withMessage('Wallet name is required'),

  body('phone_number')
    .optional()
    .isInt().withMessage('Phone number is required')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  walletDetailValidationRules,
  walletDetailUpdateValidationRules,
  validate,
};
