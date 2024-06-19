const { body, validationResult } = require('express-validator');

const transactionValidationRules = [
  body('buyer_id')
    .isInt()
    .notEmpty()
    .withMessage('Buyer ID must be an integer'),
  body('seller_id')
    .isInt()
    .notEmpty()
    .withMessage('Seller ID must be an integer'),
  body('product_id')
    .isInt()
    .notEmpty()
    .withMessage('Product ID must be an integer'),
  body('amount')
    .isFloat({ gt: 0 })
    .notEmpty()
    .withMessage('Amount must be greater than 0'),
  body('status_in')
    .isIn(['pending', 'completed', 'failed'])
    .notEmpty()
    .withMessage('Invalid status'),
  body('payment_method_id')
    .isInt()
    .notEmpty()
    .withMessage('Payment method ID must be an integer')
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
  validate,
};
