const { body, validationResult } = require('express-validator');

const orderValidationRules = [
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
  body('expd_delivery')
    .notEmpty()
    .withMessage('Expected delivery date is required'),
  body('total_amount')
    .isFloat({ gt: 0 })
    .notEmpty()
    .withMessage('Total amount must be greater than 0'),
  body('status_in')
    .isIn(['pending', 'processing', 'shipped', 'delivered'])
    .notEmpty()
    .withMessage('Invalid status')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  orderValidationRules,
  validate,
};
