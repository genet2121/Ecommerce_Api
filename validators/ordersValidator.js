const { body, validationResult } = require('express-validator');

const orderValidationRules = [
  body('buyer_id')
    .notEmpty()
    .isInt().withMessage('Buyer ID must be an integer'),

  body('seller_id')
    .notEmpty()
    .isInt().withMessage('Seller ID must be an integer'),

  body('product_id')
    .notEmpty()
    .isInt().withMessage('Product ID must be an integer'),

  body('expd_delivery')
    .notEmpty()
    .isISO8601()
    .toDate().withMessage('Expected delivery date is required'),

  body('total_amount')
    .notEmpty()
    .isFloat({ gt: 0 }).withMessage('Total amount must be greater than 0'),

  body('status_in')
    .notEmpty()
    .isIn(['pending', 'processing', 'shipped', 'delivered'])
    .withMessage('Invalid status')
];

const orderUpdateValidationRules = [
  body('buyer_id')
    .notEmpty()
    .isInt().withMessage('Buyer ID must be an integer'),

  body('seller_id')
    .optional()
    .isInt().withMessage('Seller ID must be an integer'),

  body('product_id')
    .optional()
    .isInt().withMessage('Product ID must be an integer'),

  body('expd_delivery')
    .optional()
    .isISO8601()
    .toDate().withMessage('Expected delivery date is required'),

  body('total_amount')
    .optional()
    .isFloat({ gt: 0 }).withMessage('Total amount must be greater than 0'),

  body('status_in')
    .optional()
    .isIn(['pending', 'processing', 'shipped', 'delivered']).withMessage('Invalid status')
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
  orderUpdateValidationRules,
  validate,
};
