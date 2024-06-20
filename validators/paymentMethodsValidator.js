const { body, validationResult } = require('express-validator');

const paymentMethodValidationRules = [
  body('method_name')
    .notEmpty()
    .isString().withMessage('Method name is required'),

  body('payment_type')
    .notEmpty()
    .isIn(['bank', 'wallet', 'other']).withMessage('Invalid payment type')
];

const paymentMethodUpdateValidationRules = [
  body('method_name')
    .optional()
    .isString().withMessage('Method name is required'),

  body('payment_type')
    .optional()
    .isIn(['bank', 'wallet', 'other']).withMessage('Invalid payment type')
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
  paymentMethodUpdateValidationRules,
  validate,
};
