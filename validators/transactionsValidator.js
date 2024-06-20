const { body, validationResult } = require('express-validator');

const transactionValidationRules = [
  body('buyer_id')
    .notEmpty()
    .isInt().withMessage('Buyer ID must be an integer'),

  body('seller_id')
    .notEmpty()
    .isInt().withMessage('Seller ID must be an integer'),

  body('product_id')
    .notEmpty()
    .isInt().withMessage('Product ID must be an integer'),

  body('amount')
    .notEmpty()
    .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),

  body('status_in')
    .notEmpty()
    .isIn(['pending', 'completed', 'failed']).withMessage('Invalid status'),

  body('payment_method_id')
    .notEmpty()
    .isInt().withMessage('Payment method ID must be an integer')
];

const transactionUpdateValidationRules = [
  body('buyer_id')
    .optional()
    .isInt().withMessage('Buyer ID must be an integer'),

  body('seller_id')
    .optional()
    .isInt().withMessage('Seller ID must be an integer'),

  body('product_id')
    .optional()
    .isInt().withMessage('Product ID must be an integer'),

  body('amount')
    .optional()
    .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),

  body('status_in')
    .optional()
    .isIn(['pending', 'completed', 'failed']).withMessage('Invalid status'),

  body('payment_method_id')
    .optional()
    .isInt().withMessage('Payment method ID must be an integer')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  transactionValidationRules,
  transactionUpdateValidationRules,
  validate,
};
