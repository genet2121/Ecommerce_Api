const { body, validationResult } = require('express-validator');

const productValidationRules = [
  body('p_name')
    .notEmpty()
    .withMessage('Product name is required'),
  body('des')
    .notEmpty()
    .withMessage('Description is required'),
  body('price')
    .isFloat({ gt: 0 })
    .notEmpty()
    .withMessage('Price must be greater than 0'),
  body('cat_attr_id')
    .isInt()
    .notEmpty()
    .withMessage('Category attribute ID must be an integer'),
  body('seller_id')
    .isInt()
    .notEmpty()
    .withMessage('Seller ID must be an integer')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  productValidationRules,
  validate,
};
