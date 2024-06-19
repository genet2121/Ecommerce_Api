const { body, validationResult } = require('express-validator');

const walletDetailValidationRules = [
  body('payment_method_id')
    .isInt()
    .notEmpty()
    .withMessage('Payment method ID must be an integer'),
  body('wallet_name')
    .notEmpty()
    .withMessage('Wallet name is required'),
  body('phone_number')
    .notEmpty()
    .withMessage('Phone number is required')
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
  validate,
};
