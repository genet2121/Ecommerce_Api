const { body, validationResult } = require('express-validator');

const receiptValidationRules = [
  body('transaction_id')
    .notEmpty().withMessage('Transaction ID is required')
    .isInt({ min: 1 }).withMessage('Transaction ID must be a positive integer'),

  body('buyer_id')
    .notEmpty().withMessage('Buyer ID is required')
    .isInt({ min: 1 }).withMessage('Buyer ID must be a positive integer'),

  body('seller_id')
    .notEmpty().withMessage('Seller ID is required')
    .isInt({ min: 1 }).withMessage('Seller ID must be a positive integer'),

  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isDecimal({ decimal_digits: '1,2' }).withMessage('Amount must be a decimal number'),
];

const receiptUpdateValidationRules = [
  body('transaction_id')
    .optional()
    .isInt({ min: 1 }).withMessage('Transaction ID must be a positive integer'),

  body('buyer_id')
    .optional()
    .isInt({ min: 1 }).withMessage('Buyer ID must be a positive integer'),

  body('seller_id')
    .optional()
    .isInt({ min: 1 }).withMessage('Seller ID must be a positive integer'),

  body('amount')
    .optional()
    .isDecimal({ decimal_digits: '1,2' }).withMessage('Amount must be a decimal number'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  receiptValidationRules,
  receiptUpdateValidationRules,
  validate,
};

