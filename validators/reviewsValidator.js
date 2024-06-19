const { body, validationResult } = require('express-validator');

const reviewValidationRules = [
  body('user_id')
    .isInt()
    .notEmpty()
    .withMessage('User ID must be an integer'),
  body('product_id')
    .isInt()
    .notEmpty()
    .withMessage('Product ID must be an integer'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .notEmpty()
    .withMessage('Rating must be between 1 and 5'),
  body('comment_text')
    .isString()
    .notEmpty()
    .withMessage('Comment text must be a string')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  reviewValidationRules,
  validate,
};
