const { body, validationResult } = require('express-validator');

const paymentMethodValidationRules = [
  body('method_name')
    .notEmpty()
    .withMessage('Method name is required'),
  body('payment_type')
    .isIn(['bank', 'wallet', 'other'])
    .notEmpty()
    .withMessage('Invalid payment type')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  paymentMethodValidationRules,
  validate,
};
